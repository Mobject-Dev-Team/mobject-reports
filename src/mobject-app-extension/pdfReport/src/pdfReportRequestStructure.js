const iec = require("iec-61131-3");
const AppSystemInfoStructure = require("./appSystemInfoStructure");
const TaskSystemInfoStructure = require("./taskSystemInfoStructure");

const PDFReportRequestStructure = iec.STRUCT({
  VariableName: iec.STRING(255),
  LocalNetId: iec.STRING(23),
  LocalPort: iec.UINT,
  TemplateName: iec.STRING(255),
  FileName: iec.STRING(255),
  FilePath: iec.STRING(255),
  AppSystemInfo: AppSystemInfoStructure,
  TaskSystemInfo: TaskSystemInfoStructure,
});

module.exports = PDFReportRequestStructure;
