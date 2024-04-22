import { useState } from 'react';
import { Exercise } from '@models/Exercise';
import {
  ArrowDropDownOutlined,
  AutoAwesomeMotionOutlined,
  CachedOutlined,
  FitnessCenterOutlined,
} from '@mui/icons-material';
import {
  Card,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Collapse,
  Alert,
} from '@mui/material';
import cn from '@lib/classnames';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PersonalRecordsService from '@services/PersonalRecordsService';

const weightUnitOptions = [
  { label: 'Quilos (kg)', value: 'kg' },
  { label: 'Placas (un)', value: 'un' },
];

export default function ExerciseItem({ exercise }: { exercise: Exercise }) {
  const [currentSet, setCurrentSet] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const queryClient = useQueryClient();
  const [weight, setWeight] = useState(
    exercise.lastPersonalRecord?.weight || '',
  );
  const [unit, setUnit] = useState(exercise.lastPersonalRecord?.unit || '');
  const [responseMessage, setResponseMessage] = useState<string>();

  const { mutateAsync: createPersonalRecord } = useMutation({
    mutationFn: PersonalRecordsService.create.bind(PersonalRecordsService),
  });
  const { mutateAsync: updatePersonalRecord } = useMutation({
    mutationFn: PersonalRecordsService.update.bind(PersonalRecordsService),
  });

  function handleClickNextSet() {
    setCurrentSet((prevValue) => Math.min(prevValue + 1, exercise.sets));
  }

  function handleResetExercise() {
    if (currentSet === exercise.sets) setCurrentSet(0);
    else handleClickNextSet();
  }

  function handleChangeWeight(e: React.ChangeEvent<HTMLInputElement>) {
    setWeight(e.target.value);
  }

  function handleChangeUnit(e: React.ChangeEvent<HTMLInputElement>) {
    setUnit(e.target.value);
  }
  function setAutoHideResponseMessage(message: string) {
    setResponseMessage(message);
    setTimeout(() => {
      setResponseMessage(undefined);
    }, 1000);
  }

  async function handleSavePersonalRecord() {
    try {
      if (weight !== exercise.lastPersonalRecord?.weight) {
        await createPersonalRecord({
          exerciseId: exercise.id,
          unit,
          weight,
        });
        setAutoHideResponseMessage(
          'Novo recorde pessoal adicionado com sucesso!',
        );
      } else {
        await updatePersonalRecord({
          id: exercise.lastPersonalRecord!.id,
          unit,
        });
        setAutoHideResponseMessage('Recorde pessoal atualizado!');
      }
      await queryClient.refetchQueries({
        queryKey: [`workout-exercises-${exercise.workoutId}`],
      });
    } catch {
      setAutoHideResponseMessage('Erro ao salvar, tente novamente mais tarde');
    }
  }

  return (
    <>
      <Card
        elevation={10}
        className={cn(
          'my-3 h-fit min-h-32 w-[96%] border border-solid border-white-light bg-background-light px-6 py-8',
        )}
        sx={{
          transition: 'min-height 0.3s linear',
          ...(currentSet === exercise.sets && {
            outline: '2px solid #5cb85c',
            boxShadow:
              '2px 2px 5px rgba(24,197,94,0.25), -2px -2px 5px rgba(24,197,94,0.25)',
          }),
        }}
      >
        <Box className="flex w-full items-center justify-around">
          <Box
            className="flex h-full w-full flex-col items-start justify-center text-white"
            onClick={handleResetExercise}
          >
            <Typography className="text-lg font-semibold">
              {exercise.name}
            </Typography>
            <Box className="mt-2 flex gap-2">
              <Box className="flex items-center gap-1">
                <AutoAwesomeMotionOutlined className="w-5" />
                <Typography variant="subtitle1">{exercise.sets}</Typography>
              </Box>
              <Box className="flex items-center gap-1">
                <CachedOutlined className="w-5 text-white" />
                <Typography variant="subtitle1">{exercise.reps}</Typography>
              </Box>
              {exercise.lastPersonalRecord && (
                <Box className="flex items-center gap-1">
                  <FitnessCenterOutlined className="w-5 -rotate-45 text-white" />
                  <Typography variant="subtitle1">{`${exercise.lastPersonalRecord.weight} ${exercise.lastPersonalRecord.unit}`}</Typography>
                </Box>
              )}
            </Box>
          </Box>
          <Button
            variant="contained"
            className="h-16 w-28 text-lg"
            onClick={handleClickNextSet}
            disabled={currentSet === exercise.sets}
          >{`${currentSet}/${exercise.sets}`}</Button>
          <IconButton
            className="relative left-3"
            onClick={() => setIsExpanded((prevState) => !prevState)}
          >
            <ArrowDropDownOutlined
              className={cn('h-9 w-10 text-white', {
                'rotate-180': isExpanded,
              })}
            />
          </IconButton>
        </Box>
        <Collapse in={isExpanded}>
          <Box className="flex flex-col items-center gap-5 pt-4">
            <div className="flex gap-3 px-4">
              <TextField
                label="Peso utilizado"
                type="number"
                variant="standard"
                InputProps={{ className: 'text-white' }}
                value={weight}
                onChange={handleChangeWeight}
              />
              <TextField
                label="Unidade"
                variant="standard"
                select
                className="w-28"
                value={unit}
                onChange={handleChangeUnit}
                InputProps={{
                  className: 'text-white',
                  sx: {
                    '.MuiSvgIcon-root': {
                      fill: '#F8F8FF !important',
                    },
                  },
                }}
              >
                {weightUnitOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <Button
              variant="contained"
              className="h-10 w-28 capitalize"
              onClick={handleSavePersonalRecord}
              disabled={
                weight === exercise.lastPersonalRecord?.weight &&
                unit === exercise.lastPersonalRecord.unit
              }
            >
              Salvar
            </Button>
          </Box>
        </Collapse>
      </Card>
      {responseMessage && (
        <Alert
          severity={responseMessage.includes('erro') ? 'error' : 'success'}
          variant="filled"
        >
          {responseMessage}
        </Alert>
      )}
    </>
  );
}
