import { memo, useEffect, useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import productApis from '../../../api/baseAdmin/product';
import { numberToMoneyString } from '../../../helpers/common';
import { showToast } from '../../../helpers/showToast';
import CustomPagination from '../../customPagination';
const MySwal = withReactContent(Swal);
const ProductTable = ({ page, setPage, searchText }) => {
    const [pages, setPages] = useState(1);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const options = {
                page,
                q: searchText,
            };
            setLoading(true);
            const res = await productApis.index(options);
            if (res.success) {
                setProducts(res.data.products);
                setPages(Math.floor(res.data.total / res.data.limit) + 1);
                setLoading(false);
            } else
                showToast({
                    message: 'Lỗi lấy danh sách sản phẩm',
                    type: 'error',
                });
        })();
    }, [page, searchText]);
    const handleEdit = (slug) => {
        navigate('/products/' + slug);
    };
    const handleDelete = (slug) => {
        Swal.fire({
            title: 'Xác nhận xoá?',
            text: 'Hãy xác nhận xoá sản phẩm vừa chọn!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, Xoá nó!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await productApis.delete(slug);
                if (res.success) {
                    MySwal.fire(
                        'Đã xoá!',
                        'Đã xoá sản phẩm thành công',
                        'success'
                    );
                    const index = products.findIndex((product) => {
                        return product.slug === slug;
                    });
                    if (index >= 0) {
                        const newProds = [...products];
                        newProds.splice(index, 1);
                        setProducts(newProds);
                    }
                } else showToast({ message: res.message, type: 'error' });
            }
        });
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
    if (products.length === 0)
        return (
            <>
                <div className="text-center">
                    <h1 className="p-5">Chưa có sản phẩm nào</h1>
                </div>
            </>
        );
    const GetStatus = ({ product }) => {
        const s = [];
        if (product.discount_percentage > 0)
            s.push(<span className="text-danger">Đang giảm giá</span>);
        if (product.stock === 0)
            s.push(<span className="text-danger">Hết hàng</span>);
        if (product.stock < 10 && product.stock > 0)
            s.push(<span className="text-warning">Sắp hết hàng</span>);
        if (product.stock > 10)
            s.push(<span className="text-info">Còn hàng</span>);
        return (
            <>
                {s.map((element, index) => {
                    return (
                        <span key={index}>
                            {element}
                            {index < s.length - 1 ? ', ' : ''}
                        </span>
                    );
                })}
            </>
        );
    };
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
                                    <th scope="col" className="text-center">
                                        Status
                                    </th>
                                    <th scope="col">Brand</th>
                                    <th scope="col" width="60">
                                        Handle
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index}>
                                        <th
                                            width="40"
                                            scope="row"
                                            className="text-center"
                                        >
                                            {index + 1}
                                        </th>
                                        <td width="180">{product.title}</td>
                                        <td width="80">
                                            <div className="avatar">
                                                <img
                                                    src={product.thumbnail}
                                                    alt="thumbnail"
                                                />
                                            </div>
                                        </td>
                                        <td width="150">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    {numberToMoneyString(
                                                        product.price
                                                    )}
                                                </li>
                                                <li className="list-group-item">
                                                    {
                                                        product.discount_percentage
                                                    }
                                                    %
                                                </li>
                                            </ul>
                                        </td>
                                        <td>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    Amount: {product.stock}
                                                </li>
                                                <li className="list-group-item">
                                                    Status:{' '}
                                                    <GetStatus
                                                        product={product}
                                                    />
                                                </li>
                                                <li className="list-group-item">
                                                    Category:{' '}
                                                    <span className="text-info">
                                                        {product.category}
                                                    </span>
                                                </li>
                                            </ul>
                                        </td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <button
                                                className="btn btn-light"
                                                type="button"
                                            >
                                                <FaPenToSquare
                                                    onClick={() => {
                                                        handleEdit(
                                                            product.slug
                                                        );
                                                    }}
                                                />
                                            </button>
                                            <button
                                                className="btn btn-light"
                                                type="button"
                                            >
                                                <FaTrash
                                                    onClick={() => {
                                                        handleDelete(
                                                            product.slug
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
export default memo(ProductTable);
