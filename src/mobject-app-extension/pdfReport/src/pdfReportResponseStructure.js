const iec = require("iec-61131-3");

const PDFReportResponseStructure = iec.STRUCT({
  ResponseCode: iec.UINT,
});

module.exports = PDFReportResponseStructure;
