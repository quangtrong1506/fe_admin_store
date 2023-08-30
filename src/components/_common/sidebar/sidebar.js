import { memo, useEffect } from 'react';
import {
    FaCartShopping,
    FaCity,
    FaFlask,
    FaFolderTree,
    FaNewspaper,
    FaTachographDigital,
    FaUser,
} from 'react-icons/fa6';
import { Link, useSearchParams } from 'react-router-dom';
const Header = () => {
    const searchParams = useSearchParams();
    const handleClick = (e) => {
        e.preventDefault();
        const sidebar = document.querySelector('.app-sidebar');
        const overlay = document.querySelector('.app-sidebar-overlay');
        const left = sidebar.offsetLeft;
        if (left === 0) {
            sidebar.style.left = '-250px';
            overlay.style.display = 'none';
        } else {
            sidebar.style.left = '0px';
            overlay.style.display = 'block';
        }
    };
    useEffect(() => {
        setActive();
        function resize() {
            const w = this.window.innerWidth;
            const sidebar = document.querySelector('.app-sidebar');
            const overlay = document.querySelector('.app-sidebar-overlay');
            if (w < 768) {
                sidebar.style.left = '-250px';
                overlay.style.display = 'none';
            } else sidebar.style.left = '0px';
        }
        window.addEventListener('resize', resize, true);
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);
    useEffect(() => {
        setActive();
    }, [searchParams]);
    function setActive() {
        var lists = document.querySelectorAll('ul.app-menu li a');
        lists.forEach((elmt) => {
            elmt.classList.remove('active');
            if (elmt.href === window.location.pathname)
                elmt.classList.add('active');
        });
    }
    return (
        <>
            <aside className="app-sidebar">
                <div className="app-sidebar__user">
                    <img
                        className="app-sidebar__user-avatar"
                        src="https://i.ibb.co/3ByWSCH/5c751961ebe106bf5ff0.jpg"
                        width="50px"
                        alt="..."
                    />
                    <div>
                        <p className="app-sidebar__user-name">
                            <b>Trọng sa đoạ</b>
                        </p>
                        <p className="app-sidebar__user-designation">
                            Chức vụ: Quản trị viên
                        </p>
                    </div>
                </div>
                <hr />
                <ul className="app-menu">
                    <li>
                        <Link className="app-menu__item" to="/">
                            <FaTachographDigital className="app-menu__icon bx" />
                            <span className="app-menu__label">
                                Bảng điều khiển
                            </span>
                        </Link>
                    </li>
                    {/* <li>
                        <Link className="app-menu__item" to="/employee-manager">
                            <FaUsers className="app-menu__icon bx" />
                            <span className="app-menu__label">
                                Quản lý nhân viên
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="app-menu__item"
                            to="/admin/quan-ly-doanh-thu"
                        >
                            <FaMoneyCheckDollar className="app-menu__icon bx" />
                            <span className="app-menu__label">
                                Quản lý doanh thu
                            </span>
                        </Link>
                    </li>
                    <li>
                        <a className="app-menu__item" href="/admin/thong-ke">
                            <FaChartBar className="app-menu__icon bx" />
                            <span className="app-menu__label">Thống kê</span>
                        </a>
                    </li> */}
                    <li>
                        <Link className="app-menu__item" to="/users">
                            <FaUser className="app-menu__icon bx" />
                            <span className="app-menu__label">
                                Quản lý khách hàng
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" to="/products">
                            <FaFlask className="app-menu__icon bx" />
                            <span className="app-menu__label">
                                Quản lý sản phẩm
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" to="/orders">
                            <FaCartShopping className="app-menu__icon bx" />
                            <span className="app-menu__label">
                                Quản lý đơn hàng
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="app-menu__item"
                            to="/admin/quan-ly-nha-cung-cap"
                        >
                            <FaCity className="app-menu__icon bx" />
                            <span className="app-menu__label">
                                Quản lý nhà cung cấp
                            </span>
                        </Link>
                    </li>
                    <li>
                        <a
                            className="app-menu__item"
                            href="/admin/quan-ly-danh-muc"
                        >
                            <FaFolderTree className="app-menu__icon bx" />
                            <span className="app-menu__label">
                                Quản lý danh mục
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            className="app-menu__item"
                            href="/admin/quan-ly-bai-viet"
                        >
                            <FaNewspaper className="app-menu__icon bx" />
                            <span className="app-menu__label">
                                Quản lý bài viết
                            </span>
                        </a>
                    </li>
                </ul>
            </aside>
            <div className="app-sidebar-overlay" onClick={handleClick}></div>
        </>
    );
};
export default memo(Header);
