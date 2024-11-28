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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><li class="part-title">Bienvenue</li><li class="chapter-item expanded "><a href="intro.html"><strong aria-hidden="true">1.</strong> Introduction</a></li><li class="chapter-item expanded "><a href="chapitre1.html"><strong aria-hidden="true">2.</strong> Chapitre 1 : Les Bases de Python</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="nested/2_1.html"><strong aria-hidden="true">2.1.</strong> Variables et Fonctions</a></li><li class="chapter-item expanded "><a href="nested/2_2.html"><strong aria-hidden="true">2.2.</strong> Structures de Contrôle</a></li><li class="chapter-item expanded "><a href="nested/2_3.html"><strong aria-hidden="true">2.3.</strong> Structure de données : Listes et Tuples</a></li><li class="chapter-item expanded "><a href="nested/2_4.html"><strong aria-hidden="true">2.4.</strong> Structure de données : Dictionnaires</a></li><li class="chapter-item expanded "><a href="nested/2_5.html"><strong aria-hidden="true">2.5.</strong> Structure de données : Compréhension de Liste</a></li><li class="chapter-item expanded "><a href="nested/2_6.html"><strong aria-hidden="true">2.6.</strong> Structure de données : Fonctions Intégrées</a></li><li class="chapter-item expanded "><a href="nested/2.7.html"><strong aria-hidden="true">2.7.</strong> Modules de bases de Python</a></li><li class="chapter-item expanded "><a href="nested/2_8.html"><strong aria-hidden="true">2.8.</strong> Programmation Orientée Objet avec Python</a></li></ol></li><li class="chapter-item expanded "><a href="chapitre2.html"><strong aria-hidden="true">3.</strong> Chapitre 2 : Numpy</a></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">3.1.</strong> Numpy : Tableau ndarray</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.2.</strong> Numpy : Slicing et Indexing</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.3.</strong> Numpy : Mathématiques</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.4.</strong> Numpy : Broadcasting</div></li></ol></li><li class="chapter-item expanded "><a href="chapitre3.html"><strong aria-hidden="true">4.</strong> Chapitre 3 : Matplotlib</a></li><li class="chapter-item expanded "><a href="chapitre4.html"><strong aria-hidden="true">5.</strong> Chapitre 4 : Scipy</a></li><li class="chapter-item expanded "><a href="chapitre5.html"><strong aria-hidden="true">6.</strong> Chapitre 5 : Pandas</a></li><li class="chapter-item expanded "><a href="chapitre6.html"><strong aria-hidden="true">7.</strong> Chapitre 6 : Seaborn</a></li><li class="chapter-item expanded "><a href="chapitre7.html"><strong aria-hidden="true">8.</strong> Chapitre 7 : Sklearn</a></li><li class="chapter-item expanded "><a href="chapitre8.html"><strong aria-hidden="true">9.</strong> Chapitre 8 : Exploratory Data Analysis</a></li><li class="chapter-item expanded "><a href="chapitre9.html"><strong aria-hidden="true">10.</strong> Chapitre 9: Prétraitement de données</a></li><li class="chapter-item expanded "><a href="chapitre10.html"><strong aria-hidden="true">11.</strong> Chapitre 10: Modélisation</a></li></ol>';
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
