import jsPDF from 'jspdf';

interface PlanetPlacement {
  name: string;
  vedic: string;
  sign: string;
  signIcon: string;
  house: number;
  degree: string;
  nature: string;
  retrograde: boolean;
}

interface KundliPDFData {
  userName: string;
  dob: string;
  lagnaSign: string;
  moonSign: string;
  sunSign: string;
  placements: PlanetPlacement[];
}

const HOUSES = [
  { num: 1, name: 'Lagna', meaning: 'Self, personality, appearance' },
  { num: 2, name: 'Dhana', meaning: 'Wealth, family, speech' },
  { num: 3, name: 'Sahaja', meaning: 'Siblings, courage, communication' },
  { num: 4, name: 'Sukha', meaning: 'Mother, home, comfort' },
  { num: 5, name: 'Putra', meaning: 'Children, creativity, intelligence' },
  { num: 6, name: 'Ripu', meaning: 'Health, enemies, debts' },
  { num: 7, name: 'Kalatra', meaning: 'Marriage, partnerships, business' },
  { num: 8, name: 'Ayu', meaning: 'Longevity, transformation, mystery' },
  { num: 9, name: 'Dharma', meaning: 'Luck, father, higher learning' },
  { num: 10, name: 'Karma', meaning: 'Career, status, authority' },
  { num: 11, name: 'Labha', meaning: 'Gains, income, desires' },
  { num: 12, name: 'Vyaya', meaning: 'Losses, spirituality, foreign lands' },
];

// Colors
const PURPLE = [109, 40, 217] as const;      // #6D28D9
const PURPLE_LIGHT = [139, 92, 246] as const; // #8B5CF6
const DARK_TEXT = [31, 41, 55] as const;       // #1F2937
const GRAY_TEXT = [107, 114, 128] as const;    // #6B7280
const LIGHT_BG = [243, 244, 246] as const;     // #F3F4F6
const TABLE_BORDER = [229, 231, 235] as const; // #E5E7EB
const GREEN = [34, 197, 94] as const;          // #22C55E
const RED = [239, 68, 68] as const;            // #EF4444
const AMBER = [245, 158, 11] as const;         // #F59E0B

