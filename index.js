const axios = require('axios');

class FivemServer {
    constructor(ip, port = 30120, options = {}) {
        if (!ip) throw new Error("Please provide a server IP.");

        if (typeof ip !== 'string') throw new Error("The ip parameter must of type 'string'");
        this.ip = ip;
        this.port = port;
        this.url = `http://${ip}:${port}/`

        this.options = {
            timeout: options.timeout | 3000
        }

        this.requestSteamTicket = null
        this.icon = null
        this.resources = null
        this.server = null
        this.bannerConnecting = null
        this.bannerDetailed = null
        this.game = null
        this.locale = null
        this.onesyncEnabled = null
        this.enforceGameBuild = null
        this.enhancedHostSupport = null
        this.lan = null
        this.licenseKeyToken = null
        this.maxClients = null
        this.projectDesc = null
        this.projectName = null
        this.pureLevel = null
        this.scriptHookAllowed = null
        this.tags = null
        this.txAdminVersion = null
        this.version = null
    }
    uri(...args) {
        return this.url + args.join("/");
    }
    getServer() {
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

                    result({
                        requestSteamTicket: data.requestSteamTicket,
                        icon: data.icon,
                        resources: data.resources,
                        server: data.server,
                        info: {
                            bannerConnecting: data.vars.banner_connecting,
                            bannerDetailed: data.vars.banner_detail,
                            game: data.vars.gamename,
                            locale: data.vars.locale,
                            onesyncEnabled: data.vars.onesync_enabled,
                            enforceGameBuild: data.vars.sv_enforceGameBuild,
                            enhancedHostSupport: (data.vars.enhancedHostSupport === "true"),
                            lan: (data.vars.sv_lan === "true"),
                            licenseKeyToken: data.vars.sv_licenseKeyToken,
                            maxClients: parseInt(data.vars.sv_maxClients),
                            projectDesc: data.vars.sv_projectDesc,
                            projectName: data.vars.sv_projectName,
                            pureLevel: data.vars.sv_pureLevel,
                            scriptHookAllowed: (data.vars.sv_scriptHookAllowed === "true"),
                            tags: data.vars.tags,
                            txAdminVersion: data.vars["txAdmin-version"]
                        },
                        version: data.version
                    });
                }).catch((e) => {
                    err(e);
                });
        });
    }
    getInfo() {
        return new Promise((result, err) => {
            this.getServer().then((data) => {
                result(data.info);
            }).catch((e) => {
                err(e)
            });
        });
    }
    getResources() {
        return new Promise((result, err) => {
            this.getServer().then((data) => {
                result(data.resources);
            }).catch((e) => {
                err(e)
            });
        });
    }
    getGame() {
        return new Promise((result, err) => {
            this.getServer().then((data) => {
                result(data.info.game);
            }).catch((e) => {
                err(e)
            });
        });
    }
    getMaxCleints() {
        return new Promise((result, err) => {
            this.getServer().then((data) => {
                result(data.info.maxClients);
            }).catch((e) => {
                err(e)
            });
        });
    }
    getLocale() {
        return new Promise((result, err) => {
            this.getServer().then((data) => {
                result(data.info.locale);
            }).catch((e) => {
                err(e)
            });
        });
    }
    getTags() {
        return new Promise((result, err) => {
            this.getServer().then((data) => {
                result(data.info.tags);
            }).catch((e) => {
                err(e)
            });
        });

    }
    getName() {
        return new Promise((result, err) => {
            this.getServer().then((data) => {
                result(data.info.projectName);
            }).catch((e) => {
                err(e)
            });
        });

    }
    getDescription() {
        return new Promise((result, err) => {
            this.getServer().then((data) => {
                result(data.info.projectDesc);
            }).catch((e) => {
                err(e)
            });
        });

    }
    getIcon() {
        return new Promise((result, err) => {
            this.getServer().then((data) => {
                result(data.icon);
            }).catch((e) => {
                err(e)
            });
        });

    }
    getBannerURLs() {
        return new Promise((result, err) => {
            this.getServer().then((data) => {
                result({
                    bannerConnecting: data.info.bannerConnecting,
                    bannerDetailed: data.info.bannerDetailed
                });
            }).catch((e) => {
                err(e)
            });
        });
    }

    getPlayers() {
        return new Promise((result, err) => {
            axios
                .get(this.uri("players.json"), { timeout: this.options.timeout })
                .then((body) => {
                    const data = body.data;
                    result(data);
                }).catch((e) => {
                    err(e);
                });
        });
    }
}
module.exports = FivemServer;

