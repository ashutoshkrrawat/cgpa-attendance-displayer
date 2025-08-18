// ResultContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const proxyUrl = "https://api.allorigins.win/get?url=" +
      encodeURIComponent("https://cgpa-server.vercel.app/api/v1/getResults");

    fetch(proxyUrl)
      .then(res => res.json())
      .then(data => {
        const parsed = JSON.parse(data.contents);
        //console.log("Fetched results:", parsed);
        setResult(parsed);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <ResultContext.Provider value={{ result, loading }}>
      {children}
    </ResultContext.Provider>
  );
};

// Hook to use context
export const useResult = () => useContext(ResultContext);
