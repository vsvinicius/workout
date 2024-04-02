import { useEffect, useState } from 'react';
import UsersAvatar from '@components/UsersAvatar';
import { useUserContext } from '@context/UserContext';
import { useQuery } from '@tanstack/react-query';
import WorkoutsService from '@services/WorkoutsService';
import { Workout } from '@models/Workout';
import { plainToInstance } from 'class-transformer';
import { OptionType } from '@components/Select';
import Select from '@components/Select';
import ExerciseList from '@components/ExerciseList';

export default function Main() {
  const { selectedUser } = useUserContext();
  const {
    data: workouts,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [`user-workouts-${selectedUser?.id}`],
    queryFn: () => WorkoutsService.getWorkouts(selectedUser?.id || ''),
    enabled: false,
  });

  useEffect(() => {
    if (!selectedUser) return;
    refetch();
  }, [selectedUser]);

  const [workout, setWorkout] = useState<Workout | null>(() => {
    const value = localStorage.getItem('workoutType');
    if (!value) return null;
    return plainToInstance(Workout, JSON.parse(value) as Workout);
  });

  function handleChangeWorkout(selectedOption: OptionType) {
    const selectedWorkout = workouts?.find(
      ({ id }) => id === selectedOption.value,
    );
    if (!selectedWorkout) return;
    setWorkout(selectedWorkout);
    localStorage.setItem('workoutType', JSON.stringify(selectedWorkout));
  }

  return (
    <div className="h-full w-full bg-[#1C1C1E]" style={{ minHeight: '100vh' }}>
      <header className="relative flex justify-center pt-10">
        <Select
          options={
            workouts?.map(({ name, id }) => ({
              label: name,
              value: id,
            })) || []
          }
          isLoading={isLoading}
          onChange={handleChangeWorkout}
          defaultOption={
            workout ? { label: workout?.name, value: workout?.id } : null
          }
        />
        <div className="absolute right-5">
          <UsersAvatar />
        </div>
      </header>
      <main className="mt-8">
        {workout && <ExerciseList workoutId={workout?.id} key={workout?.id} />}
      </main>
    </div>
  );
}
