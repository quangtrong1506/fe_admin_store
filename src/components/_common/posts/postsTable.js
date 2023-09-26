import { memo, useEffect, useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import postsApis from '../../../api/baseAdmin/posts';
import { showToast } from '../../../helpers/showToast';
import CustomPagination from '../../customPagination';
const MySwal = withReactContent(Swal);
const postsTable = ({ page, setPage, searchText }) => {
    const [pages, setPages] = useState(1);
    const [posts, setPosts] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const options = {
                page,
                q: searchText,
            };
            setLoading(true);
            const res = await postsApis.index(options);
            if (res.success) {
                console.log(res.data);
                setPosts(res.data.docs);
                setPages(Math.floor(res.data.total / res.data.limit) + 1);
                setLoading(false);
            } else
                showToast({
                    message: 'Lỗi lấy danh sách bài viết',
                    type: 'error',
                });
        })();
    }, [page, searchText]);
    const handleEdit = (_id) => {
        navigate('/posts/' + _id);
    };
    const handleDelete = (_id) => {
        Swal.fire({
            title: 'Xác nhận xoá?',
            text: 'Hãy xác nhận xoá bài viết vừa chọn!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, Xoá nó!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await productApis.delete(_id);
                if (res.success) {
                    MySwal.fire(
                        'Đã xoá!',
                        'Đã xoá bài viết thành công',
                        'success'
                    );
                    const index = posts.findIndex((product) => {
                        return product._id === _id;
                    });
                    if (index >= 0) {
                        const newProds = [...posts];
                        newProds.splice(index, 1);
                        setPosts(newProds);
                    }
                } else showToast({ message: res.message, type: 'error' });
            }
        });
    };
    if (isLoading || !posts)
        return (
            <>
                <div className="p-5 text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </>
        );
    if (posts.length === 0)
        return (
            <>
                <div className="text-center">
                    <h1 className="p-5">Chưa có bài viết nào</h1>
                </div>
            </>
        );
    return (
        <>
            <div>
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th
                                        width="40"
                                        scope="col"
                                        className="text-center"
                                    >
                                        #
                                    </th>
                                    <th scope="col">Title</th>
                                    <th scope="col" width="220">
                                        Thumbnail
                                    </th>
                                    <th scope="col" width="60">
                                        Handle
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className="fs-3">{post.title}</td>
                                        <td>
                                            <img
                                                src={post.thumbnail}
                                                alt={post.thumbnail}
                                                width={200}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-light"
                                                type="button"
                                            >
                                                <FaPenToSquare
                                                    onClick={() => {
                                                        handleEdit(post._id);
                                                    }}
                                                />
                                            </button>
                                            <button
                                                className="btn btn-light"
                                                type="button"
                                            >
                                                <FaTrash
                                                    onClick={() => {
                                                        handleDelete(post._id);
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
            <div className="custom__pagination">
                <CustomPagination
                    page={page}
                    pages={pages}
                    handleChange={setPage}
                ></CustomPagination>
            </div>
        </>
    );
};
export default memo(postsTable);
