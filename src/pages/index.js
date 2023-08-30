import { memo, useEffect } from 'react';
import {
    FaBagShopping,
    FaDatabase,
    FaTriangleExclamation,
    FaUsers,
} from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { setNavigationValue } from '../features/navigation/navigationSlice';
const Index = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setNavigationValue([{ url: '/', title: 'Bảng điều khiểu' }]));
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
                                        <b>2 khách hàng</b>
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
                                        <b>2 sản phẩm</b>
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
                                        <b>2 đơn hàng</b>
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
                                        <b>1 sản phẩm</b>
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
                                            <tr>
                                                <td>#rlzv3tiZ</td>
                                                <td>Lương Quang Trọng</td>
                                                <td>1.131.567&nbsp;₫</td>
                                                <td>
                                                    <span className="badge bg-info">
                                                        Chờ xác nhận
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>#fcx8tGa2</td>
                                                <td>lương quang trọng</td>
                                                <td>1.131.456&nbsp;₫</td>
                                                <td>
                                                    <span className="badge bg-success">
                                                        Hoàn thành
                                                    </span>
                                                </td>
                                            </tr>
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
                                            <tr>
                                                <td>#1c9u78Cf</td>
                                                <td>Lương Quang Trọng</td>
                                                <td>
                                                    quangtrong1506@gmail.com
                                                </td>
                                                <td>
                                                    <span className="tag tag-success">
                                                        0389619050
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>#Qj0Y4vMQ</td>
                                                <td>lương quang trọng</td>
                                                <td>quangtrong2@gmail.com</td>
                                                <td>
                                                    <span className="tag tag-success">
                                                        089619050
                                                    </span>
                                                </td>
                                            </tr>
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
