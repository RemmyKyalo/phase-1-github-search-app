const usersListElement = document.getElementById("user-list");


document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#github-form")
    .addEventListener("submit", handleSubmit);
});

function handleSubmit(event) {
  event.preventDefault();

  const inputElement = document.getElementById("search");
  const query = inputElement.value;

  fetch(`https://api.github.com/search/users?q=${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // check if api returned items array
      if (data.items && data.items.length) {
        usersListElement.replaceChildren([])
        data.items.forEach((user) => renderUser(user));
      }
    });
}

function renderUser(user) {
  console.log(user);

  const listElement = document.createElement("li");
  usersListElement.appendChild(listElement);

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.style.width = "18rem";
  listElement.appendChild(cardDiv);

  const image = document.createElement("img");
  image.classList.add("card-img-top");
  image.src = user.avatar_url;
  cardDiv.appendChild(image);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardDiv.appendChild(cardBody);

  const h5 = document.createElement("h5");
  h5.classList.add("card-title");
  h5.innerText = user.login;
  cardBody.appendChild(h5);

  const a = document.createElement("a");
  a.classList.add("btn", "btn-primary");
  a.innerText = "view profile";
  a.href = `/profile.html?user=${user.login}`;
  cardBody.appendChild(a);
}
