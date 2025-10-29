import { Box, Toolbar, Button } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { githubClient } from '../../api/index';
import { setRepositories, setUser, setError, setLoading } from '../../stores/features';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: '1rem',
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');

  const [submittedSearchTerm, setSubmitedSearchTerm] = useState('');

  const dispatch = useDispatch();

  const fetchUsers = async () => {
    if (!searchTerm.trim()) {
      return;
    }

    try {
      dispatch(setLoading());
      const user = await githubClient.get(`${searchTerm}`);

      const repositories = await githubClient.get(`${searchTerm.toLowerCase()}/repos`);

      dispatch(setRepositories(repositories.data));
      dispatch(setUser(user.data));
    } catch (error: any) {
      dispatch(setError(error?.response?.data?.message || 'Something went wrong'));
    } finally {
      dispatch(setLoading());
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm === submittedSearchTerm) {
      return;
    }
    setSubmitedSearchTerm(searchTerm);
    fetchUsers();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Search>
            <StyledInputBase
              placeholder="Search GitHub user…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: 'white',
              color: 'black',
              '&:hover': { backgroundColor: '#f0f0f0' },
            }}
          >
            Search
          </Button>
        </Box>
      </Toolbar>
    </Box>
  );
}
