import { useId } from 'react';

const ICE_CUBES = [
  { x: 70, y: 8, r: -12 },
  { x: 104, y: 16, r: 10 },
  { x: 84, y: 48, r: 4 },
];

const BUBBLES = [
  [80, 120, 3], [96, 150, 2.4], [118, 132, 3.2], [108, 178, 2.2], [86, 190, 2.8], [124, 196, 2], [100, 108, 2],
];

const RICE = [
  [72, 118], [84, 112], [96, 121], [108, 114], [120, 122], [132, 116], [90, 127], [114, 127], [78, 124], [126, 110], [102, 109],
];

/**
 * 김이 오르는 표현
 * @param {number} top - 김이 시작되는 y 좌표
 */
function Steam({ top }) {
  return (
    <g className="stw-steam" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.75">
      <path d={ `M82 ${ top } q-9 -12 0 -24 t0 -24` } />
      <path d={ `M100 ${ top - 4 } q-9 -12 0 -24 t0 -24` } />
      <path d={ `M118 ${ top } q-9 -12 0 -24 t0 -24` } />
    </g>
  );
}

function LiquidGradient({ id, colors }) {
  const [top, bottom] = Array.isArray(colors) ? colors : [colors, colors];
  return (
    <linearGradient id={ id } x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={ top } />
      <stop offset="100%" stopColor={ bottom } />
    </linearGradient>
  );
}

function Citrus({ cx, cy, type }) {
  const palette = type === 'lime'
    ? { peel: '#7DB23A', flesh: '#C9E58A', line: '#9CCB55' }
    : { peel: '#F2C94C', flesh: '#FBEB9C', line: '#F2C94C' };
  return (
    <g>
      <circle cx={ cx } cy={ cy } r="22" fill={ palette.peel } />
      <circle cx={ cx } cy={ cy } r="17" fill={ palette.flesh } />
      { [0, 45, 90, 135].map((angle) => (
        <line
          key={ angle }
          x1={ cx - 16 }
          y1={ cy }
          x2={ cx + 16 }
          y2={ cy }
          stroke={ palette.line }
          strokeWidth="1.6"
          transform={ `rotate(${ angle } ${ cx } ${ cy })` }
        />
      )) }
      <circle cx={ cx } cy={ cy } r="2.5" fill={ palette.line } />
    </g>
  );
}

function MintLeaves({ x, y }) {
  return (
    <g fill="#3E9A5B">
      <ellipse cx={ x } cy={ y } rx="7" ry="15" transform={ `rotate(-35 ${ x } ${ y })` } />
      <ellipse cx={ x + 14 } cy={ y - 6 } rx="7" ry="15" transform={ `rotate(18 ${ x + 14 } ${ y - 6 })` } fill="#57B26F" />
      <ellipse cx={ x + 6 } cy={ y - 18 } rx="6" ry="12" transform={ `rotate(-6 ${ x + 6 } ${ y - 18 })` } fill="#6CC383" />
    </g>
  );
}

/** 키 큰 유리잔 (아이스 음료, 탄산음료) */
function TallGlass({ uid, visual }) {
  const glass = 'M54 40 L146 40 L134 214 Q133 220 127 220 L73 220 Q67 220 66 214 Z';
  const liquidTop = 62;
  const foamHeight = visual.foam ? visual.foamHeight ?? 20 : 0;
  return (
    <g>
      <defs>
        <clipPath id={ `${ uid }-clip` }><path d={ glass } /></clipPath>
        <LiquidGradient id={ `${ uid }-liquid` } colors={ visual.liquid } />
      </defs>
      { visual.garnish === 'cinnamon' && (
        <g transform="rotate(12 128 110)">
          <rect x="122" y="10" width="13" height="196" rx="5" fill="#8B4A2B" />
          <rect x="126" y="10" width="3" height="196" fill="#6B3519" />
        </g>
      ) }
      { visual.garnish === 'straw' && (
        <line x1="112" y1="212" x2="138" y2="8" stroke="#F36B4A" strokeWidth="8" strokeLinecap="round" />
      ) }
      <path d={ glass } fill="#FFFFFF" fillOpacity="0.22" />
      <g clipPath={ `url(#${ uid }-clip)` }>
        <rect x="0" y={ liquidTop + foamHeight } width="200" height="180" fill={ `url(#${ uid }-liquid)` } />
        { foamHeight > 0 && <rect x="0" y={ liquidTop } width="200" height={ foamHeight + 2 } fill={ visual.foam } /> }
        { visual.hasIce && ICE_CUBES.map((cube) => (
          <rect
            key={ cube.x }
            x={ cube.x }
            y={ liquidTop + cube.y }
            width="30"
            height="28"
            rx="5"
            fill="#FFFFFF"
            fillOpacity="0.3"
            stroke="#FFFFFF"
            strokeOpacity="0.7"
            strokeWidth="2"
            transform={ `rotate(${ cube.r } ${ cube.x + 15 } ${ liquidTop + cube.y + 14 })` }
          />
        )) }
        { (visual.hasBubbles || visual.hasIce) && BUBBLES.map(([cx, cy, r]) => (
          <circle key={ `${ cx }-${ cy }` } cx={ cx } cy={ cy } r={ r } fill="#FFFFFF" fillOpacity="0.55" />
        )) }
        <rect x="0" y="206" width="200" height="20" fill="#FFFFFF" fillOpacity="0.18" />
      </g>
      <path d="M64 52 L74 202" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="6" strokeLinecap="round" />
      <path d={ glass } fill="none" stroke="#FFFFFF" strokeWidth="3" strokeOpacity="0.95" />
      { (visual.garnish === 'lemon' || visual.garnish === 'lime') && <Citrus cx={ 142 } cy={ 44 } type={ visual.garnish } /> }
    </g>
  );
}

