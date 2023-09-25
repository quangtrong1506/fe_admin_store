import { getHeaderWithAuthorizationBearerToken } from '../../helpers/common';
import baseAdminAxios from '../../plugins/axios';
const baseRoute = 'message/';

const messageApis = {
    getListMessage: (id) => {
        return baseAdminAxios.get(baseRoute + 'user/' + id, {
            headers: getHeaderWithAuthorizationBearerToken(),
        });
    },
    sendMessage: ({ text, chat_id, user_id }) => {
        return baseAdminAxios.post(
            baseRoute + 'admin-to-user',
            { text, chat_id, user_id },
            {
                headers: getHeaderWithAuthorizationBearerToken(),
            }
        );
    },
    readMessage: (chat_id) => {
        return baseAdminAxios.put(
            baseRoute + 'admin-read-message',
            { chat_id },
            { headers: getHeaderWithAuthorizationBearerToken() }
        );
    },
};

export default messageApis;
