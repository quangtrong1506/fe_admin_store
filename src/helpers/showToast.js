import { toast } from 'react-toastify';
export const showToast = ({ message, position, type, time }) => {
    if (type)
        toast[type](message, {
            position: position || 'top-center',
            autoClose: time || 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: 'light',
        });
    else
        toast(message, {
            position: position || 'top-center',
            autoClose: time || 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: 'light',
        });
};