/** 손잡이가 달린 유리컵 + 받침 (에그 커피처럼 층이 보이는 음료) */
function LayeredCup({ uid, visual }) {
  const body = 'M50 92 L150 92 L142 194 Q140 204 128 204 L72 204 Q60 204 58 194 Z';
  const foamHeight = visual.foamHeight ?? 30;
  return (
    <g>
      <defs>
        <clipPath id={ `${ uid }-clip` }><path d={ body } /></clipPath>
        <LiquidGradient id={ `${ uid }-liquid` } colors={ visual.liquid } />
      </defs>
      <ellipse cx="100" cy="210" rx="80" ry="13" fill="#FFFFFF" />
      <ellipse cx="100" cy="207" rx="56" ry="7" fill="#EDE5D6" />
      <path d="M146 112 Q180 114 176 146 Q172 174 140 172" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeOpacity="0.9" />
      <g clipPath={ `url(#${ uid }-clip)` }>
        <rect x="0" y="80" width="200" height="140" fill={ `url(#${ uid }-liquid)` } />
        <rect x="0" y="80" width="200" height={ 12 + foamHeight } fill={ visual.foam } />
        <path d={ `M40 ${ 92 + foamHeight } q15 6 30 0 t30 0 t30 0 t30 0 t30 0` } fill="none" stroke={ visual.foam } strokeWidth="6" />
      </g>
      <ellipse cx="100" cy="92" rx="50" ry="9" fill={ visual.foam } />
      <ellipse cx="94" cy="90" rx="22" ry="4" fill="#FFFFFF" fillOpacity="0.45" />
      <path d="M60 102 L68 192" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="5" strokeLinecap="round" />
      <path d={ body } fill="none" stroke="#FFFFFF" strokeWidth="3" />
    </g>
  );
}

/** 넓은 사발 (수테차, 식혜, 수정과) */
function Bowl({ visual }) {
  return (
    <g>
      <rect x="74" y="194" width="52" height="16" rx="4" fill={ visual.bowl } stroke="#000000" strokeOpacity="0.08" />
      <path d="M26 116 Q30 198 100 202 Q170 198 174 116 Z" fill={ visual.bowl } />
      <path d="M100 116 L174 116 Q170 198 100 202 Z" fill="#000000" fillOpacity="0.07" />
      <path d="M40 146 Q100 168 160 146" fill="none" stroke={ visual.pattern } strokeWidth="3.5" />
      <path d="M48 162 Q100 182 152 162" fill="none" stroke={ visual.pattern } strokeWidth="1.8" strokeDasharray="2 6" strokeLinecap="round" />
      <ellipse cx="100" cy="116" rx="74" ry="17" fill={ visual.bowl } stroke="#000000" strokeOpacity="0.08" />
      <ellipse cx="100" cy="117" rx="67" ry="13" fill={ visual.liquid } />
      { visual.garnish === 'rice' && RICE.map(([cx, cy]) => (
        <ellipse key={ `${ cx }-${ cy }` } cx={ cx } cy={ cy } rx="3.4" ry="1.8" fill="#FFFFFF" transform={ `rotate(${ (cx * 7) % 50 - 25 } ${ cx } ${ cy })` } />
      )) }
      { visual.garnish === 'persimmon' && (
        <g>
          <ellipse cx="90" cy="117" rx="20" ry="7" fill="#C4561F" />
          <ellipse cx="90" cy="116" rx="8" ry="3" fill="#E07B3A" />
          { [[118, 114], [126, 120], [112, 121], [132, 113]].map(([cx, cy]) => (
            <ellipse key={ cx } cx={ cx } cy={ cy } rx="3" ry="2" fill="#F5E7C4" />
          )) }
        </g>
      ) }
      { !visual.garnish && <ellipse cx="86" cy="114" rx="26" ry="4" fill="#FFFFFF" fillOpacity="0.35" /> }
    </g>
  );
}

