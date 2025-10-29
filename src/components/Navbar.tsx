import { Box, AppBar, Toolbar, IconButton} from '@mui/material'
import SearchInput from '../features/search/SearchInput'
import { useContext } from 'react'
import { ColorModeContext } from '../context/ThemeProvider'
import { DarkMode, LightMode } from '@mui/icons-material'

export default function Navbar() {
  const {toggleColorMode, mode} = useContext(ColorModeContext)
  return (
   <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",  
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              width: "100%",
              maxWidth: 400,
            }}
          >
            <SearchInput />
          </Box>

          <IconButton
            color="inherit"
            onClick={toggleColorMode}
            sx={{ ml: 2 }}
            aria-label="toggle theme"
          >
            {mode === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
