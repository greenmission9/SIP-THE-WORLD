import { categories, continents, countries, drinks } from './drinks-data.js';

const countryMap = new Map(countries.map((country) => [country.id, country]));
const drinkMap = new Map(drinks.map((drink) => [drink.id, drink]));

/**
 * id로 음료를 찾습니다.
 * @param {string} id - 음료 id
 * @returns {object|undefined}
 */
export function getDrink(id) {
  return drinkMap.get(id);
}

/**
 * id로 국가를 찾습니다.
 * @param {string} id - 국가 id
 * @returns {object|undefined}
 */
export function getCountry(id) {
  return countryMap.get(id);
}

/**
 * 국가에 등록된 음료 목록을 반환합니다.
 * @param {string} countryId - 국가 id
 * @returns {object[]}
 */
export function getDrinksByCountry(countryId) {
  return drinks.filter((drink) => drink.countryId === countryId);
}

/**
 * 국기 이미지 URL (flagcdn.com, 국가 코드 기준)
 * @param {string} countryId - ISO 3166-1 alpha-2 소문자 코드
 * @param {number} width - 이미지 너비(px) 20 | 40 | 80
 * @returns {string}
 */
export function getFlagUrl(countryId, width = 40) {
  return `https://flagcdn.com/w${ width }/${ countryId }.png`;
}

export function getCategoryLabel(id) {
  return categories.find((category) => category.id === id)?.label ?? id;
}

export function getContinentLabel(id) {
  return continents.find((continent) => continent.id === id)?.label ?? id;
}

/**
 * 검색어로 음료를 찾습니다. (음료명, 현지명, 국가명, 재료, 맛 키워드)
 * @param {string} query - 검색어
 * @returns {object[]}
 */
export function searchDrinks(query) {
  const keyword = query.trim().toLowerCase();
  if (!keyword) return [];
  return drinks.filter((drink) => {
    const country = getCountry(drink.countryId);
    const haystack = [
      drink.name,
      drink.local,
      drink.tagline,
      country?.name,
      country?.en,
      ...drink.ingredients,
      ...drink.keywords,
      ...drink.categories.map(getCategoryLabel),
    ].join(' ').toLowerCase();
    return haystack.includes(keyword);
  });
}

/**
 * 조건에 맞는 음료를 필터링합니다.
 * @param {object} options - { query, continent, category }
 * @returns {object[]}
 */
export function filterDrinks({ query = '', continent = 'all', category = '' }) {
  const base = query.trim() ? searchDrinks(query) : drinks;
  return base.filter((drink) => {
    const country = getCountry(drink.countryId);
    const isContinentMatch = continent === 'all' || country?.continent === continent;
    const isCategoryMatch = !category || drink.categories.includes(category);
    return isContinentMatch && isCategoryMatch;
  });
}

/**
 * 현재 음료를 제외하고 무작위 음료를 하나 뽑습니다.
 * @param {string} excludeId - 제외할 음료 id
 * @returns {object}
 */
export function pickRandomDrink(excludeId) {
  const pool = drinks.filter((drink) => drink.id !== excludeId);
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * 취향 테스트 답변으로 음료를 추천합니다.
 * @param {object} answers - { temp: 'hot'|'cold'|'any', sweet: 0|1|2, isBold: boolean }
 * @returns {object[]} 점수 순으로 정렬된 상위 3개 음료
 */
export function recommendDrinks({ temp, sweet, isBold }) {
  return drinks
    .map((drink) => {
      let score = 0;
      if (temp === 'any' || drink.temp === 'both' || drink.temp === temp) score += 2;
      score += 2 - Math.abs(drink.sweetLevel - sweet);
      if (drink.isBold === isBold) score += 2;
      return { drink, score: score + Math.random() * 0.5 };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.drink);
}
