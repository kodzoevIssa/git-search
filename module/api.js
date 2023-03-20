const USER_PER_PAGE = 10;
const URL = "https://api.github.com/";

export class API {
  constructor() {}

  async loadUsers(searchValue, page) {
    return await fetch(
      `${URL}search/users?q=${searchValue}&per_page=${USER_PER_PAGE}&page=${page}`
    );
  }

  async loadUserData(user) {
    const urls = [`${URL}users/${user}/repos`];
    const requests = urls.map((url) => fetch(url));
    return Promise.all(requests).then((responses) =>
      Promise.all(responses.map((r) => r.json()))
    );
  }
}
