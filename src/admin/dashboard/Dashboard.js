import React, { useState, useEffect } from 'react';
import { db, storage } from '../../Firebase'; // Ensure `storage` is imported
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './Dashboard.css'; // Ensure this CSS file exists

const Dashboard = () => {
  const [category, setCategory] = useState('');
  const [categoryImage, setCategoryImage] = useState(null); // To handle the image file
  const [question, setQuestion] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [options, setOptions] = useState([{ value: '', isCorrect: false }]);
  const [questions, setQuestions] = useState({}); // Use an object to store questions categorized by their categoryId

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchAllQuestions(); // Fetch all questions once categories are loaded
  }, [categories]);

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Categories'));
      const categoriesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(categoriesList);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      alert('Error fetching categories: ' + error.message);
    }
  };

  const fetchAllQuestions = async () => {
    try {
      const questionsByCategory = {};
      for (const cat of categories) {
        const querySnapshot = await getDocs(collection(db, 'Categories', cat.id, 'Questions'));
        questionsByCategory[cat.id] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      }
      setQuestions(questionsByCategory); // Update state with all fetched questions
    } catch (error) {
      console.error('Error fetching questions:', error.message);
      alert('Error fetching questions: ' + error.message);
    }
  };

  const handleAddCategory = async () => {
    if (category.trim() && categoryImage) {
      try {
        // Upload image to Firebase Storage
        const imageRef = ref(storage, `category-images/${categoryImage.name}`);
        await uploadBytes(imageRef, categoryImage);
        const imageUrl = await getDownloadURL(imageRef);

        // Add category with image URL to Firestore
        await addDoc(collection(db, 'Categories'), { 
          name: category,
          imageUrl
        });

        setCategory('');
        setCategoryImage(null); // Reset image input
        fetchCategories(); // Refresh categories list
        alert('Category added successfully');
      } catch (error) {
        console.error('Error adding category:', error.message);
        alert('Error adding category: ' + error.message);
      }
    } else {
      alert('Please enter a category name and select an image');
    }
  };

  const handleAddQuestion = async () => {
    if (selectedCategory && question.trim() && options.length > 0) {
      const optionsArray = options.map(opt => ({
        value: opt.value.trim(),
        isCorrect: opt.isCorrect
      }));
      
      // Check if at least one option is marked as correct
      const hasCorrectOption = optionsArray.some(opt => opt.isCorrect);
      if (!hasCorrectOption) {
        alert('Please select at least one correct option');
        return;
      }

      try {
        await addDoc(collection(db, 'Categories', selectedCategory, 'Questions'), {
          question,
          options: optionsArray,
        });
        setQuestion('');
        setOptions([{ value: '', isCorrect: false }]);
        fetchAllQuestions(); // Refresh questions list
        alert('Question added successfully');
      } catch (error) {
        console.error('Error adding question:', error.message);
        alert('Error adding question: ' + error.message);
      }
    } else {
      alert('Please fill all fields and add at least one option');
    }
  };

  const handleAddOption = () => {
    setOptions([...options, { value: '', isCorrect: false }]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], value };
    setOptions(newOptions);
  };

  const handleCorrectOptionChange = (index, isCorrect) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], isCorrect };
    setOptions(newOptions);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteDoc(doc(db, 'Categories', categoryId));
      fetchCategories(); // Refresh categories list
      alert('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category:', error.message);
      alert('Error deleting category: ' + error.message);
    }
  };

  const handleDeleteQuestion = async (categoryId, questionId) => {
    try {
      await deleteDoc(doc(db, 'Categories', categoryId, 'Questions', questionId));
      fetchAllQuestions(); // Refresh questions list
      alert('Question deleted successfully');
    } catch (error) {
      console.error('Error deleting question:', error.message);
      alert('Error deleting question: ' + error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {/* Add Category Section */}
      <div className="section">
        <h2>Add Category</h2>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category Name"
          className="input-field"
        />
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setCategoryImage(e.target.files[0])}
          className="input-field"
        />
        <button onClick={handleAddCategory} className="button">Add Category</button>
      </div>

      {/* Add Question Section */}
      <div className="section">
        <h2>Add Question</h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select-field"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
          className="input-field"
        />
        {options.map((option, index) => (
          <div key={index} className="option-container">
            <input
              type="text"
              value={option.value}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="input-field"
            />
            <label>
              <input
                type="checkbox"
                checked={option.isCorrect}
                onChange={(e) => handleCorrectOptionChange(index, e.target.checked)}
              />
              Correct
            </label>
            <button 
              onClick={() => handleRemoveOption(index)}
              className="button button-danger"
            >
              Remove
            </button>
          </div>
        ))}
        <button onClick={handleAddOption} className="button">Add Option</button>
        <button onClick={handleAddQuestion} className="button">Add Question</button>
      </div>

      {/* Display Categories and Questions */}
      <div className="section">
        <h2>Categories and Questions</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Image</th>
              <th>Question</th>
              <th>Options</th>
              <th>Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <React.Fragment key={cat.id}>
                {questions[cat.id] && questions[cat.id].map((q) => (
                  <tr key={q.id}>
                    <td>{cat.name}</td>
                    <td>
                      {cat.imageUrl && <img src={cat.imageUrl} alt={cat.name} className="category-image" />}
                    </td>
                    <td>{q.question}</td>
                    <td>
                      {q.options.map((opt, i) => (
                        <div key={i}>
                          {opt.value} {opt.isCorrect ? '(Correct)' : ''}
                        </div>
                      ))}
                    </td>
                    <td>{q.options.filter(opt => opt.isCorrect).map(opt => opt.value).join(', ')}</td>
                    <td>
                      <button 
                        onClick={() => handleDeleteQuestion(cat.id, q.id)}
                        className="button button-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
