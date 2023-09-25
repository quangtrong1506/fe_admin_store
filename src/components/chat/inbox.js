import { memo, useEffect, useRef, useState } from 'react';
import messageApis from '../../api/baseAdmin/message';
import Loading from '../loading';
import Message from './message';

const InboxChat = ({ user, chat, socket }) => {
    const listChatRef = useRef();
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        async function getMessages() {
            setLoading(true);
            const res = await messageApis.getListMessage(chat._id);
            if (res.success) {
                setLoading(false);
                setMessages(res.data.docs.reverse());
            }
        }
        if (user) getMessages();
    }, [user]);
    useEffect(() => {
        if (socket === null || !user) return;
        socket.on('get_user_chat', async (data) => {
            if (user._id === data.userId)
                setMessages((pre) => [...pre, data.message]);
        });
        return () => {
            socket.off('get_user_chat');
        };
    }, [socket, user]);
    const sendAChat = async () => {
        const text = document.getElementById('chat-input').value;
        document.getElementById('chat-input').value = '';
        setMessages((pre) => [
            ...pre,
            {
                user_id: user._id,
                text,
                chat_id: chat._id,
                created_at: new Date().toISOString(),
            },
        ]);
        const res = await messageApis.sendMessage({
            user_id: user._id,
            text,
            chat_id: chat._id,
        });
        if (res.success)
            socket.emit('chat_with_user', {
                userId: user._id,
                message: res.data,
            });
    };
    useEffect(() => {
        listChatRef.current.scrollTo({
            top: listChatRef.current.scrollHeight,
            behavior: 'auto',
        });
    }, [messages]);
    return (
        <>
            {user && (
                <div className="header">
                    <h5>{user.name ?? ''}</h5>
                </div>
            )}
            <div className="msg_history" ref={listChatRef}>
                {!user && (
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center fs-4">
                        Select a chat to start chatting
                    </div>
                )}
                {!loading &&
                    messages.map((message, index) => (
                        <Message key={index} message={message} user={user} />
                    ))}
                {user && loading && <Loading />}
            </div>
            {user && !loading && (
                <div className="type_msg">
                    <div className="input_msg_write">
                        <input
                            id="chat-input"
                            type="text"
                            className="write_msg"
                            placeholder="Type a message"
                            onKeyDown={(e) => {
                                if (e.keyCode == 13 || e.which === 13)
                                    sendAChat();
                            }}
                        />
                        <button
                            className="msg_send_btn"
                            type="button"
                            onClick={sendAChat}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
export default memo(InboxChat);
