/* Pied de page injecté sur toutes les pages pour éviter la duplication */
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("footer");
  if (!el) return;
  el.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="brand" style="margin-bottom:14px;">
            <span class="brand-mark">FM</span>
            <span class="brand-name" style="color:#fff;">France Méthanisation</span>
          </a>
          <p>Des unités de méthanisation locales, à taille humaine, qui valorisent les biodéchets de nos territoires.</p>
        </div>
        <div>
          <h4>Le site</h4>
          <ul>
            <li><a href="index.html">Accueil</a></li>
            <li><a href="le-projet.html">Le projet</a></li>
            <li><a href="investisseurs.html">Investisseurs</a></li>
            <li><a href="equipe.html">L'équipe</a></li>
          </ul>
        </div>
        <div>
          <h4>Ressources</h4>
          <ul>
            <li><a href="investisseurs.html#pitch-deck">Pitch deck</a></li>
            <li><a href="le-projet.html#faq">Questions fréquentes</a></li>
            <li><a href="contact.html">Nous contacter</a></li>
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
        <span>&copy; <span data-year></span> France Méthanisation — Société en cours de création</span>
        <span><a href="mentions-legales.html" style="color:rgba(255,255,255,0.7);">Mentions légales &amp; confidentialité</a></span>
      </div>
    </div>
  `;
  const yearEl = el.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
