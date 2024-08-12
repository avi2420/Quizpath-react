import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../style/Result.css'

const Results = () => {
  const location = useLocation();
  const { score, total } = location.state;

  return (
    <div className="results">
      <h2>Quiz Results</h2>
      <p>Your score: {score} out of {total}</p>
      <p>Percentage: {(score / total) * 100}%</p>
      <Link to="/QuizCategories">Try another quiz</Link>
    </div>
  );
};

export default Results;
