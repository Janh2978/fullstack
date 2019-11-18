import React from 'react'

const PersonForm = ({ handleSubmit, handleChange, newName, handleChangeNumber, newNumber}) => (
  <form onSubmit={handleSubmit}>
    <div>name: <input onChange={handleChange} value={newName} /></div>
    <div>number: <input onChange={handleChangeNumber} value={newNumber} /></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm