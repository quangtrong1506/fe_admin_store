import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import CustomCKeditor from '../../../components/ckeditor/customCKeditor';
import { setNavigationValue } from '../../../features/navigation/navigationSlice';
import { FaCloudArrowUp } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import imgbbApis from '../../../api/baseAdmin/imgbb';
import { stringToSlug } from '../../../helpers/common';

const MySwal = withReactContent(Swal);
const ProductForm = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
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
    }, [dispatch, id]);
    const [images, setImages] = useState([]);
    const description = useRef('');
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
        console.log(files);
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
        console.log(value);
        if (value.status == -1) {
            setError('status', { message: 'Danh mục chưa được lựa chọn' });
        }
        if (value.category == -1)
            setError('category', {
                message: 'Trạng thái của sản phẩm chưa được lựa chọn',
            });
        if (value.brand == -1)
            setError('brand', { message: 'Hãng của chưa được lựa chọn' });
        if (images.length === 0)
            setError('images', { message: 'Chưa chọn ảnh của sản phẩm' });
        if (
            value.status == -1 ||
            value.category == -1 ||
            value.brand == -1 ||
            images.length == 0 ||
            description.current === ''
        )
            return MySwal.fire('', 'Vui lòng nhập đầy đủ thông tin', 'warning');
        else {
            const formData = new FormData();
            formData.append('name', value?.name ?? '');
            formData.append('price', parseFloat(value?.price) ?? 0);
            formData.append('discount', parseFloat(value?.discount) ?? 0);
            formData.append('quantity', parseFloat(value?.quantity) ?? 0);
            formData.append('brand', value?.brand ?? '');
            formData.append('category', value?.category ?? '');
            formData.append('status', value?.status ?? '');
            const imagesUpload = [];
            // images / desc
            await Promise.all(
                images.map(async (image) => {
                    const res = await imgbbApis.upload(image, {
                        name: stringToSlug(value.name),
                    });
                    console.log(res);
                    imagesUpload.push(res.data);
                })
            );
            console.log(imagesUpload);
        }
    };
    return (
        <>
            <div className="row products">
                <div className="col-md-12">
                    <div className="tile">
                        <h3 className="tile-title">Tạo mới sản phẩm</h3>
                        <div className="tile-body">
                            <div className="row element-button">
                                <div className="col-sm-2">
                                    <Link
                                        to="#"
                                        className="btn btn-add btn-sm"
                                        data-toggle="modal"
                                        data-target="#addNhaCungCap"
                                    >
                                        <i className="fas fa-folder-plus"></i>{' '}
                                        Thêm nhà cung cấp
                                    </Link>
                                </div>
                                <div className="col-sm-2">
                                    <Link
                                        className="btn btn-add btn-sm"
                                        data-toggle="modal"
                                        data-target="#adddanhmuc"
                                    >
                                        <i className="fas fa-folder-plus"></i>{' '}
                                        Thêm danh mục
                                    </Link>
                                </div>
                                <div className="col-sm-2">
                                    <Link
                                        className="btn btn-add btn-sm"
                                        data-toggle="modal"
                                        data-target="#addtinhtrang"
                                    >
                                        <i className="fas fa-folder-plus"></i>{' '}
                                        Thêm tình trạng
                                    </Link>
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
                                        type="text"
                                        {...register('quantity', {
                                            required:
                                                'Tên sản phẩm không được để trống',
                                            min: {
                                                value: 0,
                                                message:
                                                    'Số lượng không hợp lệ',
                                            },
                                        })}
                                    />
                                    {errors.quantity && (
                                        <i className="text-danger">
                                            {errors.quantity.message}
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
                                    <select
                                        className="form-control form-select"
                                        {...register('status', {
                                            required:
                                                'Trạng thái sản phẩm chưa được lựa chọn',
                                        })}
                                    >
                                        <option value="-1">
                                            -- Chọn tình trạng --
                                        </option>
                                        <option value="1">Còn hàng</option>
                                        <option value="2">Hết hàng</option>
                                        <option value="3">Sắp hết hàng</option>
                                    </select>
                                    {errors.status && (
                                        <i className="text-danger">
                                            {errors.status.message}
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
                                    <select
                                        className="form-control form-select"
                                        {...register('category', {
                                            required:
                                                'Danh mục sản phẩm không được để trống',
                                        })}
                                    >
                                        <option value="-1">
                                            -- Chọn danh mục --
                                        </option>
                                        <option value="điện thoại">
                                            điện thoại
                                        </option>
                                    </select>
                                    {errors.category && (
                                        <i className="text-danger">
                                            {errors.category.message}
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
                                    <select
                                        className="form-control"
                                        {...register('brand', {
                                            required:
                                                'Hãng của sản phẩm không được để trống',
                                        })}
                                    >
                                        <option value="-1">
                                            -- Chọn hãng của sản phẩm --
                                        </option>
                                        <option value="abc">abc</option>
                                    </select>
                                    {errors.brand && (
                                        <i className="text-danger">
                                            {errors.brand.message}
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
                                                    <img
                                                        src={image.url}
                                                        alt="..."
                                                    />
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
                                    {errors.images && (
                                        <i className="text-danger">
                                            {errors.images.message}
                                        </i>
                                    )}
                                </div>
                                <div className="form-group col-md-12">
                                    <label className="control-label">
                                        Mô tả sản phẩm
                                    </label>
                                    <div>
                                        <CustomCKeditor
                                            data={'hi'}
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
