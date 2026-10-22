import { useState } from 'react';
import Box from '@mui/material/Box';
import { getFlagUrl } from '../../utils/drink-utils.js';

/**
 * CountryFlag 컴포넌트 — 국기 이미지 (불러오지 못하면 국가 코드 배지로 대체)
 *
 * Props:
 * @param {string} countryId - 국가 코드 (예: 'vn') [Required]
 * @param {string} name - 국가명 (대체 텍스트) [Required]
 * @param {number} size - 국기 높이(px) [Optional, 기본값: 16]
 *
 * Example usage:
 * <CountryFlag countryId="vn" name="베트남" size={ 18 } />
 */
function CountryFlag({ countryId, name, size = 16 }) {
  const [hasError, setHasError] = useState(false);
  const width = Math.round(size * 1.5);

  if (hasError) {
    return (
      <Box
        component="span"
        sx={ {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width,
          height: size,
          borderRadius: '3px',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          fontSize: size * 0.55,
          fontWeight: 700,
          textTransform: 'uppercase',
          flexShrink: 0,
        } }
      >
        { countryId }
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={ getFlagUrl(countryId, size > 20 ? 80 : 40) }
      alt={ `${ name } 국기` }
      loading="lazy"
      onError={ () => setHasError(true) }
      sx={ {
        width,
        height: size,
        objectFit: 'cover',
        borderRadius: '3px',
        boxShadow: '0 0 0 1px rgba(24,50,71,0.12)',
        flexShrink: 0,
      } }
    />
  );
}

export default CountryFlag;
