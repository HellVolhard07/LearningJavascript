import { useState, useEffect } from "react"

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const abortController = new AbortController()
    setTimeout(() => {
      fetch(url, { signal: abortController.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data from that resourse")
          }
          return res.json()
        })
        .then((data) => {
          setError(null)
          setData(data)
          setIsPending(false)
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Fetch aborted...")
          } else {
            setError(err.message)
            setIsPending(false)
          }
        })
    }, 1000)

    return () => abortController.abort()
  }, [url])

  return { data, isPending, error }
}

export default useFetch