/** 찻사발 (말차) */
function Chawan({ visual }) {
  return (
    <g>
      <rect x="78" y="192" width="44" height="14" rx="3" fill="#8A6A55" />
      <path d="M36 104 Q34 194 100 198 Q166 194 164 104 Z" fill={ visual.bowl } />
      <path d="M36 104 Q40 132 58 130 Q70 150 86 132 Q100 148 116 130 Q134 146 146 128 Q160 134 164 104 Z" fill="#C9B79C" fillOpacity="0.55" />
      <ellipse cx="100" cy="104" rx="64" ry="14" fill="#7E6150" />
      <ellipse cx="100" cy="105" rx="57" ry="11" fill={ visual.foam } />
      <ellipse cx="100" cy="105" rx="34" ry="6" fill="#B3D27A" />
      <path d="M78 105 q11 -5 22 0 t22 0" fill="none" stroke="#D4E8A8" strokeWidth="2" />
    </g>
  );
}

/** 구슬 마개 병 (라무네) */
function MarbleBottle({ uid, visual }) {
  const bottle = 'M70 215 Q70 220 76 220 L124 220 Q130 220 130 215 L130 122 Q130 102 112 94 L112 84 Q122 74 112 62 L112 42 L88 42 L88 62 Q78 74 88 84 L88 94 Q70 102 70 122 Z';
  return (
    <g>
      <defs>
        <clipPath id={ `${ uid }-clip` }><path d={ bottle } /></clipPath>
      </defs>
      <path d={ bottle } fill={ visual.glass } fillOpacity="0.75" />
      <g clipPath={ `url(#${ uid }-clip)` }>
        <rect x="0" y="100" width="200" height="130" fill="#E9F8FC" fillOpacity="0.55" />
        { BUBBLES.map(([cx, cy, r]) => (
          <circle key={ `${ cx }-${ cy }` } cx={ cx } cy={ cy + 6 } r={ r } fill="#FFFFFF" fillOpacity="0.85" />
        )) }
      </g>
      <rect x="70" y="146" width="60" height="32" fill="#FFFFFF" fillOpacity="0.9" />
      <path d="M74 166 q7 -8 13 0 t13 0 t13 0 t13 0" fill="none" stroke={ visual.cap } strokeWidth="3" />
      <circle cx="100" cy="155" r="4" fill={ visual.cap } />
      <circle cx="100" cy="72" r="9" fill="#EAF8FB" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="97" cy="69" r="3" fill="#FFFFFF" />
      <path d="M78 110 L78 205" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="5" strokeLinecap="round" />
      <path d={ bottle } fill="none" stroke="#FFFFFF" strokeWidth="3" />
      <rect x="86" y="26" width="28" height="18" rx="4" fill={ visual.cap } />
      <rect x="86" y="38" width="28" height="4" fill="#000000" fillOpacity="0.15" />
    </g>
  );
}

/** 손잡이 머그 (살렙, 아이란) */
function Mug({ visual }) {
  return (
    <g>
      <path d="M146 108 Q184 110 180 146 Q176 180 142 176" fill="none" stroke={ visual.mug } strokeWidth="13" />
      <path d="M52 86 L148 86 L144 200 Q143 208 134 208 L66 208 Q57 208 56 200 Z" fill={ visual.mug } />
      <path d="M104 86 L148 86 L144 200 Q143 208 134 208 L104 208 Z" fill="#000000" fillOpacity="0.1" />
      <rect x="64" y="100" width="7" height="92" rx="3.5" fill="#FFFFFF" fillOpacity="0.28" />
      <path d="M56 186 L144 186" stroke="#000000" strokeOpacity="0.12" strokeWidth="3" />
      <ellipse cx="100" cy="86" rx="48" ry="10" fill={ visual.mug } />
      <ellipse cx="100" cy="87" rx="43" ry="7.5" fill={ visual.surface } />
      { visual.hasDust && [[86, 86], [96, 89], [106, 85], [114, 88], [92, 84], [102, 90], [110, 84], [120, 87], [80, 88]].map(([cx, cy]) => (
        <circle key={ `${ cx }-${ cy }` } cx={ cx } cy={ cy } r="1.8" fill="#8B4A2B" />
      )) }
      { !visual.hasDust && <ellipse cx="96" cy="86" rx="22" ry="3" fill="#FFFFFF" /> }
    </g>
  );
}

