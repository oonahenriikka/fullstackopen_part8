const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null

  return (
    <div style={{ color: 'red', marginBottom: '1em' }}>
      {errorMessage}
    </div>
  )
}

export default Notify
