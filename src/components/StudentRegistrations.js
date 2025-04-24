import React, { useState } from 'react';

const StudentRegistrations = ({ registrations, setRegistrations, courseOfferings, courseTypes }) => {
  const [studentName, setStudentName] = useState('');
  const [selectedOfferingId, setSelectedOfferingId] = useState('');
  const [filterCourseTypeId, setFilterCourseTypeId] = useState('');

  const handleRegister = () => {
    if (studentName.trim() && selectedOfferingId) {
      const newId = registrations.length > 0 ? Math.max(...registrations.map(r => r.id)) + 1 : 1;
      setRegistrations([...registrations, { 
        id: newId, 
        studentName: studentName.trim(),
        offeringId: parseInt(selectedOfferingId)
      }]);
      setStudentName('');
      setSelectedOfferingId('');
    }
  };

  const handleDelete = (id) => {
    setRegistrations(registrations.filter(r => r.id !== id));
  };

  const filteredOfferings = filterCourseTypeId 
    ? courseOfferings.filter(co => co.courseTypeId === parseInt(filterCourseTypeId))
    : courseOfferings;

  const getOfferingName = (offeringId) => {
    const offering = courseOfferings.find(co => co.id === offeringId);
    return offering ? offering.name : 'Unknown Offering';
  };

  return (
    <div>
      <h2>Student Registrations</h2>
      <div className="form-group">
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Student name"
        />
        <select
          value={selectedOfferingId}
          onChange={(e) => setSelectedOfferingId(e.target.value)}
        >
          <option value="">Select Course Offering</option>
          {filteredOfferings.map(offering => (
            <option key={offering.id} value={offering.id}>{offering.name}</option>
          ))}
        </select>
        <button onClick={handleRegister}>Register Student</button>
      </div>
      <div className="form-group">
        <select
          value={filterCourseTypeId}
          onChange={(e) => setFilterCourseTypeId(e.target.value)}
        >
          <option value="">Filter by Course Type</option>
          {courseTypes.map(courseType => (
            <option key={courseType.id} value={courseType.id}>{courseType.name}</option>
          ))}
        </select>
      </div>
      <h3>All Registrations</h3>
      <ul className="list">
        {registrations.map(registration => (
          <li key={registration.id} className="list-item">
            <span>{registration.studentName} - {getOfferingName(registration.offeringId)}</span>
            <button onClick={() => handleDelete(registration.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentRegistrations;