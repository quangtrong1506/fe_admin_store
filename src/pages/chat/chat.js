import { memo, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import chatApis from '../../api/baseAdmin/chat';
import messageApis from '../../api/baseAdmin/message';
import '../../assets/css/chat.css';
import InboxChat from '../../components/chat/inbox';
import UsersChat from '../../components/chat/userChat';
import { setNavigationValue } from '../../features/navigation/navigationSlice';
import socketio from '../../plugins/socketio';
const Chat = () => {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [userInbox, setUserInbox] = useState(null);
    const [users, setUsers] = useState(null);
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        dispatch(setNavigationValue([{ url: '#', title: 'Chat' }]));
    }, [dispatch]);
    useEffect(() => {
        async function getList() {
            const res = await chatApis.listUserChatWithAdmin();
            if (res.success) setUsers(res.data);
        }

        getList();
        // 1p làm mới 1 lần
        setInterval(() => {
            getList();
        }, 60 * 1000);

        // socket
        const newSocket = socketio('chat');
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket === null) return;
        socket.on('get_user_chat', async (data) => {
            const usersClone = users.slice();
            const user = usersClone.find((u) => u.user._id === data.userId);
            // nếu là user vừa tạo thì lấy dữ liệu mới từ server
            if (!user) {
                const res = await chatApis.listUserChatWithAdmin();
                if (res.success) setUsers(res.data);
            } else {
                // nếu đang mở đoạn chat thì set trạng thái tin nhắn là đã đọc
                if (userInbox?.user._id === data.userId) {
                    user.message = data.message;
                    user.message.read = true;
                    setUsers(usersClone);
                    await messageApis.readMessage(userInbox.chat._id);
                } else {
                    user.message = data.message;
                    setUsers(usersClone);
                }
            }
        });
        return () => {
            socket.off('get_user_chat');
        };
    }, [socket, userInbox, users]);
    const handleInboxChat = async (inbox) => {
        if (userInbox?.chat._id !== inbox.chat._id) {
            setUserInbox(inbox);
            const a = users.slice();
            let i = a.findIndex((user) => user.chat._id === inbox.chat._id);
            if (i !== -1) {
                const newUserChat = a[i];
                newUserChat.message.read = true;
                setUsers(a);
            }
            await messageApis.readMessage(inbox.chat._id);
        }
    };
    return (
        <>
            <div className="messaging">
                <div className="inbox_msg">
                    <div className="inbox_people">
                        <div className="headind_srch">
                            <div className="recent_heading">
                                <h4>Recent</h4>
                            </div>
                            <div className="srch_bar">
                                <div className="stylish-input-group">
                                    <input
                                        type="text"
                                        className="search-bar"
                                        placeholder="Search"
                                    />
                                    <span className="input-group-addon">
                                        <button type="button">
                                            <FaSearch />
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="inbox_chat">
                            <UsersChat
                                users={users}
                                inbox={userInbox}
                                setUserInbox={handleInboxChat}
                            />
                        </div>
                    </div>
                    <div className="mesgs">
                        <InboxChat
                            user={userInbox?.user}
                            chat={userInbox?.chat}
                            socket={socket}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default memo(Chat);
