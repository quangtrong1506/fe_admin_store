import { getHeaderWithAuthorizationBearerToken } from '../../helpers/common';
import baseAdminAxios from '../../plugins/axios';
const baseRoute = 'chat/';

const chatApis = {
    listUserChatWithAdmin: () => {
        return baseAdminAxios.get(baseRoute + 'user-chat-with-admin', {
            headers: getHeaderWithAuthorizationBearerToken(),
        });
    },
};

export default chatApis;
