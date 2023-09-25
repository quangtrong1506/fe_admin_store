import { memo } from 'react';
import { getTextTime } from '../../helpers/common';

const Message = ({ user, message }) => {
    return (
        <>
            {user?._id === message.sender_id && (
                <div className="incoming_msg">
                    <div className="incoming_msg_img">
                        <img src={user?.avatar} alt="avatar" />
                    </div>
                    <div className="received_msg">
                        <div className="received_withd_msg">
                            <p>{message.text}</p>
                            <span className="time_date">
                                {getTextTime(message.created_at).date}{' '}
                                {getTextTime(message.created_at).hour}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {user?._id !== message.sender_id && (
                <div className="outgoing_msg">
                    <div className="sent_msg">
                        <p>{message.text}</p>
                        <span className="time_date">
                            {getTextTime(message.created_at).date}
                            {getTextTime(message.created_at).hour}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};
export default memo(Message);
