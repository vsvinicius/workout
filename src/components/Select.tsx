import {
  Box,
  CircularProgress,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';

export type OptionType = {
  value: string;
  label: string;
};

interface SelectProps {
  options: OptionType[];
  isLoading?: boolean;
  defaultOption?: OptionType | null;
  onChange?: (option: OptionType) => void;
  required?: boolean;
}

export default function Select({
  options,
  onChange,
  isLoading = false,
  required = false,
  defaultOption = null,
}: SelectProps) {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(
    defaultOption,
  );

  useEffect(() => {
    setSelectedOption(null);
  }, [options]);

  useEffect(() => {
    if (required && selectedOption === null && options.length !== 0) {
      setSelectedOption(defaultOption || options[0]);
      onChange?.(defaultOption || options[0]);
    }
  }, [defaultOption, options, isLoading]);

  function handleChangeOption(event: SelectChangeEvent) {
    const selected = options?.find(({ value }) => value === event.target.value);
    if (!selected) return;
    setSelectedOption(selected);
    onChange?.(selected);
  }

  if (isLoading || !options.length) {
    return (
      <Box className="border-paper-light flex h-12 min-w-40 items-center justify-center rounded-lg border border-solid text-white">
        <CircularProgress size={20} />
      </Box>
    );
  }

  return (
    <MuiSelect
      value={selectedOption?.value ?? ''}
      onChange={handleChangeOption}
      disabled={isLoading}
      variant="standard"
      disableUnderline
      className="h-12 min-w-40 rounded-lg border border-solid px-4 py-2 text-center text-white"
      sx={{
        borderColor: '#AFB1B2',
        '.MuiSvgIcon-root': {
          fill: '#F8F8FF !important',
        },
      }}
      MenuProps={{
        slotProps: {
          paper: {
            className: 'mt-1',
          },
        },
        MenuListProps: {
          className: 'p-0',
        },
      }}
    >
      {options?.map((option) => (
        <MenuItem
          value={option.value}
          key={option.value}
          className="py-3 text-black"
        >
          {option.label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
}
