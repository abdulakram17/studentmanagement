import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import CourseTypes from './components/CourseTypes';
import Courses from './components/Courses';
import CourseOfferings from './components/CourseOfferings';
import StudentRegistrations from './components/StudentRegistrations';

function App() {
  const [activeTab, setActiveTab] = useState('courseTypes');
  const [courseTypes, setCourseTypes] = useState([
    { id: 1, name: 'Individual' },
    { id: 2, name: 'Group' },
    { id: 3, name: 'Special' }
  ]);
  const [courses, setCourses] = useState([
    { id: 1, name: 'Hindi' },
    { id: 2, name: 'English' },
    { id: 3, name: 'Urdu' }
  ]);
  const [courseOfferings, setCourseOfferings] = useState([
    { id: 1, courseId: 1, courseTypeId: 1, name: 'Individual - Hindi' },
    { id: 2, courseId: 2, courseTypeId: 1, name: 'Individual - English' },
    { id: 3, courseId: 1, courseTypeId: 2, name: 'Group - Hindi' }
  ]);
  const [registrations, setRegistrations] = useState([
    { id: 1, studentName: 'John Doe', offeringId: 1 },
    { id: 2, studentName: 'Jane Smith', offeringId: 1 },
    { id: 3, studentName: 'Mike Johnson', offeringId: 3 }
  ]);

  return (
    <div className="App">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container">
        {activeTab === 'courseTypes' && (
          <CourseTypes 
            courseTypes={courseTypes} 
            setCourseTypes={setCourseTypes} 
          />
        )}
        {activeTab === 'courses' && (
          <Courses 
            courses={courses} 
            setCourses={setCourses} 
          />
        )}
        {activeTab === 'courseOfferings' && (
          <CourseOfferings 
            courseOfferings={courseOfferings} 
            setCourseOfferings={setCourseOfferings} 
            courses={courses} 
            courseTypes={courseTypes} 
          />
        )}
        {activeTab === 'registrations' && (
          <StudentRegistrations 
            registrations={registrations} 
            setRegistrations={setRegistrations} 
            courseOfferings={courseOfferings} 
            courseTypes={courseTypes} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
