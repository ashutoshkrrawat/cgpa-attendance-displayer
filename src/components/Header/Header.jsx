import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-green-400/30 shadow-2xl">
      <nav className="max-w mx-auto flex justify-between items-center px-6 py-4">
        
        {/* 🎯 NEON LOGO */}
        <Link 
          to="/cgpa" 
          className="text-2xl font-black text-green-400 hover:text-cyan-400 transition-all duration-300"
          style={{textShadow: '0 0 15px rgba(0, 255, 136, 0.6)'}}
        >
          MyDashboard
        </Link>

        {/* 🔗 NEON NAVIGATION LINKS */}
        <div className="hidden md:flex gap-8">
          {/* <NavLink
            to="/"
            className={({ isActive }) =>
              `relative px-4 py-2 font-semibold transition-all duration-300 ${
                isActive 
                  ? "text-cyan-400" 
                  : "text-green-400/80 hover:text-green-400"
              }`
            }
            style={({ isActive }) => ({
              textShadow: isActive 
                ? '0 0 10px rgba(0, 217, 255, 0.8)' 
                : '0 0 5px rgba(0, 255, 136, 0.3)'
            })}
          >
            {({ isActive }) => (
              <>
                Home
                {isActive && (
                  <span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400 rounded-full"
                    style={{boxShadow: '0 0 10px rgba(0, 217, 255, 0.8)'}}
                  />
                )}
              </>
            )}
          </NavLink> */}
          
          <NavLink
            to="/cgpa"
            className={({ isActive }) =>
              `relative px-4 py-2 font-semibold transition-all duration-300 ${
                isActive 
                  ? "text-cyan-400" 
                  : "text-green-400/80 hover:text-green-400"
              }`
            }
            style={({ isActive }) => ({
              textShadow: isActive 
                ? '0 0 10px rgba(0, 217, 255, 0.8)' 
                : '0 0 5px rgba(0, 255, 136, 0.3)'
            })}
          >
            {({ isActive }) => (
              <>
                CGPA
                {isActive && (
                  <span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400 rounded-full"
                    style={{boxShadow: '0 0 10px rgba(0, 217, 255, 0.8)'}}
                  />
                )}
              </>
            )}
          </NavLink>
          
          <NavLink
            to="/attendance"
            className={({ isActive }) =>
              `relative px-4 py-2 font-semibold transition-all duration-300 ${
                isActive 
                  ? "text-cyan-400" 
                  : "text-green-400/80 hover:text-green-400"
              }`
            }
            style={({ isActive }) => ({
              textShadow: isActive 
                ? '0 0 10px rgba(0, 217, 255, 0.8)' 
                : '0 0 5px rgba(0, 255, 136, 0.3)'
            })}
          >
            {({ isActive }) => (
              <>
                Attendance
                {isActive && (
                  <span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400 rounded-full"
                    style={{boxShadow: '0 0 10px rgba(0, 217, 255, 0.8)'}}
                  />
                )}
              </>
            )}
          </NavLink>
        </div>

        {/* 👤 NEON USER PROFILE */}
        <div className="flex items-center gap-3">
          <span 
            className="text-sm text-green-400/80 font-medium"
            style={{textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'}}
          >
            Student
          </span>
          <a href="https://github.com/ashutoshkrrawat" target="_blank">
          <img
            src="https://avatars.githubusercontent.com/u/197360926?s=400&u=7747bcfdec2f2c8d59359f06e2bb5dae1ca9ac4d&v=4"
            alt="profile"
            className="w-10 h-10 rounded-full border-2 border-green-400 hover:border-cyan-400 transition-all duration-300"
            style={{boxShadow: '0 0 15px rgba(0, 255, 136, 0.4)'}}
            />
            </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;