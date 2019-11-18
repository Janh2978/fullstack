import React, { useState } from 'react'

import ShowCountry from './ShowCountry'

const SelectCountry = ({ country }) => {
  const [show, setShow] = useState(false)

  const handleClick = () => {
    setShow(!show)
  }

  return (
    <>
      <button onClick={handleClick}>
        {
          show
          ? (<>hide</>)
          : (<>show</>)
        }
      </button>
      {
        show
        ? (<><ShowCountry country={country} /><br></br><br></br></>)
        : (<></>)
      }
    </>
  )
}

export default SelectCountry