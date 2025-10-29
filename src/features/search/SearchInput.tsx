import { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { setRepositories, setUser, setError, setLoading } from '../../stores/features';
import { useDispatch } from 'react-redux';
import { githubClient } from '../../api/index';
import { debounce } from '../../utils/debounce';

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

const SEARCH_DELAY_MILLISECONDS = 250;

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearchGithubUsername = debounce((value: string) => {
    setSearchTerm(value);

    fetchUsers();
  }, SEARCH_DELAY_MILLISECONDS);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchGithubUsername(event.target.value);
  };

  const fetchUsers = async () => {
    try {
      if (!searchTerm.length) {
        return;
      }
      dispatch(setLoading());
      const user = await githubClient.get(`${searchTerm}`);
      const repositories = await githubClient.get(`${searchTerm.toLowerCase()}/repos`);
      dispatch(setRepositories(repositories.data));
      dispatch(setUser(user.data));
    } catch (error: any) {
      dispatch(setError(error?.response?.data.message));
    } finally {
      dispatch(setLoading());
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Box
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
              onChange={handleChange}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Box>
      </Toolbar>
    </Box>
  );
}
