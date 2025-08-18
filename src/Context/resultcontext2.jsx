//! this is the modified code to handle the CORS issue more efficiently (this code is not in use)
// ResultContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 👈 ADDED: Error state for better UX

  useEffect(() => {
    fetchResults();
  }, []);

  // 👈 ADDED: Multiple CORS proxy services as fallbacks
  const CORS_PROXIES = [
    "https://api.allorigins.win/get?url=",
    "https://corsproxy.io/?",
    "https://cors-anywhere.herokuapp.com/",
    "https://api.codetabs.com/v1/proxy?quest="
  ];

  const API_URL = "https://cgpa-server.vercel.app/api/v1/getResults";

  // 👈 ADDED: Function to try direct fetch first (sometimes it works)
  const tryDirectFetch = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 👈 ADDED: Additional headers that sometimes help with CORS
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*'
        },
        mode: 'cors' // 👈 ADDED: Explicitly set CORS mode
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Direct fetch successful!");
        return data;
      }
    } catch (error) {
      console.log("❌ Direct fetch failed:", error.message);
      return null;
    }
  };

  // 👈 ADDED: Function to try proxy with timeout and error handling
  const tryProxyFetch = async (proxyUrl, timeoutMs = 10000) => {
    return new Promise(async (resolve, reject) => {
      // 👈 ADDED: Timeout mechanism to prevent hanging requests
      const timeout = setTimeout(() => {
        reject(new Error(`Proxy request timed out after ${timeoutMs}ms`));
      }, timeoutMs);

      try {
        const fullUrl = proxyUrl + encodeURIComponent(API_URL);
        console.log(`🔄 Trying proxy: ${proxyUrl}`);
        
        const response = await fetch(fullUrl);
        clearTimeout(timeout);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // 👈 ADDED: Handle different proxy response formats
        let parsedData;
        if (data.contents) {
          // allorigins.win format
          parsedData = JSON.parse(data.contents);
        } else if (typeof data === 'string') {
          // Some proxies return string
          parsedData = JSON.parse(data);
        } else {
          // Direct JSON response
          parsedData = data;
        }

        console.log(`✅ Proxy fetch successful with: ${proxyUrl}`);
        resolve(parsedData);
      } catch (error) {
        clearTimeout(timeout);
        console.log(`❌ Proxy failed (${proxyUrl}):`, error.message);
        reject(error);
      }
    });
  };

  // 👈 ADDED: Main fetch function with multiple fallback strategies
  const fetchResults = async () => {
    setLoading(true);
    setError(null);

    try {
      // 👈 STRATEGY 1: Try direct fetch first (sometimes works)
      console.log("🚀 Attempting direct fetch...");
      const directResult = await tryDirectFetch();
      if (directResult) {
        setResult(directResult);
        setLoading(false);
        return;
      }

      // 👈 STRATEGY 2: Try each proxy service with timeout
      console.log("🔄 Direct fetch failed, trying proxy services...");
      
      for (let i = 0; i < CORS_PROXIES.length; i++) {
        try {
          const proxyResult = await tryProxyFetch(CORS_PROXIES[i], 8000); // 8 second timeout
          setResult(proxyResult);
          setLoading(false);
          return;
        } catch (error) {
          console.log(`❌ Proxy ${i + 1}/${CORS_PROXIES.length} failed:`, error.message);
          
          // 👈 ADDED: If this is the last proxy, continue to retry logic
          if (i === CORS_PROXIES.length - 1) {
            break;
          }
        }
      }

      // 👈 STRATEGY 3: Retry with the first proxy after a delay
      console.log("⏳ All proxies failed, retrying with first proxy after delay...");
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      
      const retryResult = await tryProxyFetch(CORS_PROXIES[0], 10000);
      setResult(retryResult);
      setLoading(false);

    } catch (error) {
      console.error("💥 All fetch attempts failed:", error);
      setError({
        message: "Failed to load results after multiple attempts",
        details: error.message,
        suggestion: "Please refresh the page or try again later"
      });
      setLoading(false);
    }
  };

  // 👈 ADDED: Manual retry function for user-triggered retries
  const retryFetch = () => {
    console.log("🔄 Manual retry triggered...");
    fetchResults();
  };

  // 👈 ADDED: Enhanced context value with error state and retry function
  const contextValue = {
    result,
    loading,
    error,
    retryFetch // 👈 ADDED: Allow components to trigger manual retry
  };

  return (
    <ResultContext.Provider value={contextValue}>
      {children}
    </ResultContext.Provider>
  );
};

// Hook to use context
export const useResult = () => useContext(ResultContext);