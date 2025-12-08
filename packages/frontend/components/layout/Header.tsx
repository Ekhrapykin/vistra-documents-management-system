import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Vistra Document Management System</Typography>
      </Toolbar>
    </AppBar>
  );
}

