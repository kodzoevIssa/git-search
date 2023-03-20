export class VIEW {
  constructor(api) {
    this.api = api;

    this.app = document.getElementById("app");

    this.title = this.createElement("h1", "title");
    this.title.textContent = "Github Search Users";

    this.mainContent = this.createElement("div", "main");

    this.usersListWrapper = this.createElement("div", "users-wrapper");
    this.usersList = this.createElement("ul", "users");
    this.usersListWrapper.append(this.usersList);

    this.searchLine = this.createElement("div", "search-line");
    this.searchInput = this.createElement("input", "search-input");
    this.usersCounter = this.createElement("span", "counter");
    this.searchLine.append(this.searchInput);
    this.searchLine.append(this.usersCounter);

    this.loadMore = this.createElement("button", "btn");
    this.loadMore.textContent = "Загрузить еще";
    this.loadMore.style.display = "none";
    this.usersListWrapper.append(this.loadMore);

    this.app.append(this.title);
    this.app.append(this.searchLine);
    this.mainContent.append(this.usersListWrapper);
    this.app.append(this.mainContent);
  }

  createElement(elementName, className) {
    const element = document.createElement(elementName);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }

  createUser(userData) {
    const user = this.createElement("li", "user-prev");
    user.addEventListener("click", () => this.showUser(userData));
    user.innerHTML = `<img class="user-prev-photo" src="${userData.avatar_url}" alt="${userData.login}_photo"> <span class="user-prev-name">${userData.login}</span>`;
    this.usersList.append(user);
  }

  showUser(userData) {
    const user = this.createElement("div", "user");
    const userHtml = this.mainContent.querySelector(".user");
    const name = userData.login;
    this.api.loadUserData(name).then((data) => {
      const [repos] = data;

      const reposHTML = this.getUserListHTML(repos, "Repos");
      user.innerHTML = `<img src="${userData.avatar_url}"><h2 class="user-name">${name}</h2>${reposHTML}`;
      if (userHtml) {
        userHtml.remove();
      }
      this.mainContent.append(user);
    });
  }

  getUserListHTML(data, title) {
    return data.length
      ? `<div class="user-block">
      <h3 class="user-block-title">${title}</h3> <ul class="user-list">${this.templateItem(
          data
        )}</ul></div>`
      : "";
  }

  templateItem(data) {
    let userItem = "";
    data.forEach((user) => {
      userItem += `<li class="user-list-item"><a href="${
        user.html_url
      }" class="user-list-link">${
        user.login ? user.login : user.name
      }</a> </li>`;
    });
    return userItem;
  }

  clearUsers() {
    this.usersList.innerHTML = "";
  }

  setUserCounter(message) {
    this.usersCounter.textContent = message;
  }

  toggleStateLoadMoreButton(show) {
    this.loadMore.style.display = show ? "block" : "none";
  }
}
