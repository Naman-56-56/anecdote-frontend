export default function AnnouncementBar() {
  return (
    <div
      id="shopify-section-sections--17655277420716__announcement-bar"
      className="shopify-section shopify-section-group-group-header announcement-bar-static"
    >
      <div data-announcement-bar="">
        <div
          id="announcement-bar--sections--17655277420716__announcement-bar"
          className="section-padding"
          data-section-type="announcement-bar"
          data-section-id="sections--17655277420716__announcement-bar"
          data-announcement-wrapper=""
          data-aos="fade"
          data-aos-anchor="#announcement-bar--sections--17655277420716__announcement-bar"
          data-aos-delay="150"
        >
          <div className="ie11-error-message">
            <p>
              This site has limited support for your browser. We recommend switching
              to Edge, Chrome, Safari, or Firefox.
            </p>
          </div>
          <style>{`/* Prevent CLS on page load */
:root { --announcement-height: calc(.75rem * var(--FONT-ADJUST-BODY) * 1.0 * 1.5 + calc(15px * 2)); }
#announcement-bar--sections--17655277420716__announcement-bar .announcement {
  --adjust-body: calc(var(--FONT-ADJUST-BODY) * 1.0);
  --adjust-heading: calc(var(--FONT-ADJUST-HEADING) * 1.0);
  --adjust-accent: calc(var(--FONT-ADJUST-SUBHEADING) * 1.0);
  --padding: 15px;
  --letter-spacing: 0.0em;
  --bg: #d82c26;
  --text: #ffffff;
  --border: #000000;
}
#announcement-bar--sections--17655277420716__announcement-bar .flickity-enabled .ticker--animated,
#announcement-bar--sections--17655277420716__announcement-bar .announcement__ticker {
  padding: 0 25px;
}
@media screen and (max-width: 767px) {
  #announcement-bar--sections--17655277420716__announcement-bar .announcement {
    --adjust-body: calc(var(--FONT-ADJUST-BODY) * 1.0);
    --adjust-heading: calc(var(--FONT-ADJUST-HEADING) * 1.0);
    --adjust-accent: calc(var(--FONT-ADJUST-SUBHEADING) * 1.0);
  }
}`}</style>
          <div className="announcement subheading-text" data-announcement="">
            <div className="announcement__slider" data-slider="" data-slider-speed="7000">
              <div
                className="announcement__block announcement__block--text announcement__slide"
                data-slide="announcement-0"
                data-slide-index="0"
                data-block-id="announcement-0"
                style={{
                  '--highlight-color': '#d43747',
                  '--highlight-text-color': '#000000',
                }}
              >
                <div data-ticker-frame="" className="announcement__message">
                  <div data-ticker-scale="" className="announcement__scale">
                    <div data-ticker-text="" className="announcement__text">
                      <span className="text-highlight__break">
                        FREE SHIPPING ON ALL DOMESTIC ORDERS OVER $150
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
