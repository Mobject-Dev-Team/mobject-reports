const fs = require("fs");
const fsPromises = fs.promises;
const PdfPrinter = require("pdfmake");
const _ = require("lodash");
const path = require("path");

module.exports = class PDFCreator {
  constructor(filename, outputPath, template) {
    this.filename = filename;
    this.outputPath = outputPath;
    this.template = template;
  }

  async create(data) {
    const printer = this.createPdfPrinter();
    const docDefinition = await this.createDocumentDefinition(data);
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(
      fs.createWriteStream(path.join(this.outputPath, this.filename))
    );
    pdfDoc.end();
  }

  createPdfPrinter() {
    return new PdfPrinter({
      Roboto: {
        normal: path.join(
          __dirname,
          "../node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf"
        ),
        bold: path.join(
          __dirname,
          "../node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf"
        ),
      },
    });
  }

  async createDocumentDefinition(data) {
    if (!this.template) {
      return {
        content: [
          {
            text: JSON.stringify(data, replacer, 2),
            fontSize: 10,
            alignment: "left",
            preserveLeadingSpaces: true,
          },
        ],
      };
    }

    function replacer(key, value) {
      if (typeof value === "bigint") {
        return value.toString();
      } else {
        return value;
      }
    }

    const template = await fsPromises.readFile(this.template, "utf8");
    const compiled = _.template(template);
    const documentDefinition = compiled(data);
    return JSON.parse(documentDefinition);
  }
};
