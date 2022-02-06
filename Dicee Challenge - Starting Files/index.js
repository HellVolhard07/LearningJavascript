const URL = "https://jsonplaceholder.typicode.com/comments?postId=1"

fetch(URL)
  .then((response) => {
    return response.json()
  })
  .then((comments) => {
    console.log(comments)
  })

// async function doStuff() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users")
//   const data = await response.json()
//   console.log(data.map((user) => user.name))
// }

// doStuff()
