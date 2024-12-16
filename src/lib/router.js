import { createBrowserRouter } from 'react-router-dom';

import { ROUTE_PATHS } from "./settings";
import AuthPage from '../pages';
import ChatPage from '../pages/chat.page';

const routeArray = [
    {
        path: "/",
        element: <AuthPage />,
    },
    {
        path: ROUTE_PATHS.CHAT,
        element: <ChatPage />,
    }
];
const routes = createBrowserRouter(routeArray);

export default routes;