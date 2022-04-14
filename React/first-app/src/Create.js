import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Create = () => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [author, setAuthor] = useState("mario")
  const navigate = useNavigate()
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const blog = { title, body, author }
    setIsPending(true)
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      setIsPending(false)
      navigate(-1)
    })
  }

  return (
    <div className="create">
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
          }}
        />
        <label>Blog Body</label>
        <textarea
          required
          value={body}
          onChange={(event) => {
            setBody(event.target.value)
          }}
        ></textarea>
        <label>Blog Author</label>
        <select
          value={author}
          onChange={(event) => {
            setAuthor(event.target.value)
          }}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        {!isPending && <button>Add blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
  )
}

export default Create
