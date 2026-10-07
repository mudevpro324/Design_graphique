import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";

/* ------------------------------------------------------------------ */
/*  DATA                                                              */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  {
    id: "pamparina",
    title: "Pamparina",
    image: "/images/optimized/Abris bus pamparina.webp",
    category: "Identité visuelle",
    year: "2026",
    tagline: "Identité visuelle",
    tools: ["Illustrator", "Photoshop", "InDesign"],
  },
  {
    id: "elmer",
    title: "Elmer",
    image: "/images/optimized/elmer_projet_2.webp",
    category: "Illustration",
    year: "2025",
    tagline: "Illustration couverture de livre",
    tools: ["Procreate", "InDesign", "Photoshop"],
  },
  {
    id: "Pokematch",
    title: "Pokématch",
    image: "/images/optimized/pokematch_projet_5.webp",
    category: "Produits dérivés",
    year: "2026",
    tagline: "Identité visuelle pour une collaboration fictive",
    tools: ["Illustrator", "Photoshop", "Nomad Sculpt", "Blender"],
  },
  {
    id: "ehpad",
    title: "Ehpad",
    image: "/images/optimized/ehpad_projet_6.webp",
    category: "Site internet",
    year: "2026",
    tagline: "Site internet",
    tools: ["Figma", "Visual Studio Code"],
  },
  {
    id: "vinyle",
    title: "Musique",
    image: "/images/optimized/vinyle_projet_4.webp",
    category: "Identité visuelle",
    year: "2025",
    tagline: "Identité visuelle",
    tools: ["Photoshop", "Indesign"],
  },
  {
    id: "binche",
    title: "Binche",
    image: "/images/optimized/binche_projet_3.webp",
    category: "Affiche de carnaval",
    year: "2026",
    tagline: "Affiche de carnaval",
    tools: ["Illustrator", "Procreate", "InDesign"],
  },

];

const NAV_ITEMS = [
  { id: "home", label: "Accueil" },
  { id: "projects", label: "Projets" },
  { id: "about", label: "À propos" },
  { id: "contact", label: "Contact" },
];

/* ------------------------------------------------------------------ */
/*  SMALL UI PIECES                                                   */
/* ------------------------------------------------------------------ */

function Wordmark({ onClick }) {
  return (
    <button className="wordmark" onClick={onClick} aria-label="Retour à l'accueil">
      <img src="/images/Logo_sula.svg" alt="Logo Sula" />
    </button>
  );
}

