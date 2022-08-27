const axios = require('axios');

class FivemServer {
    constructor(ip, port = 30120, options = {}) {
        if (!ip) throw new Error("Please provide a server IP.");

        this.ip = ip;
        this.port = port;
        this.url = `http://${ip}:${port}/`

        this.options = {
            timeout: options.timeout || 3000
        }

        this.players = null;
        this.requestSteamTicket = null;
        this.icon = null;
        this.resources = null;
        this.server = null;
        this.bannerConnecting = null;
        this.bannerDetailed = null;
        this.game = null;
        this.locale = null;
        this.onesyncEnabled = null;
        this.enforceGameBuild = null;
        this.enhancedHostSupport = null;
        this.lan = null;
        this.licenseKeyToken = null;
        this.maxClients = null;
        this.projectDesc = null;
        this.projectName = null;
        this.pureLevel = null;
        this.scriptHookAllowed = null;
        this.tags = null;
        this.txAdminVersion = null;
        this.version = null;

    }
    uri(...args) {
        return this.url + args.join("/");
    }
    fetch() {
        return new Promise((result, err) => {
            axios
                .get(this.uri("info.json"), { timeout: this.options.timeout })
                .then((body) => {
                    const data = body.data;
                    this.requestSteamTicket = data.requestSteamTicket;
                    this.icon = data.icon;
                    this.resources = data.resources;
                    this.server = data.server;
                    this.bannerConnecting = data.vars.banner_connecting;
                    this.bannerDetailed = data.vars.banner_detail;
                    this.game = data.vars.gamename;
                    this.locale = data.vars.locale;
                    this.onesyncEnabled = data.vars.onesync_enabled;
                    this.enforceGameBuild = data.vars.sv_enforceGameBuild;
                    this.enhancedHostSupport = (data.vars.enhancedHostSupport === "true");
                    this.lan = (data.vars.sv_lan === "true");
                    this.licenseKeyToken = data.vars.sv_licenseKeyToken;
                    this.maxClients = parseInt(data.vars.sv_maxClients);
                    this.projectDesc = data.vars.sv_projectDesc;
                    this.projectName = data.vars.sv_projectName;
                    this.pureLevel = data.vars.sv_pureLevel;
                    this.scriptHookAllowed = (data.vars.sv_scriptHookAllowed === "true");
                    this.tags = data.vars.tags;
                    this.txAdminVersion = data.vars["txAdmin-version"];
                    this.version = data.version;

                    result(data);
                }).catch((e) => {
                    err(e);
                });
        });
    }
    fetchPlayers() {
        return new Promise((result, err) => {
            axios
                .get(this.uri("players.json"), { timeout: this.options.timeout })
                .then((body) => {
                    const data = body.data;
                    this.players = data;
                    result(data);
                }).catch((e) => {
                    err(e);
                });
        });
    }
}

async function main() {
    const server = new FivemServer("woenselcombat.us.to", 30120, { timeout: 1000 });
    await server.fetch();
    console.log(server.maxClients);
    await server.fetchPlayers();
    console.log(server.players);
}
main();
module.exports = FivemServer;

