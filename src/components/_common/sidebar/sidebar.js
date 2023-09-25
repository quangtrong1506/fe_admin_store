import { memo, useEffect } from 'react';
import { FaComments } from 'react-icons/fa';
import {
    FaCartShopping,
    FaCity,
    FaFlask,
    FaFolderTree,
    FaNewspaper,
    FaTachographDigital,
    FaUser,
} from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { getOffice } from '../../../helpers/common';
const Sidebar = () => {
    const searchParams = useSearchParams();
    const user = useSelector((state) => state.auth.user);
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
                        src={user?.avatar}
                        width="50px"
                        alt="..."
                    />
                    <div>
                        <p className="app-sidebar__user-name">
                            <b>{user?.name}</b>
                        </p>
                        <p className="app-sidebar__user-designation">
                            Chức vụ: {getOffice(user?.role)}
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
                        <Link className="app-menu__item" to="/brand">
                            <FaCity className="app-menu__icon bx" />
                            <span className="app-menu__label">
                                Quản lý nhãn hàng
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link className="app-menu__item" to="/category">
                            <FaFolderTree className="app-menu__icon bx" />
                            <span className="app-menu__label">
                                Quản lý danh mục
                            </span>
                        </Link>
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
                    <li>
                        <Link className="app-menu__item" to="/chat">
                            <FaComments className="app-menu__icon bx" />
                            <span className="app-menu__label">Chat</span>
                        </Link>
                    </li>
                </ul>
            </aside>
            <div className="app-sidebar-overlay" onClick={handleClick}></div>
        </>
    );
};
export default memo(Sidebar);
