import { useCookies } from 'react-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import '../../assets/scss/index.scss';
export default function AuthLayout() {
    let navigate = useNavigate();
    const [cookies] = useCookies();

    useEffect(() => {
        if (cookies.admin_token) {
            navigate('/');
        }
    }, []);

    return (
        <>
            <div
                className={
                    'container-fluid row login-page justify-content-center align-items-center'
                }
            >
                <div className="card login-content p-0 bg-light">
                    <div className="card-body">
                        <div className={'text-center'}>
                            <img
                                src="https://i.ibb.co/qrTSzF1/istockphoto-1192884194-612x612.jpg"
                                alt="AdminLTE Logo"
                                className="brand-image image-circle elevation-3"
                            />
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ width: '400px' }}
            />
        </>
    );
}
