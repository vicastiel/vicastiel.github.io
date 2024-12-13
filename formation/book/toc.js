// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><li class="part-title">Bienvenue</li><li class="chapter-item expanded "><a href="intro.html"><strong aria-hidden="true">1.</strong> Introduction</a></li><li class="chapter-item expanded "><a href="chapitre1.html"><strong aria-hidden="true">2.</strong> Les Bases de Python</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="nested/2_1.html"><strong aria-hidden="true">2.1.</strong> Variables et Fonctions</a></li><li class="chapter-item expanded "><a href="nested/2_2.html"><strong aria-hidden="true">2.2.</strong> Structures de Contrôle</a></li><li class="chapter-item expanded "><a href="nested/2_3.html"><strong aria-hidden="true">2.3.</strong> Structure de données : Listes et Tuples</a></li><li class="chapter-item expanded "><a href="nested/2_4.html"><strong aria-hidden="true">2.4.</strong> Structure de données : Dictionnaires</a></li><li class="chapter-item expanded "><a href="nested/2_5.html"><strong aria-hidden="true">2.5.</strong> Structure de données : Compréhension de Liste</a></li><li class="chapter-item expanded "><a href="nested/2_6.html"><strong aria-hidden="true">2.6.</strong> Structure de données : Fonctions Intégrées</a></li><li class="chapter-item expanded "><a href="nested/2.7.html"><strong aria-hidden="true">2.7.</strong> Modules de bases de Python</a></li><li class="chapter-item expanded "><a href="nested/2_8.html"><strong aria-hidden="true">2.8.</strong> Programmation Orientée Objet avec Python</a></li></ol></li><li class="chapter-item expanded "><a href="chapitre2.html"><strong aria-hidden="true">3.</strong> Numpy</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="nested/3_1.html"><strong aria-hidden="true">3.1.</strong> Numpy : Tableau ndarray</a></li><li class="chapter-item expanded "><a href="nested/3_2.html"><strong aria-hidden="true">3.2.</strong> Numpy : Slicing et Indexing</a></li><li class="chapter-item expanded "><a href="nested/3_3.html"><strong aria-hidden="true">3.3.</strong> Numpy : Mathématiques</a></li><li class="chapter-item expanded "><a href="nested/3_4.html"><strong aria-hidden="true">3.4.</strong> Numpy : Broadcasting</a></li></ol></li><li class="chapter-item expanded "><a href="chapitre3.html"><strong aria-hidden="true">4.</strong> Matplotlib</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="nested/4_1.html"><strong aria-hidden="true">4.1.</strong> Matplolib : Graphiques de Base</a></li><li class="chapter-item expanded "><a href="nested/4_2.html"><strong aria-hidden="true">4.2.</strong> Matplotlib : Top Graphiques</a></li></ol></li><li class="chapter-item expanded "><a href="chapitre4.html"><strong aria-hidden="true">5.</strong> Scipy</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="nested/5_1.html"><strong aria-hidden="true">5.1.</strong> Scipy : Interpolation</a></li><li class="chapter-item expanded "><a href="nested/5_2.html"><strong aria-hidden="true">5.2.</strong> Scipy : Optimisation</a></li><li class="chapter-item expanded "><a href="nested/5_3.html"><strong aria-hidden="true">5.3.</strong> Scipy : Traitement du signal</a></li><li class="chapter-item expanded "><a href="nested/5_4.html"><strong aria-hidden="true">5.4.</strong> Scipy : Image processing</a></li><li class="chapter-item expanded "><a href="nested/5_5.html"><strong aria-hidden="true">5.5.</strong> Scipy : Application - Image processing (cas réel)</a></li></ol></li><li class="chapter-item expanded "><a href="chapitre5.html"><strong aria-hidden="true">6.</strong> Pandas</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="nested/6_1.html"><strong aria-hidden="true">6.1.</strong> Pandas : Les bases et Analyse du Titanic</a></li><li class="chapter-item expanded "><a href="nested/6_2.html"><strong aria-hidden="true">6.2.</strong> Pandas : séries temporelles</a></li></ol></li><li class="chapter-item expanded "><a href="chapitre6.html"><strong aria-hidden="true">7.</strong> Seaborn</a></li><li class="chapter-item expanded "><a href="chapitre7.html"><strong aria-hidden="true">8.</strong> Sklearn</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="nested/8_1.html"><strong aria-hidden="true">8.1.</strong> Sklearn : Apprentissage Supervisé avec Sklearn</a></li><li class="chapter-item expanded "><a href="nested/8_2.html"><strong aria-hidden="true">8.2.</strong> Sklearn : Sklearn : Sélection de Modele</a></li><li class="chapter-item expanded "><a href="nested/8_3.html"><strong aria-hidden="true">8.3.</strong> Sklearn : Pre-processing</a></li><li class="chapter-item expanded "><a href="nested/8_4.html"><strong aria-hidden="true">8.4.</strong> Sklearn : Feature Selection</a></li><li class="chapter-item expanded "><a href="nested/8_5.html"><strong aria-hidden="true">8.5.</strong> Sklearn : Apprentissage Non-Supervisé</a></li><li class="chapter-item expanded "><a href="nested/8_6.html"><strong aria-hidden="true">8.6.</strong> Sklearn : Ensemble Learning</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">9.</strong> Exploratory Data Analysis</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">10.</strong> Prétraitement de données</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">11.</strong> Modélisation</div></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
