// next
import Head from 'next/head';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import { useAuthContext } from '@/auth/useAuthContext';
import AuthWrapper from '@/sections/auth/AuthWrapper';
import AuthLogin from '@/sections/auth/AuthLogin';

export default function LoginPage() {
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <Head>
        <title>Login | Case Review System</title>
      </Head>

      <AuthWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              sx={{ mb: { xs: -0.5, sm: 0.5 } }}
            >
              <Typography variant="h3">Login</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <AuthLogin />
          </Grid>
        </Grid>
      </AuthWrapper>
    </>
  );
}