/** 토기 잔 (마살라 차이) */
function ClayCup({ visual }) {
  return (
    <g>
      <path d="M56 96 L144 96 L128 204 Q126 210 118 210 L82 210 Q74 210 72 204 Z" fill={ visual.clay } />
      <path d="M100 96 L144 96 L128 204 Q126 210 118 210 L100 210 Z" fill="#000000" fillOpacity="0.12" />
      { [124, 148, 172].map((y) => (
        <path key={ y } d={ `M${ 60 + (y - 96) * 0.15 } ${ y } L${ 140 - (y - 96) * 0.15 } ${ y }` } stroke="#000000" strokeOpacity="0.1" strokeWidth="2" />
      )) }
      <ellipse cx="100" cy="96" rx="44" ry="9" fill="#C97A4D" />
      <ellipse cx="100" cy="97" rx="38" ry="6.5" fill={ visual.liquid } />
      <ellipse cx="94" cy="96" rx="16" ry="2.4" fill="#FFFFFF" fillOpacity="0.4" />
    </g>
  );
}

/** 모로코 찻잔 + 민트 */
function TeaGlass({ uid, visual }) {
  const glass = 'M66 84 L134 84 L124 206 Q123 212 116 212 L84 212 Q77 212 76 206 Z';
  return (
    <g>
      <defs>
        <clipPath id={ `${ uid }-clip` }><path d={ glass } /></clipPath>
        <LiquidGradient id={ `${ uid }-liquid` } colors={ visual.liquid } />
      </defs>
      <line x1="94" y1="112" x2="86" y2="44" stroke="#3E7B4C" strokeWidth="3" />
      <line x1="106" y1="112" x2="116" y2="52" stroke="#3E7B4C" strokeWidth="3" />
      <MintLeaves x={ 78 } y={ 56 } />
      <MintLeaves x={ 108 } y={ 64 } />
      <path d={ glass } fill="#FFFFFF" fillOpacity="0.25" />
      <g clipPath={ `url(#${ uid }-clip)` }>
        <rect x="0" y="104" width="200" height="120" fill={ `url(#${ uid }-liquid)` } />
        <rect x="0" y="102" width="200" height="5" fill="#F7E2A7" />
        <rect x="0" y="84" width="200" height="14" fill="#D4A93C" />
        { [72, 84, 96, 108, 120, 132].map((cx) => (
          <path key={ cx } d={ `M${ cx } 91 l5 -5 l5 5 l-5 5 Z` } fill="#F6DC8A" />
        )) }
        <rect x="0" y="192" width="200" height="20" fill="#D4A93C" fillOpacity="0.9" />
      </g>
      <path d="M74 110 L82 196" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="4" strokeLinecap="round" />
      <path d={ glass } fill="none" stroke="#FFFFFF" strokeWidth="3" />
    </g>
  );
}

/** 마테 잔 + 봄비야 */
function Gourd({ visual }) {
  return (
    <g>
      <line x1="108" y1="104" x2="150" y2="22" stroke="#C9CED3" strokeWidth="6" strokeLinecap="round" />
      <rect x="140" y="16" width="16" height="8" rx="3" fill="#AEB5BC" transform="rotate(-62 148 20)" />
      <path d="M48 140 Q46 92 70 100 L130 100 Q154 92 152 140 Q156 204 100 208 Q44 204 48 140 Z" fill={ visual.gourd } />
      <path d="M100 100 L130 100 Q154 92 152 140 Q156 204 100 208 Z" fill="#000000" fillOpacity="0.14" />
      { [130, 150, 170, 190].map((y) => (
        <path key={ y } d={ `M${ 56 + Math.abs(160 - y) * 0.15 } ${ y } q44 10 ${ 88 - Math.abs(160 - y) * 0.3 } 0` } fill="none" stroke="#000000" strokeOpacity="0.12" strokeWidth="2" strokeDasharray="4 5" />
      )) }
      <rect x="62" y="92" width="76" height="16" rx="4" fill="#D9DDE1" />
      <rect x="62" y="104" width="76" height="4" fill="#9AA1A8" />
      <ellipse cx="100" cy="92" rx="38" ry="9" fill="#C9CED3" />
      <ellipse cx="100" cy="92" rx="32" ry="6.5" fill={ visual.leaf } />
      <path d="M78 90 l4 -3 l3 3 l4 -4 l4 3 l3 -3 l4 3 l4 -3" fill="none" stroke="#A9C266" strokeWidth="2" />
      <line x1="108" y1="104" x2="122" y2="78" stroke="#C9CED3" strokeWidth="6" strokeLinecap="round" />
    </g>
  );
}

