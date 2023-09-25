import { memo, useEffect, useState } from 'react';
import { FaPenToSquare } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import orderApis from '../../../api/baseAdmin/order';
import { getOrderStatus, numberToMoneyString } from '../../../helpers/common';
import { showToast } from '../../../helpers/showToast';
import CustomPagination from '../../customPagination';
const MySwal = withReactContent(Swal);
const OrderTable = ({ searchText }) => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const options = {
                page,
                q: searchText,
            };
            setLoading(true);
            const res = await orderApis.index(options);
            if (res.success) {
                setOrders(res.data);
                setLoading(false);
            } else
                showToast({
                    message: 'Lỗi lấy danh sách sản phẩm',
                    type: 'error',
                });
        })();
    }, [page, searchText]);
    const handleEdit = (id) => {
        navigate('/orders/' + id);
    };
    if (isLoading)
        return (
            <>
                <div className="p-5 text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </>
        );
    if (orders.docs.length === 0)
        return (
            <>
                <div className="text-center">
                    <h1 className="p-5">Chưa có sản phẩm nào</h1>
                </div>
            </>
        );

    return (
        <>
            <div>
                <div className="row">
                    <div className="tile">
                        <div>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID đơn hàng</th>
                                        <th>Tên khách hàng</th>
                                        <th>Tổng tiền</th>
                                        <th className="text-center">
                                            Trạng thái
                                        </th>
                                        <th className="text-center" width={80}>
                                            Handle
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.docs.map((order, index) => (
                                        <tr key={index}>
                                            <td>#{order._id}</td>
                                            <td>{order.user_info.name}</td>
                                            <td>
                                                {numberToMoneyString(
                                                    order.payment.total
                                                )}
                                            </td>
                                            <td className="text-center">
                                                {getOrderStatus(
                                                    order.status.status_code
                                                )}
                                            </td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-light"
                                                    type="button"
                                                >
                                                    <FaPenToSquare
                                                        onClick={() => {
                                                            handleEdit(
                                                                order._id
                                                            );
                                                        }}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="custom__pagination">
                <CustomPagination
                    page={page}
                    pages={orders.pages}
                    handleChange={setPage}
                ></CustomPagination>
            </div>
        </>
    );
};
export default memo(OrderTable);
