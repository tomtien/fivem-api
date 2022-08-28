# fivem-api
An easy-to-use API wrapper for FiveM. This library also has 100% API coverage

## Usage
To use the API you will need to make an instance of FivemServer with the server ip and port (defaults to 30120).
Then to get server information you will need to fetch(), or to get player information you will need to fetchPlayers().

```js
{FivemServer,IdentifierType} = require("full-fivem-api")

async function main() {
    const server = new FivemServer("IP");
    await server.fetch();
    console.log(server.maxClients);
    await server.fetchPlayers();
    console.log(server.players);
    console.log(server.getUserByName("NAME"))
    console.log(server.getUserByIdentifier(IdentifierType.discord,"DISCORD-ID"))
}
```
### Available data:
```
FivemServer.players (populated with fetchPlayers)
FivemServer.requestSteamTicket
FivemServer.icon
FivemServer.resources
FivemServer.server
FivemServer.bannerConnecting
FivemServer.bannerDetailed
FivemServer.game
FivemServer.locale
FivemServer.onesyncEnabled
FivemServer.enforceGameBuild
FivemServer.enhancedHostSupport
FivemServer.lan
FivemServer.licenseKeyToken
FivemServer.maxClients
FivemServer.projectDesc
FivemServer.projectName
FivemServer.pureLevel
FivemServer.scriptHookAllowed
FivemServer.tags
FivemServer.txAdminVersion
FivemServer.version
```
