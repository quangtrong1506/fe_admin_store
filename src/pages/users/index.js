import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import userApis from '../../api/baseAdmin/user';
import CustomPagination from '../../components/customPagination';
import { setNavigationValue } from '../../features/navigation/navigationSlice';
export default function UserIndex() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        dispatch(
            setNavigationValue([{ url: '/users', title: 'Quản lý Users' }])
        );
    }, [dispatch]);
    const getUsers = async () => {
        setLoading(true);
        const res = await userApis.index({ limit: 10, page });
        if (res.success) {
            setUsers(res.data);
            setLoading(false);
        } else toast.error(res.message);
    };
    useEffect(() => {
        getUsers();
    }, [page]);
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
                                        {isLoading && (
                                            <div className="p-5 text-center w-100">
                                                <div
                                                    className="spinner-border"
                                                    role="status"
                                                >
                                                    <span className="visually-hidden">
                                                        Loading...
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {!isLoading && (
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
                                                            Số điện thoại /
                                                            email
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="text-center"
                                                        >
                                                            Địa chỉ
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            width="60"
                                                        >
                                                            Handle
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users.docs?.map(
                                                        (user, index) => (
                                                            <tr key={index}>
                                                                <th
                                                                    width="40"
                                                                    scope="row"
                                                                    className="text-center"
                                                                >
                                                                    {index + 1}
                                                                </th>
                                                                <td width="180">
                                                                    {user.name}
                                                                </td>
                                                                <td width="80">
                                                                    <div className="avatar">
                                                                        <img
                                                                            src={
                                                                                user.avatar
                                                                            }
                                                                            alt={
                                                                                user.avatar
                                                                            }
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td width="120">
                                                                    <ul className="list-group">
                                                                        <li className="list-group-item">
                                                                            {user.phone ??
                                                                                '-'}
                                                                        </li>
                                                                        <li className="list-group-item">
                                                                            {user.email ??
                                                                                '-'}
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                                <td>
                                                                    {user.address ??
                                                                        '-'}
                                                                </td>
                                                                <td></td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="custom__pagination">
                                <CustomPagination
                                    page={page}
                                    pages={users.pages}
                                    handleChange={setPage}
                                ></CustomPagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
