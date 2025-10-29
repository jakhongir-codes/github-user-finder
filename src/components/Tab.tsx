import * as React from 'react';
import {Tab, Tabs, Box, CircularProgress} from '@mui/material';
import Repositories from './Repositories';
import UserProfile from './UserProfile';
import { useSelector } from 'react-redux';
import type { RootState } from '../stores/store';
import { ErrorMessage } from './ErrorMessage';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const appState = useSelector((state: RootState)=> state.app)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if(appState.loading) {
    
    return <Box
    sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
        p: 3, // 👈 adds padding all around
        gap: 1.5,
      }}
    >
      <CircularProgress/>
    </Box>
  }
  if(appState.error) {
    return <ErrorMessage message={appState.error}/>
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Repositories" {...a11yProps(1)} />
          <Tab label="About" {...a11yProps(0)} />
        </Tabs>
      </Box>
    
      <CustomTabPanel value={value} index={0}>
       <Repositories/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
       <UserProfile />
      </CustomTabPanel>
    </Box>
  );
}
