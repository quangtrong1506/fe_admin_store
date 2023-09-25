import baseAdminAxios from '../../plugins/axios';
import { getHeaderWithAuthorizationBearerToken } from '../../helpers/common';
const baseRoute = 'category/';

const categoryApis = {
    index: () => {
        return baseAdminAxios.get(baseRoute);
    },
    showSpecial: () => {
        return baseAdminAxios.get(baseRoute + 'special');
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

export default categoryApis;
