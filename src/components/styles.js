import styled from "styled-components";
import { COLORS } from "../lib/settings";

export const UserListItemWrapper = styled.div`
	display: flex;
	flex-flow: row nowrap;
	padding: 8px 16px;
	box-sizing: border-box;
	width: 100%;
	.initials_span {
		width: 48px;
		height: 48px;
		background: ${COLORS.primary};
		color: #fff;
		border: none;
		border-radius: 50%;
		text-align: center;
		font-family: inter;
		font-weight: 500;
		font-size: 16px;
		line-height: 48px;

		position: relative;
	}

	.online_badge {
		display: inline-block;
		width: 10px;
		height: 10px;
		border: none;
		border-radius: 50%;
		background: ${COLORS.onlineBadgeColor};
		position: absolute;
		top: 5px;
	}

	.userlist_details {
		display: inherit;
		flex-flow: column nowrap;
		padding: 6px 12px;
		padding-right: 0px;
		box-sizing: border-box;
		width: calc(100% - 48px);
	}

	.userlist_header {
		display: inherit;
		flex-flow: row nowrap;
		justify-content: space-between;
		margin-bottom: 4px;
	}

	.userlist_username {
		font-family: inter;
		font-weight: 600;
		font-size: 14px;
		color: ${COLORS.fontBlack};
	}

	.userlist_last_message_time {
		font-family: inter;
		font-weight: 300;
		font-size: 10px;
		line-height: 18px;
		color: ${COLORS.fontGrey};
	}
        
    .userlist_content {
        display: flex;
        flex-flow: row nowrap;
        position: relative;
        width: 100%;
    }
        
    .userlist_you {
        width: 30px;
        display: inline;
		font-family: inter;
		font-weight: 400;
		font-size: 12px;
		color: ${COLORS.fontGrey};
    }

	.userlist_message_content {
		width: 200px;
		display: inline-block;
		font-family: inter;
		font-weight: 400;
		font-size: 12px;
		color: ${COLORS.fontGrey};
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
        
    .unread_message_count {
        position: absolute;
        display: inline-block;
        width: 16px;
        height: 16px;
        border: none;
        border-radius: 50%;
        background: ${COLORS.unreadMessageBadgeColor};
        right: 0;
        font-family: inter;
        font-size: 12px;
        color: #fff;
        text-align: center;
        line-height: 16px;
    }

	&:hover {
		background: ${COLORS.highlightColor};
		cursor: pointer;
	}
`;

export const MessageBubbleWrapper = styled.div`
    width: fit-content;
    min-width: 150px;
    max-width: 400px;
    padding: 8px 16px;
    box-sizing: border-box;
    font - family: inter;
    font - weight: 400;
    color: ${COLORS.fontBlack};
    border: none;
    border-radius: 8px;
    margin-bottom: 8px;
    
    .message_content {
        font-size: 12px;
        margin-bottom: 4px;
    }
    .message_time {
        font-size: 10px;
        text-align: right;
    }
`;
