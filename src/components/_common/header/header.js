import { memo } from 'react';
import { FaArrowRightFromBracket, FaBars } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const Header = () => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
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
    const logout = (e) => {
        e.preventDefault();
        removeCookie('admin_token');
        window.location.reload();
    };
    return (
        <>
            <div className="pace  pace-inactive">
                <div
                    className="pace-progress"
                    data-progress-text="100%"
                    data-progress="99"
                >
                    <div className="pace-progress-inner"></div>
                </div>
                <div className="pace-activity"></div>
            </div>
            <header className="app-header">
                <Link
                    className="app-sidebar__toggle"
                    to="#"
                    onClick={handleClick}
                >
                    <FaBars />
                </Link>
                <ul className="app-nav">
                    <li>
                        <Link
                            className="app-nav__item"
                            to="/logout"
                            onClick={logout}
                        >
                            <FaArrowRightFromBracket className="bx-rotate-180" />
                        </Link>
                    </li>
                </ul>
            </header>
        </>
    );
};
export default memo(Header);
