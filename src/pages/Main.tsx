import { useEffect, useMemo, useState } from 'react';
import { useUserContext } from '@context/UserContext';
import { QueryClient, useQuery } from '@tanstack/react-query';
import WorkoutsService from '@services/WorkoutsService';
import { Workout } from '@models/Workout';
import { OptionType } from '@components/Select';
import Select from '@components/Select';
import ExerciseList from '@components/exercise-ui/ExerciseList';

const queryClient = new QueryClient();

export default function Main() {
  const { selectedUser } = useUserContext();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const {
    data: workouts,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [`user-workouts-${selectedUser?.id}`],
    queryFn: () => WorkoutsService.getWorkouts(selectedUser?.id || ''),
    enabled: false,
  });
  const workoutOptions = useMemo(
    () =>
      workouts?.map(({ name, id }) => ({
        label: name,
        value: id,
      })) || [],
    [workouts],
  );

  useEffect(() => {
    if (!selectedUser) return;
    setWorkout(null);
    queryClient.invalidateQueries({
      queryKey: [`user-workouts-${selectedUser?.id}`],
    });
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  function handleChangeWorkout(selectedOption: OptionType) {
    const selectedWorkout = workouts?.find(
      ({ id }) => id === selectedOption.value,
    );
    if (!selectedWorkout) return;
    setWorkout(selectedWorkout);
  }

  return (
    <div className="h-full w-full" style={{ minHeight: '100vh' }}>
      <header className="relative flex justify-center">
        <Select
          options={workoutOptions}
          isLoading={isLoading}
          onChange={handleChangeWorkout}
          required
        />
      </header>
      <main className="mt-8">
        {workout && <ExerciseList workoutId={workout?.id} key={workout?.id} />}
      </main>
    </div>
  );
}
