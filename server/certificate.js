const fs = require("fs");
const { PDFDocument, StandardFonts, rgb, PDFString, PDFName } = require("pdf-lib");


const createPageLinkAnnotation = (page, uri) =>
  page.doc.context.register(
    page.doc.context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: [185, 40, 245, 65],
      C: [0, 0, 1],
      A: {
        Type: 'Action',
        S: 'URI',
        URI: PDFString.of(uri),
      },
    }),
  );


async function generateCertificate(id, name, course, date) {
  const filePath = "./assets/template.pdf";
  const existingPdfBytes = fs.readFileSync(filePath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  let textWidth = helveticaFont.widthOfTextAtSize(name, 35);
  let xMax = 780;

  let x = xMax - textWidth > 0 ? xMax - textWidth : 0;
  firstPage.drawText(name, {
    x,
    y: 240,
    size: 35,
    font: helveticaFont,
    color: rgb(0, 0.1, 0.1),
  });

  const text = "has participated in a course on " + course + " and successfully completed it on " + new Date(date).toLocaleDateString() + "."

  textWidth = helveticaFont.widthOfTextAtSize(text, 12);
  xMax = 780;
  x = xMax - textWidth > 0 ? xMax - textWidth : 0;

  firstPage.drawText(text
    , {
      x,
      y: 200,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0.1, 0.1),
    });

  // Add a link annotation to the PDF
  const link = createPageLinkAnnotation(firstPage, 'http://localhost:4000/certificate/' + id);
  firstPage.node.set(PDFName.of('Annots'), pdfDoc.context.obj([link]));

  // Set the title of the PDF
  pdfDoc.setTitle('Certificate of Completion');

  const pdfBytes = await pdfDoc.save();

  fs.writeFileSync(`./public/uploads/${id}.pdf`, pdfBytes);
  console.log("PDF saved successfully!");
}

// generateCerti("123", "Shivam", "Blockchain", Date.now());

module.exports = generateCertificate;
