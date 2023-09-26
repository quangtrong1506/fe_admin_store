import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PostsTable from '../../components/_common/posts/postsTable';
import { setNavigationValue } from '../../features/navigation/navigationSlice';
import { useQuery } from '../../helpers/common';
const MySwal = withReactContent(Swal);
export default function PostsIndex() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const query = useQuery();
    useEffect(() => {
        dispatch(setNavigationValue([{ url: '#', title: 'Quản lý bài viết' }]));
    }, [dispatch]);
    useEffect(() => {
        if (query.get('page')) setPage(+query.get('page'));
    }, []);
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="tile-body">
                            <div className="row element-button">
                                <div className="col-md-9 col-sm-6 col-12">
                                    <Link
                                        className="btn btn-add btn-sm"
                                        to="/posts/new"
                                        title="Thêm"
                                    >
                                        <FaPlus className="icon fa" /> Bài viết
                                        mới
                                    </Link>
                                </div>
                                <div className="col-md-3 col-sm-6 col-12">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Tìm kiếm..."
                                        style={{ height: '32.5px' }}
                                        onChange={(e) => {
                                            setSearchText(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <PostsTable
                                page={page}
                                setPage={setPage}
                                searchText={searchText}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
