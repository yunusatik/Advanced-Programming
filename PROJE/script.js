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
    let counter=2;
    let biosayisi=0
    if(user.company==null){
        user.company="";
        counter--;
    }
    else{
        user.company="'"+user.company+"'";
    }
    if(user.bio==null){
        user.bio="";
        counter--;
    }    
    if(counter==0){
        user.bio="Bio Doldurulmamıştır";
    }
    
    main.innerHTML = `  
        <div class="container">
            <div class="card">
                <img class="avatar" src="${user.avatar_url}"/>
                <div class="user-info">
                    <h2>${user.name}</h2>
                    <p>${user.bio}&nbsp;&nbsp;&nbsp;&nbsp;${user.company}</p>
                    <p></p>
                    <p></p>
                    <ul class="info">
                        <p>${user.followers}&nbsp;&nbsp;Followers&nbsp;|&nbsp;${user.following}&nbsp;&nbsp;Following&nbsp;|&nbsp;${user.public_repos}&nbsp;&nbsp;Repos</p>
                     </ul>
                </div>
            </div>
            <div id="repos" class="repo"></div>
        </div> 
    `;
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