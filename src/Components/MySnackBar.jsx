import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MySnackBar({open, message}) {

  
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open} autoHideDuration={6000} >
        <Alert severity="success" sx={{ width: '100%'}} style={{fontSize:"16px",fontFamily:" 'Marhey', sans-serif "}}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
