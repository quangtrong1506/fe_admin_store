import { memo, useRef } from 'react';

import { useEffect, useState } from 'react';
import { FaPenToSquare, FaPlus, FaTrash } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { setNavigationValue } from '../../features/navigation/navigationSlice';
import { stringToSlug, useQuery } from '../../helpers/common';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import categoryApis from '../../api/baseAdmin/category';
import {
    addCategory,
    setCategory,
    updateCategory,
} from '../../features/category/categorySlice';
import { showToast } from '../../helpers/showToast';
const MySwal = withReactContent(Swal);
const CategoryIndex = () => {
    const categories = useSelector((state) => state.category);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [isUpdate, setUpdate] = useState(false);
    const oldName = useRef('');
    const handleClose = () => {
        setShow(false);
        setUpdate(false);
    };
    const handleShow = () => setShow(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm({
        defaultValues: { name: '' },
    });
    useEffect(() => {
        dispatch(
            setNavigationValue([
                { url: '/category', title: 'Quản lý danh mục sản phẩm' },
            ])
        );
    }, [dispatch]);
    const onSubmit = async (value) => {
        if (!value.name)
            return setError('name', {
                message: 'Tên danh mục không được để trống',
            });
        let res = {};
        if (!isUpdate) res = await categoryApis.add(value.name);
        else
            res = await categoryApis.update(
                stringToSlug(oldName.current),
                value.name
            );
        if (res.success) {
            if (isUpdate) {
                dispatch(
                    updateCategory({
                        old: oldName.current,
                        new: value.name,
                    })
                );
                handleClose();
            } else {
                dispatch(addCategory(value.name));
            }
            showToast({
                message: isUpdate
                    ? 'Cập nhật danh mục sản phẩm thành công'
                    : 'Thêm danh mục sản phẩm thành công',
                type: 'success',
            });
            oldName.current = '';
            setValue('name', '');
        } else showToast({ message: res.message, type: 'error' });
    };
    const handleEdit = (name) => {
        setUpdate(true);
        handleShow();
        oldName.current = name;
    };
    const handleDelete = (slug) => {
        Swal.fire({
            title: 'Xác nhận xoá?',
            text: 'Hãy xác nhận xoá danh mục sản phẩm vừa chọn!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, Xoá nó!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await categoryApis.delete(slug);
                if (res.success) {
                    MySwal.fire(
                        'Đã xoá!',
                        'Đã xoá dan mục sản phẩm thành công',
                        'success'
                    );
                    const index = categories.findIndex((cat) => {
                        return stringToSlug(cat) === slug;
                    });
                    if (index >= 0) {
                        const newBrads = [...categories];
                        newBrads.splice(index, 1);
                        dispatch(setCategory(newBrads));
                    }
                } else showToast({ message: res.message, type: 'error' });
            }
        });
    };
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="tile-body">
                            <div className="row element-button">
                                <div className="col-md-9 col-sm-6 col-12">
                                    <Button
                                        className="btn-add btn-sm"
                                        variant="primary"
                                        onClick={handleShow}
                                    >
                                        <FaPlus className="fa-icon" /> Thêm danh
                                        mục mới
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <div className="row">
                                    <div className="col">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th
                                                        width="80"
                                                        scope="col"
                                                        className="text-center"
                                                    >
                                                        #
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="text-center"
                                                    >
                                                        Name
                                                    </th>

                                                    <th scope="col" width="120">
                                                        Handle
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {categories.map(
                                                    (cat, index) => (
                                                        <tr key={index}>
                                                            <th
                                                                width="40"
                                                                scope="row"
                                                                className="text-center"
                                                            >
                                                                {index + 1}
                                                            </th>
                                                            <td>{cat}</td>
                                                            <td width={50}>
                                                                <button
                                                                    className="btn btn-light"
                                                                    type="button"
                                                                >
                                                                    <FaPenToSquare
                                                                        onClick={() => {
                                                                            handleEdit(
                                                                                cat
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
                                                                                stringToSlug(
                                                                                    cat
                                                                                )
                                                                            );
                                                                        }}
                                                                    />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isUpdate
                            ? 'Cập nhật danh mục sản phẩm'
                            : 'Thêm danh mục mới'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label">
                                {isUpdate ? (
                                    <span>
                                        Tên danh mục cũ:{' '}
                                        <span className="text-info">
                                            {oldName.current}
                                        </span>
                                    </span>
                                ) : (
                                    'Tên danh mục'
                                )}
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tên hãng mới"
                                autoComplete="off"
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
                                {isUpdate ? 'Lưu lại' : 'Thêm mới'}
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};
export default memo(CategoryIndex);
