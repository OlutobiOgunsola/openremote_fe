import React from 'react';
import { NoInternetWrapper } from './noInternet.styles';

const NoInternetLayout = () => {
    return (
        <NoInternetWrapper>
            <div>
                <p>
                    No Internet connectivity. Please check your network and reconnect to continue your conversations!
                </p>
            </div>
        </NoInternetWrapper>
    );
};

export default NoInternetLayout;
