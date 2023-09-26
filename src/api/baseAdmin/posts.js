import { getHeaderWithAuthorizationBearerToken } from '../../helpers/common';
import baseAdminAxios from '../../plugins/axios';
const baseRoute = 'posts/';

const postsApis = {
    index: (params) => {
        return baseAdminAxios.get(baseRoute, {
            params,
        });
    },
    destroy: (id) => {
        return baseAdminAxios.delete(baseRoute + id, {
            headers: getHeaderWithAuthorizationBearerToken(),
        });
    },
    store: (data) => {
        return baseAdminAxios.post(baseRoute, data, {
            headers: getHeaderWithAuthorizationBearerToken(),
        });
    },
    show: (id) => {
        return baseAdminAxios.get(baseRoute + id);
    },
    update: (id, data) => {
        return baseAdminAxios.put(baseRoute + id, data, {
            headers: getHeaderWithAuthorizationBearerToken(),
        });
    },
};

export default postsApis;
