import DottedImage from '../assets/images/dotted_shape.png';
import Logo from '../assets/images/logo_image.png';
import Search from '../assets/images/search.png';
import Send from '../assets/images/send_icon.png';
import Close from '../assets/images/close_button.png';

export const ROUTE_PATHS = {
    AUTH: '/',
    CHAT: '/messages'
};

export const SERVER_ROUTES = {
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/signin',
    CHECK_USER: '/auth/check',
    GET_ALL_USERS: '/users/',
    GET_USER: '/users',
    GET_CONTACT_MESSAGES: '/messages/',
    POST_MESSAGE: '/messages/',
    READ_MESSAGE: '/messages/read'
};

export const IMAGES = {
    Logo,
    DottedImage,
    Search,
    Send,
    Close
};

export const COLORS = {
    primary: '#6E80A4',
    sidebarBorder: '#D9DCE0',
    highlightColor: '#F5F5F5',
    selectedColor: '#F5F5F5',
    onlineBadgeColor: '#15CF74',
    ownMessageBackground: '#DEE9FF',
    unreadMessageBadgeColor: '#3758F9',
    fontBlack: '#011627',
    fontGrey: '#707991'
};