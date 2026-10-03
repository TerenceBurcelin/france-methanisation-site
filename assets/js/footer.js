/* Pied de page injecté sur toutes les pages pour éviter la duplication */
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("footer");
  if (!el) return;
  el.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="brand" style="margin-bottom:14px;">
            <img class="brand-logo" src="/assets/img/logo.png" alt="" width="38" height="42">
            <span class="brand-name" style="color:#fff;">France Méthanisation</span>
          </a>
          <p>Des unités de méthanisation locales, à taille humaine, qui valorisent les biodéchets de nos territoires.</p>
        </div>
        <div>
          <h4>Le site</h4>
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/notre-approche">Notre approche</a></li>
            <li><a href="/unites/saint-priest-5000">Unité St Priest 5000</a></li>
            <li><a href="/investisseurs">Investisseurs</a></li>
          </ul>
        </div>
        <div>
          <h4>Ressources</h4>
          <ul>
            <li><a href="/investisseurs#pitch-deck">Pitch deck</a></li>
            <li><a href="/notre-approche#faq">Questions fréquentes</a></li>
            <li><a href="/contact">Nous contacter</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:contact@france-methanisation.fr">contact@france-methanisation.fr</a></li>
            <li>France</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; <span data-year></span> France Méthanisation</span>
        <span><a href="/mentions-legales" style="color:rgba(255,255,255,0.7);">Mentions légales &amp; confidentialité</a></span>
      </div>
    </div>
  `;
  const yearEl = el.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
