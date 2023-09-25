import { memo, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../../features/category/categorySlice';
import { stringToSlug } from '../../../helpers/common';
import { showToast } from '../../../helpers/showToast';
import categoryApis from '../../../api/baseAdmin/category';
const CategoryModal = () => {
    const categories = useSelector((state) => state.category);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm({
        defaultValues: { name: '' },
    });
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const formRef = useRef();
    const onSubmit = async (value) => {
        if (!value.name)
            return setError('name', {
                message: 'Tên danh mục không được để trống',
            });
        const res = await categoryApis.add(value.name);
        if (res.success) {
            dispatch(addCategory(value.name));
            showToast({
                message: 'Thêm danh mục sản phẩm thành công',
                type: 'success',
            });
            setValue('name', '');
        } else showToast({ message: res.message, type: 'error' });
    };

    return (
        <>
            <Button
                className="btn-add btn-sm"
                variant="primary"
                onClick={handleShow}
            >
                Thêm danh mục mới
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm danh mục mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label">Tên danh mục</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('name')}
                            />
                            {errors.name && (
                                <div className="form-text text-danger">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Danh mục sản phẩm hiện có
                            </label>
                            <ol className="list-group list-group-numbered on-modal">
                                {categories.map((cat, index) => (
                                    <li key={index} className="list-group-item">
                                        {cat}
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div className="button-grid">
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                            <Button
                                type="submit"
                                className="ml-2"
                                variant="primary"
                            >
                                Thêm mới
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default memo(CategoryModal);