export async function generateKundliPDF(data: KundliPDFData): Promise<void> {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // ─── Helper Functions ───
  function setColor(rgb: readonly [number, number, number]) {
    doc.setTextColor(rgb[0], rgb[1], rgb[2]);
  }

  function setFillColor(rgb: readonly [number, number, number]) {
    doc.setFillColor(rgb[0], rgb[1], rgb[2]);
  }

  function setDrawColor(rgb: readonly [number, number, number]) {
    doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
  }

  function drawHorizontalLine(yPos: number) {
    setDrawColor(TABLE_BORDER);
    doc.setLineWidth(0.3);
    doc.line(margin, yPos, pageWidth - margin, yPos);
  }

  function checkPageBreak(needed: number): void {
    if (y + needed > pageHeight - 20) {
      doc.addPage();
      y = margin;
    }
  }

  // ─── Page 1: Header ───
  // Purple accent bar at top
  setFillColor(PURPLE);
  doc.rect(0, 0, pageWidth, 3, 'F');

  // Title
  y = 15;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  setColor(PURPLE);
  doc.text('Kundli Report', pageWidth / 2, y, { align: 'center' });

  // Subtitle
  y += 8;
  doc.setFontSize(10);
  setColor(GRAY_TEXT);
  doc.setFont('helvetica', 'normal');
  doc.text('Vedic Birth Chart Analysis', pageWidth / 2, y, { align: 'center' });

  // Decorative line
  y += 5;
  setDrawColor(PURPLE_LIGHT);
  doc.setLineWidth(0.5);
  doc.line(pageWidth / 2 - 30, y, pageWidth / 2 + 30, y);

  // User info
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  setColor(DARK_TEXT);
  doc.text(data.userName, pageWidth / 2, y, { align: 'center' });

  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  setColor(GRAY_TEXT);
  const dobFormatted = new Date(data.dob).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  doc.text(`Date of Birth: ${dobFormatted}`, pageWidth / 2, y, { align: 'center' });

  // ─── Quick Info Boxes ───
  y += 10;
  const boxWidth = (contentWidth - 10) / 3;
  const boxHeight = 18;
  const quickInfo = [
    { label: 'Lagna (Ascendant)', value: data.lagnaSign },
    { label: 'Moon Sign', value: data.moonSign },
    { label: 'Sun Sign', value: data.sunSign },
  ];

  quickInfo.forEach((info, i) => {
    const bx = margin + i * (boxWidth + 5);

    // Box background
    setFillColor(LIGHT_BG);
    setDrawColor(TABLE_BORDER);
    doc.setLineWidth(0.3);
    doc.roundedRect(bx, y, boxWidth, boxHeight, 2, 2, 'FD');

    // Label
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    setColor(GRAY_TEXT);
    doc.text(info.label, bx + boxWidth / 2, y + 6, { align: 'center' });

    // Value
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    setColor(PURPLE);
    doc.text(info.value, bx + boxWidth / 2, y + 14, { align: 'center' });
  });

  // ─── North Indian Birth Chart ───
  y += boxHeight + 10;

  // Section heading
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  setColor(DARK_TEXT);
  doc.text('North Indian Birth Chart', pageWidth / 2, y, { align: 'center' });
  y += 3;

  // Draw the chart
  const chartSize = 100; // mm
  const chartX = (pageWidth - chartSize) / 2;
  const chartY = y;
  const chartMid = chartSize / 2;
  const cx = chartX + chartMid;
  const cy = chartY + chartMid;

  // Build house-to-planets map
  const housePlanets: Record<number, string[]> = {};
  for (let i = 1; i <= 12; i++) housePlanets[i] = [];
  data.placements.forEach(p => {
    const abbr = p.name.substring(0, 2) + (p.retrograde ? '(R)' : '');
    housePlanets[p.house].push(abbr);
  });

  // Chart colors
  setDrawColor(PURPLE_LIGHT);
  doc.setLineWidth(0.5);

  // Outer rectangle
  doc.rect(chartX, chartY, chartSize, chartSize);

  // Diagonal lines from corners to center
  doc.line(chartX, chartY, cx, cy);
  doc.line(chartX + chartSize, chartY, cx, cy);
  doc.line(chartX, chartY + chartSize, cx, cy);
  doc.line(chartX + chartSize, chartY + chartSize, cx, cy);

  // Cross lines (middle horizontal & vertical)
  doc.line(cx, chartY, cx, chartY + chartSize);
  doc.line(chartX, cy, chartX + chartSize, cy);

  // Inner diamond
  doc.line(cx, chartY, chartX + chartSize, cy); // top to right
  doc.line(chartX + chartSize, cy, cx, chartY + chartSize); // right to bottom
  doc.line(cx, chartY + chartSize, chartX, cy); // bottom to left
  doc.line(chartX, cy, cx, chartY); // left to top

  // House positions (relative to chart center, in mm)
  const hp: Record<number, { x: number; y: number }> = {
    1:  { x: cx, y: cy - 15 },
    2:  { x: cx - 22, y: cy - 28 },
    3:  { x: cx - 37, y: cy - 15 },
    4:  { x: cx - 22, y: cy },
    5:  { x: cx - 37, y: cy + 15 },
    6:  { x: cx - 22, y: cy + 28 },
    7:  { x: cx, y: cy + 15 },
    8:  { x: cx + 22, y: cy + 28 },
    9:  { x: cx + 37, y: cy + 15 },
    10: { x: cx + 22, y: cy },
    11: { x: cx + 37, y: cy - 15 },
    12: { x: cx + 22, y: cy - 28 },
  };

  // Draw house numbers and planets
  for (let h = 1; h <= 12; h++) {
    const pos = hp[h];
    // House number
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    setColor(PURPLE_LIGHT);
    doc.text(String(h), pos.x, pos.y - 3, { align: 'center' });

    // Planets
    const planets = housePlanets[h];
    if (planets.length > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6);
      setColor(DARK_TEXT);
      doc.text(planets.join(' '), pos.x, pos.y + 3, { align: 'center' });
    }
  }

  // Center label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  setColor(PURPLE_LIGHT);
  doc.text('KUNDLI', cx, cy + 2, { align: 'center' });

  // Legend below chart
  y = chartY + chartSize + 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  setColor(GRAY_TEXT);
  doc.text('(R) = Retrograde  |  Planets shown in their house positions', pageWidth / 2, y, { align: 'center' });

  // ─── Planets Table ───
  y += 10;
  checkPageBreak(80);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  setColor(DARK_TEXT);
  doc.text('Planet Positions (Graha Sthiti)', margin, y);
  y += 2;
  drawHorizontalLine(y);
  y += 5;

  // Table header
  const cols = [margin, margin + 25, margin + 62, margin + 95, margin + 115, margin + 145, margin + 165];
  const colLabels = ['Planet', 'Vedic Name', 'Sign', 'House', 'Degree', 'Nature', 'Retro'];

  setFillColor(PURPLE);
  doc.rect(margin, y - 3, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  colLabels.forEach((label, i) => {
    doc.text(label, cols[i] + 1, y + 1);
  });

  y += 7;

  // Table rows
  data.placements.forEach((planet, idx) => {
    checkPageBreak(8);

    // Alternating row background
    if (idx % 2 === 0) {
      setFillColor(LIGHT_BG);
      doc.rect(margin, y - 3, contentWidth, 7, 'F');
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    setColor(DARK_TEXT);
    doc.text(planet.name, cols[0] + 1, y + 1);

    setColor(GRAY_TEXT);
    // Strip emoji/unicode from vedic name for PDF compatibility
    const vedicClean = planet.vedic.replace(/[^\x00-\x7F()]/g, '').trim();
    doc.text(vedicClean, cols[1] + 1, y + 1);

    setColor(DARK_TEXT);
    doc.text(planet.sign, cols[2] + 1, y + 1);
    doc.text(String(planet.house), cols[3] + 1, y + 1);

    doc.setFontSize(6.5);
    setColor(GRAY_TEXT);
    doc.text(planet.degree, cols[4] + 1, y + 1);

    // Nature with color
    doc.setFontSize(7);
    if (planet.nature === 'Benefic') setColor(GREEN);
    else if (planet.nature === 'Malefic') setColor(RED);
    else setColor(AMBER);
    doc.text(planet.nature, cols[5] + 1, y + 1);

    // Retrograde
    setColor(planet.retrograde ? RED : GRAY_TEXT);
    doc.text(planet.retrograde ? 'Yes' : '-', cols[6] + 1, y + 1);

    y += 7;
  });

  // ─── Houses Table ───
  y += 8;
  checkPageBreak(80);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  setColor(DARK_TEXT);
  doc.text('House Details (Bhava Vivaran)', margin, y);
  y += 2;
  drawHorizontalLine(y);
  y += 5;

  // Table header
  const hCols = [margin, margin + 15, margin + 40, margin + 100];
  const hLabels = ['#', 'Name', 'Significance', 'Planets'];

  setFillColor(PURPLE);
  doc.rect(margin, y - 3, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  hLabels.forEach((label, i) => {
    doc.text(label, hCols[i] + 1, y + 1);
  });

  y += 7;

  // Table rows
  HOUSES.forEach((house, idx) => {
    checkPageBreak(8);

    if (idx % 2 === 0) {
      setFillColor(LIGHT_BG);
      doc.rect(margin, y - 3, contentWidth, 7, 'F');
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    setColor(PURPLE);
    doc.text(String(house.num), hCols[0] + 1, y + 1);

    doc.setFont('helvetica', 'bold');
    setColor(DARK_TEXT);
    doc.text(`${house.name} Bhava`, hCols[1] + 1, y + 1);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    setColor(GRAY_TEXT);
    doc.text(house.meaning, hCols[2] + 1, y + 1);

    const planetsInHouse = data.placements.filter(p => p.house === house.num);
    const planetNames = planetsInHouse.map(p => p.name + (p.retrograde ? '(R)' : '')).join(', ');
    setColor(DARK_TEXT);
    doc.setFont('helvetica', 'normal');
    doc.text(planetNames || '-', hCols[3] + 1, y + 1);

    y += 7;
  });

  // ─── Key Yogas ───
  y += 8;
  checkPageBreak(50);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  setColor(DARK_TEXT);
  doc.text('Key Yogas in Your Chart', margin, y);
  y += 2;
  drawHorizontalLine(y);
  y += 7;

  const yogas = [
    {
      name: 'Gajakesari Yoga',
      desc: 'Jupiter and Moon relationship brings wisdom, fame, and prosperity.',
      color: GREEN,
    },
    {
      name: 'Budhaditya Yoga',
      desc: 'Sun-Mercury conjunction enhances intelligence and communication skills.',
      color: AMBER,
    },
    {
      name: 'Chandra Mangal Yoga',
      desc: 'Moon-Mars relationship indicates strong will power and financial gains.',
      color: PURPLE_LIGHT,
    },
  ];

  yogas.forEach((yoga) => {
    checkPageBreak(15);

    // Colored dot
    setFillColor(yoga.color);
    doc.circle(margin + 2, y - 1, 1.5, 'F');

    // Yoga name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    setColor(DARK_TEXT);
    doc.text(yoga.name, margin + 7, y);

    // Description
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    setColor(GRAY_TEXT);
    doc.text(yoga.desc, margin + 7, y);

    y += 9;
  });

  // ─── Footer ───
  y = pageHeight - 15;
  drawHorizontalLine(y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  setColor(GRAY_TEXT);
  const generatedDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  doc.text(`Generated by Nakshatra  |  ${generatedDate}`, pageWidth / 2, y, { align: 'center' });

  // Purple accent bar at bottom
  setFillColor(PURPLE);
  doc.rect(0, pageHeight - 3, pageWidth, 3, 'F');

  // ─── Save ───
  const safeName = data.userName.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Kundli_Report_${safeName}.pdf`);
}
