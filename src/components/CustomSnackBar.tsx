import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { styled } from '@mui/system';

const Alert = styled(MuiAlert)<AlertProps>(() => ({
}));

interface SnackbarDetails {
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
}

interface CustomSnackbarProps {
    snackbarDetails: SnackbarDetails;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ snackbarDetails, setOpen, open }) => {
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setOpen(false);
    };

    return (
        <Snackbar open={open}  autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity={snackbarDetails.severity} sx={{ width: '100%' }}>
                {snackbarDetails.message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;
