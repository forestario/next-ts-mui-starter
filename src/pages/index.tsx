// material-ui
import { Stack, Typography } from '@mui/material';

// project-import
import Layout from '@/components/layout';

export default function IndexPage() {
  return (
    <Layout title="Home | Next, TypeScript Starter">
      <Stack alignItems="center" justifyContent="center" height="100vh">
        <Typography>Hi 👋, Next, TypeScript Starter</Typography>
      </Stack>
    </Layout>
  );
}
