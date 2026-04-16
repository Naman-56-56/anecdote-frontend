export default function Header() {
  return (
    <div
      id="shopify-section-sections--17655277420716__header"
      className="shopify-section shopify-section-group-group-header shopify-section-header"
    >
      <div
        id="nav-drawer"
        className="drawer drawer--right drawer--nav cv-h"
        role="navigation"
        style={{ '--highlight': '#d02e2e' }}
        data-drawer=""
      >
        <div className="drawer__header">
          <div className="drawer__title">
            <a href="https://astatementof.com/" className="drawer__logo">
              <img
                src="https://web.archive.org/web/20250926204642im_/https://astatementof.com/cdn/shop/files/Wordmark-Black-Web.png?v=1667196214&width=500"
                srcSet="https://web.archive.org/web/20250405063600im_/https://astatementof.com/cdn/shop/files/Wordmark-Black-Web.png?v=1667196214&width=180 180w, https://web.archive.org/web/20241120182536im_/https://astatementof.com/cdn/shop/files/Wordmark-Black-Web.png?v=1667196214&width=270 270w, https://web.archive.org/web/20241120180901im_/https://astatementof.com/cdn/shop/files/Wordmark-Black-Web.png?v=1667196214&width=360 360w"
                width="180"
                height="33"
                sizes="(max-width: 360px) 50vw, 180px"
                className="drawer__logo-image"
                alt="a statement of"
              />
            </a>
          </div>
          <button
            type="button"
            className="drawer__close-button"
            aria-controls="nav-drawer"
            data-drawer-toggle=""
          >
            <span className="visually-hidden">Close</span>
            <svg
              aria-hidden="true"
              focusable="false"
              role="presentation"
              className="icon icon-close"
              viewBox="0 0 192 192"
            >
              <path
                d="M150 42 42 150M150 150 42 42"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <ul className="mobile-nav mobile-nav--weight-normal">
          <li className="mobile-menu__item mobile-menu__item--level-1">
            <a
              href="https://astatementof.com/collections/samurai-champloo"
              className="mobile-navlink mobile-navlink--level-1"
            >
              SHOP
            </a>
          </li>
          <li
            className="mobile-menu__item mobile-menu__item--level-1 mobile-menu__item--has-items"
            aria-haspopup="true"
          >
            <a
              href="https://astatementof.com/"
              className="mobile-navlink mobile-navlink--level-1"
              data-nav-link-mobile=""
            >
              BRAND
            </a>
            <button
              type="button"
              className="mobile-nav__trigger mobile-nav__trigger--level-1"
              aria-controls="MobileNav--brand-1"
              data-collapsible-trigger=""
            >
              <svg
                aria-hidden="true"
                focusable="false"
                role="presentation"
                className="icon icon-toggle-plus"
                viewBox="0 0 192 192"
              >
                <path
                  d="M30 96h132M96 30v132"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                aria-hidden="true"
                focusable="false"
                role="presentation"
                className="icon icon-toggle-minus"
                viewBox="0 0 192 192"
              >
                <path
                  d="M30 96h132"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="fallback-text">See More</span>
            </button>
            <div
              className="mobile-dropdown"
              id="MobileNav--brand-1"
              data-collapsible-container=""
            >
              <ul className="mobile-nav__sublist" data-collapsible-content="">
                <li className="mobile-menu__item mobile-menu__item--level-2">
                  <a
                    href="https://astatementof.com/pages/about-us"
                    className="mobile-navlink mobile-navlink--level-2"
                    data-nav-link-mobile=""
                  >
                    <span>OUR STATEMENT</span>
                  </a>
                </li>
                <li className="mobile-menu__item mobile-menu__item--level-2">
                  <a
                    href="https://discord.gg/URYR9mP6qE"
                    className="mobile-navlink mobile-navlink--level-2"
                    data-nav-link-mobile=""
                  >
                    <span>DISCORD</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <ul className="mobile-nav mobile-nav--bottom mobile-nav--weight-normal">
          <li className="mobile-menu__item">
            <a
              href="https://astatementof.com/search"
              className="mobile-navlink mobile-navlink--small"
              data-nav-search-open=""
            >
              Search
            </a>
          </li>
        </ul>
      </div>

      <style>{`:root {
  --header-height: 63px;
  --header-sticky-height: 60px;
  --header-background-height: 63px;
}
.no-js {
  --header-sticky-height: 0px;
}
:root {
  --full-height: calc(100vh - var(--header-sticky-height));
}
.main-content > .shopify-section.supports-transparent-header:first-child [data-prevent-transparent-header] {
  --full-height: var(--content-full);
}
@supports not (selector(:has(*))) {
  .is-first-section-transparent .main-content > .shopify-section.supports-transparent-header:first-child {
    --full-height: var(--content-full);
    --content-full: calc(100vh - var(--announcement-height));
  }
  .is-first-section-transparent .shopify-section-header { height: auto; }
  .is-first-section-transparent .site-header { position: absolute; }
  .is-first-section-transparent .main-content > .supports-transparent-header:first-child .banner-content,
  .is-first-section-transparent .main-content > .supports-transparent-header:first-child .banners--cols .banner,
  .is-first-section-transparent .main-content > .supports-transparent-header:first-child .banners--row .banners__content,
  .is-first-section-transparent .main-content > .supports-transparent-header:first-child .banner-image__text-wrapper,
  .is-first-section-transparent .main-content > .supports-transparent-header:first-child .slide__text__wrapper,
  .is-first-section-transparent .main-content > .supports-transparent-header:first-child .split-images__content,
  .is-first-section-transparent .main-content > .supports-transparent-header:first-child .video-text-wrapper {
    padding-top: calc(var(--header-height) + var(--gutter));
  }
  .is-first-section-transparent .main-content > .supports-transparent-header:first-child .countdown__text-container {
    padding-top: calc(var(--header-height) + var(--gutter) / 2);
  }
  .is-first-section-transparent .main-content > .supports-transparent-header:first-child .countdown__content,
  .is-first-section-transparent .main-content > .supports-transparent-header:first-child .countdown__aside {
    padding-top: 0;
  }
  @media only screen and (max-width: 767px) {
    .is-first-section-transparent .main-content > .supports-transparent-header:first-child .banners--row .banners__content {
      padding-top: calc(var(--header-height) + var(--gutter-mobile));
      padding-bottom: calc(var(--header-height) + var(--gutter-mobile));
    }
  }
}`}</style>

      <header
        id="SiteHeader"
        className="site-header site-header--fixed site-header--nav-left site-header--transparent site-header--has-logo"
        role="banner"
        data-site-header=""
        data-section-id="sections--17655277420716__header"
        data-height="63"
        data-section-type="header"
        data-transparent="true"
        data-text-color="white"
        data-position="fixed"
        data-nav-alignment="left"
        data-header-sticky=""
        data-header-height=""
      >
        <div className="site-header__background" data-header-background="" />

        <div
          className="wrapper"
          data-aos="fade"
          data-aos-anchor="#SiteHeader"
          data-aos-delay="150"
          data-wrapper=""
        >
          <style>{`.logo__image-link {
  width: 180px;
  height: 33px;
}
.has-scrolled .logo__image-link {
  width: 180px;
  height: 33px;
}`}</style>
          <h1 className="logo" data-logo="" data-takes-space="">
            <a
              href="https://astatementof.com/"
              aria-label="a statement of"
              className="logo__image-link logo__image-link--other"
            >
              <img
                src="https://web.archive.org/web/20250926204642im_/https://astatementof.com/cdn/shop/files/Wordmark-Black-Web.png?v=1667196214&width=500"
                srcSet="https://web.archive.org/web/20250405063600im_/https://astatementof.com/cdn/shop/files/Wordmark-Black-Web.png?v=1667196214&width=180 180w, https://web.archive.org/web/20241120182536im_/https://astatementof.com/cdn/shop/files/Wordmark-Black-Web.png?v=1667196214&width=270 270w, https://web.archive.org/web/20241120180901im_/https://astatementof.com/cdn/shop/files/Wordmark-Black-Web.png?v=1667196214&width=360 360w"
                width="180"
                height="33"
                loading="eager"
                sizes="(max-width: 360px) 50vw, 180px"
                className="logo__image"
                fetchPriority="high"
                alt="a statement of"
              />
              <span className="logo__image-push" style={{ paddingTop: '18.1%' }} />
            </a>
            <a
              href="https://astatementof.com/"
              aria-label="a statement of"
              className="logo__image-link logo__image-link--home"
            >
              <img
                src="https://web.archive.org/web/20250926204642im_/https://astatementof.com/cdn/shop/files/Wordmark_c5bbaed6-b21a-4fc9-bf7a-907291cdac12.png?v=1667185019&width=500"
                srcSet="https://web.archive.org/web/20250405063600im_/https://astatementof.com/cdn/shop/files/Wordmark_c5bbaed6-b21a-4fc9-bf7a-907291cdac12.png?v=1667185019&width=180 180w, https://web.archive.org/web/20241120181517im_/https://astatementof.com/cdn/shop/files/Wordmark_c5bbaed6-b21a-4fc9-bf7a-907291cdac12.png?v=1667185019&width=270 270w, https://web.archive.org/web/20241120180934im_/https://astatementof.com/cdn/shop/files/Wordmark_c5bbaed6-b21a-4fc9-bf7a-907291cdac12.png?v=1667185019&width=360 360w"
                width="180"
                height="33"
                loading="eager"
                sizes="(max-width: 360px) 50vw, 180px"
                className="logo__image"
                fetchPriority="high"
                alt="a statement of"
              />
              <span className="logo__image-push" style={{ paddingTop: '18.1%' }} />
            </a>
          </h1>

          <nav
            id="NavStandard"
            className="nav nav--default nav--weight-normal caps-letter-spacing-nav"
            data-nav=""
            style={{ '--highlight': '#d02e2e', '--dot-size': '2px' }}
          >
            <div className="menu__item menu__item--compress" data-nav-items-compress="">
              <search-popdown className="search-popdown" data-popdown-in-header="">
                <details>
                  <summary
                    className="search-popdown__toggle navlink navlink--icon"
                    aria-haspopup="dialog"
                    data-popdown-toggle=""
                    title="Open search bar"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      className="icon icon-search"
                      viewBox="0 0 192 192"
                    >
                      <path
                        d="M87 150c34.794 0 63-28.206 63-63s-28.206-63-63-63-63 28.206-63 63 28.206 63 63 63ZM131.55 131.55 168 168"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      className="icon icon-close"
                      viewBox="0 0 192 192"
                    >
                      <path
                        d="M150 42 42 150M150 150 42 42"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="visually-hidden">Open search bar</span>
                  </summary>
                  <div
                    className="search-popdown__body search-popdown__body--fixed"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Search"
                    data-popdown-body=""
                  >
                    <div className="search-popdown__main">
                      <predictive-search>
                        <form
                          className="search-form"
                          action="https://astatementof.com/search"
                          method="get"
                          role="search"
                          data-search-form=""
                        >
                          <input name="options[prefix]" type="hidden" value="last" />
                          <div className="search-form__inner" data-search-form-inner="">
                            <div className="search-form__input-holder">
                              <label
                                htmlFor="searchInput-desktop-compress"
                                className="search-form__label"
                              >
                                <span className="visually-hidden">
                                  Search for products on our site
                                </span>
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  role="presentation"
                                  className="icon icon-search"
                                  viewBox="0 0 192 192"
                                >
                                  <path
                                    d="M87 150c34.794 0 63-28.206 63-63s-28.206-63-63-63-63 28.206-63 63 28.206 63 63 63ZM131.55 131.55 168 168"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </label>

                              <input
                                type="search"
                                id="searchInput-desktop-compress"
                                className="search-form__input"
                                name="q"
                                value=""
                                aria-label="Search our store"
                                role="combobox"
                                aria-expanded="false"
                                aria-owns="searchResults-desktop-compress"
                                aria-controls="searchResults-desktop-compress"
                                aria-haspopup="listbox"
                                aria-autocomplete="list"
                                autoCorrect="off"
                                autoComplete="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                readOnly
                              />

                              <button
                                className="search-form__submit visually-hidden"
                                type="submit"
                                tabIndex="-1"
                                aria-label="Search"
                              >
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  role="presentation"
                                  className="icon icon-search"
                                  viewBox="0 0 192 192"
                                >
                                  <path
                                    d="M87 150c34.794 0 63-28.206 63-63s-28.206-63-63-63-63 28.206-63 63 28.206 63 63 63ZM131.55 131.55 168 168"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>

                              <button
                                type="button"
                                className="search-popdown__close"
                                title="Close"
                                data-popdown-close=""
                              >
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  role="presentation"
                                  className="icon icon-close"
                                  viewBox="0 0 192 192"
                                >
                                  <path
                                    d="M150 42 42 150M150 150 42 42"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div
                            id="searchResults-desktop-compress"
                            className="search-popdown__results"
                          >
                            <div
                              className="predictive-search"
                              data-predictive-search-results=""
                              data-scroll-lock-scrollable=""
                            >
                              <div className="predictive-search__loading-state">
                                <div className="predictive-search__loader loader loader--line">
                                  <div className="loader-indeterminate" />
                                </div>
                              </div>
                            </div>
                            <span
                              className="predictive-search-status visually-hidden"
                              role="status"
                              aria-hidden="true"
                              data-predictive-search-status=""
                            />
                          </div>
                        </form>
                      </predictive-search>
                    </div>
                  </div>
                </details>
              </search-popdown>

              <a
                href="https://astatementof.com/cart"
                className="navlink navlink--icon cart__toggle cart__toggle--animation caps"
                aria-controls="cart-drawer"
                aria-expanded="false"
              >
                <span className="visually-hidden">Open cart</span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  role="presentation"
                  className="icon icon-shopping-bag"
                  viewBox="0 0 192 192"
                >
                  <path
                    d="M156.6 162H35.4a6.075 6.075 0 0 1-6-5.325l-10.65-96A6 6 0 0 1 24.675 54h142.65a6.001 6.001 0 0 1 5.925 6.675l-10.65 96a6.076 6.076 0 0 1-6 5.325v0Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M66 78V54a30 30 0 1 1 60 0v24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle className="cart-indicator" cx="96" cy="108" r="15" />
                </svg>
              </a>

              <button
                type="button"
                className="navlink navlink--icon js-drawer-open caps"
                aria-controls="nav-drawer"
                data-drawer-toggle=""
              >
                <span className="visually-hidden">Open navigation menu</span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  role="presentation"
                  className="icon icon-hamburger"
                  viewBox="0 0 192 192"
                >
                  <path
                    d="M30 96h132M30 48h132M30 144h132"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="menu__items" data-takes-space="">
              <div className="menu__item child" data-nav-item="" data-hover-disclosure-toggle="">
                <a
                  href="https://astatementof.com/collections/samurai-champloo"
                  data-top-link=""
                  className="navlink navlink--toplevel navlink--dot caps"
                >
                  <span className="navtext">SHOP</span>
                </a>
              </div>
              <div
                className="menu__item parent"
                data-nav-item=""
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                data-hover-disclosure-toggle="dropdown-brand"
                aria-controls="dropdown-brand"
              >
                <a
                  href="https://astatementof.com/"
                  data-top-link=""
                  className="navlink navlink--toplevel navlink--dot caps"
                >
                  <span className="navtext">BRAND</span>
                </a>
                <div
                  className="header__dropdown"
                  data-hover-disclosure=""
                  role="combobox"
                  id="dropdown-brand"
                >
                  <div className="header__dropdown__wrapper">
                    <div className="header__dropdown__inner">
                      <a
                        href="https://astatementof.com/pages/about-us"
                        data-stagger=""
                        className="navlink navlink--child"
                      >
                        <span className="navtext">OUR STATEMENT</span>
                      </a>
                      <a
                        href="https://discord.gg/URYR9mP6qE"
                        data-stagger=""
                        className="navlink navlink--child"
                      >
                        <span className="navtext">DISCORD</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu__item menu__item--icons" data-nav-icons="" data-takes-space="">
              <search-popdown className="search-popdown menu__item menu__item--icon" data-popdown-in-header="">
                <details>
                  <summary
                    className="search-popdown__toggle navlink navlink--icon"
                    aria-haspopup="dialog"
                    data-popdown-toggle=""
                    title="Open search bar"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      className="icon icon-search"
                      viewBox="0 0 192 192"
                    >
                      <path
                        d="M87 150c34.794 0 63-28.206 63-63s-28.206-63-63-63-63 28.206-63 63 28.206 63 63 63ZM131.55 131.55 168 168"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      className="icon icon-close"
                      viewBox="0 0 192 192"
                    >
                      <path
                        d="M150 42 42 150M150 150 42 42"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="visually-hidden">Open search bar</span>
                  </summary>
                  <div
                    className="search-popdown__body search-popdown__body--fixed"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Search"
                    data-popdown-body=""
                  >
                    <div className="search-popdown__main">
                      <predictive-search>
                        <form
                          className="search-form"
                          action="https://astatementof.com/search"
                          method="get"
                          role="search"
                          data-search-form=""
                        >
                          <input name="options[prefix]" type="hidden" value="last" />
                          <div className="search-form__inner" data-search-form-inner="">
                            <div className="search-form__input-holder">
                              <label htmlFor="searchInput-desktop" className="search-form__label">
                                <span className="visually-hidden">
                                  Search for products on our site
                                </span>
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  role="presentation"
                                  className="icon icon-search"
                                  viewBox="0 0 192 192"
                                >
                                  <path
                                    d="M87 150c34.794 0 63-28.206 63-63s-28.206-63-63-63-63 28.206-63 63 28.206 63 63 63ZM131.55 131.55 168 168"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </label>

                              <input
                                type="search"
                                id="searchInput-desktop"
                                className="search-form__input"
                                name="q"
                                value=""
                                aria-label="Search our store"
                                role="combobox"
                                aria-expanded="false"
                                aria-owns="searchResults-desktop"
                                aria-controls="searchResults-desktop"
                                aria-haspopup="listbox"
                                aria-autocomplete="list"
                                autoCorrect="off"
                                autoComplete="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                readOnly
                              />

                              <button
                                className="search-form__submit visually-hidden"
                                type="submit"
                                tabIndex="-1"
                                aria-label="Search"
                              >
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  role="presentation"
                                  className="icon icon-search"
                                  viewBox="0 0 192 192"
                                >
                                  <path
                                    d="M87 150c34.794 0 63-28.206 63-63s-28.206-63-63-63-63 28.206-63 63 28.206 63 63 63ZM131.55 131.55 168 168"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>

                              <button
                                type="button"
                                className="search-popdown__close"
                                title="Close"
                                data-popdown-close=""
                              >
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  role="presentation"
                                  className="icon icon-close"
                                  viewBox="0 0 192 192"
                                >
                                  <path
                                    d="M150 42 42 150M150 150 42 42"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div id="searchResults-desktop" className="search-popdown__results">
                            <div
                              className="predictive-search"
                              data-predictive-search-results=""
                              data-scroll-lock-scrollable=""
                            >
                              <div className="predictive-search__loading-state">
                                <div className="predictive-search__loader loader loader--line">
                                  <div className="loader-indeterminate" />
                                </div>
                              </div>
                            </div>
                            <span
                              className="predictive-search-status visually-hidden"
                              role="status"
                              aria-hidden="true"
                              data-predictive-search-status=""
                            />
                          </div>
                        </form>
                      </predictive-search>
                    </div>
                  </div>
                </details>
              </search-popdown>
              <div className="menu__item menu__item--icon">
                <a
                  href="https://astatementof.com/cart"
                  className="navlink navlink--icon cart__toggle cart__toggle--animation caps"
                  aria-controls="cart-drawer"
                  aria-expanded="false"
                >
                  <span className="visually-hidden">Open cart</span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    role="presentation"
                    className="icon icon-shopping-bag"
                    viewBox="0 0 192 192"
                  >
                    <path
                      d="M156.6 162H35.4a6.075 6.075 0 0 1-6-5.325l-10.65-96A6 6 0 0 1 24.675 54h142.65a6.001 6.001 0 0 1 5.925 6.675l-10.65 96a6.076 6.076 0 0 1-6 5.325v0Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M66 78V54a30 30 0 1 1 60 0v24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle className="cart-indicator" cx="96" cy="108" r="15" />
                  </svg>
                </a>
              </div>
            </div>
          </nav>

          <div className="mobile-menu" data-mobile-menu="">
            <search-popdown className="search-popdown mobile-menu__button caps" data-popdown-in-header="">
              <details>
                <summary
                  className="search-popdown__toggle"
                  aria-haspopup="dialog"
                  data-popdown-toggle=""
                  title="Open search bar"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    role="presentation"
                    className="icon icon-search"
                    viewBox="0 0 192 192"
                  >
                    <path
                      d="M87 150c34.794 0 63-28.206 63-63s-28.206-63-63-63-63 28.206-63 63 28.206 63 63 63ZM131.55 131.55 168 168"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    role="presentation"
                    className="icon icon-close"
                    viewBox="0 0 192 192"
                  >
                    <path
                      d="M150 42 42 150M150 150 42 42"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="visually-hidden">Open search bar</span>
                </summary>
                <div
                  className="search-popdown__body search-popdown__body--fixed"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Search"
                  data-popdown-body=""
                >
                  <div className="search-popdown__main">
                    <predictive-search>
                      <form
                        className="search-form"
                        action="https://astatementof.com/search"
                        method="get"
                        role="search"
                        data-search-form=""
                      >
                        <input name="options[prefix]" type="hidden" value="last" />
                        <div className="search-form__inner" data-search-form-inner="">
                          <div className="search-form__input-holder">
                            <label htmlFor="searchInput-mobile" className="search-form__label">
                              <span className="visually-hidden">
                                Search for products on our site
                              </span>
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                role="presentation"
                                className="icon icon-search"
                                viewBox="0 0 192 192"
                              >
                                <path
                                  d="M87 150c34.794 0 63-28.206 63-63s-28.206-63-63-63-63 28.206-63 63 28.206 63 63 63ZM131.55 131.55 168 168"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </label>

                            <input
                              type="search"
                              id="searchInput-mobile"
                              className="search-form__input"
                              name="q"
                              value=""
                              aria-label="Search our store"
                              role="combobox"
                              aria-expanded="false"
                              aria-owns="searchResults-mobile"
                              aria-controls="searchResults-mobile"
                              aria-haspopup="listbox"
                              aria-autocomplete="list"
                              autoCorrect="off"
                              autoComplete="off"
                              autoCapitalize="off"
                              spellCheck="false"
                              readOnly
                            />

                            <button
                              className="search-form__submit visually-hidden"
                              type="submit"
                              tabIndex="-1"
                              aria-label="Search"
                            >
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                role="presentation"
                                className="icon icon-search"
                                viewBox="0 0 192 192"
                              >
                                <path
                                  d="M87 150c34.794 0 63-28.206 63-63s-28.206-63-63-63-63 28.206-63 63 28.206 63 63 63ZM131.55 131.55 168 168"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>

                            <button
                              type="button"
                              className="search-popdown__close"
                              title="Close"
                              data-popdown-close=""
                            >
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                role="presentation"
                                className="icon icon-close"
                                viewBox="0 0 192 192"
                              >
                                <path
                                  d="M150 42 42 150M150 150 42 42"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div id="searchResults-mobile" className="search-popdown__results">
                          <div
                            className="predictive-search"
                            data-predictive-search-results=""
                            data-scroll-lock-scrollable=""
                          >
                            <div className="predictive-search__loading-state">
                              <div className="predictive-search__loader loader loader--line">
                                <div className="loader-indeterminate" />
                              </div>
                            </div>
                          </div>
                          <span
                            className="predictive-search-status visually-hidden"
                            role="status"
                            aria-hidden="true"
                            data-predictive-search-status=""
                          />
                        </div>
                      </form>
                    </predictive-search>
                  </div>
                </div>
              </details>
            </search-popdown>

            <a
              href="https://astatementof.com/cart"
              className="mobile-menu__button cart__toggle cart__toggle--animation"
              aria-controls="cart-drawer"
              aria-expanded="false"
            >
              <span className="visually-hidden">Open cart</span>
              <svg
                aria-hidden="true"
                focusable="false"
                role="presentation"
                className="icon icon-shopping-bag"
                viewBox="0 0 192 192"
              >
                <path
                  d="M156.6 162H35.4a6.075 6.075 0 0 1-6-5.325l-10.65-96A6 6 0 0 1 24.675 54h142.65a6.001 6.001 0 0 1 5.925 6.675l-10.65 96a6.076 6.076 0 0 1-6 5.325v0Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M66 78V54a30 30 0 1 1 60 0v24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle className="cart-indicator" cx="96" cy="108" r="15" />
              </svg>
            </a>

            <button
              type="button"
              className="mobile-menu__button js-drawer-open"
              aria-controls="nav-drawer"
              data-drawer-toggle=""
            >
              <span className="visually-hidden">Open navigation menu</span>
              <svg
                aria-hidden="true"
                focusable="false"
                role="presentation"
                className="icon icon-hamburger"
                viewBox="0 0 192 192"
              >
                <path
                  d="M30 96h132M30 48h132M30 144h132"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="drawer__overlay" />
      </header>
    </div>
  )
}
