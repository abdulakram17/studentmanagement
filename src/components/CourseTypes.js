import React, { useState } from 'react';

const CourseTypes = ({ courseTypes, setCourseTypes }) => {
  const [newCourseType, setNewCourseType] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleAddCourseType = () => {
    if (newCourseType.trim()) {
      const newId = courseTypes.length > 0 ? Math.max(...courseTypes.map(ct => ct.id)) + 1 : 1;
      setCourseTypes([...courseTypes, { id: newId, name: newCourseType }]);
      setNewCourseType('');
    }
  };

  const handleDelete = (id) => {
    setCourseTypes(courseTypes.filter(ct => ct.id !== id));
  };

  const handleEdit = (courseType) => {
    setEditingId(courseType.id);
    setEditName(courseType.name);
  };

  const handleUpdate = () => {
    if (editName.trim()) {
      setCourseTypes(courseTypes.map(ct => 
        ct.id === editingId ? { ...ct, name: editName } : ct
      ));
      setEditingId(null);
      setEditName('');
    }
  };

  return (
    <div>
      <h2>Course Types</h2>
      <div className="form-group">
        <input
          type="text"
          value={newCourseType}
          onChange={(e) => setNewCourseType(e.target.value)}
          placeholder="New course type name"
        />
        <button onClick={handleAddCourseType}>Add Course Type</button>
      </div>
      <ul className="list">
        {courseTypes.map(courseType => (
          <li key={courseType.id} className="list-item">
            {editingId === courseType.id ? (
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
                <span>{courseType.name}</span>
                <div>
                  <button onClick={() => handleEdit(courseType)}>Edit</button>
                  <button onClick={() => handleDelete(courseType.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseTypes;