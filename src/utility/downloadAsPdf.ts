import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function replaceUnsupportedColors(container: HTMLElement) {
  const elements = container.querySelectorAll("*");
  for (const el of elements) {
    const computedStyle = window.getComputedStyle(el as HTMLElement);
    const bgColor = computedStyle.backgroundColor;
    const color = computedStyle.color;

    if (bgColor.includes("oklch")) {
      (el as HTMLElement).style.backgroundColor = "#ffffff"; // fallback
    }
    if (color.includes("oklch")) {
      (el as HTMLElement).style.color = "#000000"; // fallback
    }
  }
}

export async function downloadAsPdf(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    alert("Report content not found.");
    return;
  }
  replaceUnsupportedColors(element);

  await new Promise((resolve) => setTimeout(resolve, 500));

  const canvas = await html2canvas(element, {
    scale: 2, // better quality
    useCORS: true, // if you have images
    scrollY: -window.scrollY, // avoid scroll offset
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = pdfWidth;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  let heightLeft = imgHeight;
  let position = 0;

  // First page
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  // Add extra pages if needed
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  pdf.save(`${filename}.pdf`);
}
