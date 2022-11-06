export default class PageHome {
    static async init() {
        const pageHome = new PageHome();
        document.getElementById('logout-button').addEventListener("click", () => pageHome.logout());
        pageHome.welcomeMessage();
    }

    logout() {
        localStorage.removeItem("loggedUser");
        location.hash = "/login";
    }

    welcomeMessage() {
        const currentUser = JSON.parse(localStorage.getItem("loggedUser"));
        document.getElementById('welcome-message').innerHTML = `¡Hola, ${currentUser.name}!`;
    }
}