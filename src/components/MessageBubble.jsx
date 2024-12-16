import React, { useEffect, useState } from 'react';
import { MessageBubbleWrapper } from './styles';
import moment from 'moment';
import { COLORS, SERVER_ROUTES } from '../lib/settings';
import { axiosInstance } from '../lib/network';
import { useAuthStore } from '../store/auth.store';

const MessageBubble = ({ message, isOwnMessage }) => {
    const { authUser } = useAuthStore();
    const [messageTime, setMessageTime] = useState("");
    useEffect(() => {
        let date = moment(message?.timeStamp);
        let formattedTime = date.format("hh:mm");
        setMessageTime(formattedTime);

        // set message to read upon mounting on screen
        const readMessage = async () => {
            try {
                await axiosInstance.get(`${SERVER_ROUTES.READ_MESSAGE}/${message.id}`, {
                    headers: {
                        Authorization: `Bearer ${authUser.jwt}`
                    }
                });
            } catch (e) {
                console.log(`Error updating message ${message.id} to read`, e);
            }
        };

        readMessage();

    }, []);
    return (
        <MessageBubbleWrapper isOwnMessage={isOwnMessage} style={{
            background: isOwnMessage ? COLORS.ownMessageBackground : 'white',
            marginLeft: isOwnMessage ? 'auto' : '0px'
        }}>
            <div className="message_content">
                {message?.content}
            </div>
            <div className="message_time">
                {messageTime}
            </div>
        </MessageBubbleWrapper>
    );
};

export default MessageBubble;
