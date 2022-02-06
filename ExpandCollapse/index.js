document.addEventListener("click", (event) => {
  if (!event.target.matches(".expand-button")) return

  const card = event.target.closest(".card")
  const cardBody = card.querySelector(".card-body")

  cardBody.classList.toggle("show")
  event.target.innerText =
    event.target.innerText === "Expand" ? "Collapse" : "Expand"
})
