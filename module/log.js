export class LOG {
  constructor() {}

  counterMessage(usersCount) {
    return usersCount > 0
      ? `Найдено ${usersCount} пользователей`
      : "По вашему запросу пользователей не найдено";
  }
}
