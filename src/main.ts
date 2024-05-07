import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


export function toggleSidebar(): void {


  const select = (el: string, all = false): Element[] => {
    el = el.trim();
    if (all) {
      return Array.from(document.querySelectorAll(el));
    } else {
      const element = document.querySelector(el);
      return element ? [element] : [];
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type: string, el: string, listener: EventListenerOrEventListenerObject, all = false): void => {
    const elements = select(el, all);
    elements.forEach(e => e.addEventListener(type, listener));
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el: HTMLElement, listener: EventListenerOrEventListenerObject): void => {
    el.addEventListener('scroll', listener);
  };

  /**
   * Sidebar toggle
   */
  // if (select('.toggle-sidebar-btn')) {
  //   on('click', '.toggle-sidebar-btn', (e) => {
  //     const body = select('body')[0] as HTMLElement;
  //     if (body) {
  //       body.classList.toggle('toggle-sidebar');
  //     }
  //   });
  // }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', (e) => {
      const searchBar = select('.search-bar')[0] as HTMLElement;
      if (searchBar) {
        searchBar.classList.toggle('search-bar-show');
      }
    });
  }

  /**
   * Navbar links active state on scroll
   */
  const navbarlinks = select('#navbar .scrollto', true) as HTMLAnchorElement[];
  const navbarlinksActive = (): void => {
    const position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      const section = select(navbarlink.hash)[0] as HTMLElement;
      if (section && position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document.documentElement, navbarlinksActive);

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  const selectHeader = select('#header')[0] as HTMLElement;
  if (selectHeader) {
    const headerScrolled = (): void => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
      } else {
        selectHeader.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('load', headerScrolled);
    onscroll(document.documentElement, headerScrolled);
  }

  /**
   * Back to top button
   */
  const backtotop = select('.back-to-top')[0] as HTMLElement;
  if (backtotop) {
    const toggleBacktotop = (): void => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document.documentElement, toggleBacktotop);
  }

  // The rest of the code remains the same as it's already compatible with TypeScript.

  // })();
}



toggleSidebar();