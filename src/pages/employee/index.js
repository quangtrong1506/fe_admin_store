import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNavigationValue } from '../../features/navigation/navigationSlice';

const EmployeeManager = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            setNavigationValue([
                { url: '/employee-manager', title: 'Quản lý nhân viên' },
            ])
        );
    }, [dispatch]);
    return (
        <>
            <div class="row">
                <div class="col-md-12">
                    <div class="tile">
                        <div class="tile-body">
                            <div class="row element-button">
                                <div class="col-sm-2">
                                    <a
                                        class="btn btn-add btn-sm"
                                        href="them-nhan-vien"
                                        title="Thêm"
                                    >
                                        <i class="fas fa-plus"></i>
                                        Thêm nhân viên
                                    </a>
                                </div>
                            </div>
                            <div>
                                <div className="row">
                                    <div className="col">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th width="20" scope="col">
                                                        #
                                                    </th>
                                                    <th scope="col">First</th>
                                                    <th scope="col">Last</th>
                                                    <th scope="col">Handle</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th width="20" scope="row">
                                                        1
                                                    </th>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default memo(EmployeeManager);
