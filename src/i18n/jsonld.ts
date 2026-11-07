import { LINKS, localePath, ui, type Lang } from "./ui";

export function softwareJsonLd(lang: Lang, site: URL) {
  const t = ui[lang];
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HouseCairn",
    description: t.home.description,
    url: new URL(localePath(lang), site).href,
    inLanguage: ["en", "fr"],
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Linux (Docker)",
    isAccessibleForFree: true,
    license: LINKS.license,
    sameAs: [LINKS.source],
    image: new URL(`/og/og-${lang}.png`, site).href,
    author: { "@type": "Person", name: "Robvred" },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      description: lang === "en" ? "Self-hosting" : "Auto-hébergement",
    },
  };
}
