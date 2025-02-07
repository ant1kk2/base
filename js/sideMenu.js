export function toogleGroups(btn) {
  btn.classList.toggle("opened")
  if (btn.classList.contains("opened")) {
    btn.parentNode.querySelector("ul")?.classList.remove("hidden")
    btn.textContent = "-"
  } else {
    btn.parentNode.querySelector("ul")?.classList.add("hidden")
    btn.textContent = "+"
  }
}



