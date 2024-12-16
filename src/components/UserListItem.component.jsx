import React, { useEffect, useState } from 'react';
import { UserListItemWrapper } from './styles';
import { GetInitialsFromUserObject } from '../lib/utils';
import { useMessageStore } from '../store/messages.store';
import { axiosInstance } from '../lib/network';
import { COLORS, SERVER_ROUTES } from '../lib/settings';
import { useAuthStore } from '../store/auth.store';
import moment from 'moment';

const UserListItem = ({ userObject, selected, online }) => {

    const { authUser } = useAuthStore();
    const { setSelectedUser, contactMessages } = useMessageStore();
    const [initials, setInitials] = useState("");
    const [umc, setUMC] = useState(0); // unread messages count
    const [lastMessage, setLastMessage] = useState(null);
    useEffect(() => {
        // get last message
        const getLastMessageAndUnreadMessageCount = async () => {
            try {
                let request = await axiosInstance.get(`${SERVER_ROUTES.GET_CONTACT_MESSAGES}/${userObject.id}`, {
                    headers: {
                        Authorization: `Bearer ${authUser.jwt}`
                    }
                });
                const lastM = request.data.data.pop();

                let date = moment(lastM?.timeStamp);
                let formattedTime = date.format("hh:mm");
                lastM['time'] = formattedTime;
                setLastMessage(lastM);

                // get unread message count
                const unreadMessages = request.data.data.filter(message => ((message.opened === false) && (message.sender !== authUser.id)));
                console.log("unread messages", unreadMessages, request.data.data);
                setUMC(unreadMessages.length);
            } catch (e) {
                console.log("Error getting contact last messages", e);
            }
        };
        getLastMessageAndUnreadMessageCount();
        // get initials
        const ini = GetInitialsFromUserObject(userObject);
        setInitials(ini);
    }, [contactMessages]);

    const handleSelectUser = () => {
        setUMC(0);
        return setSelectedUser(userObject);
    };
    return (
        <UserListItemWrapper onClick={handleSelectUser} style={{
            background: selected ? COLORS.highlightColor : ''
        }}>
            <span className="initials_span">
                {initials.toUpperCase()}
                {
                    online && <span className="online_badge"></span>
                }
            </span>
            <div className="userlist_details">
                <div className="userlist_header">
                    <span className="userlist_username">
                        {userObject?.userName}
                    </span>
                    <span className="userlist_last_message_time">
                        {lastMessage?.time}
                    </span>
                </div>
                <div className="userlist_content">
                    {lastMessage?.sender === authUser?.id ? <span className="userlist_you">
                        {"You: "}
                    </span> : ""}
                    <span className="userlist_message_content">{
                        lastMessage?.content || "Start a conversation!"
                    }</span>
                    {
                        umc > 0 && <span className="unread_message_count">
                            {umc}
                        </span>
                    }
                </div>
            </div>
        </UserListItemWrapper>
    );
};

export default UserListItem;
