import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../style/Landing.css';
import buildIcon from '../assets/Images/interview.png'  ; 
import levelUpIcon from '../assets/Images/next-level.png'; 
import shareIcon from  '../assets/Images/experience.png'; 
import gethired from '../assets/Images/get-hired.png' 
import carrer from '../assets/Images/target.png'
import dreamjob from '../assets/Images/astronaut.png'
import QuizCategories from './QuizCategories';
 
const LandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });  
  }, []);

  return (
    <>
      <div className="content-container" data-aos="zoom-in">
        <div className="content-details">
          <h2 className="content-heading">Review Your Recorded Responses</h2>
          <p className="content-paragraph">Your responses are automatically recorded, so you can watch them after your interview and know exactly how you came across.</p>
          <button className="content-button">Get Started</button>
        </div>
        <img src={`${process.env.PUBLIC_URL}/Images/OIP.jpeg`} alt="Sample" className="content-image" />
      </div>

      <div className="content-container" data-aos="zoom-in" >
        <div className="content-details">
          <h2 className="content-heading">Take Mock Interviews On Your Own</h2>
          <p className="content-paragraph">Take unlimited interviews and master your skills from anywhere. No awkward meetups required.</p>
          </div>
        <img src={`${process.env.PUBLIC_URL}/Images/OIP.jpeg`} alt="Sample" className="content-image" />
      </div>

      <div className="content-container" data-aos="zoom-in"  >
        <div className="content-details">
          <h2 className="content-heading">Practice for the Pressure</h2>
          <button className="content-button">Begin</button>
          </div>
        <img src={`${process.env.PUBLIC_URL}/Images/OIP.jpeg`} alt="Sample" className="content-image" />
      </div>
      <div className="content-container" data-aos="zoom-in">
        <div className="content-details">
          <h2 className="content-heading">Review Your Recorded Responses</h2>
          <p className="content-paragraph">Take unlimited interviews and master your skills from anywhere. No awkward meetups required.</p>

          <button className="content-button">Begin</button>
          </div>
        <img src={`${process.env.PUBLIC_URL}/Images/OIP.jpeg`} alt="Sample" className="content-image" />
      </div>
      <div className="container" data-aos="zoom-in">
        <div className="row">
          <div className="col">
            <div className="section">
            <img src={buildIcon} alt="Build Icon" />         
                 <h1>Build interview confidence.</h1>
              <p>We give you everything you need to master your interview skills in less time than any other option, so you can walk into your interview with confidence.</p>
            </div>
          </div>
          <div className="col">
            <div className="section">
            <img src={gethired} alt="GET hire" />              <h1>Get hired faster.</h1>
              <p>Our simulator is optimized to help you master your interview skills in the most efficient way possible, so you can be prepared to ace the interview in no time.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="section">
            <img src={carrer} alt="Carrer" />        
                  <h1>Accelerate your career & earn more.</h1>
              <p>Master the skill of interviewing by practicing it just like you practice your trade and give your career a boost.</p>
            </div>
          </div>
          <div className="col">
            <div className="section">
            <img src={dreamjob} alt="dream job" />     
                     <h1>Land the job you've been dreaming of.</h1>
              <p>Gain realistic interview experience and master the skills you need to wow your employers and beat out the competition.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container video-section" data-aos="zoom-in" data-aos-delay="800">
        <div className="row">
          <div className="col video-col">
            <video controls>
              <source src="/path/to/your/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="col text-col">
            <h1>Enhance Your Skills</h1>
            <p>Gain realistic interview experience and master the skills you need to wow your employers and beat out the competition.</p>
            <button className="cta-button">Learn More</button>
          </div>

     
        </div>
      </div>
      <div className="content-container" data-aos="fade-in"  >
        <div className="content-details">
        <h3 className="content-Subheading">FOR CAREER ADVISORS</h3>
          <h2 className="content-heading">Mock Interviews They Can Take on Their Own</h2>
          <p>Provide simulated interviews they can conduct on their own. No need to schedule, commute, or meet in person.
          </p>
          <button className="content-button">Learn More</button>
        </div>
        <img src={`${process.env.PUBLIC_URL}/Images/images.jpeg`} alt="Sample" className="content-image" />
      </div>
      <div className="new-container" data-aos="fade-up"> 
        <div className="icon-container">
          <div className="icon">
            <img src={buildIcon} alt="Build Icon" />
            
            <h2 className="icon-text">Build Interviews</h2>
      
          </div>
          <div className="icon">
            <img src={levelUpIcon} alt="Level Up Icon" />
            <h2 className="icon-text">Level Up Your Skills</h2>
          </div>
          <div className="icon">
            <img src={shareIcon} alt="Share Icon" />
            <h2 className="icon-text">Share Practices</h2>
          </div>
        </div>
      </div>
      <QuizCategories/>


      <div className="landing-page">
            <div className="services-section" data-aos='slide-up'>
                <div className="service">
                    <img src={`${process.env.PUBLIC_URL}/Images/icon3.png`} alt="Service 1" className="service-icon" />
                    <h3 className="service-heading">Simulate Realistic Interviews Anywhere</h3>
                    <p className="service-description">Take unlimited mock interviews whenever you want, wherever you want.</p>
                </div>
                <div className="service">
                    <img src={`${process.env.PUBLIC_URL}/Images/icon2.png`} alt="Service 2" className="service-icon" />
                    <h3 className="service-heading">Put On the Pressure with Your Built-In Camera</h3>
                    <p className="service-description">We raise the stakes by recording your responses to create realistic interview pressure.</p>
                </div>
                <div className="service">
                    <img src={`${process.env.PUBLIC_URL}/Images/icon1.png`} alt="Service 3" className="service-icon" />
                    <h3 className="service-heading">Watch Your Recorded Interviews and Improve</h3>
                    <p className="service-description">Know exactly how you came across and refine your approach to nail the interview.</p>
                </div>
            </div>
        </div>

    </>
  );
};

export default LandingPage;
