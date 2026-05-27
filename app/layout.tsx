import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const BASE_URL = "https://www.studenten-fahrschule.de";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Fahrschule Berlin Kreuzberg | Die Studentenfahrschule – günstig & schnell",
  description:
    "Fahrschule in Berlin-Kreuzberg: Führerschein Klasse B, A, B196. Intensivkurse ab 2.499 €. Stressfreie Ausbildung, erfahrene Fahrlehrer. Jetzt informieren!",
  keywords: [
    "Fahrschule Berlin",
    "Fahrschule Kreuzberg",
    "Führerschein Berlin",
    "Intensivkurs Führerschein",
    "Motorradführerschein Berlin",
    "B196 Kurs Berlin",
    "Studentenfahrschule",
    "Führerschein günstig Berlin",
  ],
  authors: [{ name: "Die Studentenfahrschule" }],
  creator: "Die Studentenfahrschule",
  publisher: "Die Studentenfahrschule",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: BASE_URL,
    siteName: "Die Studentenfahrschule",
    title: "Fahrschule Berlin Kreuzberg | Die Studentenfahrschule – günstig & schnell",
    description:
      "Fahrschule in Berlin-Kreuzberg: Führerschein Klasse B, A, B196. Intensivkurse ab 2.499 €. Stressfreie Ausbildung, erfahrene Fahrlehrer. Jetzt informieren!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Die Studentenfahrschule Berlin – Führerschein Klasse B, A, B196",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Die Studentenfahrschule Berlin – günstig & schnell zum Führerschein",
    description:
      "Führerschein Klasse B, A, B196 in Berlin-Kreuzberg. Intensivkurse ab 2.499 €. Jetzt informieren!",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Die Studentenfahrschule",
  image: `${BASE_URL}/og-image.jpg`,
  description:
    "Fahrschule in Berlin-Kreuzberg mit Führerscheinkursen der Klassen B, A, A1, A2 und B196. Intensivkurse verfügbar.",
  url: BASE_URL,
  telephone: "+49-30-25015902",
  email: "info@studenten-fahrschule.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sorauer Straße 16",
    addressLocality: "Berlin",
    addressRegion: "Berlin",
    postalCode: "10997",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 52.4998,
    longitude: 13.4487,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  priceRange: "€€",
  servesCuisine: undefined,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Führerscheinkurse",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Führerschein Klasse B (Auto)",
        },
        price: "50",
        priceCurrency: "EUR",
        description: "Fahrstunde 45 Minuten",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Intensivkurs Klasse B",
        },
        price: "2499",
        priceCurrency: "EUR",
        description: "Intensivkurs mit 16 Fahrstunden",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
