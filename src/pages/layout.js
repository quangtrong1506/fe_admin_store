import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authApis from '../api/baseAdmin/auth';
import brandApis from '../api/baseAdmin/brand';
import categoryApis from '../api/baseAdmin/category';
import '../assets/css/more.css';
import '../assets/css/style.css';
import Header from '../components/_common/header/header';
import Sidebar from '../components/_common/sidebar/sidebar';
import { createAuthUser } from '../features/auth/authSlice';
import { setBrand } from '../features/brand/brandSlice';
import { setCategory } from '../features/category/categorySlice';
import { scrollToTop } from '../helpers/common';
import { showToast } from '../helpers/showToast';
import socketio from '../plugins/socketio';
export default function Layout() {
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['admin_token']);
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();
    function time() {
        var today = new Date();
        var weekday = new Array(7);
        weekday[0] = 'Chủ Nhật';
        weekday[1] = 'Thứ Hai';
        weekday[2] = 'Thứ Ba';
        weekday[3] = 'Thứ Tư';
        weekday[4] = 'Thứ Năm';
        weekday[5] = 'Thứ Sáu';
        weekday[6] = 'Thứ Bảy';
        var day = weekday[today.getDay()];
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        let nowTime = h + ' giờ ' + m + ' phút ' + s + ' giây';
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = day + ', ' + dd + '/' + mm + '/' + yyyy;
        let tmp = '<span class="date"> ' + today + ' - ' + nowTime + '</span>';
        if (document.getElementById('clock'))
            document.getElementById('clock').innerHTML = tmp;
        function checkTime(i) {
            if (i < 10) {
                i = '0' + i;
            }
            return i;
        }
    }
    useEffect(() => {
        if (!cookies.admin_token) {
            navigate('/login');
        }
        setInterval(time, 1000);
        (async () => {
            const resCats = await categoryApis.index();
            if (resCats.success) dispatch(setCategory(resCats.data));
            else
                showToast({
                    message:
                        'Không thể load danh mục vui lòng reload lại trang',
                });
            const resBrand = await brandApis.index();
            if (resBrand.success) dispatch(setBrand(resBrand.data));
            else
                showToast({
                    message:
                        'Không thể load hãng sản phẩm vui lòng reload lại trang',
                });
            // Thông tin đã đăng nhập
            const adminInfo = await authApis.myInfo();
            dispatch(createAuthUser(adminInfo.data));
        })();

        const newSocket = socketio('admin');
        setSocket(newSocket);
    }, []);
    const navigation = useSelector((state) => state.navigation);
    const location = useLocation();
    useEffect(() => {
        scrollToTop();
    }, [location]);
    useEffect(() => {
        document.title = navigation[navigation.length - 1]?.title;
    }, [navigation]);
    useEffect(() => {
        if (socket === null) return;
        socket.on('get-notification', (data) => {
            console.log(data);
            if (data.type === 1 && window.location.pathname === '/chat') return;
            let link = '/';
            if (data.type === 1) link = '/chat';
            if (data.type === 2) link = '/orders';
            toast.info(
                <div className="custom-toast-message">
                    <h6>{data.title}</h6>
                    <span className="content">{data.body}</span>
                    <br />
                    <Link to={link}>Xem chi tiết</Link>
                </div>
            );
        });
        return () => {
            socket.off('get-notification');
        };
    }, [socket]);
    const BreadcrumbItem = () => {
        if (navigation) {
            return navigation.map((element, index) => {
                return (
                    <span key={index}>
                        <Link to={element.url}>
                            <span>{element.title}</span>
                        </Link>
                        {index !== navigation.length - 1 && <span> / </span>}
                    </span>
                );
            });
        }
        return <></>;
    };
    return (
        <>
            <Header />
            <Sidebar />
            <main className="app-content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="app-title">
                            <ul className="app-breadcrumb breadcrumb">
                                <li className="breadcrumb-item">
                                    <BreadcrumbItem />
                                </li>
                            </ul>
                            <div id="clock"></div>
                        </div>
                    </div>
                </div>
                <Outlet />
            </main>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}
