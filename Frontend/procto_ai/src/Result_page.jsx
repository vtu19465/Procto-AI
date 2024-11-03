// src/ResultPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const ResultPage = () => {
  const { resultId } = useParams();
  
  // Mock data for detailed result information
  const results = {
    1: { title: 'Math Assignment', score: 85, date: '2024-11-01', description: 'Detailed explanation of Math Assignment...' },
    2: { title: 'Science Project', score: 90, date: '2024-10-28', description: 'Detailed explanation of Science Project...' },
  };

  const result = results[resultId];

  if (!result) {
    return <div className="container mt-5">Result not found.</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">{result.title}</h1>
      <p><strong>Date:</strong> {result.date}</p>
      <p><strong>Score:</strong> {result.score}</p>
      <p><strong>Description:</strong> {result.description}</p>
    </div>
  );
};

export default ResultPage;
    