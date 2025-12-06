'use client';

import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DocumentsSearchProps from "./Search.props";

export default function Search({ value, onChange, placeholder = 'Search' }: DocumentsSearchProps) {
  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full max-w-md"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size="small" edge="end">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      // sx={{
      //   '& .MuiOutlinedInput-root': {
      //     borderRadius: '8px',
      //   },
      // }}
    />
  );
}