/** 도자기 찻잔 + 받침 (루이보스, 플랫 화이트) */
function Teacup({ visual }) {
  return (
    <g>
      <ellipse cx="100" cy="206" rx="82" ry="13" fill={ visual.cup } stroke="#000000" strokeOpacity="0.08" />
      <ellipse cx="100" cy="203" rx="50" ry="6" fill="#000000" fillOpacity="0.07" />
      <path d="M150 132 Q184 130 180 156 Q176 180 140 174" fill="none" stroke={ visual.cup } strokeWidth="10" />
      <path d="M42 118 Q46 196 100 198 Q154 196 158 118 Z" fill={ visual.cup } />
      <path d="M100 118 L158 118 Q154 196 100 198 Z" fill="#000000" fillOpacity="0.07" />
      <ellipse cx="100" cy="118" rx="58" ry="14" fill={ visual.cup } stroke={ visual.rim } strokeWidth="3" />
      <ellipse cx="100" cy="119" rx="52" ry="11" fill={ visual.surface } />
      { visual.hasHeart ? (
        <g>
          <ellipse cx="100" cy="119" rx="30" ry="7" fill="#D9B48A" />
          <path d="M100 126 C86 118 86 112 93 112 C97 112 99 115 100 117 C101 115 103 112 107 112 C114 112 114 118 100 126 Z" fill="#FBF4E8" />
        </g>
      ) : (
        <ellipse cx="90" cy="116" rx="22" ry="3.5" fill="#FFFFFF" fillOpacity="0.35" />
      ) }
    </g>
  );
}

const VESSELS = {
  tall: { component: TallGlass, steamTop: 40 },
  cup: { component: LayeredCup, steamTop: 74 },
  bowl: { component: Bowl, steamTop: 92 },
  chawan: { component: Chawan, steamTop: 84 },
  bottle: { component: MarbleBottle, steamTop: 20 },
  mug: { component: Mug, steamTop: 68 },
  clay: { component: ClayCup, steamTop: 80 },
  tea: { component: TeaGlass, steamTop: 70 },
  gourd: { component: Gourd, steamTop: 74 },
  teacup: { component: Teacup, steamTop: 96 },
};

/**
 * DrinkArt 컴포넌트 — 음료 데이터의 visual 옵션으로 SVG 일러스트를 그립니다.
 *
 * Props:
 * @param {object} visual - 음료 visual 데이터 (type, liquid, foam, garnish 등) [Required]
 * @param {string} title - 접근성용 대체 텍스트 [Optional, 기본값: '']
 * @param {boolean} hasShadow - 바닥 그림자 표시 여부 [Optional, 기본값: true]
 *
 * Example usage:
 * <DrinkArt visual={ drink.visual } title="에그 커피 일러스트" />
 */
function DrinkArt({ visual, title = '', hasShadow = true }) {
  const uid = `art${ useId().replace(/[^a-zA-Z0-9]/g, '') }`;
  const vessel = VESSELS[visual.type] ?? VESSELS.tall;
  const Vessel = vessel.component;

  return (
    <svg viewBox="0 0 200 240" width="100%" height="100%" role="img" aria-label={ title } preserveAspectRatio="xMidYMid meet">
      { title && <title>{ title }</title> }
      { hasShadow && <ellipse cx="100" cy="224" rx="70" ry="8" fill="#000000" fillOpacity="0.16" /> }
      { visual.hasSteam && <Steam top={ vessel.steamTop } /> }
      <Vessel uid={ uid } visual={ visual } />
    </svg>
  );
}

export default DrinkArt;
