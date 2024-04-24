import { Box, TextField, MenuItem } from '@mui/material';
import Button from '@components/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAlertContext } from '@context/AlertContext';
import PersonalRecordsService from '@services/PersonalRecordsService';
import { useState } from 'react';
import { PersonalRecord } from '@models/PersonalRecord';

const weightUnitOptions = [
  { label: 'Quilos (kg)', value: 'kg' },
  { label: 'Placas (un)', value: 'un' },
];

interface PersonalRecordFormProps {
  lastPersonalRecord: PersonalRecord | null;
  exerciseId: string;
  onUpdateEnd: () => void;
}

export default function PersonalRecordForm({
  lastPersonalRecord,
  exerciseId,
  onUpdateEnd,
}: PersonalRecordFormProps) {
  const { showSuccessMessage, showErrorMessage } = useAlertContext();
  const { mutateAsync: createPersonalRecord, isPending: isCreating } =
    useMutation({
      mutationFn: PersonalRecordsService.create.bind(PersonalRecordsService),
      onSuccess: () => showSuccessMessage('Novo recorde pessoal adicionado'),
      onError: () => showErrorMessage('Ocorreu um erro, tente novamente'),
      onSettled: onUpdateEnd,
    });

  const { mutateAsync: updatePersonalRecord, isPending: isUpdating } =
    useMutation({
      mutationFn: PersonalRecordsService.update.bind(PersonalRecordsService),
      onSuccess: () => showSuccessMessage('Recorde pessoal atualizado'),
      onError: () => showErrorMessage('Ocorreu um erro, tente novamente'),
      onSettled: onUpdateEnd,
    });

  const [unit, setUnit] = useState(lastPersonalRecord?.unit || '');
  const [weight, setWeight] = useState(lastPersonalRecord?.weight || '');
  const shouldDisableSaveButton =
    !weight ||
    !unit ||
    (weight === lastPersonalRecord?.weight &&
      unit === lastPersonalRecord?.unit);

  function handleChangeWeight(e: React.ChangeEvent<HTMLInputElement>) {
    setWeight(e.target.value);
  }

  function handleChangeUnit(e: React.ChangeEvent<HTMLInputElement>) {
    setUnit(e.target.value);
  }

  async function handleSavePersonalRecord() {
    if (weight !== lastPersonalRecord?.weight) {
      return createPersonalRecord({
        exerciseId,
        unit,
        weight,
      });
    }
    return updatePersonalRecord({
      id: lastPersonalRecord!.id,
      unit,
    });
  }

  return (
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
        disabled={shouldDisableSaveButton}
        isLoading={isCreating || isUpdating}
      >
        Salvar
      </Button>
    </Box>
  );
}
