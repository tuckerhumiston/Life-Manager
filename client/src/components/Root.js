import React from "react";
import { Outlet } from "react-router-dom";

import { Nav } from "./Nav";
import { Header } from "./Header";

import "../style/structure/index.css";

export default function Root() {
    return (
        <>
            <Header />
            <main>
                <div className="side-by-side">
                    {/* <Nav /> */}
                    <Outlet />
                </div>
            </main>
        </>
    )
}