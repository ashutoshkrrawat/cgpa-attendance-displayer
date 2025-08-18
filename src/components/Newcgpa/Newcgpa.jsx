// just for testing
//old code without ui
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useResult } from '../../Context/ResultContext';
import html2canvas from "html2canvas";

function CGPA() {

    const [userYear, setUserYear] = useState("2024")//this is used so that user can select his desired year
    const [userRegNo, setUserRegno] = useState("2024UGEE009")//registration number of user
    const [yearWiseInfo, setYearWiseInfo] = useState([])
    const [BatchWiseInfo, setBatchWiseInfo] = useState([])
    const [userCredentials, setUserCredentials] = useState()
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
            .filter(student => student.Regn?.slice(0, 4) === userYear)
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
    if (result.length > 0 && userRegNo.length === 11) {   // ✅ Only runs when input length is valid
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
                (student) => student.Regn === userRegNo
            );
            const userRank = userIndex !== -1 ? userIndex + 1 : null;
            setUserYearRank(userRank);
        }
    }, [yearWiseInfo, userRegNo]);


    //!this function is used to calculate the the rank of the user batchwise
    useEffect(() => {
        if (BatchWiseInfo.length > 0) {
            const userIndex2 = BatchWiseInfo.findIndex(
                (student) => student.Regn === userRegNo
            );
            const userRank2 = userIndex2 !== -1 ? userIndex2 + 1 : null;
            setUserBatchRank(userRank2);
        }
    }, [BatchWiseInfo, userRegNo]);

    //! these two useeffects are used to assign the length of students to calculate percentile
    useEffect(() => {
        if (yearWiseInfo.length > 0) {
            setYearLength(yearWiseInfo.length);
        }
    }, [yearWiseInfo]);

    // update batchLength whenever BatchWiseInfo changes
    useEffect(() => {
        if (BatchWiseInfo.length > 0) {
            setBatchLength(BatchWiseInfo.length);
        }
    }, [BatchWiseInfo]);

    //! here we are calculating the percentile of user here
    const yearTopPercent = userYearRank && yearLength
        ? Math.ceil((userYearRank / yearLength) * 100)
        : null;

    const batchTopPercent = userBatchRank && batchLength
        ? Math.ceil((userBatchRank / batchLength) * 100)
        : null;

    //! this is for image downloading
    const handleDownload = async () => {
        if (!cardRef.current) return;
        const canvas = await html2canvas(cardRef.current);
        const dataUrl = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${userRegNo}_ResultCard.png`;
        link.click();
    };

    return (
       <div className="flex flex-col items-center justify-start p-6 bg text-black flex-1">
            <h1 className="text-2xl font-bold mb-4">CGPA Results</h1>

            {/* 👉 Input box for roll number */}
            <input
                type="text"
                value={userRegNo}
                onChange={(e) => setUserRegno(e.target.value)}   // ✅ Removed length=11 restriction
                placeholder="Enter Roll Number"
                className="border p-2 rounded mb-4 w-64"
            />

            {loading ? (
                <p>Your result is loading...</p>
            ) : result.length > 0 ? (
                userCG ? (
                    <div>
                        {/* 📌 Card */}
                        <div
                            ref={cardRef}
                            className="mt-4 p-6 bg-white shadow-lg rounded-xl w-[600px] h-[400px] mx-auto text-gray-800"
                        >
                            <h2 className="text-3xl font-bold mb-2 text-center">Result Card</h2>
                            <p ><strong>Roll:</strong> {userRegNo}</p>
                            <p><strong>CGPA:</strong> {userCG}</p>
                            <p><strong>SGPA:</strong> {userSG}</p>
                            <p><strong>Year Rank:</strong> {userYearRank} among {yearLength} students</p>
                            <p><strong>Batch Rank:</strong> {userBatchRank} among {batchLength}</p>
                            <p className="text-green-600 mt-2">
                                🎉 You are among the top {yearTopPercent}% of your year
                            </p>
                            <p className="text-blue-600">
                                🔥 You are among the top {batchTopPercent}% of your batch
                            </p>
                        </div>

                        {/* 🔘 Download Button */}
                        <button
                            onClick={handleDownload}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Download Result Card
                        </button>
                    </div>
                ) : (
                    <p>No student found with this Reg No</p>
                )
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}

export default CGPA;
