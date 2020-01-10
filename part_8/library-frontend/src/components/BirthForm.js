import React, { useState } from 'react'
import Select from 'react-select'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { ALL_AUTHORS } from './Authors'

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo)  {
    name
    id
    bookCount
    born
  }
}
`

const BirthForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const authors = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (e) => {
    e.preventDefault()

    await editAuthor({
      variables: { name, setBornTo: born }
    })

    setName('')
    setBorn('')
  }

  const select = () => {
    
    if(authors.loading) {
      return (
        <div>loading...</div>  
      )
    }

    const groupedOptions = authors.data.allAuthors.map(a => {
      return {
        value: a.name, label: a.name
      }
    })

    return (
      <Select 
        options={groupedOptions} 
        onChange={(target) => setName(target.value)}
        value={name === ''? 0 : groupedOptions.find(o => o.value === name)}
        isClearable={true}
      />
    )
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        {select()}
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthForm