import baseAdminAxios from '../../plugins/axios';
import { getHeaderWithAuthorizationBearerToken } from '../../helpers/common';
const baseRoute = 'brand/';

const brandApis = {
    index: () => {
        return baseAdminAxios.get(baseRoute);
    },
    add: (name) => {
        return baseAdminAxios.post(
            baseRoute + 'add',
            { name },
            {
                headers: getHeaderWithAuthorizationBearerToken(),
            }
        );
    },
    update: (slug, name) => {
        return baseAdminAxios.put(
            baseRoute + slug,
            { name },
            {
                headers: getHeaderWithAuthorizationBearerToken(),
            }
        );
    },
    delete: (slug) => {
        return baseAdminAxios.delete(baseRoute + slug, {
            headers: getHeaderWithAuthorizationBearerToken(),
        });
    },
};

export default brandApis;
