import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import DrinkVisual from '../ui/drink-visual.jsx';
import { getCountry, recommendDrinks } from '../../utils/drink-utils.js';
import { fonts } from '../../theme.js';

const questions = [
  {
    key: 'temp',
    title: '지금 마시고 싶은 온도는?',
    options: [
      { label: '따뜻하게', hint: '두 손으로 감싸 쥐는 한 잔', value: 'hot' },
      { label: '시원하게', hint: '얼음이 부딪히는 소리', value: 'cold' },
      { label: '상관없어요', hint: '맛있다면 무엇이든', value: 'any' },
    ],
  },
  {
    key: 'sweet',
    title: '단맛은 어느 정도가 좋아요?',
    options: [
      { label: '깔끔하게', hint: '쌉쌀하거나 짭짤한 맛도 좋아요', value: 0 },
      { label: '은은하게', hint: '살짝 달콤한 정도', value: 1 },
      { label: '확실하게', hint: '디저트 같은 진한 단맛', value: 2 },
    ],
  },
  {
    key: 'isBold',
    title: '오늘의 탐험 스타일은?',
    options: [
      { label: '익숙한 맛에서 한 걸음', hint: '편안하게 즐기고 싶어요', value: false },
      { label: '완전히 새로운 경험', hint: '상상 못 한 맛에 도전!', value: true },
    ],
  },
];

/**
 * TasteQuizDialog 컴포넌트 — 3문항 음료 취향 테스트
 *
 * Props:
 * @param {boolean} isOpen - 다이얼로그 열림 여부 [Required]
 * @param {function} onClose - 닫기 핸들러 [Required]
 *
 * Example usage:
 * <TasteQuizDialog isOpen={ isOpen } onClose={ handleClose } />
 */
function TasteQuizDialog({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const isDone = step >= questions.length;

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResults([]);
  };

  const close = () => {
    onClose();
    reset();
  };

  const choose = (value) => {
    const next = { ...answers, [questions[step].key]: value };
    setAnswers(next);
    if (step === questions.length - 1) setResults(recommendDrinks(next));
    setStep(step + 1);
  };

  const goToDrink = (id) => {
    navigate(`/drinks/${ id }`);
    close();
  };

  const [best, ...others] = results;

  return (
    <Dialog open={ isOpen } onClose={ close } fullWidth maxWidth="sm">
      <Box sx={ { p: { xs: 3, md: 4 } } }>
        <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>
          <Box sx={ { fontFamily: fonts.display, color: 'secondary.main', letterSpacing: '0.08em' } }>TASTE FINDER</Box>
          <IconButton onClick={ close } aria-label="취향 테스트 닫기"><CloseIcon /></IconButton>
        </Box>
        <LinearProgress
          variant="determinate"
          value={ (Math.min(step, questions.length) / questions.length) * 100 }
          color="secondary"
          sx={ { my: 2, height: 6, borderRadius: 3, bgcolor: '#F1EBDD' } }
        />

        { !isDone && (
          <Box key={ step } sx={ { animation: 'stw-pop .35s ease' } }>
            <Typography variant="body2" sx={ { color: 'text.secondary' } }>{ `Q${ step + 1 } / ${ questions.length }` }</Typography>
            <Typography variant="h3" component="h2" sx={ { color: 'primary.main', mt: 0.5, mb: 3, wordBreak: 'keep-all' } }>
              { questions[step].title }
            </Typography>
            <Box sx={ { display: 'flex', flexDirection: 'column', gap: 1.5 } }>
              { questions[step].options.map((option) => (
                <Button
                  key={ option.label }
                  onClick={ () => choose(option.value) }
                  variant="outlined"
                  sx={ {
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    p: 2,
                    borderRadius: 3,
                    borderColor: 'divider',
                    textAlign: 'left',
                    '&:hover': { borderColor: 'secondary.main', bgcolor: 'rgba(243,107,74,0.06)' },
                  } }
                >
                  <Box component="span" sx={ { fontSize: '1.0625rem', fontWeight: 700, color: 'primary.main' } }>{ option.label }</Box>
                  <Box component="span" sx={ { fontSize: '0.875rem', fontWeight: 400, color: 'text.secondary' } }>{ option.hint }</Box>
                </Button>
              )) }
            </Box>
            { step > 0 && (
              <Button onClick={ () => setStep(step - 1) } sx={ { mt: 2, px: 0 } }>← 이전 질문</Button>
            ) }
          </Box>
        ) }

        { isDone && best && (
          <Box sx={ { animation: 'stw-pop .45s ease' } }>
            <Typography variant="body2" sx={ { color: 'text.secondary' } }>당신에게 어울리는 한 잔은</Typography>
            <Box sx={ { display: 'flex', gap: 2.5, alignItems: 'center', mt: 2, flexDirection: { xs: 'column', sm: 'row' } } }>
              <Box sx={ { width: { xs: '100%', sm: 180 }, borderRadius: 4, overflow: 'hidden', flexShrink: 0 } }>
                <DrinkVisual drink={ best } ratio="1 / 1" />
              </Box>
              <Box>
                <Box sx={ { fontSize: '0.875rem', fontWeight: 600, color: 'secondary.main' } }>{ getCountry(best.countryId).name }</Box>
                <Typography variant="h3" component="h2" sx={ { color: 'primary.main' } }>{ best.name }</Typography>
                <Typography variant="body2" sx={ { mt: 1, color: 'text.secondary', wordBreak: 'keep-all' } }>{ best.tagline }</Typography>
                <Button variant="contained" color="secondary" onClick={ () => goToDrink(best.id) } sx={ { mt: 2 } }>
                  이 음료 탐험하기
                </Button>
              </Box>
            </Box>
            <Typography variant="body2" sx={ { mt: 3, mb: 1, color: 'text.secondary' } }>이런 음료도 잘 맞을 거예요</Typography>
            <Box sx={ { display: 'flex', gap: 1, flexWrap: 'wrap' } }>
              { others.map((drink) => (
                <Button key={ drink.id } variant="outlined" size="small" onClick={ () => goToDrink(drink.id) }>
                  { `${ getCountry(drink.countryId).name } · ${ drink.name }` }
                </Button>
              )) }
            </Box>
            <Button onClick={ reset } sx={ { mt: 3, px: 0 } }>↻ 다시 테스트하기</Button>
          </Box>
        ) }
      </Box>
    </Dialog>
  );
}

export default TasteQuizDialog;
