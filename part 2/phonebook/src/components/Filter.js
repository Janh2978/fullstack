import React from 'react'

const Filter = ({handleChangeFilter, selected}) => (
  <div>
    filter shown with
    <input onChange={handleChangeFilter} value={selected} />
  </div>
)

export default Filter