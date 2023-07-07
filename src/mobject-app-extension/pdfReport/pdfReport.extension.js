const MobjectAppExtension = require("./src/mobjectAppExtension");
const PDFReportRequestStructure = require("./src/pdfReportRequestStructure");
const PDFReportResponseStructure = require("./src/pdfReportResponseStructure");
const ADSReadSymbol = require("./src/adsReadSymbol");
const PDFCreator = require("./src/pdfCreator");
const prefixInternalKeys = require("./src/prefixInternalKeys");
const iec = require("iec-61131-3");

const STATUS = {
  SUCCESS: 200,
};

class PDFReportExtension extends MobjectAppExtension {
  constructor() {
    super({
      name: "PDF Report",
      version: "0.0.1",
      indexGroup: 10,
      requestDataType: PDFReportRequestStructure,
    });
  }

  async handleRequest(req) {
    if (req.type !== "request") return;
    if (req.indexOffset !== 100) return;

    try {
      const readValue = await this.readValuesFromClient(req.data);
      await this.createPDF(readValue, req.data);
    } catch (err) {
      console.error("Failed to process the request: ", err);
      return { error: 1232 };
    }

    return {
      data: iec.UDINT.convertToBuffer(STATUS.SUCCESS),
    };
  }

  async readValuesFromClient(data) {
    const readValue = await ADSReadSymbol.getValueFromClient(
      data.VariableName,
      data.LocalNetId,
      data.LocalPort
    );
    return Object.assign(readValue, prefixInternalKeys(data));
  }

  async createPDF(readValue, data) {
    const pdf = new PDFCreator(data.FileName, data.FilePath, data.TemplateName);
    await pdf.create(readValue);
    return pdf;
  }
}

new PDFReportExtension();
