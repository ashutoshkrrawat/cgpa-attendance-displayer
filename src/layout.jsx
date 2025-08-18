import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col"> {/* 👈 ensures full stretch */}
        <Outlet />
      </main>
      <Footer />
    </div>
    )
}

export default Layout
