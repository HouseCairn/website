// All visible site text, English (source) and French.
// Keep both languages in sync: same keys, same structure.

export const languages = { en: "English", fr: "Français" } as const;
export type Lang = keyof typeof languages;

export const LINKS = {
  source: "https://github.com/HouseCairn/HouseCairn",
  docs: "https://docs.housecairn.app",
  docsFr: "https://docs.housecairn.app/fr/",
  support: "https://buymeacoffee.com/robvred",
  security: "https://github.com/HouseCairn/HouseCairn/security/advisories/new",
  license: "https://spdx.org/licenses/AGPL-3.0-only.html",
} as const;

/** Path of a page in a given language. `slug` is "" for home, "roadmap" for the roadmap. */
export function localePath(lang: Lang, slug = ""): string {
  const base = lang === "en" ? "/" : `/${lang}/`;
  return slug ? `${base}${slug}/` : base;
}

type Feature = { title: string; text: string };
type Item = { title: string; text: string };

export interface Dict {
  htmlLang: string;
  ogLocale: string;
  skip: string;
  nav: { features: string; integrations: string; principles: string; roadmap: string; docs: string; source: string; menu: string };
  switchLabel: string; // visible label for link to the other language
  switchAria: string;
  home: {
    title: string;
    description: string;
    eyebrow: string;
    h1: string;
    lead: string;
    status: string;
    statusStrong: string;
    ctaSource: string;
    ctaRoadmap: string;
    heroFigure: string;
    problem: { h2: string; intro: string; points: Item[] };
    features: { h2: string; intro: string; planned: string; list: Feature[] };
    todayH2: string;
    todayIntro: string;
    accountFigure: { title: string; text: string; alt: string; caption: string };
    signinFigure: { title: string; text: string; alt: string; caption: string };
    integrations: { h2: string; intro: string; list: Item[]; later: string; ios: string };
    principles: { h2: string; intro: string; list: Item[] };
    open: { h2: string; license: string; ai: string; review: string; security: string; securityLink: string; ctaSource: string };
    start: { h2: string; text: string; docsCta: string; docsNote: string; docsFr: string };
    support: { h2: string; text: string; cta: string };
  };
  roadmap: {
    title: string;
    description: string;
    h1: string;
    lead: string;
    noDates: string;
    milestones: Item[];
    laterH2: string;
    later: string[];
    followCta: string;
  };
  notFound: { title: string; h1: string; text: string; back: string };
  footer: { by: string; license: string; source: string; docs: string; support: string; security: string; roadmap: string; noTracking: string };
}

