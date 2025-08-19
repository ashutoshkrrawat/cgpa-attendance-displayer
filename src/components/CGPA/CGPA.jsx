import React, { useContext, useEffect, useState, useRef } from 'react';
import { useResult } from '../../Context/ResultContext';
import html2canvas from "html2canvas";
import './CGPA.css'; 

function CGPA() {

    const [userYear, setUserYear] = useState("2024")//this is used so that user can select his desired year
    const [userRegNo, setUserRegno] = useState("")//registration number of user
    const [yearWiseInfo, setYearWiseInfo] = useState([])
    const [BatchWiseInfo, setBatchWiseInfo] = useState([])
    const { result, loading } = useResult()
    const [userBatchRank, setUserBatchRank] = useState()
    const [userYearRank, setUserYearRank] = useState()
    const [userCG, setUserCG] = useState()
    const [userSG, setUserSG] = useState()
    const [batchLength, setBatchLength] = useState()
    const [yearLength, setYearLength] = useState()
    const cardRef = useRef(null); //! screenshot
    

    //!This useEffect waits for the API data to arrive.
    //it only runs when the result has the data (result.length>0)
    useEffect(() => {
        if (result.length > 0) {
            YearWiseLeaderBoard();
        }
    }, [result]);

    const YearWiseLeaderBoard = () => {
        const filteredAndSorted = result
            .filter(student => student.Regn?.slice(0, 4) === userRegNo.slice(0,4))
            .sort((a, b) => b.Cgpa - a.Cgpa); // highest CGPA first
        setYearWiseInfo(filteredAndSorted); //here we have the sorted cgpa wise array of desired year
    }

    //!this effect will run if user wants his rank among his batchmates
    useEffect(() => {
        if (yearWiseInfo.length > 0) {
            BatchWiseLeaderBoard();
        }
    }, [yearWiseInfo]);
    const BatchWiseLeaderBoard = () => {
        const filteredAndSorted = yearWiseInfo
            .filter(student => student.Regn?.slice(6, 8) === userRegNo.slice(6, 8))
            .sort((a, b) => b.Cgpa - a.Cgpa);
        setBatchWiseInfo(filteredAndSorted)
    }

    //!this function is used to get the credentials of user according to the roll number
    useEffect(() => {
        if (result.length > 0 && userRegNo.length === 11) {   //Only runs when input length is valid
            const found = result.find(r => r.Regn === userRegNo);
            if (found) {
                setUserCG(found.Cgpa);
                setUserSG(found.Sgpa);
            } else {
                setUserCG(null);
                setUserSG(null);
            }
        }
    }, [result, userRegNo]);

    //!This function is used to calculate the rank of the user yearwise
    useEffect(() => {
        if (yearWiseInfo.length > 0) {
            const userIndex = yearWiseInfo.findIndex(
                (student) => student.Regn?.trim().toUpperCase() === userRegNo.trim().toUpperCase()
            );
            const userRank = userIndex !== -1 ? userIndex + 1 : null;
            setUserYearRank(userRank);
        }
    }, [yearWiseInfo, userRegNo]);


    //!this function is used to calculate the the rank of the user batchwise
    useEffect(() => {
        if (BatchWiseInfo.length > 0) {
            const userIndex2 = BatchWiseInfo.findIndex(
                (student) => student.Regn.trim().toUpperCase() === userRegNo.trim().toUpperCase()
            );
            const userRank2 = userIndex2 !== -1 ? userIndex2 + 1 : null;
            setUserBatchRank(userRank2);
        }
    }, [BatchWiseInfo, userRegNo]);

    //! these two useeffects are used to assign the length of students to calculate percentile
    useEffect(() => {
        if (yearWiseInfo.length > 0) {
            const length=yearWiseInfo.length
            setYearLength(length);
        }
    }, [yearWiseInfo]);

    // update batchLength whenever BatchWiseInfo changes
    useEffect(() => {
        if (BatchWiseInfo.length > 0) {
            const len=BatchWiseInfo.length
            setBatchLength(len);
        }
    }, [BatchWiseInfo]);

    //! here we are calculating the percentile of user here
    const yearTopPercent = userYearRank && yearLength
        ? Math.ceil((userYearRank / yearLength) * 100)
        : null;

    const batchTopPercent = userBatchRank && batchLength
        ? Math.ceil((userBatchRank / batchLength) * 100)
        : null;

    //! Enhanced download function with better quality and styling capture
    const handleDownload = async () => {
        if (cardRef.current) {
            try {
                // 👈 IMPROVED: Better html2canvas configuration for CSS capture
                const canvas = await html2canvas(cardRef.current, {
                    scale: 2, // High quality
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: null, // Transparent background
                    logging: false, // Disable console logs
                    height: cardRef.current.scrollHeight,
                    width: cardRef.current.scrollWidth,
                    scrollX: 0,
                    scrollY: 0
                });
                
                const link = document.createElement("a");
                link.download = `${userRegNo}_ResultCard.png`;
                link.href = canvas.toDataURL("image/png", 1.0); // 👈 IMPROVED: Max quality
                link.click();
            } catch (error) {
                console.error('Download failed:', error);
                alert('Download failed. Please try again.');
            }
        }
    };

   
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-green-400 p-4 sm:p-6">
            {/* 👈 CHANGED: Added responsive padding */}
            <div className="flex flex-col items-center justify-start">
                <h1 className="text-2xl sm:text-3xl font-black mb-6 text-green-400 text-center" 
                    style={{ textShadow: '0 0 10px rgba(0, 255, 136, 0.5)' }}>
                    CGPA Results
                </h1>
                {/* 👈 CHANGED: Made title responsive */}

                {/* 👉 Input box for roll number - Made responsive */}
                <input
                    type="text"
                    value={userRegNo}
                    onChange={(e) => setUserRegno(e.target.value)}
                    placeholder="Enter Roll Number"
                    className="bg-black/80 border-2 border-green-400 text-green-400 placeholder-green-400/60 p-3 rounded-lg mb-6 w-full max-w-sm focus:border-cyan-400 focus:outline-none transition-all duration-300"
                    style={{ boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)' }}
                />
                {/* 👈 CHANGED: Made input responsive with max-width */}

                {loading ? (
                    <p className="text-cyan-400 text-lg animate-pulse text-center" style={{ textShadow: '0 0 8px rgba(0, 217, 255, 0.4)' }}>Your result is loading...</p>
                ) : result.length > 0 ? (
                    userCG ? (
                        <div className="relative flex flex-col items-center w-full">
                            {/* 📌 ENHANCED 3D ANIMATED CARD - Now responsive */}
                            <div
                                ref={cardRef}
                                className="result-card group"
                            >
                                {/* HEADER SECTION */}
                                <div className="text-center mb-4 sm:mb-6">
                                    {/* 👈 CHANGED: Responsive margin */}
                                    <h2 className="card-title">
                                        ACADEMIC RESULT CARD
                                    </h2>
                                    <div className="header-divider"></div>
                                </div>

                                {/* MAIN STATS GRID - Responsive */}
                                <div className="stats-grid">
                                    {/* 👈 CHANGED: Using CSS Grid with responsive behavior */}
                                    
                                    {/* COLUMN 1 - REGISTRATION */}
                                    <div className="stats-column">
                                        <div className="stat-card">
                                            <div className="stat-label">REGISTRATION</div>
                                            <div className="stat-value registration-number">
                                                {userRegNo}
                                            </div>
                                        </div>
                                    </div>

                                    {/* COLUMN 2 - CGPA & SGPA */}
                                    <div className="stats-column">
                                        {/* CGPA SCORE - HIGHLIGHTED */}
                                        <div className="stat-card highlight-card">
                                            <div className="stat-label">CUMULATIVE GPA</div>
                                            <div className="stat-value-highlight-compact">
                                                {userCG}
                                            </div>
                                        </div>

                                        {/* SGPA SCORE */}
                                        <div className="stat-card">
                                            <div className="stat-label">SEMESTER GPA</div>
                                            <div className="stat-value-highlight-compact secondary">
                                                {userSG}
                                            </div>
                                        </div>
                                    </div>

                                    {/* COLUMN 3 - RANKING */}
                                    <div className="stats-column">
                                        {/* YEAR RANKING - HIGHLIGHTED */}
                                        <div className="stat-card highlight-card">
                                            <div className="stat-label">YEAR RANKING</div>
                                            <div className="ranking-display">
                                                <span className="stat-value-highlight-compact">{userYearRank}</span>
                                                <span className="ranking-separator">of</span>
                                                <span className="ranking-total">{yearLength}</span>
                                            </div>
                                            
                                        </div>
                                        
                                        <div className="stat-card highlight-card">
                                            <div className="stat-label">BATCH RANKING</div>
                                            <div className="ranking-display">
                                                <span className="stat-value-highlight-compact">{userBatchRank}</span>
                                                <span className="ranking-separator">of</span>
                                                <span className="ranking-total">{batchLength}</span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>

                                {/* ACHIEVEMENT BANNER SECTION - Responsive */}
                                <div className="achievement-grid">
                                    {/* 👈 CHANGED: Responsive achievement grid */}
                                    
                                    {/* YEAR PERCENTILE */}
                                    <div className="achievement-banner primary-achievement">
                                        <div className="achievement-content-compact">
                                            <div className="achievement-label-small">TOP</div>
                                            <div className="achievement-number-compact">{yearTopPercent}%</div>
                                            <div className="achievement-label-small">IN YEAR</div>
                                        </div>
                                    </div>

                                    {/* BATCH PERCENTILE */}
                                    <div className="achievement-banner secondary-achievement">
                                        <div className="achievement-content-compact">
                                            <div className="achievement-label-small">TOP</div>
                                            <div className="achievement-number-compact">{batchTopPercent}%</div>
                                            <div className="achievement-label-small">IN BATCH</div>
                                        </div>
                                    </div>
                                </div>

                                {/* DOWNLOAD BUTTON */}
                                <button
                                    onClick={handleDownload}
                                    className="download-btn"
                                >
                                    <span className="download-text">DOWNLOAD RESULT CARD</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-red-400 text-lg font-semibold text-center" style={{ textShadow: '0 0 8px rgba(248, 113, 113, 0.4)' }}>No student found with this Reg No</p>
                    )
                ) : (
                    <p className="text-cyan-400 text-lg text-center" style={{ textShadow: '0 0 8px rgba(0, 217, 255, 0.4)' }}>No results found</p>
                )}
            </div>
        </div>
    );
}

export default CGPA;