import React, { useState, useEffect } from "react";
import { fetchQuote } from '../api/quote';
import '../style/features/Quote.css';

//IMPORTANT: Change to call in backend API

export const Quote = () => {
    const [data, setData] = useState(null);

    async function updateQuote() {
        const quote = await fetchQuote();
        setData(quote.data);
    }

    // Run `updateQuote` once when component mounts
    useEffect(() => {
        updateQuote();
    }, []);

    // Do not render until the first quote is loaded
    if (!data) return null;

    return (
        <div className="quote">
            <blockquote className="blockquote mb-0">
                <p>{data.content}</p>
                {data.author && (
                  <footer className="blockquote-footer">
                    <cite title="Source Title">-{data.author}</cite>
                  </footer>
                )}
            </blockquote>
            <button onClick={updateQuote} className="refresh">
                <img 
                    src={require('../style/images/refresh.png')}
                    alt="refresh"
                />
            </button>
        </div>
      );
};