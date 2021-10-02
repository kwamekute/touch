import { useState } from 'react';
import moment from 'moment';
import {
  Box,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const FilterTable = ({ onhandlesearch }) => {
  return (
    <Box sx={{ m: 2 }}>
      <Typography sx={{ mb: 2 }} variant="h5">
        Search by any field NB: dates should be in the format DD/MM/YYYY (
        {moment().format('DD/MM/YYYY')})
      </Typography>
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
          placeholder="Quick Search"
          variant="outlined"
          onChange={onhandlesearch}
        />
      </Box>
    </Box>
  );
};

export default FilterTable;
