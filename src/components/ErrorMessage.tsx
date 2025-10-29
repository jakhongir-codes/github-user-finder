import { Alert, Stack } from '@mui/material';
import { useState } from 'react';

export function ErrorMessage({ message }: { message: string }) {
  const [open, setOpen] = useState(true);

  if (!open) return null;
  return (
    <Stack sx={{m: 4 }} spacing={2}>
      <Alert severity="error" onClose={()=> setOpen(false)} variant="filled">
        {message || 'An unexpected error occurred.'}
      </Alert>
    </Stack>
  );
}
