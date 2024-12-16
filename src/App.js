import React from "react";
import { RouterProvider } from 'react-router-dom';
import routes from "./lib/router";
import { Main } from "./styles";
import { Toaster } from 'react-hot-toast';
import './index.css';
import NoInternetPage from "./pages/noInternet.page";

function App() {
    const [onlineStatus, setOnlineStatus] = React.useState(true);
    React.useEffect(() => {
        // add event listeners to listen for network change events and render a no-connectivity screen for offline status
        window.addEventListener("online", () => {
            setOnlineStatus(true);
        });
        window.addEventListener("offline", () => {
            setOnlineStatus(false);
        });

        return () => {
            window.removeEventListener("online", () => {
                setOnlineStatus(true);
            });

            window.removeEventListener("offline", () => {
                setOnlineStatus(false);
            });
        };
    }, []);
    return (
        <Main
            className="app">
            {onlineStatus ? <>
                <Toaster />
                <RouterProvider router={routes} />
            </> : <>
                <NoInternetPage />
            </>}
        </Main>
    );
}

export default App;
