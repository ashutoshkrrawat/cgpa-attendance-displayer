import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black/95 border-t border-green-400/30 mt-auto">
      <div className="max-w mx-auto px-6 py-8">
        
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          
          <div className="md:col-span-2">
            <Link 
              to="/" 
              className="text-2xl font-black text-green-400 hover:text-cyan-400 transition-all duration-300 inline-block mb-4"
              style={{textShadow: '0 0 15px rgba(0, 255, 136, 0.6)'}}
            >
              MyDashboard
            </Link>
            <p className="text-green-400/70 text-sm leading-relaxed mb-4">
              Your comprehensive academic portal for tracking CGPA, attendance, 
              and academic performance with real-time insights and analytics.
            </p>
            
            {/* 🌐 SOCIAL LINKS */}
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/ashutosh-kumar-rawat-138a88345/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 rounded-lg bg-green-400/10 border border-green-400/30 hover:border-cyan-400 transition-all duration-300"
                style={{
                  boxShadow: '0 0 10px rgba(0, 255, 136, 0.2)',
                }}
              >
                {/* LINKEDIN ICON */}
                <svg 
                  className="w-5 h-5 text-green-400 group-hover:text-cyan-400 transition-colors duration-300" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  style={{
                    filter: 'drop-shadow(0 0 5px rgba(0, 255, 136, 0.5))'
                  }}
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              <a
                href="https://github.com/ashutoshkrrawat" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 rounded-lg bg-green-400/10 border border-green-400/30 hover:border-cyan-400 transition-all duration-300"
                style={{
                  boxShadow: '0 0 10px rgba(0, 255, 136, 0.2)',
                }}
              >
                
                <svg 
                  className="w-5 h-5 text-green-400 group-hover:text-cyan-400 transition-colors duration-300" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  style={{
                    filter: 'drop-shadow(0 0 5px rgba(0, 255, 136, 0.5))'
                  }}
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              
              {/* 📧 EMAIL LINK (OPTIONAL) */}
              
            </div>
          </div>
          
          {/* 📝 QUICK LINKS */}
          <div>
            <h3 
              className="text-lg font-bold text-green-400 mb-4"
              style={{textShadow: '0 0 10px rgba(0, 255, 136, 0.5)'}}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {/* <li>
                <Link 
                  to="/cgpa" 
                  className="text-green-400/70 hover:text-cyan-400 transition-colors duration-300 text-sm"
                  style={{textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'}}
                >
                  Dashboard
                </Link>
              </li> */}
              <li>
                <Link 
                  to="/cgpa" 
                  className="text-green-400/70 hover:text-cyan-400 transition-colors duration-300 text-sm"
                  style={{textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'}}
                >
                  CGPA
                </Link>
              </li>
              <li>
                <Link 
                  to="/attendance" 
                  className="text-green-400/70 hover:text-cyan-400 transition-colors duration-300 text-sm"
                  style={{textShadow: '0 0 5px rgba(0, 255, 136, 0.3)'}}
                >
                  Attendance Tracker
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 🎓 ACADEMIC TOOLS */}
          <div>
            <h3 
              className="text-lg font-bold text-green-400 mb-4"
              style={{textShadow: '0 0 10px rgba(0, 255, 136, 0.5)'}}
            >
              Features
            </h3>
            <ul className="space-y-2">
              <li className="text-green-400/70 text-sm">
                Real-time Results
              </li>
              <li className="text-green-400/70 text-sm">
                Rank Analysis
              </li>
              <li className="text-green-400/70 text-sm">
                Performance Insights
              </li>
              <li className="text-green-400/70 text-sm">
                Download Reports
              </li>
            </ul>
          </div>
        </div>
        
        {/* 📜 BOTTOM COPYRIGHT SECTION */}
        {/* <div className="border-t border-green-400/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p 
              className="text-green-400/60 text-sm"
              style={{textShadow: '0 0 5px rgba(0, 255, 136, 0.2)'}}
            >
              © {new Date().getFullYear()} MyDashboard. Built with ❤️ for students.
            </p>
            
            <div className="flex gap-6 text-xs">
              <a 
                href="#privacy" 
                className="text-green-400/60 hover:text-cyan-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a 
                href="#terms" 
                className="text-green-400/60 hover:text-cyan-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a 
                href="#contact" 
                className="text-green-400/60 hover:text-cyan-400 transition-colors duration-300"
              >
                Contact
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;