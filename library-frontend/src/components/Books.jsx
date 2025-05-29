import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState(null)

  // Haetaan kaikki kirjat tai genren mukaan suodatetut kirjat
  const { loading, error, data } = useQuery(
    genreFilter ? BOOKS_BY_GENRE : ALL_BOOKS,
    { variables: genreFilter ? { genre: genreFilter } : {} }
  )

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  // Käytetään data.allBooks sisältöä
  const books = data.allBooks

  // Kerätään genret kaikista kirjoista, jotta käyttäjä voi valita genren suodatuksen
  const genres = [...new Set(data.allBooks.flatMap(book => book.genres))]

  return (
    <div>
      <h2>books</h2>

      <div>
        <strong>filter by genre: </strong>
        <button onClick={() => setGenreFilter(null)}>all genres</button>
        {genres.map((g) => (
          <button key={g} onClick={() => setGenreFilter(g)}>
            {g}
          </button>
        ))}
      </div>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
