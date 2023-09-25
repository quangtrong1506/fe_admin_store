import axios from 'axios';
const STATUS_SUCCESS = [200, 201];
const STATUS_INTERNAL_SERVER_ERROR = 500;

const provinceAxios = axios.create({
    baseURL: 'https://provinces.open-api.vn/',
});
provinceAxios.interceptors.response.use(
    (response) => {
        const statusCode = response.status;
        if (STATUS_SUCCESS.includes(statusCode)) {
            return {
                success: true,
                data: response.data,
                time_current: response.data.now,
            };
        }

        return {
            success: false,
            data: [],
        };
    },
    (error) => {
        if (error.response) {
            const response = error.response;
            return {
                success: false,
                status: response.status,
                message: response.data.message,
                errors: response.data.errors,
            };
        }

        if (error.request) {
            return {
                success: false,
                status: STATUS_INTERNAL_SERVER_ERROR,
                message: error.statusText,
                errors: error,
            };
        }

        return {
            success: false,
            status: STATUS_INTERNAL_SERVER_ERROR,
            message: error,
        };
    }
);

export default provinceAxios;
