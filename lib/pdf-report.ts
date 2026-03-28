import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import html2canvas from 'html2canvas'
import { calculatorContent } from '@/lib/calculator-content'
import { formatINR } from '@/components/calculators/shared'

interface ReportData {
  calcKey: string
  inputs: { label: string, value: string | number }[]
  outputs: { label: string, value: string | number }[]
  columns: string[]
  rows: (string | number)[][]
  chartElementId?: string
}

export async function generatePDFReport(data: ReportData) {
  const content = calculatorContent[data.calcKey]
  const title = content ? content.title : 'Calculation Report'

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  
  let currentY = 20

  // 1. Header
  doc.setFontSize(22)
  doc.setTextColor(13, 148, 136) // Accent color (#0d9488) approx
  doc.setFont('helvetica', 'bold')
  doc.text('KYFS Finance', 14, currentY)
  
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.setFont('helvetica', 'normal')
  doc.text('Smart money decisions, simplified.', 14, currentY + 6)
  
  currentY += 20

  // 2. Report Title
  doc.setFontSize(16)
  doc.setTextColor(0, 0, 0)
  doc.setFont('helvetica', 'bold')
  doc.text(`${title} Report`, 14, currentY)
  
  currentY += 10

  // 3. Inputs & Outputs
  const summaryBody = [
    ...data.inputs.map(i => [i.label, typeof i.value === 'number' ? `Rs. ${formatINR(i.value)}` : i.value]),
    [{ content: 'Results', colSpan: 2, styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } as any }],
    ...data.outputs.map(o => [o.label, typeof o.value === 'number' ? `Rs. ${formatINR(o.value)}` : o.value])
  ]

  // @ts-ignore - jspdf-autotable adds autoTable to jsPDF type
  autoTable(doc, {
    startY: currentY,
    head: [['Parameters', 'Value']],
    body: summaryBody as any,
    theme: 'grid',
    headStyles: { fillColor: [13, 148, 136] },
    margin: { left: 14 }
  })

  // @ts-ignore
  currentY = doc.lastAutoTable.finalY + 15

  // 4. Chart Image
  if (data.chartElementId) {
    const chartEl = document.getElementById(data.chartElementId)
    // Create an explicit wait block to ensure chart rendering is completely finished before taking snapshot (mostly fine synchronous but style takes a bit)
    if (chartEl) {
      try {
        const canvas = await html2canvas(chartEl, { 
            scale: 2, 
            backgroundColor: getComputedStyle(document.body).getPropertyValue('--card-bg') || '#ffffff',
            useCORS: true,
        })
        const imgData = canvas.toDataURL('image/png')
        
        // Calculate dimensions to fit width while keeping aspect ratio
        const imgWidth = pageWidth - 28
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        
        // Check if we need a new page for the chart
        if (currentY + imgHeight > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage()
          currentY = 20
        }

        doc.setFontSize(12)
        doc.setFont('helvetica', 'bold')
        doc.text('Visualization', 14, currentY)
        currentY += 6

        doc.addImage(imgData, 'PNG', 14, currentY, imgWidth, imgHeight)
        currentY += imgHeight + 15
      } catch (err) {
        console.error('Failed to capture chart', err)
      }
    }
  }

  // 5. Schedule Table
  if (data.rows && data.rows.length > 0) {
    // Check if we need a new page for the table start
    if (currentY > doc.internal.pageSize.getHeight() - 40) {
      doc.addPage()
      currentY = 20
    }

    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Schedule', 14, currentY)
    currentY += 6

    const formattedRows = data.rows.map(row => 
      row.map((cell, j) => (j > 0 && typeof cell === 'number') ? `Rs. ${formatINR(cell)}` : cell)
    )

    // @ts-ignore
    autoTable(doc, {
      startY: currentY,
      head: [data.columns],
      body: formattedRows,
      theme: 'striped',
      headStyles: { fillColor: [13, 148, 136] },
      margin: { left: 14 }
    })
    
    // @ts-ignore
    currentY = doc.lastAutoTable.finalY + 15
  }

  // 6. Educational Content (Assumptions / Theory)
  if (content) {
    if (currentY > doc.internal.pageSize.getHeight() - 40) {
      doc.addPage()
      currentY = 20
    }

    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0,0,0)
    doc.text(`About ${title}`, 14, currentY)
    currentY += 8

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    
    content.whatIsIt.forEach(para => {
      const splitText = doc.splitTextToSize(para, pageWidth - 28)
      doc.text(splitText, 14, currentY)
      currentY += splitText.length * 5 + 4
      
      if (currentY > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage()
        currentY = 20
      }
    })

    if (content.formula && content.formula.assumptions && content.formula.assumptions.length > 0) {
      currentY += 4
      if (currentY > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage()
        currentY = 20
      }
      doc.setFont('helvetica', 'bold')
      doc.text('Assumptions:', 14, currentY)
      currentY += 6
      doc.setFont('helvetica', 'normal')
      
      content.formula.assumptions.forEach(assump => {
        const splitText = doc.splitTextToSize(`• ${assump}`, pageWidth - 28)
        doc.text(splitText, 14, currentY)
        currentY += splitText.length * 5 + 2
        
        if (currentY > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage()
          currentY = 20
        }
      })
    }
  }

  // 7. Footer
  currentY += 15
  if (currentY > doc.internal.pageSize.getHeight() - 60) {
    doc.addPage()
    currentY = 20
  }

  doc.setDrawColor(200, 200, 200)
  doc.line(14, currentY, pageWidth - 14, currentY)
  currentY += 10

  // Left Column
  doc.setFontSize(14)
  doc.setTextColor(13, 148, 136)
  doc.setFont('helvetica', 'bold')
  doc.text('KYFS Finance', 14, currentY)

  doc.setFontSize(9)
  doc.setTextColor(100, 100, 100)
  doc.setFont('helvetica', 'normal')
  doc.text('Empowering your financial future with precision.', 14, currentY + 6)
  doc.text('support@kyfs.com  |  +91 98765 43210', 14, currentY + 12)

  // Rights Below line
  currentY += 22

  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  doc.setFont('helvetica', 'bold')
  doc.text('Important Disclaimer', 14, currentY)
  
  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  doc.setFont('helvetica', 'normal')
  const disclaimerText = "All calculators and tools provided by KYFS Finance are for educational and planning purposes only. Actual returns, interest rates, and loan terms may vary depending on market conditions, financial institution policies, and other external factors. Please consult a certified financial advisor or your respective bank before making any financial decisions based on these calculations."
  const splitDisclaimer = doc.splitTextToSize(disclaimerText, pageWidth - 28)
  doc.text(splitDisclaimer, 14, currentY + 5)
  
  currentY += splitDisclaimer.length * 4 + 10

  doc.text('© 2026 K Y Financial Services. All rights reserved.', pageWidth / 2, currentY, { align: 'center' })

  // Save the PDF
  doc.save(`${data.calcKey}-report.pdf`)
}
