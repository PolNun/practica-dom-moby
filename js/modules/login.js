import UserHandler from "./userHandler.js";

const userHandler = new UserHandler();

export default class Login {
    static async init() {
        const login = new Login();
        login.changeImageOnInput();
        document.getElementById("login-button").addEventListener("click", () => login.login());
        login.forgottenPassword();
    }

    changeImageOnInput() {
        const inputPassword = document.getElementById("login-password");
        const imgElement = document.getElementById("login-img");
        inputPassword.addEventListener("input", () => {
            if (inputPassword.value.length > 0) {
                imgElement.src = "img/gboard-turtle-closed.png";
            } else {
                imgElement.src = "img/gboard-turtle-open.png";
            }
        });
    }

    getLoginData() {
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        return {email, password};
    }

    login() {
        const loginData = this.getLoginData();
        const loginButton = document.getElementById("login-button");
        const loginImgError = document.getElementById("login-img");
        const users = userHandler.getUsersFromLocalStorage();
        const user = users.find((user) => user.email === loginData.email && user.password === loginData.password);
        if (user) {
            userHandler.setCurrentUserToLocalStorage(user);
            location.hash = "/home";
        } else if (loginData.email === "" || loginData.password === "") {
            loginButton.classList.add("error");
            loginButton.innerText = "Correo y/o contraseña inválidos";
            loginImgError.src = "img/gboard-turtle-error.png";

            setTimeout(() => {
                loginButton.classList.remove("error");
                loginButton.innerText = "Ingresar a la cuenta";
                loginImgError.src = "img/gboard-turtle-open.png";
            }, 4000);
        } else {
            loginButton.classList.add("error-login-button");
            loginButton.innerText = "Usuario no encontrado";
            loginImgError.src = "img/gboard-turtle-error.png";

            setTimeout(() => {
                loginButton.classList.remove("error-login-button");
                loginButton.innerText = "Intentar de nuevo";
                loginImgError.src = "img/gboard-turtle-open.png";
            }, 2000);
        }
    }

    forgottenPassword() {
        const forgottenPassword = document.getElementById("forgotten-password");
        forgottenPassword.addEventListener("click", () => {
            alert("¯\\_(ツ)_/¯");
        });
    }
}