import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import Page from '../components/Page';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}));

export default function Page404() {
  return (
    <Page title="404 Page Not Found">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Sorry, page not found or You don't have the access!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL or you don't have the permission to view? Be
            sure to check your spelling. If you have access to page please login again
          </Typography>
          <br/>
          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Login
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
