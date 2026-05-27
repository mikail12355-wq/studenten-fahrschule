export interface Bewertung {
  name: string;
  datum: string;
  text: string;
  sterne: number;
}

export const bewertungen: Bewertung[] = [
  {
    name: "Sarah M.",
    datum: "März 2025",
    text: "Super nette Fahrlehrer und eine entspannte Atmosphäre. Ich habe beim ersten Versuch bestanden!",
    sterne: 5,
  },
  {
    name: "Lukas T.",
    datum: "Januar 2025",
    text: "Der Intensivkurs war perfekt für meinen Zeitplan. Sehr empfehlenswert!",
    sterne: 5,
  },
  {
    name: "Ayse K.",
    datum: "November 2024",
    text: "Faire Preise, geduldige Fahrlehrer und flexible Fahrstundenzeiten. Gerne wieder.",
    sterne: 5,
  },
  {
    name: "Jonas R.",
    datum: "September 2024",
    text: "Treffpunkt TU Berlin war super praktisch für mich als Student. Alles hat reibungslos geklappt.",
    sterne: 5,
  },
  {
    name: "Marie P.",
    datum: "Juli 2024",
    text: "Motorradausbildung top organisiert. Auch im Winter kein Problem – alles bestens!",
    sterne: 5,
  },
];
