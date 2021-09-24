import { useState } from 'react';
import { Box, TextField, InputAdornment, SvgIcon } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const FilterTable = ({ onhandlesearch }) => {
  return (
    <Box sx={{ m: 2 }}>
      <Box sx={{ maxWidth: 500 }}>
        <TextField
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon fontSize="small" color="action">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          placeholder="Search here"
          variant="outlined"
          onChange={onhandlesearch}
        />
      </Box>
    </Box>
  );
};

export default FilterTable;
