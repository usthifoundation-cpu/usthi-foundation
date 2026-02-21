(function () {
  const DEFAULT_BACKEND_URL = "https://usthi-foundation-backend.onrender.com";

  function parseEnv(envText) {
    const result = {};

    envText.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        return;
      }

      const idx = trimmed.indexOf("=");
      if (idx === -1) {
        return;
      }

      const key = trimmed.slice(0, idx).trim();
      const value = trimmed.slice(idx + 1).trim();
      result[key] = value;
    });

    return result;
  }

  function normalizeUrl(url) {
    return (url || "").replace(/\/$/, "");
  }

  async function loadFrontendEnv() {
    try {
      const currentScript = document.currentScript;
      const envUrl = new URL(".env", currentScript ? currentScript.src : window.location.href);
      const response = await fetch(envUrl.toString(), { cache: "no-store" });

      if (!response.ok) {
        return {};
      }

      const envText = await response.text();
      return parseEnv(envText);
    } catch (_error) {
      return {};
    }
  }

  const envPromise = loadFrontendEnv().then((env) => {
    const backend = normalizeUrl(env.BACKEND_URL || DEFAULT_BACKEND_URL);
    window.USTHI_ENV = env;
    window.USTHI_BACKEND_URL = backend;
    return backend;
  });

  window.getBackendUrl = function () {
    return window.USTHI_BACKEND_URL || DEFAULT_BACKEND_URL;
  };

  window.getBackendUrlAsync = function () {
    return envPromise;
  };
})();
