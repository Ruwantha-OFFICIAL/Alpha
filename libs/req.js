const axios = require("axios");

class Requste {
    constructor(url) {
        if (typeof url !== "string" || !url.startsWith("https://")) {
            console.error("params type string(url) - must start with https://");
            return;
        }
        this.url = encodeURI(url);
        this.host = new URL(url).hostname;
        this.configs = null;
    }

    defulte() {
        this.configs = {
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36",
                "Content-Type": "application/json",
                Host: this.host
            }
        };
    }

    New(configObject) {
        this.configs = { headers: configObject };
    }

    async Get() {
        if (!this.configs) {
            console.log("1# Create Defulte or New config first");
            return { result: false, header: null, body: "Config missing!" };
        }

        try {
            let respones = await axios.get(this.url, this.configs);
            return {
                result: true,
                header: respones.headers,
                body: respones.data
            };
        } catch (err) {
            console.error("Error:", err.message);
            return {
                result: false,
                header: null,
                body: "Network issue!"
            };
        }
    }
}

module.exports = Requste;
