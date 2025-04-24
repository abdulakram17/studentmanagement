import React, { useState } from 'react';

const CourseOfferings = ({ courseOfferings, setCourseOfferings, courses, courseTypes }) => {
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedCourseTypeId, setSelectedCourseTypeId] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editCourseId, setEditCourseId] = useState('');
  const [editCourseTypeId, setEditCourseTypeId] = useState('');

  const handleAddCourseOffering = () => {
    if (selectedCourseId && selectedCourseTypeId) {
      const course = courses.find(c => c.id === parseInt(selectedCourseId));
      const courseType = courseTypes.find(ct => ct.id === parseInt(selectedCourseTypeId));
      
      if (course && courseType) {
        const newId = courseOfferings.length > 0 ? Math.max(...courseOfferings.map(co => co.id)) + 1 : 1;
        const newOffering = {
          id: newId,
          courseId: parseInt(selectedCourseId),
          courseTypeId: parseInt(selectedCourseTypeId),
          name: `${courseType.name} - ${course.name}`
        };
        setCourseOfferings([...courseOfferings, newOffering]);
        setSelectedCourseId('');
        setSelectedCourseTypeId('');
      }
    }
  };

  const handleDelete = (id) => {
    setCourseOfferings(courseOfferings.filter(co => co.id !== id));
  };

  const handleEdit = (offering) => {
    setEditingId(offering.id);
    setEditCourseId(offering.courseId.toString());
    setEditCourseTypeId(offering.courseTypeId.toString());
  };

  const handleUpdate = () => {
    if (editCourseId && editCourseTypeId) {
      const course = courses.find(c => c.id === parseInt(editCourseId));
      const courseType = courseTypes.find(ct => ct.id === parseInt(editCourseTypeId));
      
      if (course && courseType) {
        setCourseOfferings(courseOfferings.map(co => 
          co.id === editingId ? { 
            ...co, 
            courseId: parseInt(editCourseId),
            courseTypeId: parseInt(editCourseTypeId),
            name: `${courseType.name} - ${course.name}`
          } : co
        ));
        setEditingId(null);
        setEditCourseId('');
        setEditCourseTypeId('');
      }
    }
  };

  return (
    <div>
      <h2>Course Offerings</h2>
      <div className="form-group">
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.name}</option>
          ))}
        </select>
        <select
          value={selectedCourseTypeId}
          onChange={(e) => setSelectedCourseTypeId(e.target.value)}
        >
          <option value="">Select Course Type</option>
          {courseTypes.map(courseType => (
            <option key={courseType.id} value={courseType.id}>{courseType.name}</option>
          ))}
        </select>
        <button onClick={handleAddCourseOffering}>Add Course Offering</button>
      </div>
      <ul className="list">
        {courseOfferings.map(offering => (
          <li key={offering.id} className="list-item">
            {editingId === offering.id ? (
              <>
                <select
                  value={editCourseId}
                  onChange={(e) => setEditCourseId(e.target.value)}
                >
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </select>
                <select
                  value={editCourseTypeId}
                  onChange={(e) => setEditCourseTypeId(e.target.value)}
                >
                  <option value="">Select Course Type</option>
                  {courseTypes.map(courseType => (
                    <option key={courseType.id} value={courseType.id}>{courseType.name}</option>
                  ))}
                </select>
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{offering.name}</span>
                <div>
                  <button onClick={() => handleEdit(offering)}>Edit</button>
                  <button onClick={() => handleDelete(offering.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseOfferings;