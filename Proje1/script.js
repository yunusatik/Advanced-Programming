const APIURL = "https://api.github.com/users/";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("florinpop17");

async function getUser(username) 
{
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();

    createUserCard(respData);

    getRepos(username);
}

async function getRepos(username) 
{
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();

    addReposToCard(respData);
}

function createUserCard(user) {
    const cardHTML = `  
        <div class="container">
            <div class="card">
                <img class="avatar" src="${user.avatar_url}"/>
                <div class="user-info">
                    <h2>${user.name}</h2>
                    <p>${user.bio}</p>
                    <ul class="info">
                        <li>${user.followers}<strong>Followers&nbsp;|&nbsp;</strong></li>
                        <li>${user.following}<strong>Following&nbsp;|&nbsp;</strong></li>
                        <li>${user.public_repos}<strong>Repos</strong></li>
                    </ul>
                </div>
            </div>
            <div id="repos" class="repo"></div>
        </div> 
    `;
    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");
    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = "";
    }
});