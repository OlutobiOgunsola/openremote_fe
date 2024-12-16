import React, { useEffect, useState } from 'react';
import { ChatBox, ChatBoxGroup, ChatPageWrapper, ChatSidebar, RightSidebar } from './chat.styles';
import { useMessageStore } from '../store/messages.store';
import { useAuthStore } from '../store/auth.store';
import { IMAGES, SERVER_ROUTES } from '../lib/settings';
import UserListItem from '../components/UserListItem.component';
import { useNavigate } from 'react-router';
import { GetInitialsFromUserObject } from '../lib/utils';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/network';
import MessageBubble from '../components/MessageBubble';

const ChatPageLayout = () => {
    const { users, getUsers, selectedUser, getContactMessages, contactMessages, subscribeToSocketMessages, unsubscribeFromSocketMessages, addContactMessage } = useMessageStore();
    const { authUser, onlineUsers } = useAuthStore();
    const navigate = useNavigate();

    const [messageContent, setMessageContent] = useState("");
    const [query, setQuery] = useState("");
    const [qUsers, setQUsers] = useState(""); // users returned from query function
    const [showDrawer, setShowDrawer] = useState(false);

    useEffect(() => {
        // fetch all users
        getUsers(authUser, navigate);
    }, [getUsers, onlineUsers]);
    useEffect(() => {
        setMessageContent("");

        // close right drawer
        setShowDrawer(false);

        // get messages for selected user
        getContactMessages(selectedUser?.id, authUser);
        subscribeToSocketMessages();

        return () => {
            // unsubscribe from socket connection if the chat page is unmounted
            unsubscribeFromSocketMessages();
        };
    }, [selectedUser]);
    const sendMessage = async () => {
        if (!messageContent.trim()) {
            return toast.error("You cannot send an empty message");
        };

        try {

            let request = await axiosInstance.post(SERVER_ROUTES.POST_MESSAGE, {
                content: messageContent,
                receiver: selectedUser.id
            }, {
                headers: {
                    Authorization: `Bearer ${authUser.jwt}`
                }
            });
            if (request) {
                setMessageContent("");

                // add message to contactMessages
                // getContactMessages();
                addContactMessage(request?.data?.data);
            }
        } catch (e) {
            console.log("Error posting message", e);
            toast.error("Error posting message!");
        }
    };

    const handleMessageInputChange = (e) => {
        if (e.code === "Enter") sendMessage();
        setMessageContent(e.target.value);
    };

    const toggleDrawer = () => {
        setShowDrawer(!showDrawer);
    };

    const closeDrawer = () => {
        setShowDrawer(false);
    };

    const search = () => {
        console.log("searching", query);
        let usersFilter = users.filter((user) => (
            (user.email === query) || (user.phoneNo === query.toString())
        ));

        console.log("user filters", users, usersFilter);
        if (usersFilter.length > 0) {
            setQUsers(usersFilter);
        }
    };

    const handleSearch = (e) => {
        if (query.length === 0) {
            setQUsers(null);
        }
        setQuery(e.target.value);
    };

    return (
        <ChatPageWrapper>
            <ChatSidebar>
                <div id="logo_container">
                    <img src={IMAGES.Logo} id="logo" alt="" />
                </div>
                <div id="search_container">
                    <label htmlFor="search" className="hidden">Search</label>
                    <div id="search_input">
                        <input type="text" name="search" placeholder="Search" onChange={handleSearch} />
                        <img src={IMAGES.Search} alt="" onClick={search} />
                    </div>
                </div>
                <div id="userlist_container">
                    {
                        !qUsers && users?.map((user) => (<UserListItem key={user.id} userObject={user} selected={selectedUser?.id === user?.id}
                            online={onlineUsers.indexOf(user.id) > -1}
                        />)
                        )
                    }
                    {
                        qUsers && qUsers.map((user) => (<UserListItem key={user.id} userObject={user} selected={selectedUser?.id === user?.id}
                            online={onlineUsers.indexOf(user.id) > -1}
                        />)
                        )
                    }
                </div>
            </ChatSidebar>
            <ChatBoxGroup>
                <ChatBox>
                    {
                        !selectedUser && <>
                            <div className="fluid full_height centered_items">
                                <img src={IMAGES.Logo} alt="" />
                                <p id="start_conversation">
                                    Start a conversation!
                                </p>
                            </div>
                        </>
                    }
                    {
                        selectedUser && <div id="chatbox_header">
                            <div id="header_content_container" onClick={toggleDrawer}>
                                <span id="header_initials_span">
                                    {
                                        GetInitialsFromUserObject(selectedUser)
                                    }
                                </span>
                                <p id="header_username">
                                    {
                                        selectedUser.userName
                                    }
                                </p>
                            </div>
                        </div>
                    }
                    {
                        selectedUser && <div id="chat_container">
                            <div id="message_history">
                                {
                                    contactMessages.map((message) => (
                                        <MessageBubble key={message.id} message={message} isOwnMessage={message.sender === authUser.id} />
                                    ))
                                }
                            </div>
                            <div id="message_input">
                                <div id="message_input_group">
                                    <label htmlFor="message">Message</label>
                                    <input type="text" name="message" placeholder="Message" value={messageContent} onChange={handleMessageInputChange} />
                                    <img src={IMAGES.Send} alt="" onClick={sendMessage} />
                                </div>
                            </div>
                        </div>
                    }
                </ChatBox>
                {
                    showDrawer &&
                    <RightSidebar>
                        <div id="sidebar_container">

                            <div id="close_button">
                                <img src={IMAGES.Close} alt="" onClick={closeDrawer} />
                            </div>
                            <div id="profile_name">
                                <span id="profile_name_span">
                                    {
                                        GetInitialsFromUserObject(selectedUser)
                                    }
                                </span>
                            </div>
                            <div id="profile_details">
                                <p id="profile_heavy">
                                    {
                                        selectedUser?.userName
                                    }
                                </p>
                                <p className="profile_light">
                                    {
                                        selectedUser?.phoneNo
                                    }
                                </p>
                                <p className="profile_light">
                                    {
                                        selectedUser?.email
                                    }
                                </p>
                            </div>
                        </div>
                    </RightSidebar>
                }
            </ChatBoxGroup>
        </ChatPageWrapper>
    );
};

export default ChatPageLayout;
