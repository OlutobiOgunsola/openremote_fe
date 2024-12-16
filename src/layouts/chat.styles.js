import styled from "styled-components";
import { COLORS } from "../lib/settings";

export const ChatPageWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background: #fff;
    border: none;
    display: flex;
    flex-flow: row nowrap;
    background: ${COLORS.highlightColor}
`;

export const ChatSidebar = styled.div`
    width: 300px;
    height: 100%;
    background: #fff;
    display: flex;
    flex-flow: column nowrap;
    border-right: solid 1px ${COLORS.sidebarBorder};
    
    padding: 24px 0px;
    box-sizing: border-box;
    
    .hidden {
        visibility: hidden;
    }
    
    #logo_container {
        margin-bottom: 16px;
        padding: 0px 16px;
        box-sizing: border-box;
    }
    #logo {
        width: 112px;
        height: 42px;
    }
        
    #search_container {
        padding: 0px 16px;
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 24px;
        
        #search_input {
            position: relative;
            img {
                position: absolute;
                left: 16px;
                top: 10px;
                opacity: 0.7;
                transition: all 0.25s ease-in-out;
                
                &:hover {
                    cursor: pointer;
                    opacity: 1;
                }
            }
            input {
                width: 100%;
                height: 40px;
                border: none;
                background: ${COLORS.highlightColor};
                font-family: inter;
                font-weight: 300;
                font-size: 16px;
                border-radius: 32px;
                padding-left: 52px;
                box-sizing: border-box;
            }
        }
    }
`;

export const ChatBoxGroup = styled.div`
    width: calc(100% - 300px);
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
`;

export const ChatBox = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
    padding-bottom: 24px;
    box-sizing: border-box;
    
    .fluid {
        width: 100%;
    }
    
    .full_height {
        height: 100%;
    }
        
    #start_conversation {
        font-family: inter;
        font-size: 16px;
        font-weight: 500;
    }
        
    .centered_items {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column nowrap;
    }
    
    #chatbox_header {
        width: 100%;
        height: 80px;
        background: #fff;
        border-bottom: solid 1px ${COLORS.sidebarBorder};
        padding: 10px 16px;
        box-sizing: border-box;
        
        #header_content_container {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            width: fit-content;
            &:hover {
                cursor: pointer;
            }
        }
        
        #header_initials_span {
            background: ${COLORS.primary};
            color: #fff;
            display: inline-block;
            width: 48px;
            height: 48px;
            border: none;
            border-radius: 50%;
            text-align: center;
            line-height: 48px;
            margin-right: 8px;
            font-family: inter;
            font-weight: 600;
        }
        #header_username {
            font-family: inter;
            font-weight: 600;
            color: ${COLORS.fontBlack};
        }
    }
        
    #chat_container {
        width: calc(100% - 120px);
        margin: 0 auto;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        overflow: hidden;
        
        #message_history {
            height: 420px;
            width: 100%;
            display: flex;
            flex-flow: column nowrap;
            justify-content: flex-end;
        }
        
        #message_input {
            margin-top: auto;
            label {
                visibility: hidden;
            }
                
            #message_input_group {
                position: relative; 
                input {
                    background: #fff;
                    width: 100%;
                    height: 40px;
                    border: none;
                    border-radius: 8px;
                    padding: 0px 16px;
                    box-sizing: border-box;
                    
                    &:focus {
                        outline: none;
                    }
                }
                img {
                    position: absolute;
                    right: 14px;
                    top: 26px;
                    opacity: 0.7;
                    transition: all 0.5s ease-in-out;
                    
                    &:hover {
                        opacity: 1;
                        cursor: pointer;
                    }
                }
            }
        }
    }
`;
export const RightSidebar = styled.div`
    width: 400px;
    height: 100%;
    background: #fff;
    padding: 16px;
    box-sizing: border-box;
    border-left: solid 1px ${COLORS.sidebarBorder};
    
    #sidebar_container {
        display: flex;
        flex-flow: column nowrap;
        padding-bottom: 32px;
        box-sizing: border-box;
        border-bottom: solid 1px ${COLORS.sidebarBorder};
    }
    #close_button {
        margin-bottom: 16px;
        img {
            width: 10px;
            height: 10px;
            opacity: 0.7;
            transition: all 0.5s ease-in-out;
            &:hover {
                cursor: pointer;
            }
        }
    }
        
    #profile_name {
        width: 100%;
        margin-bottom: 16px;
            
        #profile_name_span {
            display: block;
            width: 135px;
            height: 135px;
            border: none;
            border-radius: 50%;
            background: ${COLORS.primary};
            color: #fff;
            font-family: inter;
            font-size: 32px;
            font-weight: 600;
            text-align: center;
            line-height: 135px;
            margin: 0 auto;
        }
    }
        
    #profile_details {
        p {
            margin: 0px;
            margin-bottom: 4px;
            width: 100%;
            text-align: center;
            font-family: inter;
        }
        #profile_heavy {
            font-size: 16px;
            font-weight: 600;
            color: ${COLORS.fontBlack};
        }
        .profile_light {
            font-size: 12px;
            font-weight: 300;
            color: ${COLORS.fontGrey};
        }
    }
`;