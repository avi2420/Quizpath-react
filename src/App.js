import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import QuizCategories from './components/QuizCategories';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/Landing';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from './components/Modal';
import SignUpModal from './components/Singup';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Dashboard from './admin/dashboard/Dashboard';



function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz/:category" element={<Quiz />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quizcategories" element={<QuizCategories/>} />
        <Route path="/results" element={<Results />} />
          <Route path='/modal' element={<Modal />} />
          <Route path='/Singup' element={<SignUpModal />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