function Nav({ page, go }) {
  const [menuOpen, setMenuOpen] = useState(false);

const handleNavClick = (id) => {
  if (id === "about" || id === "contact" || id === "projects") {
    if (page !== "home") {
      go("home");

      setTimeout(() => {
        const targetId = id === "about" ? "about-me" : id;

        const element = document.getElementById(targetId);

        if (element) {
          const offset = id === "about" ? -300 : 0;

          const y =
            element.getBoundingClientRect().top +
            window.scrollY +
            offset;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      const targetId = id === "about" ? "about-me" : id;

      const element = document.getElementById(targetId);

      if (element) {
        const offset = id === "about" ? -412 : 0;

        const y =
          element.getBoundingClientRect().top +
          window.scrollY +
          offset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    }
  } else {
    go(id);
  }
};

  return (
    <header className="nav">
      <Wordmark onClick={() => go("home")} />

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`mobile-menu-overlay ${menuOpen ? "is-open" : ""}`}>
        <span className="menu-star star-1">★</span>
        <span className="menu-star star-2">★</span>
        <span className="menu-star star-3">★</span>
        <span className="menu-star star-4">★</span>
        <span className="menu-star star-5">★</span>

        {NAV_ITEMS.map((item, index) => (
          <button
            key={item.id}
            className="mobile-menu-link"
            style={{ "--delay": `${index * 0.08}s` }}
            onClick={() => {
              handleNavClick(item.id);
              setMenuOpen(false);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <nav className="nav-links">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-link${page === item.id ? " is-active" : ""}`}
            onClick={() => handleNavClick(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function Footer({ go }) {
  return (
    <footer className="site-footer">
      <div className="site-footer-row">
        <p className="site-footer-line">Basée au Puy en Velay</p>
        <div className="site-footer-links">
          <a href="mailto:solenecrzt01@gmail.com">solenecrzt01@gmail.com</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
      <div className="site-footer-row site-footer-row-bottom">
        <span>© {new Date().getFullYear()} Solène Crouzet</span>
        <button className="text-link" onClick={() => go("contact")}>Travaillons ensemble</button>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  HOME                                                              */
/* ------------------------------------------------------------------ */

function Home({ go, openProject }) {
  const scrollCarousel = (direction) => {
    const carousel = document.querySelector(".projects-carousel");
    if (!carousel) return;

    const amount = window.innerWidth <= 560
      ? carousel.clientWidth * 1
      : carousel.clientWidth * 0.34;

    carousel.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-banner">
          <div className="hero-content">
            <img src="/images/titre_portfolio.svg" alt="Portfolio" className="hero-logo" />
            <div className="hero-specialty">
              <span className="hero-specialty-icon">›</span>
              <span className="hero-specialty-text">Design graphique et illustration</span>
            </div>
          </div>
        </div>
      </section>

      <section className="presentation-home">
        <div className="tear tear-top"></div>
        <p className="presentation-home-text">
          Bienvenue dans mon univers ! J’imagine et conçois des identités visuelles et des projets créatifs, du print au digital. Vous avez un projet ou une idée en tête ? N’hésitez pas à me contacter, je serais ravie d’en discuter avec vous !
        </p>
        <button
  className="presentation-home-button"
  onClick={() => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }}
>
  Me contacter
</button>
        <div className="tear tear-bottom"></div>
      </section>

      <section id="projects" className="section projects-home-section">
        <div className="section-head">
          <h2>Mes projets</h2>
        </div>

        <div className="projects-carousel-wrapper">
          <div className="projects-carousel">
            {PROJECTS.map((project, index) => (
              <button
                key={project.id}
                className="featured-tile"
                onClick={() => openProject(project.id)}
              >
                <div className="featured-art">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={
                      project.id === "pamparina"
                        ? "image-pamparina"
                        : project.id === "Pokematch"
                          ? "collaboration-image"
                          : project.id === "elmer"
                            ? "image-elmer"
                            : project.id === "ehpad"
                              ? "image-ehpad"
                              : project.id === "vinyle"
                                ? "image-vinyle"
                                : project.id === "binche"
                                  ? "image-binche"
                                  : ""
                              
                    }
                  />
                </div>
                <div className="featured-meta">
                  <span className="featured-arrow">{index + 1}</span>
                  <div className="featured-text">
                    <div className="featured-title">{project.title}</div>
                    <div className="featured-cat">{project.category}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <button className="carousel-prev" onClick={() => scrollCarousel(-1)} aria-label="Voir les projets précédents">‹</button>
          <button className="carousel-next" onClick={() => scrollCarousel(1)} aria-label="Voir les projets suivants">›</button>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, index) => (
            <span className="marquee-set" key={index}>
              Identité visuelle&nbsp;&nbsp;·&nbsp;&nbsp;Branding&nbsp;&nbsp;·&nbsp;&nbsp;Typographie&nbsp;&nbsp;·&nbsp;&nbsp;Illustration&nbsp;&nbsp;·&nbsp;&nbsp;3D&nbsp;&nbsp;·&nbsp;&nbsp;Direction artistique&nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <section className="section about-teaser">
        <div className="about-teaser-portrait">
          <img src="/images/optimized/photo_solene.webp" alt="Solène Crouzet" className="about-teaser-image" />
        </div>

        <div className="about-teaser-text">
          <h2 id="about-me">À propos de moi</h2>
          <p>
            Moi, c’est Solène, j’ai 21 ans et je suis graphiste récemment diplômée. J’aime imaginer des univers, donner vie à des idées et créer des projets qui ont leur propre personnalité. Au fil de mes études et de mes expériences, j’ai eu l’occasion de travailler sur des projets très variés, qui m’ont permis d’expérimenter, de développer ma créativité et de construire petit à petit mon propre univers graphique.
          </p>
          
          <div className="contact-transition"></div>
          
          <div className="contact-block"></div>
          <h2 id="contact">Contact</h2>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon"><img src="/images/icone_contact_1.svg" alt="" /></span>
              <span>07 67 71 96 05</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon"><img src="/images/icone_contact_3.svg" alt="" /></span>
              <span>solenecrzt01@gmail.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon"><img src="/images/icone_contact_2.svg" alt="" /></span>
              <span>Solène Crouzet</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon"><img src="/images/icone_contact_4.svg" alt="" /></span>
              <span>213 rue de la Vié Croze, 43370 Bains</span>
            </div>
          </div>
        </div>
      </section>

      <Footer go={go} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ALL PROJECTS                                                      */
/* ------------------------------------------------------------------ */

function Projects({ openProject }) {
  return (
    <div className="page">
      <section className="section projects-page">
        <h1 className="projects-page-title">Tous les projets</h1>
        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <button key={project.id} className="featured-tile" onClick={() => openProject(project.id)}>
              <div className="featured-art">
                <img
                  src={project.image}
                  alt={project.title}
                  className={project.id === "pamparina" ? "image-pamparina" : project.id === "binche" ? "image-binche" : project.id === "elmer" ? "image-elmer" : project.id === "Ehpad" ? "image-ehpad" : ""}
                />
              </div>
              <div className="featured-meta">
                <span className="featured-arrow">›</span>
                <div className="featured-text">
                  <div className="featured-title">{project.title}</div>
                  <div className="featured-cat">{project.category}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAMPARINA FLIPBOOK                                                */
/* ------------------------------------------------------------------ */

function PamparinaBook() {
  const pages = [
    null,
    "/images/optimized/page_1_pamparina.webp",
    "/images/optimized/page_2_pamparina.webp",
    "/images/optimized/page_3_pamparina.webp",
    "/images/optimized/page_4_pamparina.webp",
    "/images/optimized/page_5_pamparina.webp",
    "/images/optimized/page_6_pamparina.webp",
    "/images/optimized/page_7_pamparina.webp",
    "/images/optimized/page_8_pamparina.webp",
    "/images/optimized/page_9_pamparina.webp",
    "/images/optimized/page_10_pamparina.webp",
    "/images/optimized/page_11_pamparina.webp",
    "/images/optimized/page_12_pamparina.webp",
    "/images/optimized/page_13_pamparina.webp",
    "/images/optimized/page_14_pamparina.webp",
    "/images/optimized/page_15_pamparina.webp",
    "/images/optimized/page_16_pamparina.webp",
    null,
  ];

  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section className="pamparina-book-section">
      <div className="pamparina-book-wrapper">
        <HTMLFlipBook
          width={390}
          height={620}
          showCover={false}
          usePortrait={false}
          drawShadow
          maxShadowOpacity={0.35}
          flippingTime={1000}
          mobileScrollSupport
          showPageCorners
          className="pamparina-real-book"
          onFlip={(event) => setCurrentPage(event.data)}
        >
          {pages.map((src, index) => (
            <div
              className={`pamparina-book-page ${!src ? "empty-page" : ""} ${currentPage === 0 && index === 0 ? "hide-empty-cover" : ""}`}
              key={index}
            >
              {src && <img src={src} alt={`Programme Pamparina - page ${index}`} />}
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECT DETAIL                                                    */
/* ------------------------------------------------------------------ */

function ProjectDetail({ project, go }) {
  const pokemonVideosRef = useRef([]);

  useEffect(() => {
    const videos = pokemonVideosRef.current.filter(Boolean);
    if (videos.length !== 4) return;

    const startVideosTogether = async () => {
      videos.forEach((video) => {
        video.currentTime = 0;
      });

      await Promise.all(
        videos.map((video) =>
          video.play().catch(() => {})
        )
      );
    };

    Promise.all(
      videos.map(
        (video) =>
          new Promise((resolve) => {
            if (video.readyState >= 3) {
              resolve();
            } else {
              video.addEventListener("canplay", resolve, {
                once: true,
              });
            }
          })
      )
    ).then(startVideosTogether);
  }, []);

  return (
    <div className="page project-detail-page">

      {/* ---------------------------------------------------------- */}
      {/* EN-TÊTE DU PROJET                                          */}
      {/* ---------------------------------------------------------- */}

      <section className="project-header">

        <div
  className="project-detail-content"
>

          {/* Retour aux projets */}

          <button
            className="back-link"
            onClick={() => {
              go("home");

              setTimeout(() => {
                document
                  .getElementById("projects")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }, 100);
            }}
          >
            ← Tous les projets
          </button>


          {/* ------------------------------------------------------ */}
          {/* TITRE À GAUCHE / INFOS À DROITE                        */}
          {/* ------------------------------------------------------ */}

         <div className="project-detail-top">

  <div className="project-title-block">

    <h1>{project.title}</h1>

    <p className="project-tagline">
      {project.tagline}
    </p>

    <div className="project-tools">
      <span>Logiciels utilisés :</span>
      <p className="tools-text">
        {project.tools.join(", ")}
      </p>
    </div>

  </div>


  <div className="project-meta">

    <div className="project-meta-year">
      <span>Année :</span>
      <p>{project.year}</p>
    </div>

  </div>

</div>

          {/* ------------------------------------------------------ */}
          {/* GRANDE IMAGE                                            */}
          {/* ------------------------------------------------------ */}

          <div
            className="project-intro-image"
            style={{
              width: "100%",
              margin: "0 0 55px 0",
            }}
          >
            <img
              src={project.image}
              className={
                project.id === "pamparina"
                  ? "pamparina-detail-image"
                  : ""
              }
              alt={project.title}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>


          {/* ------------------------------------------------------ */}
          {/* DESCRIPTION                                             */}
          {/* ------------------------------------------------------ */}

          <div
            className="project-description"
          >

            {/* PAMPARINA */}

            {project.id === "pamparina" && (
              <>
                <p>
                  Dans le cadre d’un workshop réalisé durant ma dernière année de Bachelor,
                  nous avons travaillé à partir d’un brief réel sur la refonte de l’identité
                  visuelle de la Pamparina.
                  Ma proposition a été sélectionnée par le client et est devenue l’identité
                  officielle de l’édition 2026 du festival. J’ai ensuite développé l’affiche
                  principale ainsi que différentes déclinaisons graphiques autour de l’événement.
                </p>
              </>
            )}


            {/* ELMER */}

            {project.id === "elmer" && (
              <>
                <p>
                  Ce projet d’école avait pour objectif de revisiter la couverture d’un livre
                  existant en l’associant à un thème tiré au hasard. J’ai choisi Elmer et
                  pioché le thème de la magie.
                  J’ai donc imaginé une nouvelle couverture mêlant ces deux univers,
                  tout en travaillant les différentes étapes de préparation du fichier
                  jusqu’à son impression.
                </p>
              </>
            )}


            {/* POKÉMATCH */}

            {project.id === "Pokematch" && (
              <>
                <p>
                  Pokématch est mon projet de fin de Bachelor. Il s'agit d’une collaboration
                  fictive entre Roland-Garros, Nike et Pokémon. Le concept repose sur
                  l’association d’un joueur de tennis à un Pokémon en fonction de leur
                  personnalité et de leur style de jeu.
                  J’ai créé un univers visuel cohérent mêlant les codes du tennis et de Pokémon
                  que j’ai ensuite décliné sur différents supports, notamment des maillots,
                  des cartes à collectionner et des figurines Art Toys.
                </p>
              </>
            )}


            {/* EHPAD */}

            {project.id === "ehpad" && (
              <>
                <p>
                  Ce projet avait pour objectif de moderniser la communication d’un EHPAD
                  dont le site Internet n’était plus fonctionnel ni adapté aux besoins de
                  l’établissement.
                  J’ai donc conçu un nouveau site Internet plus clair, accessible et
                  agréable à utiliser. J’ai également réalisé la mise en page des différents
                  documents de l’établissement afin de rendre les informations plus
                  lisibles et agréables à consulter pour les résidents et leurs proches.
                </p>
              </>
            )}


            {/* VINYLE */}

            {project.id === "vinyle" && (
              <>
                <p>
                  Dans le cadre de ce projet, nous devions imaginer l’identité visuelle
                  d’un artiste autour de sa musique « Pensée sur l’amour ».
                  J’ai conçu deux vinyles : une édition classique et une édition collector
                  fonctionnant en négatif. Le vinyle rose devient ainsi vert, créant un
                  contraste qui évoque les couleurs d’une aurore boréale. La pochette
                  représente une montagne formée par deux visages, féminin et masculin,
                  tandis que deux personnages gravissent chacun un côté de la montagne,
                  symbolisant la rencontre et la relation entre deux personnes.
                </p>
              </>
            )}


            {/* BINCHE */}

            {project.id === "binche" && (
              <>
                <p>
                  Pour ce projet, j’ai réalisé une affiche destinée au Carnaval de Binche,
                  en Belgique, événement emblématique classé au patrimoine culturel immatériel 
                  de l’UNESCO. La tradition est notamment marquée par les Gilles, reconnaissables 
                  à leur costume caractéristique, qui participent au célèbre lancer d’oranges. 
                  J’ai choisi de représenter cette tradition à travers une interprétation graphique 
                  personnelle, en mettant en scène le lancer d’oranges et le costume des Gilles dans 
                  un style flat design. Ma proposition a été sélectionnée parmi les 30 meilleures 
                  affiches du concours.
                </p>
              </>
            )}

          </div>

        </div>

      </section>


      {/* ========================================================== */}
      {/* PAMPARINA                                                  */}
      {/* ========================================================== */}

      {project.id === "pamparina" && (
        <>
          <PamparinaBook />

          <div className="project-gallery-three">

            <img
              src="/images/optimized/ecocup_pamparina.webp"
              alt="Pamparina visuel 2"
            />

            <img
              src="/images/optimized/badge_carte_pamparina.webp"
              alt="Pamparina visuel 3"
            />

            <img
              src="/images/optimized/tote_bag_pamparina.webp"
              alt="Pamparina visuel 4"
            />

          </div>

          <p className="project-gallery-caption-pamparina">
            Voici quelques déclinaisons de l’identité visuelle sur différents
            supports, pour montrer comment l’univers de la Pamparina peut vivre
            au-delà de l’affiche.
          </p>
        </>
      )}


      {/* ========================================================== */}
      {/* ELMER                                                       */}
      {/* ========================================================== */}

      {project.id === "elmer" && (
        <>

          <div className="project-gallery-three">

            <img
              src="/images/optimized/mockup_elmer_original.webp"
              alt="Mockup Elmer original"
            />

            <img
              src="/images/optimized/mockup_elmer_devant.webp"
              alt="Mockup Elmer devant"
            />

            <img
              src="/images/optimized/mockup_elmer_dos.webp"
              alt="Mockup Elmer dos"
            />

          </div>


          <div className="elmer-illustrations">

            <img
              src="/images/optimized/elmer_illu_1.webp"
              alt="Illustration Elmer 1"
            />

            <img
              src="/images/optimized/elmer_illu_2.webp"
              alt="Illustration Elmer 2"
            />

            <img
              src="/images/optimized/elmer_illu_3.webp"
              alt="Illustration Elmer 3"
            />

          </div>


          <p className="project-gallery-caption-elmer">
            Voici les différentes étapes de création de mon illustration,
            du premier croquis jusqu’au rendu final.
          </p>

        </>
        
      )}


      {/* ========================================================== */}
      {/* POKÉMATCH                                                   */}
      {/* ========================================================== */}

      {project.id === "Pokematch" && (
        <>

          <div className="pokematch-creations">
  <video
    src="/images/sinner_pokematch.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="sinner-video"
  />
  <video
    src="/images/alcaraz_pokematch.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="sinner-video"
  />
  <video
    src="/images/sabalenka_pokematch.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="sinner-video"
  />
   <video
    src="/images/andreeva_pokematch.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="sinner-video"
  />


</div>


<p className="project-gallery-caption-pokematch">
  Voici la déclinaison de l’univers Pokématch à travers les différents produits dérivés. 
  Chaque joueur est associé à son Pokémon : Jannik Sinner avec Carapuce, Carlos Alcaraz avec Bulbizarre, 
  Aryna Sabalenka avec Salamèche et Mirra Andreeva avec Pikachu.
</p>

        </>
      )}

{/* ========================================================== */}
      {/* EHPAD                                                       */}
      {/* ========================================================== */}

      {project.id === "ehpad" && (
        <>

          <div className="ehpad-gallerie">

            <img
              src="/images/optimized/ehpad_site_page_1.webp"
              alt="Page 1 site"
            />

            <img
              src="/images/optimized/ehpad_site_page_5.webp"
              alt="Page 2 site"
            />

          </div>

          <div className="ehpad-gallerie">

            <img
              src="/images/optimized/ehpad_site_page_4.webp"
              alt="Page 3 site"
            />

            <img
              src="/images/optimized/ehpad_site_page_6.webp"
              alt="Page 4 site"
            />
          </div>

          <div className="ehpad-gallerie">

            <img
              src="/images/optimized/ehpad_site_page_7.webp"
              alt="Page 5 site"
            />

            <img
              src="/images/optimized/ehpad_site_page_8.webp"
              alt="Page 6 site"
            />
          </div>

           <div className="project-gallery-two-v3">

            <img
              src="/images/livret_d'accueil_1.png"
              alt="Livret d'accueil 1"
            />

            <img
              src="/images/livret_d'accueil_2.png"
              alt="Livret d'accueil 2"
            />
          </div>
  </>
)}

      {/* ========================================================== */}
      {/* VINYLE                                                      */}
      {/* ========================================================== */}

     {project.id === "vinyle" && (
  <>
    <div className="project-gallery-two">
      <img
        src="/images/optimized/vinyle_vert.webp"
        alt="Vinyle - vert"
      />

      <img
        src="/images/optimized/vinyles_double.webp"
        alt="Vinyles - double"
      />
    </div>

    <div className="project-gallery-two-reverse">
  <img
    src="/images/optimized/pochettes_vinyles_dos.webp"
    alt="vinyles derrière"
  />

  <img
    src="/images/optimized/vinyles_scene.webp"
    alt="Vinyle scene"
  />
</div>
  </>
)}

      {/* ========================================================== */}
      {/* BINCHE                                                       */}
      {/* ========================================================== */}

      {project.id === "binche" && (
        <>

          <div className="project-gallery-three">

            <img
              src="/images/optimized/logo_binche.webp"
              alt="logo binche"
            />

            <img
              src="/images/optimized/carnaval_binche.webp"
              alt="carnaval de binche gilles"
            />

            <img
              src="/images/optimized/illustration_binche.webp"
              alt="Illustration binche"
            />

          </div>
           
        </>
        
      )}

    </div>
  );
}


/* ------------------------------------------------------------------ */
/*  ABOUT                                                             */
/* ------------------------------------------------------------------ */

function About({ go }) {
  return (
    <div className="page">
      <section className="about-cv-section">
        <img src="/images/optimized/CV%20pro.webp" alt="CV de Solène Crouzet" className="about-cv" />
      </section>
      <Footer go={go} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT                                                           */
/* ------------------------------------------------------------------ */

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className="page">
      <section className="contact-hero">
        <h1>Parlons de <span className="italic">votre projet</span>.</h1>
        <p>Que ce soit pour une identité complète, un objet ponctuel ou une simple envie d'échanger, je réponds toujours moi-même.</p>
      </section>

      <section className="contact-body">
        <div className="contact-details">
          <a className="contact-email" href="mailto:bonjour@solenecrouzet.studio">bonjour@solenecrouzet.studio</a>
          <div className="contact-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <p className="contact-note">Ouverte aux missions freelance, aux collaborations ponctuelles et aux projets un peu fous. Basée à Lyon, je travaille aussi à distance.</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {sent ? (
            <div className="contact-success">
              <p>Message envoyé — merci !</p>
              <p className="contact-success-sub">Je reviens vers vous très vite.</p>
            </div>
          ) : (
            <>
              <label>
                Nom
                <input type="text" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
              </label>
              <label>
                E-mail
                <input type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
              </label>
              <label>
                Message
                <textarea required rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
              </label>
              <button type="submit" className="btn btn-primary">Envoyer le message</button>
            </>
          )}
        </form>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                               */
/* ------------------------------------------------------------------ */

export default function App() {
  const [page, setPage] = useState("home");
  const [projectId, setProjectId] = useState(PROJECTS[0].id);

  function go(nextPage) {
    setPage(nextPage);
    window.scrollTo(0, 0);
  }

  function openProject(id) {
    setProjectId(id);
    setPage("project");
    window.scrollTo(0, 0);
  }

  const currentProject = PROJECTS.find((project) => project.id === projectId) ?? PROJECTS[0];

  return (
    <div className="app-root">
      <style>{CSS}</style>
      <Nav page={page} go={go} />
      <main key={page + projectId} className="page-transition">
        {page === "home" && <Home go={go} openProject={openProject} />}
        {page === "projects" && <Projects openProject={openProject} />}
        {page === "project" && <ProjectDetail project={currentProject} go={go} />}
        {page === "about" && <About go={go} />}
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CSS                                                               */
/* ------------------------------------------------------------------ */

const CSS = `
/* ================================================================
   BASE
   ================================================================ */
html,
body {
  margin: 0;
  min-height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

* {
  box-sizing: border-box;
}

.app-root {
  --ink: #17142B;
  --paper: #F1F0F7;
  --paper-2: #E7E4F0;
  --pink: #FF00A8;
  --pink-light: #F5B1D0;

  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  font-family: "Montserrat", sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

.app-root button {
  font-family: inherit;
  border: 0;
  background: none;
  color: inherit;
  cursor: pointer;
}

.app-root a {
  color: inherit;
}

.app-root p,
.app-root h1,
.app-root h2,
.app-root h3 {
  margin: 0;
}

.page {
  display: flex;
  flex-direction: column;
}

.page-transition {
  animation: fadeIn 0.6s ease both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ================================================================
   NAVIGATION
   ================================================================ */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  min-height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px clamp(20px, 4vw, 48px);
  background: #111111;
}

.wordmark {
  display: flex;
  align-items: center;
  padding: 0;
}

.wordmark img {
  display: block;
  width: 280px;
  max-width: 48vw;
  height: auto;
}

.nav-links {
  display: flex;
  gap: clamp(14px, 2.4vw, 30px);
}

.nav-link {
  position: relative;
  padding: 5px 0;
  color: #ffffff !important;
  font-size: 0.85rem;
  font-weight: 400;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 100%;
  bottom: 0;
  height: 1px;
  background: #ff83d6;
  transition: right 0.25s ease;
}

.nav-link:hover,
.nav-link.is-active {
  color: #ffffff !important;
}

.nav-link:hover::after,
.nav-link.is-active::after {
  right: 0;
}

.menu-toggle,
.mobile-menu-overlay {
  display: none;
}

/* ================================================================
   HERO
   ================================================================ */
.hero {
  position: relative;
  height: calc(100vh - 58px);
  min-height: 560px;
  overflow: hidden;
}

.hero-banner {
  position: relative;
  width: 100%;
  height: 100%;
  background: #F1F0F7;
}

.hero-content {
  position: absolute;
  top: 46%;
  left: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transform: translate(-50%, -50%);
}

.hero-logo {
  display: block;
  width: min(1500px, 85%);
  height: auto;
}

.hero-specialty {
  position: relative;
  left: -130px;
  top: -60px;
  width: 700px;
  max-width: 85%;
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
}

.hero-specialty-icon {
  width: 58px;
  height: 58px;
  min-width: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #111111;
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
}

.hero-specialty-text {
  padding: 15px 28px;
  border-radius: 999px;
  background: #111111;
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.2;
}

/* ================================================================
   PRESENTATION / PINK BAND
   ================================================================ */
.presentation-home {
  position: relative;
  width: 100%;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 70px 30px;
  overflow: hidden;
  background: linear-gradient(90deg, #ff00a8 0%, #ff39b2 45%, #f5b1d0 100%);
}

.tear {
  position: absolute;
  left: 0;
  width: 100%;
  height: 75px;
  background: var(--paper);
  z-index: 2;
  pointer-events: none;
}

.tear-top {
  top: 0;
  clip-path: polygon(0 0,100% 0,100% 42%,94% 35%,88% 46%,81% 37%,74% 44%,67% 34%,60% 46%,53% 38%,46% 45%,39% 35%,32% 47%,25% 38%,18% 44%,11% 35%,5% 46%,0 39%);
}

.tear-bottom {
  display: none;
}

.presentation-home-text {
  width: min(1100px, 90%);
  margin-top: 2000px;
  color: #ffffff;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.5;
  padding-top: 60px;
}

.presentation-home-button {
  margin-top: 60px;
  padding: 18px 50px;
  border-radius: 999px;
  background: #111111 !important;
  color: #ffffff !important;
  font-size: 1rem;
  font-weight: 700;
  transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
}

.presentation-home-button:hover {
  background: #ffffff !important;
  color: #111111 !important;
}

/* ================================================================
   COMMON SECTIONS
   ================================================================ */
.section {
  padding: clamp(55px, 7vw, 90px) clamp(30px, 6vw, 80px);
}

.section-head {
  display: flex;
  align-items: baseline;
  margin-bottom: 55px;
}

.section-head h2,
.about-teaser-text h2 {
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  font-size: 2.4rem
}

#projects .section-head h2 {
  margin-left: 60px;
}

/* ================================================================
   PROJECT CAROUSEL
   ================================================================ */
.projects-home-section {
  padding-left: clamp(30px, 6vw, 80px);
  padding-right: clamp(30px, 6vw, 80px);
  overflow: visible;
}

.projects-carousel-wrapper {
  position: relative;
  width: 100%;
  padding: 0 60px;
  overflow: visible;
  box-sizing: border-box;
  margin-top: 55px;
}

.projects-carousel {
  display: flex;
  gap: 24px;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 25px;
  overflow-x: auto;
  overflow-y: visible;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

.projects-carousel::-webkit-scrollbar {
  display: none;
}

.projects-carousel::-webkit-scrollbar {
  display: none;
}

.projects-carousel .featured-tile {
  flex: 0 0 320px;
  scroll-snap-align: start;
}

.projects-carousel::-webkit-scrollbar {
  display: none;
}

.projects-carousel .featured-tile {
  flex: 0 0 calc((100% - 64px) / 3);
  scroll-snap-align: start;
}
  
.project-gallery-two-reverse {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 100px;
}

.project-gallery-two-reverse img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 15px;
  display: block;
}

.ehpad-gallerie {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.ehpad-gallerie img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 15px;
  display: block;
}

/* FLÈCHE GAUCHE */
.carousel-prev {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);

  width: 48px;
  height: 48px;

  border: none;
  border-radius: 50%;

  background: #111;
  color: white;

  font-size: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 100;
}

/* FLÈCHE DROITE */
.carousel-next {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);

  width: 48px;
  height: 48px;

  border: none;
  border-radius: 50%;

  background: #111;
  color: white;

  font-size: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 100;
}

.carousel-prev:hover,
.carousel-next:hover {
  transform: translateY(-50%) scale(1.08);
}

.projects-carousel {
  display: flex;
  gap: 32px;

  overflow-x: auto;
  overflow-y: visible;

  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  padding-top: 20px;
  padding-bottom: 25px;

  scrollbar-width: none;
}

.projects-carousel::-webkit-scrollbar {
  display: none;
}

.projects-carousel .featured-tile {
  flex: 0 0 calc((100% - 64px) / 3);
  scroll-snap-align: start;
}
.carousel-prev {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  width: 52px;
  height: 52px;

  border: none;
  border-radius: 50%;

  background: #111;
  color: white;

  font-size: 36px;
  line-height: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 100;
  transition: transform 0.2s ease;
}

.carousel-prev:hover {
  transform: translateY(-50%) scale(1.08);
}
.carousel-next {
  position: absolute;
  right: 10px;
  top: 50%;

  transform: translateY(-50%);

  width: 52px;
  height: 52px;

  border: none;
  border-radius: 50%;

  background: #111;
  color: white;

  font-size: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 100;
}

.carousel-next:hover {
  transform: translateY(-50%) scale(1.08);
}

.featured-tile {
  position: relative;
  flex: 0 0 calc((100% - 48px) / 3);
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: visible;
  border-radius: 30px;
  background: #ffffff;
  box-shadow: 0 2px 2px rgba(0,0,0,0.3), 0 10px 10px rgba(0,0,0,0.2);
  scroll-snap-align: start;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.featured-tile:hover {
  transform: translateY(-8px) rotate(-1deg);
  box-shadow: 0 4px 5px rgba(0,0,0,0.25), 0 14px 18px rgba(0,0,0,0.18);
}


.featured-art {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 30px 30px 0 0;
  flex-shrink: 0;
}

.featured-art::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, #ffbee3 0%, #ff83d6 50%, #ff00aa 100%);
  mix-blend-mode: multiply;
  opacity: 1;
  transition: opacity 0.45s ease;
}

.featured-tile:hover .featured-art::after {
  opacity: 0;
}

.featured-art img,
.featured-art svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0 !important;
  filter: grayscale(100%);
  transition: filter 0.45s ease, transform 0.45s ease;
}

.featured-tile:hover .featured-art img {
  filter: grayscale(0%);
  transform: scale(1.03);
}

.image-pamparina { transform: scale(1.2) translate(6px, 6px); }
.image-binche { transform: scale(1.2) translateY(18px); }
.image-elmer { object-position: 53% center; transform: scale(1.2) translateY(14px); }
.image-ehpad { object-position: 45% center; transform: scale(1.2) translateY(-20px); }
.image-vinyle { object-position: center; transform: scale(1.2) translateY(0); }
.collaboration-image { object-position: center; transform: scale(1.2) translateY(0); }

.featured-title:hover .image-pamparina { transform: scale(1.26) translate(6px, 6px); }
.featured-title:hover .image-binche { transform: scale(1.26) translateY(18px); }
.featured-title:hover .image-elmer { transform: scale(1.26) translateY(14px); }
.featured-title:hover .image-ehpad { transform: scale(1.26) translateY(-20px); }
.featured-title:hover .image-vinyle { transform: scale(1.26) translateY(0); }
.featured-title:hover .collaboration-image { transform: scale(1.26) translateY(0); }

.featured-meta {
  width: 100%;
  min-height: 90px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 20px;
  text-align: left;
}

.featured-arrow {
  width: 40px;
  height: 40px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #111111;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 700;
}

.featured-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.featured-title {
  color: #111111;
  font-size: 1.08rem;
  font-weight: 700;
  line-height: 1.05;
}

.featured-cat {
  margin-top: 6px;
  color: #111111;
  font-family: "elite", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;
}

.carousel-prev,
.carousel-next {
  position: absolute;
  top: 50%;
  z-index: 5;
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #111111;
  color: #ffffff;
  font-size: 32px;
  line-height: 1;
  transform: translateY(-50%);
  transition: transform 0.2s ease;
}

.carousel-prev { left: 0; }
.carousel-next { right: 0; }
.carousel-prev:hover,
.carousel-next:hover { transform: translateY(-50%) scale(1.08); }

/* ================================================================
   MARQUEE
   ================================================================ */
.marquee {
  overflow: hidden;
  padding: 20px 0;
  margin-top: 20px;
  white-space: nowrap;
  background: linear-gradient(-90deg, #ff00a8, #e8a0c8);
  color: #ffffff;
}

.marquee-track {
  display: inline-flex;
  animation: marquee 26s linear infinite;
}

.marquee-set {
  padding-right: 8px;
  color: #ffffff;
  font-size: clamp(1.3rem, 3vw, 2rem);
  font-weight: 600;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* ================================================================
   ABOUT TEASER + CONTACT INFO
   ================================================================ */
.about-teaser {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
}

.about-teaser-portrait {
  flex: 0 0 400px;
}

.about-teaser-image {
  display: block;
  width: 400px;
  max-width: 100%;
  height: auto;
  object-fit: cover;
}

.about-teaser-text {
  flex: 1 1 0;
  min-width: 0;
}

.about-teaser-text h2 {
  margin-bottom: 16px;
  font-size: 32px;
}

.about-teaser-text p {
  margin-bottom: 28px;
  color: rgba(23,20,43,0.82);
  font-size: 1rem;
  font-weight: 400;
}

.contact-info {
  display: grid;
  grid-template-columns: max-content max-content;
  justify-content: start;
  column-gap: 80px;
  row-gap: 18px;
  width: 100%;
  margin-top: 25px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: "Montserrat", sans-serif;
  font-size: 15px;
}

.contact-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #252525;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 600;
}

/* ================================================================
   FOOTER
   ================================================================ */
.site-footer {
  margin-top: auto;
  padding: 34px clamp(20px, 4vw, 48px) 40px;
  border-top: 1px solid rgba(23,20,43,0.12);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.site-footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.site-footer-links {
  display: flex;
  gap: 20px;
  font-size: 0.85rem;
}

.site-footer-line {
  font-family: "elite", sans-serif;
  font-size: 1.1rem;
  font-style: italic;
}

.site-footer-row-bottom {
  color: rgba(23,20,43,0.55);
  font-size: 0.78rem;
}

.text-link {
  padding-bottom: 2px !important;
  border-bottom: 1px solid currentColor !important;
  font-size: 0.85rem;
  font-weight: 500;
}

/* ================================================================
   ALL PROJECTS PAGE
   ================================================================ */
.projects-page-title {
  margin-bottom: 45px !important;
  font-family: "Montserrat", sans-serif;
  font-size: clamp(2.6rem, 6vw, 4.5rem);
  font-weight: 800;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

/* ================================================================
   PROJECT DETAIL — DESKTOP
   ================================================================ */
.project-detail-page {
  padding-left: 6%;
  padding-right: 6%;
  overflow: visible;
}

.project-header {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 55px 0;
  box-sizing: border-box;
}

.project-intro-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0;
}

.project-intro-left {
  min-width: 0;
}

.back-link {
  display: inline-block;
  margin-bottom: 32px;
  padding: 0;
  color: rgba(23,20,43,0.6);
  font-size: 0.82rem;
}

.back-link:hover {
  color: var(--ink);
}

.project-title-block h1 {
  margin-bottom: 18px;
  font-family: "Montserrat", sans-serif;
  font-size: clamp(42px, 4.5vw, 68px);
  font-weight: 700;
  line-height: 1;
}
  
.project-tagline {
  margin: 0 !important;
  padding-bottom: 28px;
  font-family: "elite", sans-serif;
  font-size: 15px !important;
  font-weight: 400;
  line-height: 1.6;
  width: 100%;
  box-sizing: border-box;
}

.project-detail-top {
  position: relative;
}

.project-detail-top::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 1px;
  background: rgba(0, 0, 0, 0.12);
}

.project-meta {
  display: flex;
  gap: 65px;
  margin-top: 80px;
  margin-bottom: 32px;
}

.project-meta-year,
.project-tools {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin: 0;
  min-width: 0;
}

.project-meta span {
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
}

.project-meta p {
  margin: 0;
  font-size: 0.9rem;
  white-space: nowrap;
}

.project-meta span {
  font-size: 0.9rem;
  font-weight: 600;
}

.project-meta p {
  margin: 0;
  font-size: 0.9rem;
}

.tools-icons {
  display: none;
}

.project-description {
  max-width: none;
  margin-top: 40px;
  margin-bottom: 40px
  margin-left: 0;
  margin-right: 0;
  font-size: 14px;
  font-weight: 600;
}


.project-intro-image {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 24px;
  margin-top: 45px;
}

.project-intro-image img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.project-gallery-caption-pamparina {
  width: 100% !important;
  margin-top: -60px !important;
  margin-bottom: 100px !important;
  font-family: "Montserrat", sans-serif !important;
  font-size: 14px !important;
  line-height: 1.7 !important;
  font-weight: 600 !important;
}

.project-gallery-caption-elmer {
  width: 100% !important;
  margin-top: 60px !important;
  margin-bottom: 100px !important;
  font-family: "Montserrat", sans-serif !important;
  font-size: 14px !important;
  line-height: 1.7 !important;
  font-weight: 600 !important;
}

.project-gallery-caption-pokematch {
  width: 100% !important;
  margin-top: -60px !important;
  margin-bottom: 100px !important;
  font-family: "Montserrat", sans-serif !important;
  font-size: 14px !important;
  line-height: 1.7 !important;
  font-weight: 600 !important;
}
/* ================================================================
   PROJECT DETAIL — PAMPARINA / ELMER / POKÉMATCH
   ================================================================ */

.pamparina-book-section {
  display: none !important;
}

.pamparina-book-section {
  width: 100%;
  margin: 0 auto 80px;
  display: flex;
  justify-content: center;
  overflow: visible;
}
.pamparina-book-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
}

.pamparina-real-book {
  margin: 0 auto !important;
  overflow: visible !important;
  filter: drop-shadow(0 12px 20px rgba(0,0,0,0.12));
}

.pamparina-book-page {
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
}

.pamparina-book-page img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.empty-page {
  background: transparent !important;
  box-shadow: none !important;
}

.hide-empty-cover {
  opacity: 0 !important;
  visibility: hidden !important;
}

.project-gallery-three {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: auto;
  margin-bottom: 100px;
}

.project-gallery-three img {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 24px;
}

.project-gallery-two {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  margin: -20px auto 30px;
  align-items: stretch;
}

.project-gallery-two img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  object-fit: cover;
}

.project-gallery-two img:first-child {
  aspect-ratio: 1 / 1;
}

.project-gallery-two img:nth-child(2) {
  aspect-ratio: 2 / 1;
}


.project-gallery-two-v3 {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 0px;
  margin-bottom: 100px;
}

.project-gallery-two-v3 img {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  border-radius: 24px;
}

.elmer-illustrations {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: -200px;
  width: 100%;
  box-sizing: border-box;
}

.elmer-illustrations img {
  width: calc((100% - 40px) / 3);
  height: auto;
  object-fit: contain;
  box-sizing: border-box;
  transform: scale(1.4);
}

.pokematch-creations {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  margin-top: auto;
  margin-bottom: 100px;
}

.pokematch-creations video {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  object-fit: cover;
}

.pokematch-row {
  display: grid;
  grid-template-columns: 1.15fr 0.7fr 1.15fr;
  gap: 40px;
  align-items: center;
  width: 100%;
}

.pokematch-row img:first-child {
  width: 115%;
  height: 420px;
  object-fit: contain;
  justify-self: center;
}

.pokematch-row img:nth-child(2) {
  width: 75%;
  height: 320px;
  object-fit: contain;
  justify-self: center;
  transform: translateX(20px);
}

.pokematch-row video {
  width: 90%;
  height: 300px;
  object-fit: cover;
  object-position: center;
  justify-self: center;
  clip-path: inset(0 6% 0 6%);
}




/* ================================================================
   ABOUT PAGE
   ================================================================ */
.about-cv-section {
  width: min(1400px, 100%);
  margin: 80px auto;
  padding: 0 30px;
  text-align: center;
}

.about-cv {
  display: block;
  width: 100%;
  max-width: 1400px;
  height: auto;
  margin: 0 auto;
  border-radius: 20px;
}

/* ================================================================
   CONTACT PAGE
   ================================================================ */
.contact-hero {
  max-width: 900px;
  padding: clamp(60px, 8vw, 100px) clamp(30px, 6vw, 80px) 30px;
}

.contact-hero h1 {
  margin-bottom: 18px;
  font-size: clamp(2.6rem, 7vw, 4.6rem);
  font-weight: 800;
  line-height: 1.05;
}

.contact-hero .italic {
  font-family: "elite", sans-serif;
  font-style: italic;
  font-weight: 400;
}

.contact-hero p {
  max-width: 50ch;
  color: rgba(23,20,43,0.8);
  font-size: 1.1rem;
}

.contact-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(30px, 6vw, 70px);
  padding: 30px clamp(30px, 6vw, 80px) 90px;
}

.contact-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.contact-email {
  padding-bottom: 4px;
  border-bottom: 2px solid #ffbee3;
  font-family: "elite", sans-serif;
  font-size: clamp(1.6rem, 3.4vw, 2.3rem);
}

.contact-socials {
  display: flex;
  gap: 18px;
  font-size: 0.9rem;
}

.contact-socials a {
  border-bottom: 1px solid rgba(23,20,43,0.3);
}

.contact-note {
  max-width: 40ch;
  color: rgba(23,20,43,0.7);
  font-size: 0.95rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-form label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: rgba(23,20,43,0.65);
  font-size: 0.82rem;
}

.contact-form input,
.contact-form textarea {
  padding: 12px 14px;
  border: 1px solid transparent;
  border-radius: 4px;
  background: var(--paper-2);
  color: var(--ink);
  font-family: "Montserrat", sans-serif;
  font-size: 0.95rem;
  resize: vertical;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: #ffbee3;
}

.btn {
  padding: 13px 26px;
  border-radius: 999px;
  font-size: 0.9rem;
}

.btn-primary {
  background: var(--ink);
  color: var(--paper);
}

.contact-form .btn {
  align-self: flex-start;
  margin-top: 6px;
}

.contact-success {
  padding: 30px;
  border-radius: 4px;
  background: var(--paper-2);
}

.contact-success p:first-child {
  margin-bottom: 6px;
  font-family: "elite", sans-serif;
  font-size: 1.4rem;
}

.contact-success-sub {
  color: rgba(23,20,43,0.6);
  font-size: 0.9rem;
}

/* ================================================================
   TABLETTE — 861 À 1100 PX
   ================================================================ */
@media (max-width: 1100px) {
  .featured-tile {
    flex-basis: calc((100% - 24px) / 2);
  }

  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-teaser {
    gap: 45px;
  }

  .about-teaser-portrait {
    flex-basis: 330px;
  }

  .about-teaser-image {
    width: 330px;
  }

  .project-intro-layout {
    grid-template-columns: 45% 55%;
    gap: 35px;
  }
}

/* ================================================================
   TABLETTE / PETIT ÉCRAN — 860 PX
   ================================================================ */
@media (max-width: 860px) {
  .nav {
    min-height: 58px;
  }

  .nav-links {
    display: none;
  }

  .wordmark img {
    width: 220px;
  }

  .menu-toggle {
  position: absolute;
  top: 50%;
  right: 18px;
  z-index: 10005;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;
  padding: 0;

  background: transparent !important;
  color: #ffffff !important;

  font-size: 30px;
  line-height: 1;

  transform: translateY(-50%);
}

  .mobile-menu-overlay {
    position: fixed;
    inset: 0;
    z-index: 10000;
    width: 100vw;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 26px;
    overflow: hidden;
    background: linear-gradient(145deg, #d6009d 0%, #e83cab 45%, #f2a7d4 100%);
    opacity: 1;
    visibility: hidden;
    pointer-events: none;
    clip-path: circle(0px at calc(100% - 45px) 45px);
    transition: clip-path 0.8s cubic-bezier(0.22,1,0.36,1), visibility 0s linear 0.8s;
  }

  .mobile-menu-overlay.is-open {
    visibility: visible;
    pointer-events: auto;
    clip-path: circle(150vmax at calc(100% - 45px) 45px);
    transition: clip-path 0.9s cubic-bezier(0.16,1,0.3,1), visibility 0s;
  }

  .mobile-menu-link {
    position: relative;
    z-index: 3;
    color: #ffffff !important;
    font-size: 2rem;
    font-weight: 700;
    opacity: 0;
    transform: translateY(28px) scale(0.94);
    transition: opacity 0.5s ease, transform 0.65s cubic-bezier(0.22,1,0.36,1);
    transition-delay: 0s;
  }

  .mobile-menu-overlay.is-open .mobile-menu-link {
    opacity: 1;
    transform: translateY(0) scale(1);
    transition-delay: var(--delay);
  }

  .menu-star {
    position: absolute;
    display: block;
    color: #ffffff;
    pointer-events: none;
    opacity: 0;
    z-index: 1;
    animation: menuStarFloat 5s ease-in-out infinite alternate;
    transition: opacity 0.7s ease;
  }

  .mobile-menu-overlay.is-open .menu-star {
    opacity: 0.85;
  }

  .menu-star.star-1 { top: 14%; left: 14%; font-size: 40px; }
  .menu-star.star-2 { top: 25%; right: 14%; font-size: 23px; animation-delay: 0.8s; }
  .menu-star.star-3 { top: 52%; left: 9%; font-size: 28px; animation-delay: 1.4s; }
  .menu-star.star-4 { bottom: 18%; right: 13%; font-size: 44px; animation-delay: 2s; }
  .menu-star.star-5 { bottom: 9%; left: 24%; font-size: 20px; animation-delay: 2.7s; }

  @keyframes menuStarFloat {
    0% { transform: translate3d(0,0,0) rotate(-3deg) scale(1); }
    50% { transform: translate3d(5px,-9px,0) rotate(3deg) scale(1.05); }
    100% { transform: translate3d(-4px,6px,0) rotate(-2deg) scale(0.98); }
  }


  .project-header {
    min-height: auto;
    padding: 35px 0 45px;
  }

  .project-intro-layout {
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
  }

  .project-intro-left {
    display: contents;
  }

  .back-link {
    order: 0;
    margin-bottom: 28px;
  }

  .project-title-block {
    order: 1;
    width: 100%;
    margin-bottom: 30px;
  }

  .project-title-block h1 {
    margin-bottom: 12px;
    font-size: 42px;
  }

  .project-tagline {
    padding-bottom: 20px;
    font-size: 15px !important;
    line-height: 1.3;
  }

  .project-meta {
    order: 2;
    display: grid;
    grid-template-columns: 0.75fr 1.6fr;
    column-gap: 28px;
    width: 100%;
    margin: 0 0 30px;
  }

  .project-meta > div {
    flex-direction: row;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .project-meta span,
  .project-meta p {
    font-size: 13px;
  }

  .project-meta span {
    white-space: nowrap;
    flex-shrink: 0;
  }

  .project-meta > div:first-child p {
    white-space: nowrap;
  }

  .project-tools {
    align-items: center;
  }

  .project-tools > span {
    display: block;
  }

  .tools-icons {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .tools-icons img {
    display: block;
    width: 30px;
    height: 30px;
    object-fit: contain;
  }

  .project-intro-image {
    order: 3;
    width: 100%;
    margin: 0;
    overflow: hidden;
    border-radius: 18px;
  }

  .project-intro-image img {
    width: 100%;
    height: auto;
    transform: none;
  }

  .project-intro-description {
    order: 4;
    width: 100%;
    max-width: none;
    margin-top: 25px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 1.6;
  }

  .project-gallery-three {
  width: 100% !important;
  display: grid !important;
  grid-template-columns: 1fr !important;
  gap: 30px !important;
  margin-top: 0 !important;
  }

  .pokematch-creations {
    gap: 30px;
  }

  .pokematch-row {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .pokematch-row img:first-child,
  .pokematch-row img:nth-child(2),
  .pokematch-row video {
    width: 100%;
    height: auto;
    transform: none;
    clip-path: none;
  }

  .ehpad-gallerie {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  margin-bottom: 30px;
}

.ehpad-gallerie img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 0px;
}

.project-gallery-two-v3 {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  margin-bottom: 60px;
}

.project-gallery-two-v3 img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 18px;
}

.project-gallery-two {
display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  width: 100%;
  margin-bottom: 30px;
  margin-top: 20px;
}

  .project-gallery-two img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 18px;
  object-fit: cover;
}

.project-gallery-two img:first-child {
  aspect-ratio: 1 / 1;
}

.project-gallery-two img:nth-child(2) {
  aspect-ratio: 2 / 1;
}

.project-gallery-two-reverse {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  width: 100%;
  margin-bottom: 60px;
}

.project-gallery-two-reverse img {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  border-radius: 18px;
}

  .about-teaser {
    width: 100%;
    max-width: none;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding-left: 28px;
    padding-right: 28px;
  }

  .about-teaser-portrait {
    flex: 0 0 auto;
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
  }

  .about-teaser-image {
    width: 100%;
    margin: 0 auto;
  }

  .about-teaser-text {
    padding: 30px;
    width: 100%;
    margin: 0;
  }

  .contact-info {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .contact-item {
    width: 100%;
  }

  .contact-body {
    grid-template-columns: 1fr;
  }

  
}

 /* ========================================================= */
/* RESPONSIVE — PROJETS SUR MOBILE                           */
/* ========================================================= */

@media (max-width: 560px) {

  .nav {
    min-height: 58px;
  }

  .wordmark img {
    width: 190px;
  }

  .hero {
    height: 430px;
    min-height: 430px;
  }

  .hero-content {
    top: 30%;
  }

  .hero-logo {
    width: 88%;
  }

  .hero-specialty {
    left: 30px;
    top: 0;
    width: 80%;
    gap: 12px;
  }

  .hero-specialty-icon {
    width: 24px;
    height: 24px;
    min-width: 24px;
    font-size: 0.8rem;
    margin-top: -10px;
  }

  .hero-specialty-text {
    padding: 6px 10px;
    font-size: 0.6rem;
    margin-top: -10px;
  }

  .presentation-home {
    min-height: 420px;
    margin-top: -180px;
    padding: 70px 25px;
  }
    

  .presentation-home-text {
    width: 90%;
    margin-top: 25px;
    margin-bottom: 25px;
    font-size: 14px;
  }

  .presentation-home-button {
    margin-top: 25px;
    padding: 10px 28px;
    font-size: 0.75rem;
  }

  .section-head h2 {
  font-size: 1.8rem;
  text-align: center;
}

  .projects-home-section {
    padding-left: 0;
    padding-right: 0;
  }

  .projects-carousel-wrapper {
    width: 100%;
    overflow: hidden;
    position: relative;
  }

.projects-carousel {
  width: 100%;
  display: flex;
  gap: 18px;
  overflow-x: auto;
  overflow-y: visible;
  padding: 20px 40px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  box-sizing: border-box;
}

.projects-carousel .featured-tile {
  flex: 0 0 calc(100vw - 120px);
  width: calc(100vw - 120px);
  min-height: 0;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

  .projects-carousel::-webkit-scrollbar {
    display: none;
  }

  .projects-carousel .featured-art {
    width: 100%;
    aspect-ratio: 1 / 1;
  }

  .projects-carousel .featured-art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0 !important;
    aspect-ratio: 1 / 1;
  }

  /* BAS DE LA CARTE */
  .projects-carousel .featured-meta {
    width: 100%;
    box-sizing: border-box;
  }

  /* FLÈCHES */
  .projects-carousel-wrapper .carousel-prev {
    left: 12px;
  }

  .projects-carousel-wrapper .carousel-next {
    right: 12px;
  }

  .project-meta {
    grid-template-columns: 0.7fr 1.3fr;
    column-gap: 18px;
  }

  .project-meta span,
  .project-meta p {
    font-size: 12px;
  }

  .tools-icons img {
    width: 27px;
    height: 27px;
  }

  .project-intro-description {
    font-size: 13.5px;
  }


/* ==========================================================
   ELMER — MOBILE
   ========================================================== */

.elmer-illustrations {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;

  width: 100% !important;

  /* rapproche la galerie des images précédentes */
  margin-top: -120px !important;

  padding: 0 !important;
  gap: 0 !important;
}

.elmer-illustrations img {
  display: block !important;

  /* images beaucoup plus grandes */
  width: 140% !important;
  max-width: none !important;

  height: auto !important;
  margin-top: -100px !important;
  margin-bottom: -100px !important;

  padding: 0 !important;

  transform: none !important;
  object-fit: contain !important;
}

    .about-teaser-text h2 {
  font-size: 1.8rem;
}
  .about-teaser-text p {
  margin-bottom: -40px;
  color: rgba(23,20,43,0.82);
  font-size: 0.8rem;
  font-weight: 400;
}


.contact-transition {
  position: relative;
  width: 100vw;
  height: 360px;
  margin-left: calc(50% - 50vw);
  margin-top: 40px;
  margin-bottom: 150px;
  background: #ff00a8;
  overflow: hidden;
}

/* Arche blanche du haut */
.contact-transition::before {
  content: "";
  position: absolute;
  top: -300px;
  left: -10%;
  width: 120%;
  height: 450px;
  background: #f1f0f7;
  border-radius: 0 0 50% 50%;
}

/* Arche blanche du bas */
.contact-transition::after {
  content: "";
  position: absolute;
  bottom: -300px;
  left: -10%;
  width: 120%;
  height: 450px;
  background: #f1f0f7;
  border-radius: 50% 50% 0 0;
}
/* Partie Contact */

/* Remonte le bloc Contact */
.contact-info {
  margin-top: -20px;
  margin-bottom: 160px;

}

/* Centre le titre Contact */
h2#contact {
  text-align: center;
  margin-top: -120px;
  margin-bottom: 40px;
}

#contact {
  scroll-margin-top: 0px;
}

    .project-detail-page {
    padding-left: 45px !important;
    padding-right: 45px !important;
    box-sizing: border-box;
  }

  .project-detail-page > * {
    max-width: 100%;
    box-sizing: border-box;
  }

`;
