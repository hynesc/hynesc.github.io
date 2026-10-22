// Count pageviews only on the published site. Do not load a third-party script in previews.
const browser = navigator as Navigator & { globalPrivacyControl?: boolean };
if (
  import.meta.env.PROD &&
  location.protocol === 'https:' &&
  location.hostname === 'chynes.org' &&
  window.top === window.self &&
  navigator.doNotTrack !== '1' &&
  browser.globalPrivacyControl !== true
) {
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const path = canonical ? new URL(canonical.href).pathname : location.pathname;
  // Keep referral sources useful without forwarding referring paths or query strings.
  let referrer = '';
  if (document.referrer) {
    const source = new URL(document.referrer);
    if (source.hostname !== location.hostname) referrer = source.origin;
  }
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.dataset.goatcounter = 'https://hynesc.goatcounter.com/count';
  script.dataset.goatcounterSettings = JSON.stringify({ path, referrer, no_events: true });
  document.head.append(script);
}
