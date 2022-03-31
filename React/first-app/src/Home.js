import { useEffect, useState } from "react"
import BlogList from "./BlogList"

const Home = () => {
  const [blogs, setBlogs] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/blogs")
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data from that resourse")
          }
          return res.json()
        })
        .then((data) => {
          setError(null)
          setBlogs(data)
          setIsPending(false)
        })
        .catch((err) => {
          setError(err.message)
          setIsPending(false)
        })
    }, 1000)
  }, [])

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} />}
    </div>
  )
}

export default Home