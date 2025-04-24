import React, { useState } from 'react';

const Courses = ({ courses, setCourses }) => {
  const [newCourse, setNewCourse] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleAddCourse = () => {
    if (newCourse.trim()) {
      const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
      setCourses([...courses, { id: newId, name: newCourse }]);
      setNewCourse('');
    }
  };

  const handleDelete = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const handleEdit = (course) => {
    setEditingId(course.id);
    setEditName(course.name);
  };

  const handleUpdate = () => {
    if (editName.trim()) {
      setCourses(courses.map(c => 
        c.id === editingId ? { ...c, name: editName } : c
      ));
      setEditingId(null);
      setEditName('');
    }
  };

  return (
    <div>
      <h2>Courses</h2>
      <div className="form-group">
        <input
          type="text"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
          placeholder="New course name"
        />
        <button onClick={handleAddCourse}>Add Course</button>
      </div>
      <ul className="list">
        {courses.map(course => (
          <li key={course.id} className="list-item">
            {editingId === course.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{course.name}</span>
                <div>
                  <button onClick={() => handleEdit(course)}>Edit</button>
                  <button onClick={() => handleDelete(course.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;