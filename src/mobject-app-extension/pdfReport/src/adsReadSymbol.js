const ads = require("ads-client");

module.exports = class ADSReadSymbol {
  static async getValueFromClient(VariableName, NetId, Port) {
    const client = ADSReadSymbol.createAdsClient(NetId, Port);
    await client.connect();
    const response = await client.readSymbol(VariableName);
    await client.disconnect();
    return response.value;
  }

  static createAdsClient(NetId, Port) {
    return new ads.Client({
      targetAmsNetId: NetId,
      targetAdsPort: Port,
    });
  }
};
