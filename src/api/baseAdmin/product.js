import { getHeaderWithAuthorizationBearerToken } from '../../helpers/common';
import baseAdminAxios from '../../plugins/axios';
const baseRoute = 'products/';

const productApis = {
    index: (option) => {
        return baseAdminAxios.get(baseRoute, {
            params: {
                page: option?.page,
                q: option.q,
                limit: option?.limit,
            },
        });
    },
    show: (id) => {
        return baseAdminAxios.get(baseRoute + id);
    },
    add: (data) => {
        return baseAdminAxios.post(baseRoute + 'add', data, {
            headers: getHeaderWithAuthorizationBearerToken(),
        });
    },
    update: (id, data) => {
        return baseAdminAxios.put(baseRoute + id, data, {
            headers: getHeaderWithAuthorizationBearerToken(),
        });
    },
    delete: (id) => {
        return baseAdminAxios.delete(baseRoute + id, {
            headers: getHeaderWithAuthorizationBearerToken(),
        });
    },
    count: () => {
        return baseAdminAxios.get(baseRoute + 'count', {
            headers: getHeaderWithAuthorizationBearerToken(),
        });
    },
    countWarning: () => {
        return baseAdminAxios.get(baseRoute + 'warning', {
            headers: getHeaderWithAuthorizationBearerToken(),
        });
    },
};

export default productApis;
