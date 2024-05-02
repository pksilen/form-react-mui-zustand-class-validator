import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import classNames from './App.module.scss';
import UserList from './views/userlist/UserList';
import UserRegistration from './views/userregistration/UserRegistration';

const theme = createTheme({
  palette: {
    mode: 'dark'
  },
  typography: {
    body1: {
      fontSize: '16px',
      fontWeight: 300
    },
    fontFamily: ['Neue Haas Grotesk Text', 'sans-serif'].join(','),
    h2: {
      fontWeight: 500,
      letterSpacing: '-0.25rem'
    }
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className={classNames.container}>
        <UserRegistration />
        <div className={classNames.verticalDivider}></div>
        <UserList />
      </main>
    </ThemeProvider>
  );
}
