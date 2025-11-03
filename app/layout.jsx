import Header from "./components/sections/Header";
import ScrollHandler from "./components/ScrollHandler";
import "./globals.css";
import { Suspense } from "react";
import { SpinningLoader } from "./components/SpinningLoader";

const SITE_URL = "https://isabellramsvik.com"; // 🔁 Oppdater dette når domenet er klart
const ARTIST_NAME = "Isabell Ramsvik";

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Isabell Ramsvik | Oil painter & Fine artist",
        template: `%s | Isabell Ramsvik | Oil painter & Fine artist`,
    },
    description:
        "Isabell Ramsvik (f. 1997) er en billedkunstner fra Nord-Norge som skaper kunst inspirert av natur, følelser og indre opplevelser. Hun arbeider med kull, olje og akryl – og kombinerer realistiske teknikker med drømmende, abstrakte uttrykk.",
    keywords: [
        "Isabell Ramsvik",
        "billedkunstner",
        "kunst",
        "norsk kunst",
        "original kunst",
        "portrett",
        "landskap",
        "abstrakt kunst",
        "kulltegning",
        "oljemaleri",
        "akrylmaling",
        "Nord-Norge kunstner",
    ],
    authors: [{ name: ARTIST_NAME }],
    creator: ARTIST_NAME,
    publisher: ARTIST_NAME,
    openGraph: {
        title: "Isabell Ramsvik | Oil painter & Fine artist",
        description:
            "Billedkunstner fra Nord-Norge som kombinerer realistiske teknikker med fantasifulle landskap, portretter og abstrakte uttrykk i kull, olje og akryl.",
        url: SITE_URL,
        siteName: "Isabell Ramsvik | Oil painter & Fine artist",
        locale: "nb_NO",
        type: "website",
        images: [
            {
                url: "/homeaboutmepicture.png",
                width: 1200,
                height: 630,
                alt: "Isabell Ramsvik | Oil painter & Fine artist",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Isabell Ramsvik | Oil painter & Fine artist",
        description:
            "Original kunst av Isabell Ramsvik – portretter, landskap og abstrakte verk skapt med kull, olje og akryl.",
        images: ["/homeaboutmepicture.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            maxImagePreview: "large",
            maxSnippet: -1,
            maxVideoPreview: -1,
        },
    },
    alternates: {
        canonical: SITE_URL,
    },
    icons: {
        icon: "/icons/logo.jpg",
        shortcut: "/icons/logo.jpg",
        apple: "/icons/logo.jpg",
    },
    // 👇 Theme colors updated for your actual palette
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#c1a061" }, // gold accent for light mode
        { media: "(prefers-color-scheme: dark)", color: "#1e1e1e" }, // black for dark mode
    ],
};

// Strukturert data (JSON-LD) for søkemotorer
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Isabell Ramsvik",
    jobTitle: "Billedkunstner",
    description:
        "Isabell Ramsvik (f. 1997) er en billedkunstner fra Nord-Norge med bakgrunn fra Nydalen Kunstskole. Hun arbeider med kull, olje og akryl, og utforsker portretter, landskap og abstrakte komposisjoner inspirert av natur og følelser.",
    image: `${SITE_URL}/icons/logo.jpg`,
    url: SITE_URL,
    address: {
        "@type": "PostalAddress",
        addressCountry: "NO",
        addressRegion: "Nord-Norge",
    },
    knowsAbout: [
        "kulltegning",
        "oljemaleri",
        "akrylmaling",
        "portretter",
        "landskapsmaleri",
        "abstrakt kunst",
    ],
};

export default function RootLayout({ children }) {
    return (
        <html lang="no">
            <body>
                {/* Strukturert data for Google / søkemotorer */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <Header />
                <Suspense fallback={<SpinningLoader />}>
                    <ScrollHandler />
                </Suspense>
                {children}
            </body>
        </html>
    );
}
