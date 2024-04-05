import {
  Box,
  CircularProgress,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';

export type OptionType = {
  value: string;
  label: string;
};

interface SelectProps {
  options: OptionType[];
  isLoading?: boolean;
  defaultOption?: OptionType | null;
  onChange?: (option: OptionType) => void;
}

export default function Select({
  options,
  onChange,
  isLoading = false,
  defaultOption = null,
}: SelectProps) {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(
    defaultOption,
  );

  function handleChangeOption(event: SelectChangeEvent) {
    const selected = options?.find(({ value }) => value === event.target.value);
    if (!selected) return;
    setSelectedOption(selected);
    onChange?.(selected);
  }

  if (isLoading || !options.length) {
    return (
      <Box className="flex h-12 min-w-40 items-center justify-center rounded-lg border border-solid border-[#AFB1B2] text-white">
        <CircularProgress size={20} />
      </Box>
    );
  }

  return (
    <MuiSelect
      value={selectedOption?.value}
      onChange={handleChangeOption}
      disabled={isLoading}
      variant="standard"
      disableUnderline
      className="h-12 min-w-40 rounded-lg border border-solid px-4 py-2 text-center text-white"
      sx={{
        borderColor: '#AFB1B2',
        '.MuiSvgIcon-root': {
          fill: '#AFB1B2 !important',
        },
      }}
      MenuProps={{
        slotProps: {
          paper: {
            className: 'bg-[#11161B] mt-1',
          },
        },
        MenuListProps: {
          className: 'bg-[#11161B] p-0',
        },
      }}
    >
      {options?.map((option) => (
        <MenuItem
          value={option.value}
          key={option.value}
          className="py-3 text-[#AFB1B2]"
        >
          {option.label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
}
