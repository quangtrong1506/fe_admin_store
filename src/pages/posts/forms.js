import { memo, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCloudArrowUp } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import postsApis from '../../api/baseAdmin/posts';
import CustomCKeditor from '../../components/ckeditor/customCKeditor';
import { setNavigationValue } from '../../features/navigation/navigationSlice';
import { stringToSlug, uploadImage } from '../../helpers/common';
import { showToast } from '../../helpers/showToast';

const MySwal = withReactContent(Swal);
const PostsForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [thumbnail, setThumbnail] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            title: '',
        },
    });

    const content = useRef('');
    //
    useEffect(() => {
        dispatch(
            setNavigationValue([
                { url: '/posts', title: 'Quản lý bài viết' },
                {
                    url: '#',
                    title: id ? 'Chỉnh sửa bài viết' : 'Thêm bài viết',
                },
            ])
        );
        if (id) {
            (async () => {
                const res = await postsApis.show(id);
                if (res.success) {
                    setValue('title', res.data.title);
                    setThumbnail({ url: res.data.thumbnail });
                    content.current = res.data.content;
                } else {
                    if (res.status === 404) {
                        MySwal.fire({
                            title: 'Bài viết không tồn tại',
                            confirmButtonText: 'Ok',
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate('/posts');
                            } else if (result.isDenied) {
                                Swal.fire('Changes are not saved', '', 'info');
                            }
                        });
                    } else
                        MySwal.fire({
                            title: 'Lỗi',
                            html: res.message,
                            showDenyButton: true,
                            confirmButtonText: 'Xác nhận',
                            denyButtonText: 'Tải lại',
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate('/posts');
                            } else if (result.isDenied) {
                                navigate(0);
                            }
                        });
                }
            })();
        }
    }, [dispatch, id]);
    const handleDataCKEditor = (value) => {
        content.current = value;
    };
    const handleImageUploadChange = (e) => {
        const file = e.target.files[0];
        setThumbnail({
            url: URL.createObjectURL(file),
            data: file,
        });
    };
    const submitHandle = async (value) => {
        console.log(thumbnail);
        if (!content.current || content.current.trim() === '') {
            MySwal.fire('Chưa nhập chi tiết bài viết', '', 'info');
        } else if (!thumbnail || !thumbnail.url) {
            MySwal.fire('Chưa có ảnh đại diện cho bài viết', '', 'info');
        } else {
            progressUploading(true, 0);
            const formData = new FormData();
            formData.append('title', value.title ?? '');
            const imagesUpload = [];
            // images / desc
            //Todo save images
            const forLoop = async (_) => {
                //Todo: sử lý lưu ảnh ck editor
                let element = document.createElement('div');
                element.innerHTML = content.current;
                const imgs = element.getElementsByTagName('img');
                for (let i = 0; i < imgs.length; i++) {
                    const image = imgs[i];
                    if (image.matches('base64')) continue;
                    const res = await uploadImage(image.src, {
                        name: stringToSlug(value.name),
                    });
                    if (!res.success)
                        return MySwal.fire(
                            'Lỗi lưu ảnh ở CKeditor',
                            res.error.message,
                            'error'
                        ).then(() => progressUploading(false));
                    progressUploading(
                        true,
                        Math.floor(((i + 1) / (imgs.length + 1)) * 100)
                    );
                    imgs[i].src = res.data.display_url;
                }
                formData.append('content', element.innerHTML);
            };
            await forLoop();
            if (
                !thumbnail.data ||
                thumbnail.url.match('base64') ||
                !thumbnail.url.match('blob:')
            ) {
                ///
            } else {
                const res = await uploadImage(thumbnail.data, {
                    name: stringToSlug(value.title),
                });
                if (!res.success)
                    return MySwal.fire(
                        'Lỗi lưu ảnh ở ảnh đại diện',
                        res.error.message,
                        'error'
                    ).then(() => progressUploading(false));
                progressUploading(true, 100);
                formData.append('thumbnail', res.data.display_url);
            }
            if (!formData.get('thumbnail'))
                formData.append('thumbnail', thumbnail.url);
            let res = {};
            if (!id) res = await postsApis.store(formData);
            else res = await postsApis.update(id, formData);
            if (res.success) {
                showToast({
                    message: !id
                        ? 'Thêm sản phẩm thành công'
                        : 'Chỉnh sửa sản phẩm thành công',
                });
                navigate('/posts');
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
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <h3 className="tile-title">
                            {id ? 'Chỉnh sửa bài viết' : 'Thêm bài viết'}
                        </h3>
                        <div className="tile-body">
                            <form
                                className="row"
                                onSubmit={handleSubmit(submitHandle)}
                            >
                                <div className="form-group col-md-12">
                                    <label className="control-label">
                                        Tiêu đề bài viết
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        {...register('title', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Tiêu đề không được để trống',
                                            },
                                        })}
                                    />
                                    {errors.title && (
                                        <label style={{ color: 'red' }}>
                                            {errors.title.message}
                                        </label>
                                    )}
                                </div>
                                <div className="form-group col-md-12">
                                    <label className="control-label">
                                        Ảnh bài viết
                                    </label>
                                    <div className="row list-images">
                                        <div className="col-6">
                                            <img src={thumbnail?.url} alt="" />
                                        </div>
                                        <div className="col-6 upload ">
                                            <input
                                                type="file"
                                                name="ImageUpload"
                                                accept="image/jpg, image/png, image/jpeg"
                                                style={{
                                                    display: 'none',
                                                }}
                                                id="uploadfile"
                                                onChange={
                                                    handleImageUploadChange
                                                }
                                            />
                                            <label
                                                className="btn btn-primary"
                                                htmlFor="uploadfile"
                                            >
                                                <FaCloudArrowUp
                                                    size={18}
                                                    className="fa-icon"
                                                />
                                                <span> Chọn ảnh</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-md-12">
                                    <label className="control-label">
                                        Chi tiết bài viết
                                    </label>
                                    <div>
                                        <CustomCKeditor
                                            data={content.current}
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
export default memo(PostsForm);
