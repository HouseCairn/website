// All visible site text, English (source) and French.
// Keep both languages in sync: same keys, same structure.
// Every feature named here exists on the main branch of HouseCairn/housecairn;
// check the code or the documentation there before adding one.

export const languages = { en: "English", fr: "Français" } as const;
export type Lang = keyof typeof languages;

export const LINKS = {
  source: "https://github.com/HouseCairn/housecairn",
  haApp: "https://github.com/HouseCairn/home-assistant-addons",
  haIntegration: "https://github.com/HouseCairn/home-assistant-housecairn",
  docs: "https://docs.housecairn.app/",
  docsFr: "https://docs.housecairn.app/fr/",
  install: "https://docs.housecairn.app/getting-started/install/",
  installFr: "https://docs.housecairn.app/fr/getting-started/install/",
  support: "https://buymeacoffee.com/robvred",
  security: "https://github.com/HouseCairn/housecairn/security/advisories/new",
  license: "https://spdx.org/licenses/AGPL-3.0-only.html",
} as const;

/** Path of a page in a given language. `slug` is "" for home, "roadmap" for the roadmap. */
export function localePath(lang: Lang, slug = ""): string {
  const base = lang === "en" ? "/" : `/${lang}/`;
  return slug ? `${base}${slug}/` : base;
}

type Item = { title: string; text: string };
type Shot = { alt: string };
export type StepState = "done" | "now" | "next";
type Integration = { title: string; flow: string[]; flowLabel: string; text: string; state: "ok" | "part" | "planned"; pill: string; links?: { href: string; label: string }[] };

export interface Dict {
  htmlLang: string;
  ogLocale: string;
  skip: string;
  nav: { product: string; integrations: string; status: string; roadmap: string; docs: string; menu: string; home: string };
  switchLabel: string;
  switchShort: string;
  switchAria: string;
  home: {
    title: string;
    description: string;
    statusTag: string;
    statusText: string;
    h1: string;
    lead: string;
    ctaInstall: string;
    ctaSource: string;
    factsLabel: string;
    facts: string[];
    heroPhone: Shot;
    product: {
      eyebrow: string;
      h2: string;
      intro: string;
      today: { h3: string; text: string; ticks: string[]; shot: Shot };
      projects: { h3: string; text: string; shot: Shot };
      rooms: { h3: string; text: string; shot: Shot };
      alsoLabel: string;
      also: Item[];
      note: string;
    };
    integrations: { eyebrow: string; h2: string; intro: string; list: Integration[] };
    private: { eyebrow: string; h2: string; list: Item[]; codeTitle: string; caption: string };
    status: { eyebrow: string; h2: string; intro: string; states: Record<StepState, string>; honestStrong: string; honest: string; roadmapLink: string };
    open: { eyebrow: string; h2: string; list: (Item & { link: string; href: string })[] };
  };
  steps: (Item & { state: StepState })[];
  roadmap: { title: string; description: string; h1: string; lead: string; laterH2: string; later: string[]; followCta: string };
  notFound: { title: string; h1: string; text: string; back: string };
  footer: { by: string; source: string; docs: string; roadmap: string; security: string; support: string; noTracking: string };
}

