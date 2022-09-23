const axios = require('axios');
class FivemPlayer {
    constructor(endpoint, id, identifiers, name, ping) {
        this.endpoint = endpoint;
        this.id = id;
        this.identifiers = identifiers;
        this.name = name;
        this.ping = ping;
    }
    hasIdentifier(identifierType, identifier) {
        return this.identifiers[identifierType] === identifier;
    }
}
const IdentifierType = {
    steam: 'steam',
    license: 'license',
    xbl: 'xbl',
    live: 'live',
    discord: 'discord',
    fivem: 'fivem',
    license2: 'license2'
}

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

                    result({ online: true });
                }).catch((e) => {
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
                    result({ online: false });
                });
        });
    }
    fetchPlayers() {
        return new Promise((result, err) => {
            axios
                .get(this.uri("players.json"), { timeout: this.options.timeout })
                .then((body) => {
                    const data = body.data;
                    const players = data.map((playerData) => {
                        const identifiers = {}
                        playerData.identifiers.forEach(
                            (ident) => {
                                const identParts = ident.split(":");
                                const identType = identParts[0];
                                const identIdentifier = identParts[1];
                                switch (identType) {
                                    case "steam":
                                        identifiers[IdentifierType.steam] = identIdentifier;
                                        break;
                                    case "license":
                                        identifiers[IdentifierType.license] = identIdentifier;
                                        break;
                                    case "xbl":
                                        identifiers[IdentifierType.xbl] = identIdentifier;
                                        break;
                                    case "live":
                                        identifiers[IdentifierType.live] = identIdentifier;
                                        break;
                                    case "discord":
                                        identifiers[IdentifierType.discord] = identIdentifier;
                                        break;
                                    case "fivem":
                                        identifiers[IdentifierType.fivem] = identIdentifier;
                                        break;
                                    case "license2":
                                        identifiers[IdentifierType.license2] = identIdentifier;
                                        break;
                                }
                                return {}
                            });
                        return new FivemPlayer(playerData.endpoint, playerData.id, identifiers, playerData.name, playerData.ping)
                    })
                    this.players = players;
                    result(players);
                }).catch((e) => {
                    this.players = null;
                    result({ online: false });
                });
        });
    }
    getUserByIdentifier(identifierType, identifier) {
        if (!this.players) return undefined;
        return this.players.find((player) => {
            return player.hasIdentifier(identifierType, identifier);
        })
    }
    getUserByName(name) {
        if (!this.players) return undefined;
        return this.players.find((player) => player.name === name)
    }
}

module.exports.IdentifierType = IdentifierType;
module.exports.FivemServer = FivemServer;


