import { useState } from 'react';
import { Exercise } from '@models/Exercise';
import {
  ArrowDropDownOutlined,
  AutoAwesomeMotionOutlined,
  CachedOutlined,
  FitnessCenterOutlined,
} from '@mui/icons-material';
import { Card, Box, Typography, IconButton, Collapse } from '@mui/material';
import cn from '@lib/classnames';
import Button from '@components/Button';
import { useQueryClient } from '@tanstack/react-query';
import PersonalRecordForm from './PersonalRecordForm';

export default function ExerciseItem({ exercise }: { exercise: Exercise }) {
  const queryClient = useQueryClient();
  const [currentSet, setCurrentSet] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(false);

  function handleClickNextSet() {
    setCurrentSet((prevValue) => Math.min(prevValue + 1, exercise.sets));
  }

  function handleResetExercise() {
    if (currentSet === exercise.sets) setCurrentSet(0);
    else handleClickNextSet();
  }

  async function handleAfterUpdate() {
    await queryClient.refetchQueries({
      queryKey: [`workout-exercises-${exercise.workoutId}`],
    });
    setTimeout(() => {
      setIsExpanded(false);
    }, 500);
  }

  return (
    <Card
      elevation={10}
      className={cn(
        'my-3 h-fit min-h-32 w-[96%] border border-solid border-white-light bg-background-light px-4 py-8',
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
          className="relative left-3 p-0"
          onClick={() => setIsExpanded((prevState) => !prevState)}
        >
          <ArrowDropDownOutlined
            className={cn(
              'h-9 w-10 text-white transition-transform duration-500',
              {
                'rotate-180': isExpanded,
              },
            )}
          />
        </IconButton>
      </Box>
      <Collapse in={isExpanded} timeout={500}>
        <PersonalRecordForm
          exerciseId={exercise.id}
          lastPersonalRecord={exercise.lastPersonalRecord}
          onUpdateEnd={handleAfterUpdate}
        />
      </Collapse>
    </Card>
  );
}
