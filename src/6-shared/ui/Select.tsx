import React from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import * as COLOR from '@/src/6-shared/constants/colors'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  value: string
  onChange: (event: SelectChangeEvent) => void
  options: Option[]
}

// Styled для OutlinedInput с кастомизацией обводки
const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: COLOR.CREAM, // Обводка по умолчанию
    borderRadius: '12px',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#00ff4c', // Обводка при hover
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1976d2', // Обводка при фокусе
    borderWidth: 2,
  },
}))

// Styled для текста внутри Select
const StyledSelect = styled(MuiSelect)(({ theme }) => ({
  '& .MuiSelect-select': {
    color: '#ff0000', // Цвет текста
  },
}))

// Styled для выпадающего меню
const StyledMenu = styled('ul')(({ theme }) => ({
  backgroundColor: COLOR.YELLOW, // Цвет фона меню
  color: COLOR.WHITE, // Цвет текста
  borderRadius: '12px', // Закругленные углы меню
  padding: theme.spacing(1),
  marginTop: theme.spacing(1), // Расстояние между меню и селектом
  '& .MuiMenuItem-root': {
    '&:hover': {
      backgroundColor: COLOR.CREAM, // Цвет фона при ховере
    },
    '&.Mui-selected': {
      backgroundColor: 'red', // Цвет фона при выборе
      color: 'pink', // Цвет текста при выборе
      '&:hover': {
        backgroundColor: 'darkred', // Цвет фона при ховере на выбранном элементе
      },
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'blue', // Цвет фона при фокусе
      color: 'green', // Цвет текста при фокусе
    },
  },
}))

const Select: React.FC<SelectProps> = ({ value, onChange, options }) => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    // Приведение к типу string
    onChange(event as SelectChangeEvent<string>)
  }

  return (
    <Box sx={{ marginRight: '30px' }}>
      <FormControl variant="outlined">
        <StyledSelect
          value={value}
          onChange={handleChange}
          displayEmpty
          input={<StyledOutlinedInput />}
          MenuProps={{
            PaperProps: {
              component: StyledMenu, // Применяем стили через StyledMenu
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </Box>
  );
};

export default Select;
