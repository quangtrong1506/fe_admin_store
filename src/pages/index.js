import { memo, useEffect, useState } from 'react';
import {
    FaBagShopping,
    FaDatabase,
    FaTriangleExclamation,
    FaUsers,
} from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import orderApis from '../api/baseAdmin/order';
import productApis from '../api/baseAdmin/product';
import userApis from '../api/baseAdmin/user';
import { setNavigationValue } from '../features/navigation/navigationSlice';
import { getOrderStatus, numberToMoneyString } from '../helpers/common';
const Index = () => {
    const dispatch = useDispatch();
    const [countUser, setCountUser] = useState(0);
    const [countProduct, setCountProduct] = useState(0);
    const [countOrder, setCountOrder] = useState(0);
    const [countProductWarning, setCountProductWarning] = useState(0);
    const [newestOrders, setNewestOrders] = useState([]);
    const [newestUsers, setNewestUsers] = useState([]);
    useEffect(() => {
        dispatch(setNavigationValue([{ url: '/', title: 'Bảng điều khiểu' }]));
        const loadData = async () => {
            Promise.all([
                userApis.count(),
                productApis.count(),
                orderApis.count(),
                productApis.countWarning(),
                orderApis.index({ limit: 5 }),
                userApis.index({ limit: 5 }),
            ]).then((value) => {
                console.log(value);
                setCountUser(value[0].data ?? 0);
                setCountProduct(value[1].data ?? 0);
                setCountOrder(value[2].data ?? 0);
                setCountProductWarning(value[3].data ?? 0);
                setNewestOrders(value[4].data?.docs ?? []);
                setNewestUsers(value[5].data?.docs ?? []);
            });
        };
        loadData();
    }, []);
    return (
        <>
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <div className="row">
                        <div className="col-md-12 col-lg-6">
                            <div className="widget-small primary coloured-icon">
                                <i
                                    className="icon"
                                    style={{ backgroundColor: '#b9ffd3' }}
                                >
                                    <FaUsers className="" />
                                </i>
                                <div className="info">
                                    <h4>Tổng khách hàng</h4>
                                    <p>
                                        <b>{countUser} khách hàng</b>
                                    </p>
                                    <p className="info-tong">
                                        Tổng số khách hàng được quản lý.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <div className="widget-small info coloured-icon">
                                <i className="icon">
                                    <FaDatabase />
                                </i>
                                <div className="info">
                                    <h4>Tổng sản phẩm</h4>
                                    <p>
                                        <b>{countProduct} sản phẩm</b>
                                    </p>
                                    <p className="info-tong">
                                        Tổng số sản phẩm được quản lý.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <div className="widget-small warning coloured-icon">
                                <i className="icon">
                                    <FaBagShopping />
                                </i>
                                <div className="info">
                                    <h4>Tổng đơn hàng</h4>
                                    <p>
                                        <b>{countOrder} đơn hàng</b>
                                    </p>
                                    <p className="info-tong">
                                        Tổng số hóa đơn đã bán.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <div className="widget-small danger coloured-icon">
                                <i className="icon">
                                    <FaTriangleExclamation />
                                </i>
                                <div className="info">
                                    <h4>Sắp hết hàng</h4>
                                    <p>
                                        <b>{countProductWarning} sản phẩm</b>
                                    </p>
                                    <p className="info-tong">
                                        Số sản phẩm cảnh báo hết cần nhập thêm.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="tile">
                                <h3 className="tile-title">Đơn hàng mới</h3>
                                <div>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>ID đơn hàng</th>
                                                <th>Tên khách hàng</th>
                                                <th>Tổng tiền</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {newestOrders.map(
                                                (order, index) => (
                                                    <tr key={index}>
                                                        <td>#{order._id}</td>
                                                        <td>
                                                            {
                                                                order.user_info
                                                                    .name
                                                            }
                                                        </td>
                                                        <td>
                                                            {numberToMoneyString(
                                                                order.payment
                                                                    .total
                                                            )}
                                                        </td>
                                                        <td>
                                                            {getOrderStatus(
                                                                order.status
                                                                    .status_code
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="tile">
                                <h3 className="tile-title">Khách hàng mới</h3>
                                <div>
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tên khách hàng</th>
                                                <th>Email</th>
                                                <th>Số điện thoại</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {newestUsers.map((user) => (
                                                <tr key={user._id}>
                                                    <td>#{user._id}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>
                                                        <span className="tag tag-success">
                                                            {user.phone}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default memo(Index);
