document.addEventListener("DOMContentLoaded", () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let name = params.user;
  fetchProfile(name);
});

function fetchProfile(username) {
  fetch(`https://api.github.com/users/${username}/repos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data && data.length) {
        data.forEach((repo) => renderRepo(repo));
      }
    });
}

function renderRepo(repo) {
  const reposListElement = document.getElementById("repos-list");

  const liElement = document.createElement("li");

  const anchor = document.createElement("a");
  anchor.href = `https://github.com/${repo.owner.login}/${repo.name}`;
  anchor.innerText = repo.name;
  liElement.appendChild(anchor);

  reposListElement.appendChild(liElement);
}
