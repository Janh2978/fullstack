import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { ALL_BOOKS } from './Books'

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

const Recommendations = ({ show }) => {
  const books = useQuery(ALL_BOOKS)
  const me = useQuery(ME)

  if (!show) {
    return null
  }

  if(me.loading){
    return <div>loading...</div>
  }

  return (
    <>
      <h2>Recommendations</h2>
      <p>books in your favorite genre <strong>{me.data.me.favoriteGenre}</strong></p>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {
            books.data.allBooks.map((book, i) => {
              if(book.genres.includes(me.data.me.favoriteGenre)) {
                return (
                  <tr key={i}>
                    <td>{book.title}</td>
                    <td>{book.author.name}</td>
                    <td>{book.published}</td>
                  </tr>
                )
              }
              return null
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default Recommendations