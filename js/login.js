const loginBtn = document.querySelector(".auth__btn");

let isAdmin = false

loginBtn.addEventListener("click", () => {
  const nameField = document.getElementById("auth__input").value;
  if (nameField === "admin") {
    localStorage.setItem("isAdmin", 1)
  } else {
    localStorage.removeItem("isAdmin")
  }
})
