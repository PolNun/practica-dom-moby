import UserHandler from "./userHandler.js";

const userHandler = new UserHandler();

export default class Registration {
    static async init() {
        const registration = new Registration();
        registration.validateAllInputs(registration);

        const form = document.getElementById('registration-form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            registration.register();
        });
    }

    validateInput(inputElement, regex, spanErrorElement, errorMessage) {
        if (regex.test(inputElement.value)) {
            inputElement.classList.remove("error");
            inputElement.classList.add("valid");
            spanErrorElement.innerHTML = "";
            return true;
        } else {
            if (inputElement === document.getElementById("register-password")) {
                const passwordNote = document.getElementById("password-note");
                inputElement.classList.remove("valid");
                inputElement.classList.add("error");
                passwordNote.style.color = "red";
                return false;
            }
            inputElement.classList.remove("valid");
            inputElement.classList.add("error");
            spanErrorElement.innerHTML = errorMessage;
            return false;
        }
    }

    validateEmailConfirmation() {
        const email = document.getElementById("register-email");
        const emailConfirmation = document.getElementById("register-email-confirmation");
        const emailConfirmationError = document.getElementById("error-email-confirmation");
        if (email.value === emailConfirmation.value) {
            emailConfirmation.classList.remove("error");
            emailConfirmation.classList.add("valid");
            emailConfirmationError.innerHTML = "";
            return true;
        } else {
            emailConfirmation.classList.remove("valid");
            emailConfirmation.classList.add("error");
            emailConfirmationError.innerHTML = "El email no coincide";
            return false;
        }
    }

    validatePasswordConfirmation() {
        const password = document.getElementById("register-password");
        const passwordConfirmation = document.getElementById("register-password-confirmation");
        const passwordConfirmationError = document.getElementById("error-password-confirmation");
        if (password.value === passwordConfirmation.value) {
            passwordConfirmation.classList.remove("error");
            passwordConfirmation.classList.add("valid");
            passwordConfirmationError.innerHTML = "";
            return true;
        } else {
            passwordConfirmation.classList.remove("valid");
            passwordConfirmation.classList.add("error");
            passwordConfirmationError.innerHTML = "La contraseña no coincide";
            return false;
        }
    }

    validateAllInputs(registrationInstance) {
        const inputName = document.getElementById("register-name");
        const inputLastname = document.getElementById("register-lastname");
        const inputEmail = document.getElementById("register-email");
        const inputPassword = document.getElementById("register-password");
        const inputEmailConfirmation = document.getElementById("register-email-confirmation");
        const inputPasswordConfirmation = document.getElementById("register-password-confirmation");

        const regexName = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
        const regexLastname = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const regexPassword = /^[a-zA-Z\d\s]{8,20}$/;

        const spanErrorName = document.getElementById("error-name");
        const spanErrorLastname = document.getElementById("error-lastname");
        const spanErrorEmail = document.getElementById("error-email");
        const spanErrorPassword = document.getElementById("error-password");

        const errorMessageName = "El nombre debe tener entre 2 y 40 caracteres alfabéticos.";
        const errorMessageLastname = "El apellido debe tener entre 2 y 40 caracteres alfabéticos.";
        const errorMessageEmail = "Solo se permiten letras (a-z), números (0-9), puntos (.), guiones (-) y guiones bajos (_).";

        inputName.addEventListener("blur", () => {
            registrationInstance.validateInput(inputName, regexName, spanErrorName, errorMessageName);
        });

        inputLastname.addEventListener("blur", () => {
            registrationInstance.validateInput(inputLastname, regexLastname, spanErrorLastname, errorMessageLastname);
        });

        inputEmail.addEventListener("blur", () => {
            registrationInstance.validateInput(inputEmail, regexEmail, spanErrorEmail, errorMessageEmail);
        });

        inputPassword.addEventListener("blur", () => {
            registrationInstance.validateInput(inputPassword, regexPassword, spanErrorPassword, "");
        });

        inputEmailConfirmation.addEventListener("blur", () => {
            registrationInstance.validateEmailConfirmation();
        });

        inputPasswordConfirmation.addEventListener("blur", () => {
            registrationInstance.validatePasswordConfirmation();
        });
    }

    register() {
        const name = document.getElementById("register-name").value;
        const lastname = document.getElementById("register-lastname").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const users = userHandler.getUsers();

        const user = {
            name,
            lastname,
            email,
            password
        };
        if (!userHandler.getUser(email)) {
            userHandler.setCurrentUserToLocalStorage(user);
            userHandler.addUserToLocalStorage(user);
            location.hash = "/home";
        } else {
            document.getElementById("error-email").innerHTML = "El email ya está registrado.";
            document.getElementById("register-email").classList.add("error");
        }
    }
}