export const ui: Record<Lang, Dict> = {
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    skip: "Skip to content",
    nav: { product: "Product", integrations: "Integrations", status: "Status", roadmap: "Roadmap", docs: "Docs", menu: "Main navigation", home: "HouseCairn, home page" },
    switchLabel: "Français",
    switchShort: "FR",
    switchAria: "Lire cette page en français",
    home: {
      title: "HouseCairn: home maintenance and renovation, self-hosted",
      description:
        "HouseCairn is a free, self-hosted web app that plans recurring maintenance and renovation projects, room by room, for the whole household: what to do, where, when, with what and for how much.",
      statusTag: "Pre-release",
      statusText: "Built in the open, not ready for daily use yet",
      h1: "Every job in the house, at the right time.",
      lead:
        "What to do, where, when, with what and for how much. HouseCairn plans recurring maintenance and renovation projects, room by room, for the whole household, on your own server.",
      ctaInstall: "Read the install guide",
      ctaSource: "View the source on GitHub",
      factsLabel: "Key facts",
      facts: ["Free software, AGPL-3.0", "Self-hosted, one container", "No telemetry", "English and French"],
      heroPhone: {
        alt: "HouseCairn on a phone, Today screen: one overdue task (test the smoke detector, 3 days late), two tasks due today and one coming up, each with a Done button. Demo data.",
      },
      product: {
        eyebrow: "The application, today",
        h2: "One place for what the house needs.",
        intro: "Real screenshots of the main branch with demo data. Nothing on this page is drawn or simulated.",
        today: {
          h3: "Today: one list, one tap.",
          text: "Overdue first, then what is due today, then what is coming. Anyone in the household marks a task done in one tap, and the next one is scheduled on its own.",
          ticks: [
            "Repeat on a fixed date, after the last time, or only in a season",
            "Report a problem in two fields, with a photo if you like",
            "Calendar view and an ICS feed for your usual calendar app",
          ],
          shot: { alt: "Today screen in a desktop browser: navigation column on the left with Today, Rooms, Projects and Budget, and the task list with Done buttons. Demo data." },
        },
        projects: {
          h3: "Projects, with the numbers next to them.",
          text: "Quotes and budget lines planned, committed and paid. Compare projects side by side to decide what comes first, within a yearly envelope.",
          shot: { alt: "Projects screen on a phone: the yearly budget envelope, filters, the project Repaint the living room planned at 890 euros, and a button to compare ticked projects. Demo data." },
        },
        rooms: {
          h3: "Everything about each room.",
          text: "Equipment with its warranty, paint references, wall and floor coverings, photos of what is behind the walls. Print a QR label, scan it, land on the right sheet.",
          shot: { alt: "Rooms screen on a phone: Living room, Kitchen, Bathroom, Hallway, Utility room and Garden. Demo data." },
        },
        alsoLabel: "Also included",
        also: [
          { title: "The whole household", text: "Owner, member and read-only roles, invitations by link or by e-mail." },
          { title: "Stock and supplies", text: "References, suppliers and the last price paid." },
          { title: "Notifications", text: "Through Apprise: ntfy, Gotify, Signal, Matrix, Telegram, e-mail and more." },
          { title: "Your data, open", text: "Full export and restore, CSV import, a REST API described with OpenAPI, tokens limited by right, home and duration." },
          { title: "Sign-in", text: "Passkeys, authenticator app, recovery codes and OpenID Connect single sign-on." },
          { title: "Built for the phone", text: "Bottom navigation and large touch targets; the same app on a computer." },
        ],
        note: "These features are in the main branch. No version has been released yet.",
      },
      integrations: {
        eyebrow: "Integrations",
        h2: "Works on its own. Connects to what you already run.",
        intro: "Every connector is optional and HouseCairn works fully without them. Data stays where it belongs: documents in Paperless-ngx, transactions in Sure.",
        list: [
          {
            title: "Home Assistant",
            flow: ["Home Assistant", "→", "HouseCairn"],
            flowLabel: "Home Assistant calls HouseCairn",
            text: "An app runs HouseCairn inside Home Assistant (Ingress). A HACS integration shows tasks as sensors and as a to-do list where you mark them done, with a HouseCairn token limited to the homes you choose. HouseCairn never holds a Home Assistant token.",
            state: "ok",
            pill: "Available · not yet released",
            links: [
              { href: LINKS.haApp, label: "The app" },
              { href: LINKS.haIntegration, label: "The integration" },
            ],
          },
          {
            title: "Paperless-ngx",
            flow: ["HouseCairn", "→", "Paperless-ngx"],
            flowLabel: "HouseCairn links to Paperless-ngx documents",
            text: "A quote keeps the number and the link of its document in Paperless-ngx; the document stays there. Nothing is read from Paperless-ngx yet.",
            state: "part",
            pill: "Partial",
          },
          {
            title: "Sure",
            flow: ["Sure", "→", "HouseCairn"],
            flowLabel: "HouseCairn will read amounts from Sure",
            text: "Match a real transaction to a budget line to take its amount, without ever creating one. Today, paid amounts are typed in HouseCairn.",
            state: "planned",
            pill: "Planned",
          },
        ],
      },
      private: {
        eyebrow: "Self-hosted and private",
        h2: "Your house is private. The software is built around that.",
        list: [
          { title: "No telemetry, no account", text: "No outgoing call unless you configure one." },
          { title: "Least privilege", text: "Each integration and each token gets only the access it needs." },
          { title: "One source of truth", text: "HouseCairn keeps the plan and a reference, never a second copy." },
          { title: "Secure by default", text: "Read-only container, no Linux capability, passkeys, a strict content security policy." },
        ],
        codeTitle: "compose.yaml (excerpt)",
        caption: "One container, amd64 and arm64. SQLite by default, PostgreSQL if you prefer.",
      },
      status: {
        eyebrow: "Project status",
        h2: "Honest about where it stands.",
        intro: "No dates are promised: each step is done when it is ready.",
        states: { done: "Done", now: "In progress", next: "Next" },
        honestStrong: "Not ready for real use yet.",
        honest: "No version has been released yet, and until the first one anything can still change. The edge image follows the main branch and is for testing only.",
        roadmapLink: "Read the roadmap",
      },
      open: {
        eyebrow: "Open source",
        h2: "Built in the open.",
        list: [
          { title: "Free software", text: "AGPL-3.0-only. Self-hosting is free for everyone.", link: "Source code on GitHub", href: LINKS.source },
          { title: "AI-assisted, human-reviewed", text: "Developed with an AI agent. Every change is a pull request read and merged by the maintainer.", link: "Documentation", href: LINKS.docs },
          { title: "Security and support", text: "Report a vulnerability privately on GitHub. To help the project move forward, buy the maintainer a coffee.", link: "Support the project", href: LINKS.support },
        ],
      },
    },
    steps: [
      { state: "done", title: "Repository and CI", text: "Licence, checks on every pull request, images with signed provenance." },
      { state: "now", title: "Web MVP", text: "Rooms, tasks, Today, household, stock, projects and budget." },
      { state: "now", title: "Integrations", text: "Home Assistant app and integration to try; Paperless-ngx and Sure next." },
      { state: "next", title: "Real-world use", text: "Day to day in a real house, to find what is missing." },
      { state: "next", title: "Public v0.x", text: "First releases for self-hosters." },
      { state: "next", title: "v1.0", text: "The planned feature set, complete." },
    ],
    roadmap: {
      title: "Roadmap · HouseCairn",
      description: "The milestones of HouseCairn, from the first repository to version 1.0. No dates: each step is done when it is ready.",
      h1: "Roadmap",
      lead: "The milestones, in order. No dates are promised: each step is done when it is ready.",
      laterH2: "Later",
      later: ["An MCP server", "Outgoing webhooks", "A native iOS app, maybe"],
      followCta: "Follow progress on GitHub",
    },
    notFound: { title: "Page not found · HouseCairn", h1: "Page not found", text: "This page does not exist, or not anymore.", back: "Back to the home page" },
    footer: {
      by: "HouseCairn, by Robvred. Free software, AGPL-3.0-only.",
      source: "Source code",
      docs: "Documentation",
      roadmap: "Roadmap",
      security: "Security",
      support: "Support",
      noTracking: "This site uses no cookies, no analytics and no external resources.",
    },
  },

  fr: {
    htmlLang: "fr",
    ogLocale: "fr_FR",
    skip: "Aller au contenu",
    nav: { product: "Produit", integrations: "Intégrations", status: "État", roadmap: "Feuille de route", docs: "Docs", menu: "Navigation principale", home: "HouseCairn, accueil" },
    switchLabel: "English",
    switchShort: "EN",
    switchAria: "Read this page in English",
    home: {
      title: "HouseCairn : entretien et travaux de la maison, auto-hébergé",
      description:
        "HouseCairn est une application web libre et auto-hébergée qui planifie l’entretien récurrent et les projets de travaux, pièce par pièce, pour tout le foyer : quoi faire, où, quand, avec quoi et pour combien.",
      statusTag: "Préversion",
      statusText: "Développé au grand jour, pas encore prêt pour un usage quotidien",
      h1: "Chaque chose à faire dans la maison, au bon moment.",
      lead:
        "Quoi faire, où, quand, avec quoi et pour combien. HouseCairn planifie l’entretien récurrent et les projets de travaux, pièce par pièce, pour tout le foyer, sur votre propre serveur.",
      ctaInstall: "Lire le guide d’installation",
      ctaSource: "Voir le code sur GitHub",
      factsLabel: "En bref",
      facts: ["Logiciel libre, AGPL-3.0", "Auto-hébergé, un seul conteneur", "Aucune télémétrie", "Anglais et français"],
      heroPhone: {
        alt: "HouseCairn sur téléphone, écran Aujourd’hui : une tâche en retard (tester le détecteur de fumée, 3 jours de retard), deux tâches pour aujourd’hui et une à venir, chacune avec un bouton Fait. Données de démonstration.",
      },
      product: {
        eyebrow: "L’application, aujourd’hui",
        h2: "Un seul endroit pour ce dont la maison a besoin.",
        intro: "De vraies captures de la branche principale, avec des données de démonstration. Rien n’est dessiné ni simulé.",
        today: {
          h3: "Aujourd’hui : une liste, un geste.",
          text: "D’abord le retard, puis ce qui tombe aujourd’hui, puis ce qui arrive. Chacun dans le foyer coche une tâche en un geste, et la suivante se planifie seule.",
          ticks: [
            "Répéter à date fixe, après la dernière fois, ou seulement pendant une saison",
            "Signaler un problème en deux champs, avec une photo si besoin",
            "Vue calendrier et flux ICS pour votre agenda habituel",
          ],
          shot: { alt: "Écran Aujourd’hui dans un navigateur d’ordinateur : colonne de navigation à gauche avec Aujourd’hui, Pièces, Projets et Budget, et la liste des tâches avec des boutons Fait. Données de démonstration." },
        },
        projects: {
          h3: "Les projets, avec les chiffres à côté.",
          text: "Devis et lignes de budget prévues, engagées et payées. Comparez les projets côte à côte pour décider par quoi commencer, dans une enveloppe annuelle.",
          shot: { alt: "Écran Projets sur téléphone : l’enveloppe budgétaire de l’année, des filtres, le projet Repeindre le salon prévu à 890 euros et un bouton pour comparer les projets cochés. Données de démonstration." },
        },
        rooms: {
          h3: "Tout sur chaque pièce.",
          text: "Équipements et leur garantie, références de peinture, revêtements des murs et des sols, photos de ce qu’il y a derrière les murs. Une étiquette QR scannée ouvre la bonne fiche.",
          shot: { alt: "Écran Pièces sur téléphone : Salon, Cuisine, Salle de bain, Entrée, Buanderie et Jardin. Données de démonstration." },
        },
        alsoLabel: "Aussi inclus",
        also: [
          { title: "Tout le foyer", text: "Rôles propriétaire, membre et lecture seule, invitations par lien ou par e-mail." },
          { title: "Stock et fournitures", text: "Références, fournisseurs et dernier prix payé." },
          { title: "Notifications", text: "Par Apprise : ntfy, Gotify, Signal, Matrix, Telegram, e-mail et d’autres." },
          { title: "Vos données, ouvertes", text: "Export et restauration complets, import CSV, API REST décrite en OpenAPI, jetons limités par droit, logement et durée." },
          { title: "Connexion", text: "Clés d’accès, application d’authentification, codes de récupération et authentification unique OpenID Connect." },
          { title: "Pensée pour le téléphone", text: "Navigation en bas et grandes zones tactiles ; la même application sur ordinateur." },
        ],
        note: "Ces fonctions sont dans la branche principale. Aucune version n’est encore publiée.",
      },
      integrations: {
        eyebrow: "Intégrations",
        h2: "Fonctionne seul. Se relie à ce que vous avez déjà.",
        intro: "Chaque connecteur est facultatif et HouseCairn fonctionne entièrement sans eux. Les données restent à leur place : les documents dans Paperless-ngx, les transactions dans Sure.",
        list: [
          {
            title: "Home Assistant",
            flow: ["Home Assistant", "→", "HouseCairn"],
            flowLabel: "Home Assistant appelle HouseCairn",
            text: "Une application fait tourner HouseCairn dans Home Assistant (Ingress). Une intégration HACS affiche les tâches en capteurs et en liste où on les coche, avec un jeton HouseCairn limité aux logements choisis. HouseCairn ne détient jamais de jeton Home Assistant.",
            state: "ok",
            pill: "Disponible · pas encore publiée",
            links: [
              { href: LINKS.haApp, label: "L’application" },
              { href: LINKS.haIntegration, label: "L’intégration" },
            ],
          },
          {
            title: "Paperless-ngx",
            flow: ["HouseCairn", "→", "Paperless-ngx"],
            flowLabel: "HouseCairn renvoie vers les documents de Paperless-ngx",
            text: "Un devis garde le numéro et le lien de son document dans Paperless-ngx ; le document reste là-bas. Rien n’est encore lu depuis Paperless-ngx.",
            state: "part",
            pill: "Partiel",
          },
          {
            title: "Sure",
            flow: ["Sure", "→", "HouseCairn"],
            flowLabel: "HouseCairn lira les montants dans Sure",
            text: "Rapprocher une vraie transaction d’une ligne de budget pour reprendre son montant, sans jamais en créer. Aujourd’hui, les montants payés se saisissent dans HouseCairn.",
            state: "planned",
            pill: "Prévu",
          },
        ],
      },
      private: {
        eyebrow: "Auto-hébergé et privé",
        h2: "Votre maison est privée. Le logiciel est conçu autour de ça.",
        list: [
          { title: "Aucune télémétrie, aucun compte", text: "Aucun appel sortant sauf si vous le configurez." },
          { title: "Moindre privilège", text: "Chaque intégration et chaque jeton n’ont que les accès nécessaires." },
          { title: "Une seule source de vérité", text: "HouseCairn garde le prévu et une référence, jamais une seconde copie." },
          { title: "Sûr par défaut", text: "Conteneur en lecture seule, aucune capacité Linux, clés d’accès, politique de sécurité du contenu stricte." },
        ],
        codeTitle: "compose.yaml (extrait)",
        caption: "Un seul conteneur, amd64 et arm64. SQLite par défaut, PostgreSQL si vous préférez.",
      },
      status: {
        eyebrow: "État du projet",
        h2: "Franc sur où il en est.",
        intro: "Aucune date n’est promise : chaque étape est terminée quand elle est prête.",
        states: { done: "Fait", now: "En cours", next: "À venir" },
        honestStrong: "Pas encore prêt pour un usage réel.",
        honest: "Aucune version n’est encore publiée, et jusqu’à la première, tout peut encore changer. L’image edge suit la branche principale et ne sert qu’aux tests.",
        roadmapLink: "Lire la feuille de route",
      },
      open: {
        eyebrow: "Open source",
        h2: "Développé au grand jour.",
        list: [
          { title: "Logiciel libre", text: "AGPL-3.0-only. L’auto-hébergement est gratuit pour tout le monde.", link: "Code source sur GitHub", href: LINKS.source },
          { title: "Assisté par IA, relu par un humain", text: "Développé avec un agent d’IA. Chaque modification est une pull request lue et fusionnée par le mainteneur.", link: "Documentation", href: LINKS.docsFr },
          { title: "Sécurité et soutien", text: "Signalez une vulnérabilité en privé sur GitHub. Pour aider le projet à avancer, offrez un café au mainteneur.", link: "Soutenir le projet", href: LINKS.support },
        ],
      },
    },
    steps: [
      { state: "done", title: "Dépôt et intégration continue", text: "Licence, vérifications sur chaque pull request, images à provenance signée." },
      { state: "now", title: "MVP web", text: "Pièces, tâches, Aujourd’hui, foyer, stock, projets et budget." },
      { state: "now", title: "Intégrations", text: "Application et intégration Home Assistant à essayer ; Paperless-ngx et Sure ensuite." },
      { state: "next", title: "Usage réel", text: "Au quotidien dans une vraie maison, pour trouver ce qui manque." },
      { state: "next", title: "v0.x publique", text: "Premières versions pour l’auto-hébergement." },
      { state: "next", title: "v1.0", text: "L’ensemble des fonctions prévues, complet." },
    ],
    roadmap: {
      title: "Feuille de route · HouseCairn",
      description: "Les étapes de HouseCairn, du premier dépôt à la version 1.0. Pas de dates : chaque étape est terminée quand elle est prête.",
      h1: "Feuille de route",
      lead: "Les étapes, dans l’ordre. Aucune date n’est promise : chaque étape est terminée quand elle est prête.",
      laterH2: "Plus tard",
      later: ["Un serveur MCP", "Des webhooks sortants", "Peut-être une application iOS native"],
      followCta: "Suivre l’avancement sur GitHub",
    },
    notFound: { title: "Page introuvable · HouseCairn", h1: "Page introuvable", text: "Cette page n’existe pas, ou plus.", back: "Retour à l’accueil" },
    footer: {
      by: "HouseCairn, par Robvred. Logiciel libre, AGPL-3.0-only.",
      source: "Code source",
      docs: "Documentation",
      roadmap: "Feuille de route",
      security: "Sécurité",
      support: "Soutenir",
      noTracking: "Ce site n’utilise ni cookie, ni mesure d’audience, ni ressource externe.",
    },
  },
};
