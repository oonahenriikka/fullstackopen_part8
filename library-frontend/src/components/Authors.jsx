import { useState } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'


const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
  refetchQueries: ['AllAuthors'],
})
const [born, setBorn] = useState('')
const [selectedAuthor, setSelectedAuthor] = useState('')


  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born || '—'}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
<form
  onSubmit={(e) => {
    e.preventDefault()
    editAuthor({ variables: { name: selectedAuthor, setBornTo: Number(born) } })
    setBorn('')
    setSelectedAuthor('')
  }}
>
  <div>
    name
    <select
      value={selectedAuthor}
      onChange={({ target }) => setSelectedAuthor(target.value)}
    >
      <option value="">Select author</option>
      {authors.map((a) => (
        <option key={a.name} value={a.name}>
          {a.name}
        </option>
      ))}
    </select>
  </div>
  <div>
    born
    <input
      type="number"
      value={born}
      onChange={({ target }) => setBorn(target.value)}
    />
  </div>
  <button type="submit">update author</button>
</form>
    </div>
  )
}

export default Authors
