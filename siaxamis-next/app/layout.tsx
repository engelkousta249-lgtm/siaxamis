import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ΣΙΑΧΑΜΗΣ | Φανοποιείο Αυτοκινήτων Άργος",
  description:
    "Φανοποιείο ΣΙΑΧΑΜΗΣ στο Άργος: επισκευή αμαξωμάτων, βαφή, διεκπεραίωση ζημιάς με την ασφαλιστική, Glassdrive κρύσταλλα και αντηλιακές μεμβράνες 3M. Σχεδόν 40 χρόνια εμπειρίας.",
  keywords: ["φανοποιείο Άργος", "βαφή αυτοκινήτου", "Glassdrive Άργος", "μεμβράνες 3M", "ΣΙΑΧΑΜΗΣ"],
  openGraph: {
    title: "ΣΙΑΧΑΜΗΣ | Φανοποιείο Αυτοκινήτων",
    description: "Όταν η ποιότητα παίζει πρωταρχικό ρόλο. Άργος.",
    locale: "el_GR",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#09090b", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoBodyShop",
  name: "ΣΙΑΧΑΜΗΣ - Φανοποιείο Αυτοκινήτων",
  telephone: "+302751029105",
  email: "info@siaxamis.gr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1ο χλμ Άργους - Καρυάς",
    postalCode: "21200",
    addressLocality: "Άργος",
    addressCountry: "GR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
