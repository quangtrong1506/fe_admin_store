import { getHeaderWithAuthorizationBearerToken } from '../../helpers/common';
import baseAdminAxios from '../../plugins/axios';
const baseRoute = 'orders/';

const orderApis = {
    index: (params) => {
        return baseAdminAxios.get(baseRoute, {
            params,
            headers: getHeaderWithAuthorizationBearerToken(),
        });
    },

    show: (userId) => {
        return baseAdminAxios.get(baseRoute + userId, {
            headers: getHeaderWithAuthorizationBearerToken(),
        });
    },
    update: (userId, data) => {
        return baseAdminAxios.put(baseRoute + userId, data, {
            headers: getHeaderWithAuthorizationBearerToken(),
        });
    },
    count: () => {
        return baseAdminAxios.get(baseRoute + 'count', {
            headers: getHeaderWithAuthorizationBearerToken(),
        });
    },
};

export default orderApis;
