import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation, Footer } from '../../components';

const Public = () => {
    return (
        <div className="overflow-y-auto max-h-screen flex flex-col items-center">
            <Header />
            <Navigation />
            <div className="w-full flex items-center flex-col">
                <Outlet />
            </div>
            <Footer />

        </div>
    )
}

export default Public
