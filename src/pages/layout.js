import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import '../assets/css/more.css';
import '../assets/css/style.css';
import Header from '../components/_common/header/header';
import Sidebar from '../components/_common/sidebar/sidebar';

export default function Layout() {
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
        setInterval(time, 1000);
    }, []);
    const navigation = useSelector((state) => state.navigation);
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
        </>
    );
}
