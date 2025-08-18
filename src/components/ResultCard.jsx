import React, { useState } from "react";
import html2canvas from "html2canvas";

function ResultCard() {
  const [roll, setRoll] = useState("");
  const [student, setStudent] = useState(null);

  // 🔹 Fetch student details from API when roll is submitted
  const fetchDetails = async () => {
    try {
      const res = await fetch(
        `https://cgpa-server.vercel.app/api/v1/getResults?roll=${roll}`
      );
      const data = await res.json();

      // Assuming API returns { name, roll, cgpa, rank, percentile }
      setStudent(data);
    } catch (err) {
      console.error("Error fetching details:", err);
    }
  };

  // 🔹 Take screenshot and share
  const shareCard = async () => {
    const card = document.getElementById("result-card");
    const canvas = await html2canvas(card);
    const dataUrl = canvas.toDataURL("image/png");

    if (navigator.share) {
      // Mobile/Web Share API
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "result.png", { type: "image/png" });
      navigator
        .share({
          files: [file],
          title: "Student Result",
          text: "Check out my result card!",
        })
        .catch((err) => console.log("Share failed:", err));
    } else {
      // Fallback for desktop → download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "result.png";
      link.click();
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      {/* Input Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          className="border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchDetails}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {/* Result Card */}
      {student && (
        <div
          id="result-card"
          className="bg-white shadow-lg rounded-2xl p-6 w-96 transition hover:scale-105"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {student.name}
          </h2>
          <p className="text-gray-600">Roll: {student.roll}</p>
          <p className="text-gray-600">CGPA: {student.cgpa}</p>
          <p className="text-gray-600">Rank: {student.rank}</p>
          <p className="text-green-600 font-medium">
            🎉 You are among the top {student.percentile}% students!
          </p>

          <button
            onClick={shareCard}
            className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Share Result
          </button>
        </div>
      )}
    </div>
  );
}

export default ResultCard;
