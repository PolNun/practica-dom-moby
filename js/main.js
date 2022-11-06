
class Main {

    async ajax(url, method = "GET") {
        return await fetch(url, {method: method}).then(response => response.text());
    }

    getIdFromHash() {
        let id = location.hash.slice(1);
        if (id[0] === '/') {
            id = id.slice(1);
        }
        return id || "login";
    }

    getViewUrlFromId(id) {
        return `views/${id}.html`;
    }

    getModuleUrlFromId(id) {
        return `./modules/${id}.js`;
    }

    async initJS(id) {
        const moduleUrl = this.getModuleUrlFromId(id);
        try {
            const {default: module} = await import(moduleUrl);
            if (typeof module.init !== "function") {
                console.log(`El módulo ${id} no tiene un método init()`);
                return;
            }
            await module.init();
        } catch (e) {
            console.log(`No se pudo importar el módulo ${id}.js`);
        }
    }

    async loadTemplate() {
        const id = this.getIdFromHash();
        const viewUrl = this.getViewUrlFromId(id);
        document.querySelector("main").innerHTML = await this.ajax(viewUrl);
        await this.initJS(id);
    }

    async loadTemplates() {
        await this.loadTemplate();
        window.addEventListener("hashchange", () => this.loadTemplate());
    }

    async start() {
        if (location.hash === "") location.hash = "/login";

        await this.loadTemplates();
    }
}

const main = new Main();
await main.start();