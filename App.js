import { CssBaseline, Container, Typography } from '@mui/material';
import Calendar from './components/Calendar';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          MERN Calendar
        </Typography>
        <Calendar />
      </Container>
    </>
  );
}

export default App;
