/* France Méthanisation — comportements du site */

/* ------------------------------------------------------------------------
   CONFIGURATION DES FORMULAIRES
   Le site est statique (pas de serveur). Pour recevoir réellement les
   demandes de contact et les téléchargements du pitch deck dans une boîte
   mail ou un tableur, renseignez ici l'URL d'un service de formulaire
   (Formspree, Netlify Forms, Getform...). Voir SETUP.md à la racine du
   site pour la marche à suivre (5 minutes, gratuit).
   Tant que ce champ est vide, les formulaires fonctionnent quand même :
   la demande est enregistrée localement et un e-mail pré-rempli s'ouvre
   pour prévenir l'équipe.
------------------------------------------------------------------------- */
const FORM_ENDPOINT = "";
const CONTACT_EMAIL = "contact@france-methanisation.fr";

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initYear();
  initForms();
});

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );
}

function initYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

function initForms() {
  document.querySelectorAll("form[data-fm-form]").forEach((form) => {
    form.addEventListener("submit", (e) => handleSubmit(e, form));
  });
}

async function handleSubmit(e, form) {
  e.preventDefault();
  const kind = form.getAttribute("data-fm-form");
  const submitBtn = form.querySelector('button[type="submit"]');
  const errorEl = form.querySelector(".form-error");
  if (errorEl) errorEl.textContent = "";

  const data = Object.fromEntries(new FormData(form).entries());
  data.formulaire = kind;
  data.page = window.location.pathname;
  data.date = new Date().toISOString();

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.dataset.label = submitBtn.textContent;
    submitBtn.textContent = "Envoi en cours...";
  }

  saveLeadLocally(data);

  let sentToEndpoint = false;
  if (FORM_ENDPOINT) {
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      sentToEndpoint = res.ok;
    } catch (err) {
      sentToEndpoint = false;
    }
  }

  if (!sentToEndpoint) {
    openMailFallback(kind, data);
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = submitBtn.dataset.label;
  }

  showSuccess(form, kind, data);
}

function saveLeadLocally(data) {
  try {
    const key = "fm_leads";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push(data);
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (err) {
    /* stockage local indisponible : on ignore silencieusement */
  }
}

function openMailFallback(kind, data) {
  let subject = "Nouveau contact — site France Méthanisation";
  let bodyLines = [];

  if (kind === "pitch-deck") {
    subject = "Téléchargement pitch deck — France Méthanisation";
    bodyLines = [
      `Prénom : ${data.prenom || ""}`,
      `Nom : ${data.nom || ""}`,
      `Société : ${data.societe || "-"}`,
      `E-mail : ${data.email || ""}`,
    ];
  } else {
    subject = `Contact site — ${data.profil || "Visiteur"}`;
    bodyLines = [
      `Nom : ${data.nom || ""}`,
      `E-mail : ${data.email || ""}`,
      `Profil : ${data.profil || "-"}`,
      "",
      `Message :`,
      data.message || "",
    ];
  }

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

  const link = document.createElement("a");
  link.href = mailto;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function showSuccess(form, kind, data) {
  const successEl = form.parentElement.querySelector(".form-success");
  form.style.display = "none";
  if (successEl) successEl.classList.add("show");

  if (kind === "pitch-deck") {
    const downloadLink = document.getElementById("pitch-deck-download");
    if (downloadLink) {
      downloadLink.classList.remove("btn-disabled");
      downloadLink.removeAttribute("aria-disabled");
      setTimeout(() => {
        downloadLink.click();
      }, 400);
    }
  }
}
