import moment from 'moment';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import authApis from '../../api/baseAdmin/auth';
import { showToast } from '../../helpers/showToast';

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    let navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['admin_token']);
    const login = async (data) => {
        console.log(data);
        const loginResponse = await authApis.login(data);
        console.log(loginResponse);
        if (loginResponse.success) {
            setCookie('admin_token', loginResponse.data.token, {
                path: '/',
                expires: moment().add(1, 'months').toDate(),
            });
            navigate('/');
            return;
        }
        showToast({ message: loginResponse.message, type: 'error' });
    };

    return (
        <>
            <form className={'pb-3'} onSubmit={handleSubmit(login)}>
                <div className="mb-3">
                    <label htmlFor="inputPhone" className="form-label">
                        Email
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputPhone"
                        {...register('email', {
                            required: 'Email không được để trống',
                        })}
                    />
                    {errors.email && (
                        <p className={'text-danger fw-bold'}>
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        {...register('password', {
                            required: 'Mật khẩu không được để trống',
                        })}
                    />
                    {errors.password && (
                        <p className={'text-danger fw-bold'}>
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div className={'text-center'}>
                    <button type="submit" className="btn btn-primary">
                        Đăng nhập
                    </button>
                </div>
            </form>
        </>
    );
}
