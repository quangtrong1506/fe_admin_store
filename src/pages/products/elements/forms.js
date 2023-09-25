import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CustomCKeditor from '../../../components/ckeditor/customCKeditor';
import { setNavigationValue } from '../../../features/navigation/navigationSlice';
import { FaCloudArrowUp } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { stringToSlug, uploadImage } from '../../../helpers/common';
import CategoryModal from './categoryModal';
import BrandModal from './brandModal';
import productApis from '../../../api/baseAdmin/product';
import { showToast } from '../../../helpers/showToast';
import Select from 'react-select';
import { PRODUCT_STATUS } from '../../../helpers/constants';

const MySwal = withReactContent(Swal);
const ProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            name: '',
            price: 0,
            discount: 0,
            stock: 0,
            brand: '',
            category: '',
            status: 0,
            description: '',
        },
    });
    const [error, setError] = useState({
        status: false,
        category: false,
        brand: false,
    });
    const [images, setImages] = useState([]);
    const description = useRef('');
    const categories = useSelector((state) => state.category);
    const CATEGORIES = categories.map((cat) => {
        return {
            value: stringToSlug(cat),
            label: cat,
        };
    });
    const brands = useSelector((state) => state.brand);
    const BRANDS = brands.map((brand) => {
        return {
            value: stringToSlug(brand),
            label: brand,
        };
    });
    const [selected, setSelected] = useState({
        status: null,
        category: null,
        brand: null,
    });
    const customStyles = {
        control: (styles) => ({ ...styles, padding: '0.175rem 0' }),
    };
    const catRef = useRef();
    const brandRef = useRef();
    const statusRef = useRef();
    //
    useEffect(() => {
        dispatch(
            setNavigationValue([
                { url: '/products', title: 'Quản lý sản phẩm' },
                {
                    url: '/products/new',
                    title: id ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm',
                },
            ])
        );
        if (id) {
            (async () => {
                const res = await productApis.show(id);
                if (res.success) {
                    const product = res.data;
                    setValue('name', product.title);
                    setValue('price', product.price);
                    setValue('stock', product.stock);
                    setValue('discount', product.discount_percentage);
                    document.getElementById('discount-percent').innerHTML =
                        product.discount_percentage;
                    description.current = product.description;
                    const imgs = [];
                    for (let i = 0; i < product.images.length; i++) {
                        const image = product.images[i];
                        imgs.push({
                            url: image,
                            data: null,
                            isThumbnail:
                                image === product.thumbnail ? true : false,
                        });
                    }
                    setImages(imgs);
                    setSelected({
                        brand: stringToSlug(product.brand),
                        category: stringToSlug(product.category),
                        status: product.status,
                    });
                } else {
                    console.log(res);
                    if (res.status === 404) {
                        showToast({ message: res.message, type: 'error' });
                        showToast({
                            message: 'Chuyển hướng đến trang danh sách',
                            type: 'info',
                            time: 5000,
                        });
                        return navigate('/products');
                    }
                    showToast({
                        message: 'Lỗi lấy thông tin sản phẩm',
                        type: 'error',
                    });
                }
            })();
        }
    }, [dispatch, id]);
    const handleDiscountChange = (e) => {
        const value = e.target.value;
        document.getElementById('discount-percent').innerHTML = value;
    };
    const handleDataCKEditor = (value) => {
        description.current = value;
    };
    const handleRemoveImage = (index) => {
        const imgs = images.slice();
        const tmp = imgs.splice(index, 1);
        if (tmp[0].isThumbnail && imgs.length > 0) imgs[0].isThumbnail = true;
        setImages(imgs);
    };
    const handleSetThumbnail = (index) => {
        const imgs = images.slice();
        imgs.forEach((image) => (image.isThumbnail = false));
        imgs[index].isThumbnail = true;
        setImages(imgs);
    };
    const handleImageUploadChange = (e) => {
        const files = e.target.files;
        const add = [];
        for (let i = 0; i < files.length; i++) {
            add.push({
                url: URL.createObjectURL(files[i]),
                data: files[i],
                isThumbnail: images.length === 0 && i === 0 ? true : false,
            });
        }
        setImages((images) => [...images, ...add]);
    };
    const submitHandle = async (value) => {
        if (!selected.brand || !selected.category || !selected.status)
            setError({
                brand: selected.brand ? false : true,
                category: selected.category ? false : true,
                status: selected.status ? false : true,
            });
        if (!selected.category) {
            catRef.current.focus();
            return MySwal.fire('Danh mục sản phẩm không được để trống');
        }
        if (!selected.status) {
            statusRef.current.focus();
            return MySwal.fire('Tình trạng sản phẩm không được để trống');
        }
        if (!selected.brand) {
            brandRef.current.focus();
            return MySwal.fire('Hãng sản phẩm không được để trống');
        }
        if (images.length == 0)
            return MySwal.fire('', 'Chưa có hình ảnh sản phẩm', 'warning');
        if (description.current === '')
            return MySwal.fire('', 'Chưa nhập mô tả sản phẩm', 'warning');
        else {
            progressUploading(true, 0);
            const formData = new FormData();
            formData.append('title', value?.name ?? '');
            formData.append('price', parseFloat(value?.price) ?? 0);
            formData.append(
                'discount_percentage',
                parseFloat(value?.discount) ?? 0
            );
            formData.append('stock', parseFloat(value?.stock) ?? 0);
            formData.append('brand', selected.brand ?? '');
            formData.append('category', selected.category ?? '');
            formData.append('status', selected.status ?? '');
            const imagesUpload = [];
            // images / desc
            //Todo save images
            const forLoop = async (_) => {
                //Todo: sử lý lưu ảnh ck editor
                let element = document.createElement('div');
                element.innerHTML = description.current;
                const imgs = element.getElementsByTagName('img');
                for (let i = 0; i < imgs.length; i++) {
                    const image = imgs[i];
                    if (image.matches('base64')) continue;
                    const res = await uploadImage(image.src, {
                        name: stringToSlug(value.name),
                    });
                    if (!res.success)
                        return MySwal.fire(
                            'ERROR',
                            res.error.message,
                            'error'
                        ).then(() => progressUploading(false));
                    progressUploading(
                        true,
                        Math.floor(
                            ((i + 1) / (imgs.length + images.length)) * 100
                        )
                    );
                    imgs[i].src = res.data.display_url;
                }
                formData.append('description', element.innerHTML);
                //Todo: sử lý lưu ảnh sản phẩm
                for (let i = 0; i < images.length; i++) {
                    const image = images[i];
                    if (!image.data) {
                        imagesUpload.push(image.url);
                        if (image.isThumbnail)
                            formData.append('thumbnail', image.url);
                        continue;
                    }
                    const res = await uploadImage(image.data, {
                        name: stringToSlug(value.name),
                    });
                    if (!res.success)
                        return MySwal.fire(
                            'ERROR',
                            res.error.message,
                            'error'
                        ).then(() => progressUploading(false));
                    progressUploading(
                        true,
                        Math.floor(
                            ((imgs.length + i + 1) /
                                (imgs.length + images.length)) *
                                100
                        )
                    );
                    if (image.isThumbnail)
                        formData.append('thumbnail', res.data.display_url);
                    imagesUpload.push(res.data.display_url);
                }
            };
            await forLoop();
            formData.append('images', JSON.stringify(imagesUpload));
            for (var pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
            let res = {};
            if (!id) res = await productApis.add(formData);
            else res = await productApis.update(id, formData);
            if (res.success) {
                showToast({
                    message: !id
                        ? 'Thêm sản phẩm thành công'
                        : 'Chỉnh sửa sản phẩm thành công',
                });
                navigate('/products');
            } else showToast({ message: 'Đã sản ra lỗi', type: 'error' });
            progressUploading(false);
        }
    };
    const progressUploading = (isLoading = false, progress = 0) => {
        document.querySelector('.products.uploading').style.display = isLoading
            ? 'flex'
            : 'none';
        document.querySelector('.products .progress-bar').style.width =
            progress + '%';
        document.querySelector('.products .progress-bar').innerHTML =
            progress + '%';
    };
    return (
        <>
            <div className="products uploading">
                <h4 style={{ textAlign: 'center', color: 'white' }}>
                    Đang tải dữ liệu lên server
                </h4>
                <div className="progress" style={{ width: '90%' }}>
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{ width: '5%' }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        5%
                    </div>
                </div>
            </div>
            <div className="row products">
                <div className="col-md-12">
                    <div className="tile">
                        <h3 className="tile-title">
                            {id ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}
                        </h3>
                        <div className="tile-body">
                            <div className="row element-button">
                                <div className="col-sm-2">
                                    <CategoryModal />
                                </div>
                                <div className="col-sm-2">
                                    <BrandModal />
                                </div>
                            </div>
                            <form
                                className="row"
                                onSubmit={handleSubmit(submitHandle)}
                            >
                                <div className="form-group col-md-3">
                                    <label className="control-label">
                                        Tên sản phẩm
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        autoComplete="off"
                                        {...register('name', {
                                            required:
                                                'Tên sản phẩm không được để trống',
                                        })}
                                    />
                                    {errors.name && (
                                        <i className="text-danger">
                                            {errors.name.message}
                                        </i>
                                    )}
                                </div>

                                <div className="form-group  col-md-3">
                                    <label className="control-label">
                                        Số lượng
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        min="0"
                                        autoComplete="off"
                                        {...register('stock', {
                                            required:
                                                'Số lượng sản phẩm không được để trống',
                                            min: {
                                                value: 0,
                                                message:
                                                    'Số lượng không hợp lệ',
                                            },
                                        })}
                                    />
                                    {errors.stock && (
                                        <i className="text-danger">
                                            {errors.stock.message}
                                        </i>
                                    )}
                                </div>
                                <div className="form-group col-md-3 ">
                                    <label
                                        htmlFor="input-status"
                                        className="control-label"
                                    >
                                        Tình trạng
                                    </label>
                                    <Select
                                        ref={statusRef}
                                        className="react-select"
                                        options={PRODUCT_STATUS}
                                        value={PRODUCT_STATUS.find(
                                            (status) =>
                                                status.value == selected.status
                                        )}
                                        styles={customStyles}
                                        onChange={(value) => {
                                            if (value.value)
                                                setError({
                                                    ...error,
                                                    status: false,
                                                });
                                            setSelected({
                                                ...selected,
                                                status: value.value,
                                            });
                                        }}
                                    />
                                    {error.status && (
                                        <i className="text-danger">
                                            Trạng thái của sản phẩm đang trống
                                        </i>
                                    )}
                                </div>
                                <div className="form-group col-md-3">
                                    <label
                                        htmlFor="input-categories"
                                        className="control-label"
                                    >
                                        Danh mục
                                    </label>
                                    <Select
                                        ref={catRef}
                                        className="react-select"
                                        options={CATEGORIES}
                                        value={CATEGORIES.find(
                                            (cat) =>
                                                cat.value == selected.category
                                        )}
                                        styles={customStyles}
                                        onChange={(value) => {
                                            if (value.value)
                                                setError({
                                                    ...error,
                                                    category: false,
                                                });
                                            setSelected({
                                                ...selected,
                                                category: value.value,
                                            });
                                        }}
                                    />
                                    {error.category && (
                                        <i className="text-danger">
                                            Danh mục sản phẩm không được trống
                                        </i>
                                    )}
                                </div>
                                <div className="form-group col-md-3 ">
                                    <label
                                        htmlFor="input-supplier"
                                        className="control-label"
                                    >
                                        Hãng của sản phẩm
                                    </label>
                                    <Select
                                        ref={brandRef}
                                        className="react-select"
                                        options={BRANDS}
                                        value={BRANDS.find(
                                            (brand) =>
                                                brand.value == selected.brand
                                        )}
                                        styles={customStyles}
                                        onChange={(value) => {
                                            if (value.value)
                                                setError({
                                                    ...error,
                                                    brand: false,
                                                });
                                            setSelected({
                                                ...selected,
                                                brand: value.value,
                                            });
                                        }}
                                    />
                                    {error.brand && (
                                        <i className="text-danger">
                                            Hãng của sản phẩm đang bị trống
                                        </i>
                                    )}
                                </div>
                                <div className="form-group col-md-3">
                                    <label className="control-label">
                                        Giá bán
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        min="0"
                                        autoComplete="off"
                                        {...register('price', {
                                            required:
                                                'Giá của phẩm không được để trống',
                                            min: {
                                                value: 0,
                                                message:
                                                    'Giá của sản phẩm không hợp lệ',
                                            },
                                        })}
                                    />
                                    {errors.price && (
                                        <i className="text-danger">
                                            {errors.price.message}
                                        </i>
                                    )}
                                </div>
                                <div className="form-group col-md-3">
                                    <label className="control-label">
                                        Giảm giá:{' '}
                                        <span id="discount-percent">0</span>%
                                    </label>
                                    <input
                                        type="range"
                                        className="form-range mt-2"
                                        min="0"
                                        max="100"
                                        defaultValue={0}
                                        onInput={handleDiscountChange}
                                        {...register('discount', {})}
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <label className="control-label">
                                        Ảnh sản phẩm
                                    </label>
                                    <div className="row list-images">
                                        {images.map((image, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="col-6 col-sm-4 col-md-3 mt-2 list-images__item"
                                                >
                                                    <div className="list-images__image">
                                                        <img
                                                            src={image.url}
                                                            alt="..."
                                                        />
                                                        {!image.isThumbnail && (
                                                            <button
                                                                className="btn btn-light set-thumbnail--btn"
                                                                onClick={() => {
                                                                    handleSetThumbnail(
                                                                        index
                                                                    );
                                                                }}
                                                            >
                                                                Set as thumbnail
                                                            </button>
                                                        )}
                                                        <div
                                                            className="close--btn btn"
                                                            onClick={() =>
                                                                handleRemoveImage(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <FaTimes />
                                                        </div>
                                                        {image.isThumbnail && (
                                                            <span className="badge text-bg-info thumbnail">
                                                                Thumbnail
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <div className="col-6 col-sm-4 col-md-3 upload mt-2">
                                            <input
                                                type="file"
                                                name="ImageUpload"
                                                accept="image/jpg, image/png, image/jpeg"
                                                multiple
                                                id="uploadfile"
                                                style={{
                                                    display: 'none',
                                                }}
                                                onChange={
                                                    handleImageUploadChange
                                                }
                                            />
                                            <label
                                                className="btn btn-primary"
                                                htmlFor="uploadfile"
                                            >
                                                <FaCloudArrowUp size={18} />
                                                <span> Thêm ảnh</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-md-12">
                                    <label className="control-label">
                                        Mô tả sản phẩm
                                    </label>
                                    <div>
                                        <CustomCKeditor
                                            data={description.current}
                                            handleData={handleDataCKEditor}
                                        />
                                    </div>
                                </div>
                                <button
                                    className="btn btn-primary me-2"
                                    type="submit"
                                >
                                    Lưu lại
                                </button>
                                <Link
                                    className="btn btn-danger"
                                    to={'/products'}
                                >
                                    Hủy bỏ
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default memo(ProductForm);
