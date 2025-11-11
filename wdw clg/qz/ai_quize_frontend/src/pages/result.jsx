import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Results(){
  const { state } = useLocation();
  const res = state?.details;
  if (!res) return <div>No results found.</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Results</h2>
      <div>Total Score: {res.totalScore}</div>
      <div className="mt-4">
        {res.details.map((d, idx) => (
          <div key={idx} className="p-3 border mb-2">
            <div><strong>Question:</strong> {d.question}</div>
            <div><strong>Your answer:</strong> {String(d.response)}</div>
            <div><strong>Score:</strong> {d.score}</div>
            <div><strong>Feedback:</strong> {d.feedback}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
