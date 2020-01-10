import React, { useState, useEffect } from 'react'

import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

export const ALL_BOOKS = gql`
  {
    allBooks  {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const ALL_BOOKS_BY_GENRE = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const Books = ({ show }) => {
  const books = useQuery(ALL_BOOKS)

  const client = useApolloClient(ALL_BOOKS_BY_GENRE)
  const [selectedGenre, setSelectedGenre] = useState('')
  const [BooksByGenre, setBooksByGenre] = useState([])
  
  const [genres, setGenres] = useState([])

  useEffect(() => {
    let bookgenres = []
    if(books.data) {
      books.data.allBooks.forEach(b => {
        b.genres.forEach(genre => {
          if(!bookgenres.includes(genre)) {
            bookgenres.push(genre)
          }
        })
      })
      setGenres(bookgenres)
    }
  }, [books.data])

  const showBookByGenre = async (genre) => {
    const { data } = await client.query({
      query: ALL_BOOKS_BY_GENRE,
      variables: { genre: genre },
      fetchPolicy: 'no-cache'
    })
    setBooksByGenre(data.allBooks)
  }

  const changeGenre = (genre) => {
    setSelectedGenre(genre)
    showBookByGenre(genre)
  }

  if (!show) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {
            selectedGenre === ''
            ? books.data.allBooks.map(b =>
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )
            : BooksByGenre.map(b =>
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )
          }
        </tbody>
      </table>
      <br></br>
      {
        books.data &&
        genres.map(genre => {
          return (
            <button key={genre} onClick={() => changeGenre(genre)} >{genre}</button>
          )
        })        
      }
      <button onClick={() => changeGenre('')}>all Genres</button>
    </div>
  )
}

export default Books