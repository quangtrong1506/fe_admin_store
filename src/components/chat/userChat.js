import { memo } from 'react';
import { getTextTimeMessage } from '../../helpers/common';
import Loading from '../loading';
const UsersChat = ({ users, inbox, setUserInbox }) => {
    if (!users) return <Loading />;
    return (
        <>
            {users &&
                users.map((chat, index) => {
                    // đã đọc
                    let isAdminChat = chat.message.sender_id !== chat.user._id;
                    let read = chat.message.read;

                    return (
                        <div
                            key={index}
                            className={
                                chat.user._id === inbox?.user._id
                                    ? 'chat_list active_chat'
                                    : 'chat_list'
                            }
                            onClick={() => {
                                setUserInbox(chat);
                            }}
                        >
                            <div className="chat_people">
                                <div className="chat_img">
                                    <img src={chat.user.avatar} alt="avatar" />
                                </div>
                                <div className="chat_ib">
                                    <h5>
                                        {chat.user.name}
                                        <span className="chat_date">
                                            {chat.message.text &&
                                                getTextTimeMessage(
                                                    chat.message.created_at
                                                )}
                                        </span>
                                    </h5>
                                    {chat.message.text && (
                                        <p className={read ? '' : 'unread'}>
                                            {isAdminChat && 'You: '}
                                            {chat.message.text}
                                        </p>
                                    )}
                                    {!chat.message.text && (
                                        <p>Chưa có tin nhắn nào</p>
                                    )}

                                    {!isAdminChat && !read && (
                                        <div className="chat_ib__dot"></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
        </>
    );
};
export default memo(UsersChat);
