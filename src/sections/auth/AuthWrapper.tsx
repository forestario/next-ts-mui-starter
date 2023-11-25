import { ReactNode } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';

// project import
import AuthCard from './AuthCard';

interface Props {
  children: ReactNode;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }: Props) => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.grey[200] }}>
      <Grid
        container
        sx={{
          minHeight: '100vh',
        }}
      >
        <Grid item xs={12} container justifyContent="center" alignItems="center">
          <AuthCard>{children}</AuthCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthWrapper;
