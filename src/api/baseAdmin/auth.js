import { getHeaderWithAuthorizationBearerToken } from '../../helpers/common';
import baseAdminAxios from '../../plugins/axios';
const baseRoute = 'admin/';
const authApis = {
    login: (data) => {
        return baseAdminAxios.post(baseRoute + 'login', data);
    },
    changePassword: (data) => {
        return baseAdminAxios.post(
            baseRoute + 'confirm-account/change-password',
            data
        );
    },
    confirmAccount: (data) => {
        return baseAdminAxios.post(baseRoute + 'confirm-account', data);
    },
    show: (id) => {
        return baseAdminAxios.get(baseRoute + 'profile/' + id);
    },
    myInfo: () => {
        return baseAdminAxios.get(baseRoute + 'profile', {
            headers: getHeaderWithAuthorizationBearerToken(),
        });
    },
};

export default authApis;
