import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import orderApis from '../../../api/baseAdmin/order';
import District from '../../../components/_common/address/district';
import Province from '../../../components/_common/address/province';
import Ward from '../../../components/_common/address/ward';
import { setNavigationValue } from '../../../features/navigation/navigationSlice';
import {
    MySwal,
    getOrderPaymentStatus,
    getOrderStatus,
    getTextTime,
    numberToMoneyString,
    scrollToTop,
} from '../../../helpers/common';

const OrderDetail = () => {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [order, setOrder] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = 'Chi tiết đơn hàng';
        getOrder();
        scrollToTop();
        dispatch(
            setNavigationValue([
                { url: '/Orders', title: 'Quản lý đơn hàng' },
                { url: '#', title: 'Chi tiết đơn hàng' },
            ])
        );
    }, []);
    const getOrder = async () => {
        const res = await orderApis.show(id);
        if (res.success) {
            console.log(res);
            setOrder(res.data);
            setLoading(false);
        } else {
            MySwal.fire({
                title: 'Lỗi!',
                html: res.message,
                icon: 'error',
                showDenyButton: true,
                confirmButtonText: 'Tải lại',
                denyButtonText: `Danh sách đơn hàng`,
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    getOrder();
                } else if (result.isDenied) {
                    navigate('/user/orders');
                }
            });
        }
    };
    const handleCancelOrder = () => {
        MySwal.fire({
            title: 'Xác nhận huỷ đơn hàng',
            html: 'Hãy cho chúng tôi biết lý do bạn huỷ đơn hàng',
            input: 'text',
            inputPlaceholder: 'Tôi muốn thay đổi địa chỉ',
            inputAttributes: {
                autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Đóng',
            showLoaderOnConfirm: true,
            preConfirm: (message) => {
                orderApis.cancelOrder(order.id, message);
                MySwal.fire('Đã huỷ đơn hàng thành công', '', 'success');
                getOrder();
            },
        });
    };
    if (isLoading)
        return (
            <>
                <div className="w-100 text-center p-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </>
        );
    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-sm-12">
                    <div className="tile">
                        <h3>Chi tiết đơn hàng</h3>
                        <div className="row" style={{ marginTop: '30px' }}>
                            <div className="col-md-12">
                                <div
                                    className="card"
                                    style={{ width: 'calc(100% - 10px)' }}
                                >
                                    <div className="card-header fs-3">
                                        Thông tin cá nhân
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            Họ & Tên:{' '}
                                            <span className="text-primary">
                                                {order.user_info?.name}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="row">
                                                <div className="col-md-6 col-12">
                                                    Số điện thoại:{' '}
                                                    <span className="text-primary">
                                                        {order.user_info?.phone}
                                                    </span>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    Email:{' '}
                                                    <span className="text-primary">
                                                        {order.user_info?.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            Địa chỉ:{' '}
                                            <span className="text-primary">
                                                <Ward
                                                    code={order.address?.ward}
                                                />
                                                ,{' '}
                                                <District
                                                    code={
                                                        order.address?.district
                                                    }
                                                />
                                                ,{' '}
                                                <Province
                                                    code={
                                                        order.address?.province
                                                    }
                                                />
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            Địa chỉ cụ thể:{' '}
                                            <span className="text-primary">
                                                {order.address?.details}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <h4 className="mt-5 mb-1 fs-3">
                                    Danh sách sản phẩm
                                </h4>
                                <table
                                    className="table table-striped"
                                    style={{ width: 'calc(100% - 10px)' }}
                                >
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Tên Sản phẩm</th>
                                            <th scope="col">Giá</th>
                                            <th scope="col">Số lượng</th>
                                            <th scope="col">Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.products?.map(
                                            (product, index) => (
                                                <tr key={index}>
                                                    <th scope="row">
                                                        {index + 1}
                                                    </th>
                                                    <td>
                                                        <Link
                                                            to={
                                                                '/products/' +
                                                                product.id
                                                            }
                                                        >
                                                            {product.title}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        {numberToMoneyString(
                                                            product.current_price
                                                        )}
                                                    </td>
                                                    <td>{product.quantity}</td>
                                                    <td>
                                                        {numberToMoneyString(
                                                            product.quantity *
                                                                product.current_price
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                        <tr>
                                            <th scope="row"> </th>
                                            <td></td>
                                            <td></td>
                                            <td className="text-right">
                                                Tổng:{' '}
                                            </td>
                                            <td className="text-danger fw-bold">
                                                {numberToMoneyString(
                                                    order.payment.total
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className="col-md-12 mt-5"
                                style={{
                                    width: 'calc(100% - 10px)',
                                }}
                            >
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Trạng thái đơn hàng</h4>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">
                                            Mã đơn hàng: <span>{order.id}</span>
                                        </p>
                                        <p className="card-text">
                                            Ngày tạo:{' '}
                                            <span>
                                                {
                                                    getTextTime(
                                                        order.created_at
                                                    ).date
                                                }{' '}
                                                {
                                                    getTextTime(
                                                        order.created_at
                                                    ).hour
                                                }
                                            </span>
                                        </p>
                                        <p className="card-text">
                                            Tổng tiền hàng:{' '}
                                            <span>
                                                {numberToMoneyString(
                                                    order.payment.total
                                                )}
                                            </span>
                                        </p>
                                        <p className="card-text">
                                            Giảm giá:{' '}
                                            <span>
                                                {numberToMoneyString(
                                                    order.payment.discount
                                                )}
                                            </span>
                                        </p>
                                        <p className="card-text">
                                            Tiền vận chuyển:{' '}
                                            <span>
                                                {numberToMoneyString(
                                                    order.transport.shipping_fee
                                                )}
                                            </span>
                                        </p>
                                        <p className="card-text">
                                            Thành tiền:
                                            <span>
                                                {' '}
                                                {numberToMoneyString(
                                                    order.payment.total -
                                                        order.payment.discount +
                                                        order.transport
                                                            .shipping_fee
                                                )}
                                            </span>
                                        </p>
                                        <p className="card-text">
                                            Hình thức hanh toán:{' '}
                                            {getOrderPaymentStatus(
                                                order.payment.payment_method
                                            )}
                                            {' - '}
                                            {order.payment.payment_status ? (
                                                <span className="text-success">
                                                    Đã thanh toán
                                                </span>
                                            ) : (
                                                <span className="text-warning">
                                                    Chưa thanh toán
                                                </span>
                                            )}
                                        </p>
                                        <p className="card-text">
                                            Trạng thái:{' '}
                                            {getOrderStatus(
                                                order.status.status_code
                                            )}
                                        </p>
                                        {order.status.status_code === 0 && (
                                            <p className="card-text">
                                                Lý do huỷ hàng:{' '}
                                                {order.status.message}
                                            </p>
                                        )}
                                        <p className="card-text">
                                            Ghi chú: {order.note}
                                        </p>
                                        {(order.status.status_code === 1 ||
                                            order.status.status_code === 2) && (
                                            <button
                                                className="btn btn-danger"
                                                onClick={handleCancelOrder}
                                            >
                                                Hủy đơn hàng
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default memo(OrderDetail);
