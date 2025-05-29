import { useQuery } from '@apollo/client'
import { ME, BOOKS_BY_GENRE } from '../queries'
import { useState, useEffect } from 'react'

const Recommended = (props) => {
  const meResult = useQuery(ME)
  const [genre, setGenre] = useState(null)

  // Kun käyttäjän tiedot ovat ladattu, asetetaan lempigenre
  useEffect(() => {
    if (meResult.data && meResult.data.me) {
      setGenre(meResult.data.me.favoriteGenre)
    }
  }, [meResult.data])

  const booksResult = useQuery(BOOKS_BY_GENRE, {
    skip: !genre,
    variables: { genre },
  })

  if (!props.show) {
    return null
  }

  if (meResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  if (meResult.error) {
    return <div>Error: {meResult.error.message}</div>
  }
  if (booksResult.error) {
    return <div>Error: {booksResult.error.message}</div>
  }

  const books = booksResult.data ? booksResult.data.allBooks : []

  return (
    <div>
      <h2>recommended books</h2>
      <p>
        books in your favorite genre <strong>{genre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
