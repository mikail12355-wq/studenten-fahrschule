export interface PreisItem {
  bezeichnung: string;
  preis: string;
  highlight?: boolean;
}

export interface PreisKategorie {
  klasse: string;
  icon: string;
  items: PreisItem[];
}

export const preise: PreisKategorie[] = [
  {
    klasse: "Klasse B – Auto",
    icon: "🚗",
    items: [
      { bezeichnung: "Grundgebühr + Lehrmaterial", preis: "250 €" },
      { bezeichnung: "Fahrstunde (45 Min.)", preis: "50 €" },
      { bezeichnung: "Sonderfahrt (45 Min.)", preis: "55 €" },
      { bezeichnung: "Prüfungsgebühr", preis: "150 €" },
      {
        bezeichnung: "Intensivkurs B (16 Fahrstunden)",
        preis: "2.499 €",
        highlight: true,
      },
    ],
  },
  {
    klasse: "Motorrad A / A1 / A2",
    icon: "🏍️",
    items: [
      { bezeichnung: "Grundgebühr + Lehrmaterial", preis: "300 €" },
      { bezeichnung: "Fahrstunde (45 Min.)", preis: "50 €" },
      { bezeichnung: "Sonderfahrt (45 Min.)", preis: "60 €" },
      {
        bezeichnung: "B196-Kurs komplett",
        preis: "599 €",
        highlight: true,
      },
    ],
  },
];
