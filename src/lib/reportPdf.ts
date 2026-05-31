import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportWeeklyReport() {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();

  // Header band
  doc.setFillColor(11, 51, 162);
  doc.rect(0, 0, W, 80, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Venado Route", 40, 38);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Reporte de desempeño semanal", 40, 58);
  doc.setFontSize(9);
  doc.text(
    new Date().toLocaleDateString("es-BO", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
    W - 40,
    58,
    { align: "right" }
  );

  doc.setTextColor(20, 20, 20);
  let y = 110;
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Indicadores clave (KPI) — Semana en curso", 40, y);
  y += 8;

  autoTable(doc, {
    startY: y + 6,
    head: [["Indicador", "Valor", "Variación sem. anterior"]],
    body: [
      ["Cobertura actual", "185 / 220 (84%)", "+4.7%"],
      ["Reponedores activos", "18 / 20", "+2 vs prom."],
      ["Tiempo promedio por visita", "24.3 min", "+6.2%"],
      ["Distancia promedio entre PDV", "18.6 km", "+5.1%"],
      ["PDV visitados / día", "35", "+3.4%"],
      ["Tiempo en tienda", "12.1 min", "+4.3%"],
      ["Cumplimiento de ruta", "92%", "+4.7%"],
      ["Desviación estándar", "1.32 min", "+9.1%"],
      ["Eficiencia del equipo", "84%", "+5.6%"],
    ],
    styles: { fontSize: 10, cellPadding: 6 },
    headStyles: { fillColor: [11, 51, 162], textColor: 255 },
    alternateRowStyles: { fillColor: [240, 244, 255] },
    margin: { left: 40, right: 40 },
  });

  y = (doc as any).lastAutoTable.finalY + 22;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Alertas críticas de la semana", 40, y);

  autoTable(doc, {
    startY: y + 8,
    head: [["Origen", "Detalle", "Severidad"]],
    body: [
      ["Juan Pérez (Reponedor)", "35 min promedio (+7 min sobre lo esperado)", "Alta"],
      ["Zona Sur", "12 PDV pendientes", "Media"],
      ["Ruta 5", "Sobrecarga operativa", "Media"],
      ["Mayorista San José", "Inventario crítico", "Alta"],
    ],
    styles: { fontSize: 10, cellPadding: 6 },
    headStyles: { fillColor: [11, 51, 162], textColor: 255 },
    alternateRowStyles: { fillColor: [240, 244, 255] },
    margin: { left: 40, right: 40 },
  });

  y = (doc as any).lastAutoTable.finalY + 22;
  if (y > 700) { doc.addPage(); y = 60; }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Sugerencias de IA", 40, y);

  const suggestions = [
    {
      t: "1. Optimización de cobertura — CRÍTICA",
      p: "La Ruta Norte presenta sobrecarga operativa respecto al promedio del equipo.",
      a: "Reasignar 3 PDV de Juan Pérez a Ana López.",
      i: "↓ 18% tiempo de ruta · ↑ 12% cumplimiento · ahorro estimado 2.3 h/semana.",
    },
    {
      t: "2. Reordenamiento de visitas — PREVENTIVA",
      p: "Tiempo de traslado +6.2% por orden de visita subóptimo en la Zona Sur.",
      a: "Aplicar algoritmo de optimización (Dijkstra) sobre 14 PDV.",
      i: "↓ 11% km recorridos · ↑ 8% PDV/día · ahorro estimado Bs. 480/semana.",
    },
  ];

  for (const s of suggestions) {
    if (y > 720) { doc.addPage(); y = 60; }
    doc.setFillColor(240, 244, 255);
    doc.roundedRect(40, y, W - 80, 92, 8, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(11, 51, 162);
    doc.text(s.t, 52, y + 18);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text(doc.splitTextToSize("Problema: " + s.p, W - 110), 52, y + 36);
    doc.text(doc.splitTextToSize("Acción sugerida: " + s.a, W - 110), 52, y + 58);
    doc.setTextColor(20, 120, 60);
    doc.text(doc.splitTextToSize("Impacto: " + s.i, W - 110), 52, y + 80);
    y += 104;
  }

  // Footer
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text(`Venado Route · Reporte generado el ${new Date().toLocaleString("es-BO")}`, 40, doc.internal.pageSize.getHeight() - 20);
    doc.text(`Página ${i} de ${pages}`, W - 40, doc.internal.pageSize.getHeight() - 20, { align: "right" });
  }

  doc.save(`Venado_Route_Reporte_Semanal_${new Date().toISOString().slice(0, 10)}.pdf`);
}
