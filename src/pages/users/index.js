import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CustomPagination from '../../components/customPagination';
import { setNavigationValue } from '../../features/navigation/navigationSlice';
const userIndexSwal = withReactContent(Swal);
export default function UserIndex() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            setNavigationValue([{ url: '/users', title: 'Quản lý Users' }])
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
                                    <a
                                        className="btn btn-add btn-sm"
                                        href="them-nhan-vien"
                                        title="Thêm"
                                    >
                                        <FaPlus className="icon fa" />
                                        Thêm user
                                    </a>
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
                                                        Họ & Tên
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        width="80"
                                                        className="text-center"
                                                    >
                                                        Avatar
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        width="120"
                                                        className="text-center"
                                                    >
                                                        Số điện thoại / email
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="text-center"
                                                    >
                                                        Địa chỉ
                                                    </th>
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
                                                    <td width="120">
                                                        <ul className="list-group">
                                                            <li className="list-group-item">
                                                                09876543211
                                                            </li>
                                                            <li className="list-group-item">
                                                                sadoa111@gmail.com
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    <td>Số nhà: 1</td>
                                                    <td></td>
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
