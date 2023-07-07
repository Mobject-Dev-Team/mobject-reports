class MobjectAppExtension {
  constructor({ name, version, indexGroup, requestDataType }) {
    this.name = name;
    this.version = version;
    this.indexGroup = indexGroup;
    this.requestDataType = requestDataType;

    process.send({ type: "register", name, version, indexGroup });

    process.on("message", async (req) => {
      if (req.type === "request") {
        let requestData = requestDataType
          ? this.convertRawDataToDataType(req.data)
          : req.data;

        let response = await this.handleRequest(
          Object.assign({}, req, { data: requestData })
        );

        process.send({
          type: "response",
          requestId: req.requestId,
          response,
        });
      }
    });
  }

  convertRawDataToDataType(rawData) {
    const buffer = Buffer.from(rawData);
    return this.requestDataType.convertFromBuffer(buffer);
  }

  // Overwrite this method in your subclass
  async handleRequest(req) {
    throw new Error("You have to implement the method handleRequest!");
  }
}

module.exports = MobjectAppExtension;
