import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizData from '../data/quizData';
import '../style/Quiz.css';

const Quiz = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const categoryData = quizData.categories.find(cat => cat.name === category);
    if (categoryData) {
      setQuestions(categoryData.questions);
    }
  }, [category]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    } else {
      const timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (questions[currentQuestion]?.answer === selectedAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer('');
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
    } else {
      setShowResult(true);
    }
  };

  useEffect(() => {
    if (showResult) {
      navigate('/results', { state: { score: score, total: questions.length } });
    }
  }, [showResult, navigate, score, questions.length]);

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz">
      <h2>{category}</h2>
      {currentQuestion < questions.length && (
        <div>
          <h3>{questions[currentQuestion].question}</h3>
          <p>Time Left: {timeLeft} seconds</p>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index} className={`option ${selectedAnswer === option ? 'selected' : ''}`}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => handleAnswerSelect(option)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleNextQuestion}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
