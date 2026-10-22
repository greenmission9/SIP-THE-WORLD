import { useState } from 'react';
import { geoGraticule10, geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import Box from '@mui/material/Box';
import { countries, drinks } from '../../utils/drinks-data.js';
import { colors, fonts } from '../../theme.js';

const WIDTH = 960;
const HEIGHT = 500;

/** 지도 도형은 한 번만 계산해 재사용합니다. (남극 제외) */
const world = feature(worldData, worldData.objects.countries);
const landFeatures = { type: 'FeatureCollection', features: world.features.filter((item) => item.id !== '010') };
const projection = geoNaturalEarth1().fitExtent([[8, 8], [WIDTH - 8, HEIGHT - 8]], landFeatures);
const pathOf = geoPath(projection);
const graticulePath = pathOf(geoGraticule10());
const supportedIso = new Map(countries.map((country) => [country.iso, country.id]));
const shapes = landFeatures.features.map((item) => ({ id: item.id, d: pathOf(item), countryId: supportedIso.get(item.id) }));
const pins = countries.map((country) => {
  const [x, y] = projection([country.lon, country.lat]);
  return { ...country, x, y, drinkNames: drinks.filter((drink) => drink.countryId === country.id).map((drink) => drink.name) };
});

/**
 * WorldMap 컴포넌트 — 빈티지 스타일 인터랙티브 세계지도
 * - 지원 국가에 음료 핀 표시, 호버 시 국가명·대표 음료 툴팁, 클릭 시 선택
 *
 * Props:
 * @param {string} selectedId - 선택된 국가 id [Optional]
 * @param {function} onSelect - 국가 선택 시 호출 (countryId) [Required]
 *
 * Example usage:
 * <WorldMap selectedId="vn" onSelect={ setCountryId } />
 */
function WorldMap({ selectedId, onSelect }) {
  const [hoverId, setHoverId] = useState(null);
  const hoverPin = pins.find((pin) => pin.id === hoverId);

  const handleKeyDown = (event, countryId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(countryId);
    }
  };

  return (
    <Box
      sx={ {
        position: 'relative',
        borderRadius: { xs: '20px', md: '28px' },
        overflow: 'hidden',
        bgcolor: '#EFE6D2',
        backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0.55), rgba(255,255,255,0) 70%)',
        border: '1px solid rgba(24,50,71,0.14)',
        boxShadow: 'inset 0 0 0 8px #F7F3E9, inset 0 0 0 9px rgba(24,50,71,0.14)',
        p: { xs: 1, md: 2 },
      } }
    >
      <Box component="svg" viewBox={ `0 0 ${ WIDTH } ${ HEIGHT }` } sx={ { display: 'block', width: '100%', height: 'auto' } } role="group" aria-label="세계 음료 지도">
        <path d={ graticulePath } fill="none" stroke={ colors.navy } strokeOpacity="0.09" strokeDasharray="2 4" />
        <g>
          { shapes.map((shape, index) => {
            const isSupported = Boolean(shape.countryId);
            const isActive = shape.countryId && (shape.countryId === selectedId || shape.countryId === hoverId);
            let fill = '#DCCFB2';
            if (isSupported) fill = colors.mustard;
            if (isActive) fill = colors.coral;
            return (
              <path
                key={ `${ shape.id }-${ index }` }
                d={ shape.d }
                fill={ fill }
                fillOpacity={ isSupported && !isActive ? 0.62 : 1 }
                stroke="#F7F3E9"
                strokeWidth="0.7"
                style={ { cursor: isSupported ? 'pointer' : 'default', transition: 'fill .25s ease, fill-opacity .25s ease' } }
                onMouseEnter={ isSupported ? () => setHoverId(shape.countryId) : undefined }
                onMouseLeave={ isSupported ? () => setHoverId(null) : undefined }
                onClick={ isSupported ? () => onSelect(shape.countryId) : undefined }
              />
            );
          }) }
        </g>
        <g>
          { pins.map((pin) => {
            const isSelected = pin.id === selectedId;
            return (
              <g
                key={ pin.id }
                transform={ `translate(${ pin.x } ${ pin.y })` }
                role="button"
                tabIndex={ 0 }
                aria-label={ `${ pin.name }: ${ pin.drinkNames.join(', ') }` }
                aria-pressed={ isSelected }
                onMouseEnter={ () => setHoverId(pin.id) }
                onMouseLeave={ () => setHoverId(null) }
                onFocus={ () => setHoverId(pin.id) }
                onBlur={ () => setHoverId(null) }
                onClick={ () => onSelect(pin.id) }
                onKeyDown={ (event) => handleKeyDown(event, pin.id) }
                style={ { cursor: 'pointer', outline: 'none' } }
              >
                { isSelected && (
                  <circle r="14" fill={ colors.coral } style={ { transformBox: 'fill-box', transformOrigin: 'center', animation: 'stw-pulse 1.8s ease-out infinite' } } />
                ) }
                <circle r={ isSelected ? 14 : 11 } fill={ isSelected ? colors.coral : colors.navy } stroke="#F7F3E9" strokeWidth="2.5" style={ { transition: 'r .2s ease' } } />
                <path d="M-5 -4 L5 -4 L4 4 Q3.6 6 2 6 L-2 6 Q-3.6 6 -4 4 Z M5 -2 Q8 -2 8 1 Q8 3.5 4.5 3.5" fill="none" stroke="#F7F3E9" strokeWidth="1.6" strokeLinejoin="round" />
              </g>
            );
          }) }
        </g>
      </Box>

      { /* 빈티지 지도 장식: 카르투슈 & 나침반 */ }
      <Box
        aria-hidden
        sx={ {
          position: 'absolute',
          left: { xs: 14, md: 28 },
          top: { xs: 12, md: 24 },
          display: { xs: 'none', sm: 'block' },
          px: 1.5,
          py: 0.75,
          border: '1px solid rgba(24,50,71,0.35)',
          bgcolor: 'rgba(247,243,233,0.85)',
          fontFamily: fonts.display,
          color: 'primary.main',
          fontSize: '0.8125rem',
          letterSpacing: '0.14em',
        } }
      >
        MAP OF FLAVORS · { countries.length } COUNTRIES
      </Box>
      <Box
        component="svg"
        viewBox="0 0 80 80"
        aria-hidden
        sx={ { position: 'absolute', left: { xs: 10, md: 28 }, bottom: { xs: 10, md: 24 }, width: { xs: 40, md: 72 }, opacity: 0.7 } }
      >
        <circle cx="40" cy="40" r="30" fill="none" stroke={ colors.navy } strokeWidth="1" />
        <circle cx="40" cy="40" r="24" fill="none" stroke={ colors.navy } strokeWidth="0.6" strokeDasharray="2 3" />
        <path d="M40 6 L45 40 L40 74 L35 40 Z" fill={ colors.navy } />
        <path d="M6 40 L40 35 L74 40 L40 45 Z" fill={ colors.navy } opacity="0.5" />
        <path d="M40 6 L45 40 L35 40 Z" fill={ colors.coral } />
        <text x="40" y="5" textAnchor="middle" fontSize="7" fill={ colors.navy } fontFamily="serif">N</text>
      </Box>

      { hoverPin && (
        <Box
          role="tooltip"
          sx={ {
            position: 'absolute',
            left: `${ (hoverPin.x / WIDTH) * 100 }%`,
            top: `${ (hoverPin.y / HEIGHT) * 100 }%`,
            transform: `translate(${ hoverPin.x > WIDTH * 0.8 ? '-100%' : hoverPin.x < WIDTH * 0.2 ? '0%' : '-50%' }, calc(-100% - 22px))`,
            pointerEvents: 'none',
            bgcolor: colors.navy,
            color: colors.ivory,
            borderRadius: 2,
            px: 1.75,
            py: 1.1,
            boxShadow: '0 12px 28px -12px rgba(0,0,0,0.5)',
            whiteSpace: 'nowrap',
            zIndex: 3,
            display: { xs: 'none', md: 'block' },
            animation: 'stw-pop .2s ease',
          } }
        >
          <Box sx={ { fontSize: '0.6875rem', letterSpacing: '0.14em', color: colors.mustard, fontWeight: 700 } }>{ hoverPin.en }</Box>
          <Box sx={ { fontWeight: 700, fontSize: '0.9375rem' } }>{ hoverPin.name }</Box>
          <Box sx={ { fontSize: '0.8125rem', opacity: 0.8 } }>{ hoverPin.drinkNames.join(' · ') }</Box>
        </Box>
      ) }
    </Box>
  );
}

export default WorldMap;
