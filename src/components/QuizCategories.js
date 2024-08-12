import React from 'react';
import { Link } from 'react-router-dom';
import quizData from '../data/quizData.json';
import '../style/QuizCategories.css';

const QuizCategories = () => {
  return (
    <div className="quiz-categories">
      <h1 className="header">Practice for more then 120 industries </h1>
      <div className="category-grid">
        {quizData.categories.map((category, index) => (
          <Link to={`/quiz/${category.name}`} key={index} className="category-link">
            <div className="category-box">
              <div className="category-image-container">
                <img src={category.image} alt={category.name} className="category-image" />
              </div>
              <div className="category-name">{category.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuizCategories;
