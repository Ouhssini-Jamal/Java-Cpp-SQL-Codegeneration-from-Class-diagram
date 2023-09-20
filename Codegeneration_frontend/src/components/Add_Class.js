import React, { useState } from 'react';

export default function Add_Class({ classes, onAddClass, onAddSuperClass }) {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSuperClass, setSelectedSuperClass] = useState('');
  const [newClassName, setNewClassName] = useState('');

  const handleClassSelect = (event) => {
    setSelectedClass(event.target.value);
  }
  const handleSuperClassSelect = (event) => {
    setSelectedSuperClass(event.target.value);
  }
  const handleNewClassNameChange = (event) => {
    setNewClassName(event.target.value);
  }

  const handleAddClass = () => {
    onAddClass(newClassName);
    setNewClassName('');
  }

  const handleAddSuperClass = () => {
    onAddSuperClass(selectedClass,selectedSuperClass);
  }

  return (
    <div className='Add_Class'>
      <label htmlFor="addnewclass">add new class</label>
      <input type='text' id="addclass" value={newClassName} onChange={handleNewClassNameChange} />
      <button onClick={handleAddClass}>Add Class</button>
      <br/>
      <label htmlFor="classSelect">Select a class:</label>
      <select id="classSelect" name="classSelect" onChange={handleClassSelect} value={selectedClass}>
        <option value="">Select a class</option>
        {classes.map((classObj) => (
          <option key={classObj.name} value={classObj.name}>
            {classObj.name} ({classObj.superclass})
          </option>
        ))}
      </select>
      <br/>
      <label htmlFor="classSelect">Select a super class:</label>
      <select id="classSelect" name="classSelect" onChange={handleSuperClassSelect} value={selectedSuperClass}>
        <option value="">Select a class</option>
        {classes.map((classObj) => (
          <option key={classObj.name} value={classObj.name}>
            {classObj.name} ({classObj.superclass})
          </option>
        ))}
      </select>
      <button onClick={handleAddSuperClass}>Add Super Class</button>
    </div>
  )
}

