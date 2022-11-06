export default class UserHandler {
    users = [
        {
            "email": "cfulanito@mail.com",
            "name": "Cosme",
            "lastname": "Fulanito",
            "password": "12345678"
        },
        {
            "email": "pablo@mail.com",
            "name": "Pablo",
            "lastname": "Núñez",
            "password": "87654321"
        },
        {
            "email": "user@mail.com",
            "name": "User",
            "lastname": "Three",
            "password": "undefined"
        }
    ];

    setUsersToLocalStorage(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    getUsersFromLocalStorage() {
        return JSON.parse(localStorage.getItem('users'));
    }

    setCurrentUserToLocalStorage(user) {
        localStorage.setItem('loggedUser', JSON.stringify({
            name: user.name,
            lastname: user.lastname
        }));
    }

    addUserToLocalStorage(user) {
        this.users.push(user);
        this.setUsersToLocalStorage(this.users);
    }

    getUser(email) {
        return this.users.find(user => user.email === email);
    }

    getUsers() {
        return this.users;
    }
}