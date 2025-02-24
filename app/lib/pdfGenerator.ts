import jsPDF from 'jspdf';
import { Tour } from './tourData';

interface TravelDetails {
  startDate: Date;
  endDate: Date;
  adults: number;
  children: number;
  childrenAges: number[];
  selectedTours: Tour[];
  notes: string;
  agencyLogo?: string;
}

export const generatePDF = async (details: TravelDetails) => {
  const doc = new jsPDF();
  let yPos = 20;
  const leftMargin = 20;
  const pageWidth = doc.internal.pageSize.width;
  const contentWidth = pageWidth - (leftMargin * 2);

  // Helper functions
  const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.text(text, leftMargin, yPos);
    yPos += fontSize / 2 + 4;
  };

  const addWrappedText = (text: string, fontSize: number = 12) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, contentWidth);
    doc.text(lines, leftMargin, yPos);
    yPos += (lines.length * (fontSize / 2)) + 4;
  };

  const addHorizontalLine = () => {
    doc.setLineWidth(0.5);
    doc.line(leftMargin, yPos, pageWidth - leftMargin, yPos);
    yPos += 10;
  };

  // Add agency logo if provided
  if (details.agencyLogo) {
    try {
      const img = new Image();
      img.src = details.agencyLogo;
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      const imgWidth = 40;
      const imgHeight = (img.height * imgWidth) / img.width;
      doc.addImage(img, 'PNG', pageWidth - leftMargin - imgWidth, 10, imgWidth, imgHeight);
    } catch (error) {
      console.error('Error loading agency logo:', error);
    }
  }

  // Title
  addText('Travel Itinerary', 24, true);
  yPos += 10;

  // Travel dates
  addText('Travel Dates:', 14, true);
  addText(`From: ${details.startDate.toLocaleDateString()}`, 12);
  addText(`To: ${details.endDate.toLocaleDateString()}`, 12);
  yPos += 5;

  // Travelers
  addText('Travelers:', 14, true);
  addText(`Adults: ${details.adults}`, 12);
  if (details.children > 0) {
    addText(`Children: ${details.children}`, 12);
    addText(`Children's Ages: ${details.childrenAges.join(', ')}`, 12);
  }
  yPos += 5;

  // Selected tours
  addText('Selected Tours:', 14, true);
  yPos += 5;

  let totalPrice = 0;
  details.selectedTours.forEach((tour, index) => {
    if (yPos > doc.internal.pageSize.height - 40) {
      doc.addPage();
      yPos = 20;
    }

    addText(`${index + 1}. ${tour.name}`, 12, true);
    addWrappedText(`Description: ${tour.description}`, 10);
    addText(`Duration: ${tour.duration}`, 10);
    addText(`Price: $${tour.price} per person`, 10);
    yPos += 5;

    totalPrice += tour.price * (details.adults + details.children);
  });

  // Add horizontal line before total
  yPos += 5;
  addHorizontalLine();

  // Total price
  addText('Total Price:', 14, true);
  addText(`$${totalPrice}`, 14);
  yPos += 10;

  // Notes
  if (details.notes) {
    if (yPos > doc.internal.pageSize.height - 60) {
      doc.addPage();
      yPos = 20;
    }
    addText('Additional Notes:', 14, true);
    addWrappedText(details.notes, 10);
  }

  // Footer
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.height - 10, {
      align: 'center'
    });
  }

  return doc;
}; 