export const ui: Record<Lang, Dict> = {
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    skip: "Skip to content",
    nav: {
      features: "Features",
      integrations: "Integrations",
      principles: "Principles",
      roadmap: "Roadmap",
      docs: "Docs",
      source: "Source code",
      menu: "Main navigation",
    },
    switchLabel: "Français",
    switchAria: "Lire cette page en français",
    home: {
      title: "HouseCairn: home maintenance and renovation, self-hosted",
      description:
        "HouseCairn is a free and open-source, self-hosted web app for your house: what to do, where, when, with what, and for how much. Recurring maintenance and renovation projects, room by room.",
      eyebrow: "Free and open-source · Self-hosted",
      h1: "What to do in the house, where, when, with what, and for how much.",
      lead:
        "HouseCairn keeps track of recurring maintenance, like the smoke detector battery or the ventilation filter, and of one-off renovation projects, like repainting the living room or redoing the bathroom. Room by room, for the whole household.",
      statusStrong: "Early development.",
      status:
        "HouseCairn is not usable for planning yet: the application skeleton runs (sign-in, passkeys, homes), the screens to plan maintenance and projects do not exist. This page describes the planned first version (v1).",
      ctaSource: "Follow the code on GitHub",
      ctaRoadmap: "See the roadmap",
      heroFigure:
        "Screenshot of the current HouseCairn application on a phone: the Homes list with two demo homes, Example cottage and Example house, and a sign-in confirmation. Demo data.",
      problem: {
        h2: "A house is a long list nobody keeps",
        intro:
          "Maintenance gets forgotten, references get lost, and renovation budgets live in someone's head. HouseCairn puts it all in one place you host yourself.",
        points: [
          {
            title: "Recurring tasks",
            text: "Batteries, filters, descaling, the yearly boiler service: each task comes back at the right time, by date, after the last time it was done, or by usage.",
          },
          {
            title: "Everything about each room",
            text: "Paint references, flooring, photos of the walls before they were closed, equipment with warranty and history.",
          },
          {
            title: "Projects and money",
            text: "Quotes, planned, committed and paid budget, so you can decide in which order to do the work.",
          },
        ],
      },
      features: {
        h2: "Planned for v1",
        intro: "The features below are the target for the first version. Nothing here is released yet.",
        planned: "Planned",
        list: [
          {
            title: "Rooms and items",
            text: "Equipment with warranty, history and total cost of ownership, organised room by room.",
          },
          {
            title: "Room memory",
            text: "Paint references, flooring, photos of open walls: what you will want to know in ten years.",
          },
          {
            title: "Flexible recurrence",
            text: "Fixed date, after the last completion, by usage counter (litres, hours), or triggered by a sensor.",
          },
          {
            title: "Today view, one tap: Done",
            text: "Sorted by urgency and customisable per person. Every task is marked done in one tap, with Undo.",
          },
          {
            title: "The whole household",
            text: "Members with roles: owner, member, and read-only for tenants. Anyone can report a problem in two fields.",
          },
          {
            title: "Stock and supplies",
            text: "Manufacturer reference, supplier references, purchase links, last price paid, and needs for the next 30, 60 or 90 days.",
          },
          {
            title: "QR labels",
            text: "Print labels to stick on equipment and open its sheet from your phone.",
          },
          {
            title: "Projects and budget",
            text: "Quotes and budget planned, committed and paid, compared to decide the order of work. Budget by room, by project, by maintenance task, and an annual envelope.",
          },
          {
            title: "Notifications",
            text: "Through Apprise: ntfy, Telegram, Signal, Matrix, e-mail and more than 100 services.",
          },
          {
            title: "Calendar",
            text: "Calendar view and an ICS feed for your usual calendar app.",
          },
          {
            title: "Your data, open",
            text: "Full JSON export, CSV import, and a complete REST API described with OpenAPI, with scoped tokens.",
          },
          {
            title: "Sign-in",
            text: "Local accounts, passkeys, TOTP, and OIDC single sign-on.",
          },
        ],
      },
      todayH2: "The application today",
      todayIntro: "Real screenshots of the current build, with demo data. The planned features above come on top of this foundation.",
      accountFigure: {
        title: "Account security and API",
        text: "Passkeys, authenticator app and recovery codes are in the account pages, and the REST API ships with an OpenAPI schema and a test interface.",
        alt: "Screenshot of the More page on a desktop browser: Homes, Account security (passkeys, authenticator app, recovery codes), API documentation (OpenAPI schema and test interface), About, and a Sign out button.",
        caption: "The More page, desktop layout. Demo data.",
      },
      signinFigure: {
        title: "Built for the phone first",
        text: "A single-column layout with a bottom navigation bar, large touch targets and a short sign-in form.",
        alt: "Screenshot of the sign-in page on a phone: Email and Password fields, a Remember Me checkbox and a dark Sign in button.",
        caption: "The sign-in page, phone layout.",
      },
      integrations: {
        h2: "Optional integrations",
        intro:
          "All integrations are off by default. HouseCairn works fully without them.",
        list: [
          {
            title: "Home Assistant",
            text: "Import rooms, let sensors arm tasks (a low battery, for example), and relay notifications. HouseCairn never holds a Home Assistant token: Home Assistant pushes to it.",
          },
          {
            title: "Paperless-ngx",
            text: "Link an existing document, or send a scan or file to Paperless. Documents stay in Paperless.",
          },
          {
            title: "Sure",
            text: "Match an existing transaction to take its amount. HouseCairn never creates transactions.",
          },
        ],
        later: "Later: an MCP server and outgoing webhooks.",
        ios: "A native iOS app may come later.",
      },
      principles: {
        h2: "Principles",
        intro: "Your house is private. The software is built around that.",
        list: [
          { title: "Works on its own", text: "Every integration is optional. Nothing else is required." },
          { title: "Least privilege", text: "Each integration and each token gets only the access it needs." },
          { title: "One source of truth", text: "Each piece of data lives in one place. Documents stay in Paperless, transactions in Sure." },
          { title: "For the whole household", text: "Simple enough for everyone at home, designed for the phone first." },
          { title: "No telemetry", text: "No online account, no outgoing call unless you configure one." },
          { title: "Secure by default, exportable", text: "Safe defaults out of the box, and your data can always be exported." },
        ],
      },
      open: {
        h2: "Open source, built in the open",
        license:
          "HouseCairn is free software under the AGPL-3.0-only licence. Self-hosting is free for everyone.",
        ai: "HouseCairn is developed with an AI agent under human review.",
        review: "Every change goes through a pull request reviewed and merged by the maintainer.",
        security: "Found a security issue? Please report it privately through GitHub private vulnerability reporting, never in a public issue.",
        securityLink: "Report a vulnerability",
        ctaSource: "Browse the source code",
      },
      start: {
        h2: "Get started",
        text: "HouseCairn is not ready for daily use yet, but the container image and the documentation exist: install with Docker Compose, first start, reverse proxy, single sign-on, backups and hardening. The documentation describes only what exists today.",
        docsCta: "Read the documentation",
        docsNote: "docs.housecairn.app, in English. The documentation is also available in French.",
        docsFr: "Documentation en français",
      },
      support: {
        h2: "Support the project",
        text: "If you would like to help HouseCairn move forward, you can buy the maintainer a coffee.",
        cta: "Buy me a coffee",
      },
    },
    roadmap: {
      title: "Roadmap · HouseCairn",
      description:
        "The milestones of HouseCairn, from the first repository to version 1.0. No dates: each step is done when it is ready.",
      h1: "Roadmap",
      lead: "HouseCairn is in early development. Here are the milestones, in order.",
      noDates: "No dates are promised: each step is done when it is ready.",
      milestones: [
        { title: "Repository and CI", text: "Public repository, licence, and automated checks on every pull request." },
        { title: "Web MVP", text: "Rooms and items, tasks with recurrence, the Today view, household members, stock, projects and budget." },
        { title: "Integrations", text: "Home Assistant, Paperless-ngx and Sure, all optional and off by default." },
        { title: "Real-world use", text: "Used day to day in a real house, to find what is missing or too complicated." },
        { title: "Public v0.x", text: "First public releases for self-hosters, with documentation. Things can still change." },
        { title: "v1.0", text: "The planned v1 feature set, complete." },
      ],
      laterH2: "Later",
      later: ["MCP server", "Outgoing webhooks", "A native iOS app may come later"],
      followCta: "Follow progress on GitHub",
    },
    notFound: {
      title: "Page not found · HouseCairn",
      h1: "Page not found",
      text: "This page does not exist, or not anymore.",
      back: "Back to the home page",
    },
    footer: {
      by: "HouseCairn, by Robvred",
      license: "Free software, AGPL-3.0-only",
      source: "Source code",
      docs: "Documentation",
      support: "Support",
      security: "Security",
      roadmap: "Roadmap",
      noTracking: "This site uses no cookies, no analytics and no external resources.",
    },
  },

  fr: {
    htmlLang: "fr",
    ogLocale: "fr_FR",
    skip: "Aller au contenu",
    nav: {
      features: "Fonctions",
      integrations: "Intégrations",
      principles: "Principes",
      roadmap: "Feuille de route",
      docs: "Documentation",
      source: "Code source",
      menu: "Navigation principale",
    },
    switchLabel: "English",
    switchAria: "Read this page in English",
    home: {
      title: "HouseCairn : entretien et travaux de la maison, auto-hébergé",
      description:
        "HouseCairn est une application web libre et auto-hébergée pour la maison : quoi faire, où, quand, avec quoi et pour combien. Entretien récurrent et projets de travaux, pièce par pièce.",
      eyebrow: "Libre et open source · Auto-hébergé",
      h1: "Quoi faire dans la maison, où, quand, avec quoi et pour combien.",
      lead:
        "HouseCairn suit l’entretien récurrent, comme la pile du détecteur de fumée ou le filtre de la ventilation, et les projets de travaux ponctuels, comme repeindre le salon ou refaire la salle de bain. Pièce par pièce, pour tout le foyer.",
      statusStrong: "Développement en cours.",
      status:
        "HouseCairn n’est pas encore utilisable pour planifier : le squelette de l’application tourne (connexion, clés d’accès, logements), les écrans pour planifier l’entretien et les projets n’existent pas. Cette page décrit la première version prévue (v1).",
      ctaSource: "Suivre le code sur GitHub",
      ctaRoadmap: "Voir la feuille de route",
      heroFigure:
        "Capture de l’application HouseCairn actuelle sur téléphone : la liste des logements avec deux logements de démonstration, Example cottage et Example house, et un message de connexion réussie. Données de démonstration.",
      problem: {
        h2: "Une maison, c’est une longue liste que personne ne tient",
        intro:
          "L’entretien s’oublie, les références se perdent et le budget des travaux reste dans la tête de quelqu’un. HouseCairn réunit tout au même endroit, hébergé chez vous.",
        points: [
          {
            title: "Les tâches qui reviennent",
            text: "Piles, filtres, détartrage, entretien annuel de la chaudière : chaque tâche revient au bon moment, à date fixe, après la dernière fois ou selon l’usage.",
          },
          {
            title: "Tout sur chaque pièce",
            text: "Références de peinture, revêtements de sol, photos des murs avant qu’ils soient refermés, équipements avec garantie et historique.",
          },
          {
            title: "Les projets et l’argent",
            text: "Devis, budget prévu, engagé et payé, pour décider dans quel ordre faire les travaux.",
          },
        ],
      },
      features: {
        h2: "Prévu pour la v1",
        intro: "Les fonctions ci-dessous sont l’objectif de la première version. Rien n’est encore publié.",
        planned: "Prévu",
        list: [
          {
            title: "Pièces et éléments",
            text: "Équipements avec garantie, historique et coût total de possession, rangés pièce par pièce.",
          },
          {
            title: "Mémoire de la pièce",
            text: "Références de peinture, sols, photos des murs ouverts : ce que vous voudrez savoir dans dix ans.",
          },
          {
            title: "Récurrence souple",
            text: "Date fixe, après la dernière réalisation, selon un compteur d’usage (litres, heures) ou déclenchée par un capteur.",
          },
          {
            title: "Vue Aujourd’hui, un geste : Fait",
            text: "Triée par urgence et personnalisable pour chaque personne. Chaque tâche se coche en un geste, avec Annuler.",
          },
          {
            title: "Tout le foyer",
            text: "Des membres avec des rôles : propriétaire, membre, et lecture seule pour les locataires. Chacun peut signaler un problème en deux champs.",
          },
          {
            title: "Stock et fournitures",
            text: "Référence fabricant, références fournisseurs, liens d’achat, dernier prix payé et besoins à 30, 60 ou 90 jours.",
          },
          {
            title: "Étiquettes QR",
            text: "Des étiquettes à coller sur les équipements, pour ouvrir leur fiche depuis le téléphone.",
          },
          {
            title: "Projets et budget",
            text: "Devis et budget prévu, engagé et payé, comparés pour décider de l’ordre des travaux. Budget par pièce, par projet, par tâche d’entretien, et enveloppe annuelle.",
          },
          {
            title: "Notifications",
            text: "Par Apprise : ntfy, Telegram, Signal, Matrix, e-mail et plus de 100 services.",
          },
          {
            title: "Calendrier",
            text: "Vue calendrier et flux ICS pour votre agenda habituel.",
          },
          {
            title: "Vos données, ouvertes",
            text: "Export JSON complet, import CSV, et API REST complète décrite en OpenAPI, avec des jetons à portée limitée.",
          },
          {
            title: "Connexion",
            text: "Comptes locaux, clés d’accès (passkeys), TOTP et authentification unique OIDC.",
          },
        ],
      },
      todayH2: "L’application aujourd’hui",
      todayIntro: "De vraies captures de la version actuelle, avec des données de démonstration. Les fonctions prévues ci-dessus viendront s’ajouter à cette base.",
      accountFigure: {
        title: "Sécurité du compte et API",
        text: "Clés d’accès, application d’authentification et codes de récupération sont dans les pages du compte, et l’API REST est livrée avec un schéma OpenAPI et une interface de test.",
        alt: "Capture de la page Plus dans un navigateur de bureau : Logements, Sécurité du compte (clés d’accès, application d’authentification, codes de récupération), Documentation de l’API (schéma OpenAPI et interface de test), À propos, et un bouton Se déconnecter.",
        caption: "La page Plus, affichage ordinateur. Données de démonstration.",
      },
      signinFigure: {
        title: "Pensée d’abord pour le téléphone",
        text: "Une seule colonne, une barre de navigation en bas, de grandes zones tactiles et un formulaire de connexion court.",
        alt: "Capture de la page de connexion sur téléphone : champs Adresse e-mail et Mot de passe, case Se souvenir de moi et bouton foncé Se connecter.",
        caption: "La page de connexion, affichage téléphone.",
      },
      integrations: {
        h2: "Intégrations facultatives",
        intro:
          "Toutes les intégrations sont désactivées par défaut. HouseCairn fonctionne entièrement sans elles.",
        list: [
          {
            title: "Home Assistant",
            text: "Importer les pièces, laisser des capteurs armer des tâches (une pile faible, par exemple) et relayer les notifications. HouseCairn ne détient jamais de jeton Home Assistant : c’est Home Assistant qui lui envoie les informations.",
          },
          {
            title: "Paperless-ngx",
            text: "Lier un document existant, ou envoyer un scan ou un fichier vers Paperless. Les documents restent dans Paperless.",
          },
          {
            title: "Sure",
            text: "Rapprocher une transaction existante pour reprendre son montant. HouseCairn ne crée jamais de transaction.",
          },
        ],
        later: "Plus tard : un serveur MCP et des webhooks sortants.",
        ios: "Une application iOS native pourra venir plus tard.",
      },
      principles: {
        h2: "Principes",
        intro: "Votre maison est privée. Le logiciel est conçu autour de ça.",
        list: [
          { title: "Fonctionne seul", text: "Toute intégration est facultative. Rien d’autre n’est requis." },
          { title: "Moindre privilège", text: "Chaque intégration et chaque jeton n’ont que les accès nécessaires." },
          { title: "Une seule source de vérité", text: "Chaque donnée vit à un seul endroit. Les documents restent dans Paperless, les transactions dans Sure." },
          { title: "Pour tout le foyer", text: "Assez simple pour toute la maison, pensé d’abord pour le téléphone." },
          { title: "Aucune télémétrie", text: "Pas de compte en ligne, aucun appel sortant sauf si vous le configurez." },
          { title: "Sûr par défaut, exportable", text: "Des réglages sûrs dès l’installation, et vos données toujours exportables." },
        ],
      },
      open: {
        h2: "Open source, développé au grand jour",
        license:
          "HouseCairn est un logiciel libre sous licence AGPL-3.0-only. L’auto-hébergement est gratuit pour tout le monde.",
        ai: "HouseCairn est développé avec un agent d’IA, sous relecture humaine.",
        review: "Chaque modification passe par une pull request relue et fusionnée par le mainteneur.",
        security: "Vous avez trouvé une faille de sécurité ? Signalez-la en privé par le signalement privé de vulnérabilités de GitHub, jamais dans un ticket public.",
        securityLink: "Signaler une vulnérabilité",
        ctaSource: "Parcourir le code source",
      },
      start: {
        h2: "Commencer",
        text: "HouseCairn n’est pas encore prêt pour un usage quotidien, mais l’image de conteneur et la documentation existent : installation avec Docker Compose, premier démarrage, reverse proxy, authentification unique, sauvegardes et durcissement. La documentation ne décrit que ce qui existe aujourd’hui.",
        docsCta: "Lire la documentation",
        docsNote: "docs.housecairn.app, en français.",
        docsFr: "Documentation in English",
      },
      support: {
        h2: "Soutenir le projet",
        text: "Si vous voulez aider HouseCairn à avancer, vous pouvez offrir un café au mainteneur.",
        cta: "Offrir un café",
      },
    },
    roadmap: {
      title: "Feuille de route · HouseCairn",
      description:
        "Les étapes de HouseCairn, du premier dépôt à la version 1.0. Pas de dates : chaque étape est terminée quand elle est prête.",
      h1: "Feuille de route",
      lead: "HouseCairn est en début de développement. Voici les étapes, dans l’ordre.",
      noDates: "Aucune date n’est promise : chaque étape est terminée quand elle est prête.",
      milestones: [
        { title: "Dépôt et intégration continue", text: "Dépôt public, licence et vérifications automatiques sur chaque pull request." },
        { title: "MVP web", text: "Pièces et éléments, tâches récurrentes, vue Aujourd’hui, membres du foyer, stock, projets et budget." },
        { title: "Intégrations", text: "Home Assistant, Paperless-ngx et Sure, toutes facultatives et désactivées par défaut." },
        { title: "Usage réel", text: "Utilisé au quotidien dans une vraie maison, pour trouver ce qui manque ou ce qui est trop compliqué." },
        { title: "v0.x publique", text: "Premières versions publiques pour l’auto-hébergement, avec documentation. Des choses peuvent encore changer." },
        { title: "v1.0", text: "L’ensemble des fonctions prévues pour la v1, complet." },
      ],
      laterH2: "Plus tard",
      later: ["Serveur MCP", "Webhooks sortants", "Une application iOS native pourra venir plus tard"],
      followCta: "Suivre l’avancement sur GitHub",
    },
    notFound: {
      title: "Page introuvable · HouseCairn",
      h1: "Page introuvable",
      text: "Cette page n’existe pas, ou plus.",
      back: "Retour à l’accueil",
    },
    footer: {
      by: "HouseCairn, par Robvred",
      license: "Logiciel libre, AGPL-3.0-only",
      source: "Code source",
      docs: "Documentation",
      support: "Soutenir",
      security: "Sécurité",
      roadmap: "Feuille de route",
      noTracking: "Ce site n’utilise ni cookie, ni mesure d’audience, ni ressource externe.",
    },
  },
};
