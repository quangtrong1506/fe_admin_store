import { useEffect } from 'react';
import { FaPenToSquare, FaPlus, FaTrash } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CustomPagination from '../../components/customPagination';
import { setNavigationValue } from '../../features/navigation/navigationSlice';
const userIndexSwal = withReactContent(Swal);
export default function ProductIndex() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            setNavigationValue([
                { url: '/products', title: 'Quản lý sản phẩm' },
            ])
        );
    }, [dispatch]);
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="tile-body">
                            <div className="row element-button">
                                <div className="col-sm-2">
                                    <Link
                                        className="btn btn-add btn-sm"
                                        to="/products/new"
                                        title="Thêm"
                                    >
                                        <FaPlus className="icon fa" />
                                        Thêm sản phẩm
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <div className="row">
                                    <div className="col">
                                        <table className="table users-table">
                                            <thead>
                                                <tr>
                                                    <th
                                                        width="40"
                                                        scope="col"
                                                        className="text-center"
                                                    >
                                                        #
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        width="180"
                                                        className="text-center"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        width="80"
                                                        className="text-center"
                                                    >
                                                        Thumbnail
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        width="150"
                                                        className="text-center"
                                                    >
                                                        Price / Discount percent
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="text-center"
                                                    >
                                                        Status
                                                    </th>
                                                    <th scope="col">Brand</th>
                                                    <th scope="col" width="60">
                                                        Handle
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th
                                                        width="40"
                                                        scope="row"
                                                        className="text-center"
                                                    >
                                                        1
                                                    </th>
                                                    <td width="180">Sa đoạ</td>
                                                    <td width="80">
                                                        <div className="avatar">
                                                            <img
                                                                src="https://i.ibb.co/5LPN9L1/106090318-p0-master1200.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </td>
                                                    <td width="150">
                                                        <ul className="list-group list-group-flush">
                                                            <li className="list-group-item">
                                                                100.000 đ
                                                            </li>
                                                            <li className="list-group-item">
                                                                10%
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td>
                                                        <ul className="list-group list-group-flush">
                                                            <li className="list-group-item">
                                                                Amount: 199
                                                            </li>
                                                            <li className="list-group-item">
                                                                Status:{' '}
                                                                <span className="text-danger">
                                                                    Đang giảm
                                                                    giá
                                                                </span>
                                                                ,{' '}
                                                                <span className="text-warning">
                                                                    Sắp hết hàng
                                                                </span>
                                                            </li>
                                                            <li className="list-group-item">
                                                                Rating: 4.6
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td>Samsung</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-light"
                                                            type="button"
                                                        >
                                                            <FaPenToSquare />
                                                        </button>
                                                        <button
                                                            className="btn btn-light"
                                                            type="button"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="custom__pagination">
                                <CustomPagination
                                    page={1}
                                    pages={1}
                                ></CustomPagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
