
export function BundleNew(props) {

  const handleSubmit = (event) => {
    event.preventDefault()
    const params = new FormData(event.target)
    props.onCreateBundle(params, () => event.target.reset())
  }
  return (
    <div>
      <h2>Create Bundle</h2>

      <form onSubmit={handleSubmit}>
        <div>Title: <input name="title" type="string" /></div>
        <button type="submit">Create Bundle</button>
      </form>

    </div>
  )
}