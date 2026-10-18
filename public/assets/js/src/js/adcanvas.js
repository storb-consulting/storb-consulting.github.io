/*!
 * // path: src/js/adcanvas.js
 * AdCanvas
 * Lightweight, framework‑agnostic ad rendering engine.
 * https://chstorb.github.io
 * https://github.com/chstorb/adcanvas
 *
 * Author: Christian Storb
 * License: MIT
 * Version: 1.1.0
 */

// -------- GLOBAL CONFIGURATION (can be overridden before script load) --------
// Allow users to set custom configuration before the script loads:
// <script>
//   window.AdCanvasConfig = { feedUrl: "https://your-api.com/ads.json" };
// </script>
window.AdCanvasConfig = window.AdCanvasConfig || {};

// -------- CONFIGURATION --------
const CONFIG = {
    // Core configuration
    feedUrl: window.AdCanvasConfig.feedUrl || "https://chstorb.github.io/data.json",
    enableDebug: window.AdCanvasConfig.enableDebug === true,

    // DataSource logic (URL, transform, filter, sort, fallback)
    dataSource: window.AdCanvasConfig.dataSource || {},

    // Template overrides per layout
    templates: window.AdCanvasConfig.templates || {},

    // Custom fallback (legacy shortform)
    fallbackAds: Array.isArray(window.AdCanvasConfig.fallbackAds)
        ? window.AdCanvasConfig.fallbackAds
        : null,

    // Carousel item width = minWidth (200px) + margin-right (12px)
    // MUST match CSS: .adcanvas-carousel-item { min-width: 200px; margin-right: 12px; }
    CAROUSEL_ITEM_WIDTH: 212,
    CAROUSEL_ITEM_MIN_WIDTH: 200,
    CAROUSEL_ITEM_MARGIN: 12,
};

// -------- VALIDATION & SANITIZATION --------

/**
 * Validates a single ad object structure.
 * @param {Object} ad - The ad object to validate
 * @returns {boolean} true if valid, false otherwise
 */
function validateAd(ad) {
    return !!(
        ad &&
        typeof ad === 'object' &&
        ad.awDeepLink &&
        typeof ad.awDeepLink === 'string' &&
        ad.merchantImageUrl &&
        typeof ad.merchantImageUrl === 'string' &&
        ad.productName &&
        typeof ad.productName === 'string' &&
        ad.displayPriceFormatted &&
        typeof ad.displayPriceFormatted === 'string'
    );
}

/**
 * Sanitizes HTML by escaping dangerous characters.
 * @param {string} text - Text to sanitize
 * @returns {string} Safe HTML-escaped text
 */
function sanitize(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Loads ad feed from remote JSON endpoint with fallback.
 * 
 * Attempts to fetch ads from the configured feed URL. On failure
 * (network error, CORS, invalid JSON), returns embedded fallback data.
 * 
 * @async
 * @returns {Promise<Array<Object>>} Array of ad objects with properties:
 *   - awDeepLink {string} Affiliate link URL
 *   - productName {string} Display name
 *   - merchantImageUrl {string} Image URL
 *   - displayPriceFormatted {string} Formatted price (e.g., "199,00 €")
 *   - merchantName {string} Merchant/brand name
 *   - merchantId {string} Internal ID
 * 
 * @example
 * const ads = await loadAds();
 * // Returns fallback data if remote fetch fails
 */
async function loadAds() {
    const url = CONFIG.dataSource.url || CONFIG.feedUrl;

    try {
        if (CONFIG.enableDebug) {
            console.debug("AdCanvas: Fetching from " + url);
        }
        const response = await fetch(url, { cache: "no-store" });

        if (!response.ok) {
            throw new Error("HTTP " + response.status + ": " + response.statusText);
        }

        let ads = await response.json();

        // Transform
        if (typeof CONFIG.dataSource.transform === "function") {
            ads = CONFIG.dataSource.transform(ads);
        }

        // Filter
        if (typeof CONFIG.dataSource.filter === "function") {
            ads = ads.filter(CONFIG.dataSource.filter);
        }

        // Sort
        if (typeof CONFIG.dataSource.sort === "function") {
            ads = ads.sort(CONFIG.dataSource.sort);
        }

        if (CONFIG.enableDebug) {
            console.log("AdCanvas: Feed loaded successfully, " + ads.length + " items");
        }
        return ads;

    } catch (error) {
        console.warn(
            "AdCanvas: Failed to load feed from " + url + "\n" +
            "Error: " + error.message + "\n" +
            "Using fallback data. Check network tab and CORS settings.",
            error
        );
        return getFallbackAds();
    }
}

/**
 * Returns fallback ad data for offline/error scenarios.
 * @returns {Array<Object>} Fallback ads array
 */
function getFallbackAds() {
    // 1. DataSource-Fallback?
    if (Array.isArray(CONFIG.dataSource.fallback) && CONFIG.dataSource.fallback.length > 0) {
        if (CONFIG.enableDebug) {
            console.debug("AdCanvas: Using dataSource.fallback (" + CONFIG.dataSource.fallback.length + " items)");
        }
        return CONFIG.dataSource.fallback;
    }

    // 2. Legacy custom fallback provided?
    if (Array.isArray(CONFIG.fallbackAds) && CONFIG.fallbackAds.length > 0) {
        if (CONFIG.enableDebug) {
            console.debug(
                "AdCanvas: Using custom fallbackAds (" +
                CONFIG.fallbackAds.length +
                " items)"
            );
        }
        return CONFIG.fallbackAds;
    }

    // 3. Otherwise: use built-in fallback
    if (CONFIG.enableDebug) {
        console.debug("AdCanvas: Using built-in fallbackAds");
    }

    return [
        {
            awDeepLink:
                'https://www.awin1.com/pclick.php?p=37797518055\u0026a=1933231\u0026m=23469',
            productName: 'Barcarola Club Apartments',
            awProductId: '37797518055',
            merchantProductId: '3048',
            merchantImageUrl:
                'https://eurowingsholidays.wavecdn.net/icmphotels/hlx/960_638/1680596116_neubarcarola_06.jpg',
            description: '',
            merchantCategory: '',
            searchPrice: '1088',
            merchantName: 'Eurowings Holidays DE',
            merchantId: '23469',
            categoryName: '',
            categoryId: '',
            awImageUrl:
                'https://images2.productserve.com/?w=200\u0026h=200\u0026bg=white\u0026trim=5\u0026t=letterbox\u0026url=ssl%3Aeurowingsholidays.wavecdn.net%2Ficmphotels%2Fhlx%2F960_638%2F1680596116_neubarcarola_06.jpg\u0026feedId=93280\u0026k=324713b9746ee55cbc7bdbc07d9471ac0d45e968',
            currency: 'EUR',
            storePrice: '',
            deliveryCost: '',
            merchantDeepLink:
                'https://www.awin1.com/pclick.php?p=37797518055\u0026a=1933231\u0026m=23469',
            language: '',
            lastUpdated: '',
            displayPrice: 'EUR1088',
            displayPriceFormatted: '1.088,00 €',
            dataFeedId: '93280',
        },
        {
            awDeepLink:
                'https://www.awin1.com/pclick.php?p=37797518028\u0026a=1933231\u0026m=23469',
            productName: 'San Miguel\u0026Esmeralda',
            awProductId: '37797518028',
            merchantProductId: '2908',
            merchantImageUrl:
                'https://eurowingsholidays.wavecdn.net/icmphotels/hlx/960_638/1749110654_S Miguel Park  Foto Principal.jpg',
            description: '',
            merchantCategory: '',
            searchPrice: '592',
            merchantName: 'Eurowings Holidays DE',
            merchantId: '23469',
            categoryName: '',
            categoryId: '',
            awImageUrl:
                'https://images2.productserve.com/?w=200\u0026h=200\u0026bg=white\u0026trim=5\u0026t=letterbox\u0026url=ssl%3Aeurowingsholidays.wavecdn.net%2Ficmphotels%2Fhlx%2F960_638%2F1749110654_S\u002BMiguel\u002BPark\u002B\u002BFoto\u002BPrincipal.jpg\u0026feedId=93280\u0026k=97dfe8da0c8293ccb44697cb60575a66812479b7',
            currency: 'EUR',
            storePrice: '',
            deliveryCost: '',
            merchantDeepLink:
                'https://www.awin1.com/pclick.php?p=37797518028\u0026a=1933231\u0026m=23469',
            language: '',
            lastUpdated: '',
            displayPrice: 'EUR592',
            displayPriceFormatted: '592,00 €',
            dataFeedId: '93280',
        },
        {
            awDeepLink:
                'https://www.awin1.com/pclick.php?p=37797517885\u0026a=1933231\u0026m=23469',
            productName: 'Creta Star',
            awProductId: '37797517885',
            merchantProductId: '981',
            merchantImageUrl:
                'https://eurowingsholidays.wavecdn.net/icmphotels/hlx/960_638/1658910783_CRE_1000000280_2707_02.jpg',
            description: '',
            merchantCategory: '',
            searchPrice: '651',
            merchantName: 'Eurowings Holidays DE',
            merchantId: '23469',
            categoryName: '',
            categoryId: '',
            awImageUrl:
                'https://images2.productserve.com/?w=200\u0026h=200\u0026bg=white\u0026trim=5\u0026t=letterbox\u0026url=ssl%3Aeurowingsholidays.wavecdn.net%2Ficmphotels%2Fhlx%2F960_638%2F1658910783_CRE_1000000280_2707_02.jpg\u0026feedId=93280\u0026k=f5718c012465dfae4bc3cf9f1b360b528fa2783f',
            currency: 'EUR',
            storePrice: '',
            deliveryCost: '',
            merchantDeepLink:
                'https://www.awin1.com/pclick.php?p=37797517885\u0026a=1933231\u0026m=23469',
            language: '',
            lastUpdated: '',
            displayPrice: 'EUR651',
            displayPriceFormatted: '651,00 €',
            dataFeedId: '93280',
        },
        {
            awDeepLink:
                'https://www.awin1.com/pclick.php?p=37797518235\u0026a=1933231\u0026m=23469',
            productName: 'Alexandre La Siesta',
            awProductId: '37797518235',
            merchantProductId: '3682',
            merchantImageUrl:
                'https://eurowingsholidays.wavecdn.net/icmphotels/hlx/960_638/1652365914_OTS_AMTSES0FGCXX_1.jpg',
            description: '',
            merchantCategory: '',
            searchPrice: '912',
            merchantName: 'Eurowings Holidays DE',
            merchantId: '23469',
            categoryName: '',
            categoryId: '',
            awImageUrl:
                'https://images2.productserve.com/?w=200\u0026h=200\u0026bg=white\u0026trim=5\u0026t=letterbox\u0026url=ssl%3Aeurowingsholidays.wavecdn.net%2Ficmphotels%2Fhlx%2F960_638%2F1652365914_OTS_AMTSES0FGCXX_1.jpg\u0026feedId=93280\u0026k=4ba1faf607557f9bbbd72163ef979e5904e1fc2e',
            currency: 'EUR',
            storePrice: '',
            deliveryCost: '',
            merchantDeepLink:
                'https://www.awin1.com/pclick.php?p=37797518235\u0026a=1933231\u0026m=23469',
            language: '',
            lastUpdated: '',
            displayPrice: 'EUR912',
            displayPriceFormatted: '912,00 €',
            dataFeedId: '93280',
        },
        {
            awDeepLink:
                'https://www.awin1.com/pclick.php?p=37797517984\u0026a=1933231\u0026m=23469',
            productName: 'Abora Catarina by Lopesan Hotels',
            awProductId: '37797517984',
            merchantProductId: '2722',
            merchantImageUrl:
                'https://eurowingsholidays.wavecdn.net/icmphotels/hlx/960_638/1573116359_LPA39B_neu2.jpg',
            description: '',
            merchantCategory: '',
            searchPrice: '988',
            merchantName: 'Eurowings Holidays DE',
            merchantId: '23469',
            categoryName: '',
            categoryId: '',
            awImageUrl:
                'https://images2.productserve.com/?w=200\u0026h=200\u0026bg=white\u0026trim=5\u0026t=letterbox\u0026url=ssl%3Aeurowingsholidays.wavecdn.net%2Ficmphotels%2Fhlx%2F960_638%2F1573116359_LPA39B_neu2.jpg\u0026feedId=93280\u0026k=95fdcfe28f34936adc0ff7b7ea380d04da795aaa',
            currency: 'EUR',
            storePrice: '',
            deliveryCost: '',
            merchantDeepLink:
                'https://www.awin1.com/pclick.php?p=37797517984\u0026a=1933231\u0026m=23469',
            language: '',
            lastUpdated: '',
            displayPrice: 'EUR988',
            displayPriceFormatted: '988,00 €',
            dataFeedId: '93280',
        },
        {
            awDeepLink:
                'https://www.awin1.com/pclick.php?p=37797517963\u0026a=1933231\u0026m=23469',
            productName:
                'Sol Fuerteventura Jandia \u2013 All suites  - Package Product',
            awProductId: '37797517963',
            merchantProductId: '2616',
            merchantImageUrl:
                'https://eurowingsholidays.wavecdn.net/icmphotels/hlx/960_638/1362405216_OTS_AMTSES0002_2.jpg',
            description: '',
            merchantCategory: '',
            searchPrice: '715',
            merchantName: 'Eurowings Holidays DE',
            merchantId: '23469',
            categoryName: '',
            categoryId: '',
            awImageUrl:
                'https://images2.productserve.com/?w=200\u0026h=200\u0026bg=white\u0026trim=5\u0026t=letterbox\u0026url=ssl%3Aeurowingsholidays.wavecdn.net%2Ficmphotels%2Fhlx%2F960_638%2F1362405216_OTS_AMTSES0002_2.jpg\u0026feedId=93280\u0026k=2950e322ac7ad3cb6ac861085048a327cdd43f04',
            currency: 'EUR',
            storePrice: '',
            deliveryCost: '',
            merchantDeepLink:
                'https://www.awin1.com/pclick.php?p=37797517963\u0026a=1933231\u0026m=23469',
            language: '',
            lastUpdated: '',
            displayPrice: 'EUR715',
            displayPriceFormatted: '715,00 €',
            dataFeedId: '93280',
        },
        {
            awDeepLink:
                'https://www.awin1.com/pclick.php?p=37797518035\u0026a=1933231\u0026m=23469',
            productName: 'H10 Suites Lanzarote Gardens',
            awProductId: '37797518035',
            merchantProductId: '2999',
            merchantImageUrl:
                'https://eurowingsholidays.wavecdn.net/icmphotels/hlx/960_638/1379473433_OTS_AMTSES0073_19.jpg',
            description: '',
            merchantCategory: '',
            searchPrice: '961',
            merchantName: 'Eurowings Holidays DE',
            merchantId: '23469',
            categoryName: '',
            categoryId: '',
            awImageUrl:
                'https://images2.productserve.com/?w=200\u0026h=200\u0026bg=white\u0026trim=5\u0026t=letterbox\u0026url=ssl%3Aeurowingsholidays.wavecdn.net%2Ficmphotels%2Fhlx%2F960_638%2F1379473433_OTS_AMTSES0073_19.jpg\u0026feedId=93280\u0026k=21fd586f1c4da6114623ca46488b8be6e654897f',
            currency: 'EUR',
            storePrice: '',
            deliveryCost: '',
            merchantDeepLink:
                'https://www.awin1.com/pclick.php?p=37797518035\u0026a=1933231\u0026m=23469',
            language: '',
            lastUpdated: '',
            displayPrice: 'EUR961',
            displayPriceFormatted: '961,00 €',
            dataFeedId: '93280',
        },
        {
            awDeepLink:
                'https://www.awin1.com/pclick.php?p=37797518096\u0026a=1933231\u0026m=23469',
            productName: 'Wave Cala Barca A',
            awProductId: '37797518096',
            merchantProductId: '3188',
            merchantImageUrl:
                'https://eurowingsholidays.wavecdn.net/icmphotels/hlx/960_638/1666687396_PMI541B_NEU_01.jpg',
            description: '',
            merchantCategory: '',
            searchPrice: '843',
            merchantName: 'Eurowings Holidays DE',
            merchantId: '23469',
            categoryName: '',
            categoryId: '',
            awImageUrl:
                'https://images2.productserve.com/?w=200\u0026h=200\u0026bg=white\u0026trim=5\u0026t=letterbox\u0026url=ssl%3Aeurowingsholidays.wavecdn.net%2Ficmphotels%2Fhlx%2F960_638%2F1666687396_PMI541B_NEU_01.jpg\u0026feedId=93280\u0026k=a41188e88423fd63eb8850399dbab40f506b63b2',
            currency: 'EUR',
            storePrice: '',
            deliveryCost: '',
            merchantDeepLink:
                'https://www.awin1.com/pclick.php?p=37797518096\u0026a=1933231\u0026m=23469',
            language: '',
            lastUpdated: '',
            displayPrice: 'EUR843',
            displayPriceFormatted: '843,00 €',
            dataFeedId: '93280',
        },
        {
            awDeepLink:
                'https://www.awin1.com/pclick.php?p=37797517897\u0026a=1933231\u0026m=23469',
            productName: 'Maritimo Beach Hotel (Crete)',
            awProductId: '37797517897',
            merchantProductId: '1024',
            merchantImageUrl:
                'https://eurowingsholidays.wavecdn.net/icmphotels/hlx/960_638/1648047968_1024_Maritimo_Beach_1.jpg',
            description: '',
            merchantCategory: '',
            searchPrice: '501',
            merchantName: 'Eurowings Holidays DE',
            merchantId: '23469',
            categoryName: '',
            categoryId: '',
            awImageUrl:
                'https://images2.productserve.com/?w=200\u0026h=200\u0026bg=white\u0026trim=5\u0026t=letterbox\u0026url=ssl%3Aeurowingsholidays.wavecdn.net%2Ficmphotels%2Fhlx%2F960_638%2F1648047968_1024_Maritimo_Beach_1.jpg\u0026feedId=93280\u0026k=6e53b504ad21256e53ad1e1d7078a181d464e890',
            currency: 'EUR',
            storePrice: '',
            deliveryCost: '',
            merchantDeepLink:
                'https://www.awin1.com/pclick.php?p=37797517897\u0026a=1933231\u0026m=23469',
            language: '',
            lastUpdated: '',
            displayPrice: 'EUR501',
            displayPriceFormatted: '501,00 €',
            dataFeedId: '93280',
        },
        {
            awDeepLink:
                'https://www.awin1.com/pclick.php?p=37797517855\u0026a=1933231\u0026m=23469',
            productName: 'Erato Hotel (Crete) SHotels',
            awProductId: '37797517855',
            merchantProductId: '881',
            merchantImageUrl:
                'https://eurowingsholidays.wavecdn.net/icmphotels/hlx/960_638/1496335113_CRE_1000000320_2d376ae6fccf1c4eac01c8212f2a6737.jpg',
            description: '',
            merchantCategory: '',
            searchPrice: '447',
            merchantName: 'Eurowings Holidays DE',
            merchantId: '23469',
            categoryName: '',
            categoryId: '',
            awImageUrl:
                'https://images2.productserve.com/?w=200\u0026h=200\u0026bg=white\u0026trim=5\u0026t=letterbox\u0026url=ssl%3Aeurowingsholidays.wavecdn.net%2Ficmphotels%2Fhlx%2F960_638%2F1496335113_CRE_1000000320_2d376ae6fccf1c4eac01c8212f2a6737.jpg\u0026feedId=93280\u0026k=ff1a4a377031d94d1cde7fe01168d9d6e4ac5af8',
            currency: 'EUR',
            storePrice: '',
            deliveryCost: '',
            merchantDeepLink:
                'https://www.awin1.com/pclick.php?p=37797517855\u0026a=1933231\u0026m=23469',
            language: '',
            lastUpdated: '',
            displayPrice: 'EUR447',
            displayPriceFormatted: '447,00 €',
            dataFeedId: '93280',
        },
    ];
}

// ----------------------------------------------------
// 2. Theme-System
// ----------------------------------------------------
/**
 * Applies theme CSS class to ad slot element.
 * 
 * Reads the data-theme attribute and applies corresponding CSS class.
 * Defaults to 'light' if not specified.
 * 
 * @param {HTMLElement} slot - The ad slot DOM element
 * @returns {void}
 * 
 * @example
 * applyTheme(document.querySelector('.adcanvas-ad-slot'));
 * // Applies adcanvas-theme-light class
 */
function applyTheme(slot) {
    const theme = slot.dataset.theme || "light";
    slot.classList.add("adcanvas-theme-" + theme);
}

// ----------------------------------------------------
// 3. Layout-Renderer
// ----------------------------------------------------

/**
 * Default templates for rendering per layout
 */
const defaultTemplates = {
    list: ad => `
            <div class="adcanvas-ad-card">
                <a href="${sanitize(ad.awDeepLink)}" rel="sponsored" target="_blank">
                    <img src="${sanitize(ad.merchantImageUrl)}" alt="${sanitize(ad.productName)}" loading="lazy" decoding="async">
                    <div class="adcanvas-ad-title">${sanitize(ad.productName)}</div>
                    <div class="adcanvas-ad-price">${sanitize(ad.displayPriceFormatted)}</div>
                </a>
            </div>
        `,
    multiplex: ad => `
            <div class="adcanvas-multiplex-item">
                <a href="${sanitize(ad.awDeepLink)}" rel="sponsored" target="_blank">
                    <img src="${sanitize(ad.merchantImageUrl)}" alt="${sanitize(ad.productName)}" loading="lazy" decoding="async">
                    <div class="adcanvas-multiplex-title">${sanitize(ad.productName)}</div>
                    <div class="adcanvas-multiplex-price">${sanitize(ad.displayPriceFormatted)}</div>
                </a>
            </div>
        `,
    infeed: ad => `
            <div class="adcanvas-infeed-card">
                <a href="${sanitize(ad.awDeepLink)}" rel="sponsored" target="_blank" class="adcanvas-infeed-link">
                    <div class="adcanvas-infeed-image-wrapper">
                        <img src="${sanitize(ad.merchantImageUrl)}" alt="${sanitize(ad.productName)}" loading="lazy" decoding="async">
                    </div>
                    <div class="adcanvas-infeed-content">
                        <div class="adcanvas-infeed-title">${sanitize(ad.productName)}</div>
                        <div class="adcanvas-infeed-price">${sanitize(ad.displayPriceFormatted)}</div>
                    </div>
                </a>
            </div>
        `,
    sidebar: ad => `
            <div class="adcanvas-sidebar-card">
                <a href="${sanitize(ad.awDeepLink)}" rel="sponsored" target="_blank">
                    <div class="adcanvas-sidebar-image-wrapper">
                        <img src="${sanitize(ad.merchantImageUrl)}" alt="${sanitize(ad.productName)}" loading="lazy" decoding="async">
                    </div>
                    <div class="adcanvas-sidebar-title">${sanitize(ad.productName)}</div>
                    <div class="adcanvas-sidebar-price">${sanitize(ad.displayPriceFormatted)}</div>
                </a>
            </div>
        `,
    hero: ad => `
            <div class="adcanvas-hero-card">
                <a href="${sanitize(ad.awDeepLink)}" rel="sponsored" target="_blank" class="adcanvas-hero-link">
                    <div class="adcanvas-hero-image-wrapper">
                        <img src="${sanitize(ad.merchantImageUrl)}" alt="${sanitize(ad.productName)}" loading="lazy" decoding="async">
                    </div>
                    <div class="adcanvas-hero-content">
                        <div class="adcanvas-hero-title">${sanitize(ad.productName)}</div>
                        <div class="adcanvas-hero-price">${sanitize(ad.displayPriceFormatted)}</div>
                    </div>
                </a>
            </div>
        `,
    carousel: ad => `
            <div class="adcanvas-carousel-item" role="article">
                <a href="${sanitize(ad.awDeepLink)}" rel="sponsored" target="_blank" aria-label="${sanitize(ad.productName)} - ${sanitize(ad.displayPriceFormatted)}">
                    <img src="${sanitize(ad.merchantImageUrl)}" alt="${sanitize(ad.productName)}" loading="lazy" decoding="async">
                    <div class="adcanvas-carousel-title">${sanitize(ad.productName)}</div>
                    <div class="adcanvas-carousel-price">${sanitize(ad.displayPriceFormatted)}</div>
                </a>
            </div>
        `
};

const layouts = {
    // -------------------------
    // LIST
    // -------------------------
    /**
     * Renders ads in simple vertical list layout.
     * 
     * Each ad is displayed as a card with image, title, and price.
     * Responsive: stacks vertically on all screen sizes.
     * 
     * @param {HTMLElement} slot - The ad slot DOM element
     * @param {Array<Object>} ads - Array of validated ad objects
     * @returns {void} Modifies DOM element safely
     * 
     * @example
     * layouts.list(slot, adArray);
     * // Renders vertical card list
     */
    list(slot, ads) {
        const labelText = slot.dataset.label || "Werbung";
        const tpl = CONFIG.templates.list || defaultTemplates.list;
        slot.textContent = '';
        slot.insertAdjacentHTML('beforeend', `
                <div class="adcanvas-ad-label">${sanitize(labelText)}</div>
                ${ads.map(tpl).join("")}
            `);
    },

    // -------------------------
    // MULTIPLEX
    // -------------------------
    /**
     * Renders ads in CSS Grid layout.
     * 
     * Columns adjust to screen width. Creates a responsive grid
     * of ad cards with adaptive column count based on viewport.
     * 
     * @param {HTMLElement} slot - The ad slot DOM element
     * @param {Array<Object>} ads - Array of validated ad objects
     * @returns {void} Modifies DOM element safely
     * 
     * @example
     * layouts.multiplex(slot, adArray);
     * // Renders responsive grid layout
     */
    multiplex(slot, ads) {
        const labelText = slot.dataset.label || "Werbung";
        const tpl = CONFIG.templates.multiplex || defaultTemplates.multiplex;
        slot.textContent = '';
        slot.insertAdjacentHTML('beforeend', `
                <div class="adcanvas-ad-label">${sanitize(labelText)}</div>
                <div class="adcanvas-multiplex-grid">
                    ${ads.map(tpl).join("")}
                </div>
            `);
    },

    // -------------------------
    // IN-FEED
    // -------------------------
    /**
     * Renders ads as horizontal cards (image left, content right).
     * 
     * Perfect for inline content feeds. Each ad is a horizontal card
     * with image on the left and title/price on the right.
     * 
     * @param {HTMLElement} slot - The ad slot DOM element
     * @param {Array<Object>} ads - Array of validated ad objects
     * @returns {void} Modifies DOM element safely
     * 
     * @example
     * layouts.infeed(slot, adArray);
     * // Renders horizontal card layout
     */
    infeed(slot, ads) {
        const labelText = slot.dataset.label || "Werbung";
        const tpl = CONFIG.templates.infeed || defaultTemplates.infeed;
        slot.textContent = '';
        slot.insertAdjacentHTML('beforeend', `
                <div class="adcanvas-ad-label">${sanitize(labelText)}</div>
                ${ads.map(tpl).join("")}
            `);
    },

    // -------------------------
    // SIDEBAR
    // -------------------------
    /**
     * Renders ads in centered vertical cards, optimized for narrow sidebars.
     * 
     * Stacks cards vertically and centers them. Ideal for sidebar
     * widgets on blog pages or article pages.
     * 
     * @param {HTMLElement} slot - The ad slot DOM element
     * @param {Array<Object>} ads - Array of validated ad objects
     * @returns {void} Modifies DOM element safely
     * 
     * @example
     * layouts.sidebar(slot, adArray);
     * // Renders centered sidebar card layout
     */
    sidebar(slot, ads) {
        const labelText = slot.dataset.label || "Werbung";
        const tpl = CONFIG.templates.sidebar || defaultTemplates.sidebar;
        slot.textContent = '';
        slot.insertAdjacentHTML('beforeend', `
                <div class="adcanvas-ad-label">${sanitize(labelText)}</div>
                ${ads.map(tpl).join("")}
            `);
    },

    // -------------------------
    // HERO
    // -------------------------
    /**
     * Renders large featured ad with shadow and full-width image.
     * 
     * Creates prominent hero-style ad cards with large images,
     * deep shadows, and premium styling for above-the-fold placement.
     * 
     * @param {HTMLElement} slot - The ad slot DOM element
     * @param {Array<Object>} ads - Array of validated ad objects
     * @returns {void} Modifies DOM element safely
     * 
     * @example
     * layouts.hero(slot, adArray);
     * // Renders large featured ad layout
     */
    hero(slot, ads) {
        const labelText = slot.dataset.label || "Werbung";
        const tpl = CONFIG.templates.hero || defaultTemplates.hero;
        slot.textContent = '';
        slot.insertAdjacentHTML('beforeend', `
                <div class="adcanvas-ad-label">${sanitize(labelText)}</div>
                ${ads.map(tpl).join("")}
            `);
    },

    // -------------------------
    // CAROUSEL (Endlos + Autoplay)
    // -------------------------
    /**
     * Renders horizontal scrollable carousel with auto-play and touch gestures.
     * 
     * Infinite carousel with smooth scrolling, optional auto-play, and
     * touch/swipe support for mobile. Includes prev/next buttons.
     * 
     * @param {HTMLElement} slot - The ad slot DOM element
     * @param {Array<Object>} ads - Array of validated ad objects
     * @returns {void} Modifies DOM element safely and adds event listeners
     * 
     * @example
     * layouts.carousel(slot, adArray);
     * // Renders scrollable carousel with auto-play if data-autoplay="true"
     */
    carousel(slot, ads) {
        const doubled = ads.concat(ads);
        const labelText = slot.dataset.label || "Werbung";
        const tpl = CONFIG.templates.carousel || defaultTemplates.carousel;

        slot.textContent = '';
        slot.insertAdjacentHTML('beforeend', `
                <div class="adcanvas-ad-label">${sanitize(labelText)}</div>
                <div class="adcanvas-carousel" role="region" aria-label="Product carousel">
                    <button class="adcanvas-carousel-prev" aria-label="Previous product">&#10094;</button>
                    <div class="adcanvas-carousel-track" role="group">
                        ${doubled.map(tpl).join("")}
                    </div>
                    <button class="adcanvas-carousel-next" aria-label="Next product">&#10095;</button>
                </div>
            `);

        const track = slot.querySelector(".adcanvas-carousel-track");
        const prev = slot.querySelector(".adcanvas-carousel-prev");
        const next = slot.querySelector(".adcanvas-carousel-next");

        // Validate required DOM elements
        if (!track || !prev || !next) {
            console.error(
                "AdCanvas Carousel: Missing required DOM elements. " +
                "Check HTML structure: .adcanvas-carousel-track, .adcanvas-carousel-prev, .adcanvas-carousel-next"
            );
            return;
        }

        const itemWidth = (() => {
            const firstItem = track.querySelector('.adcanvas-carousel-item');
            if (firstItem) {
                const margin = parseInt(getComputedStyle(firstItem).marginRight, 10) || 0;
                return firstItem.offsetWidth + margin;
            }
            return CONFIG.CAROUSEL_ITEM_WIDTH; // fallback
        })();
        const totalItems = doubled.length;
        const half = totalItems / 2;

        let index = 0;

        function scrollToIndex(i, smooth = true) {
            track.scrollTo({
                left: i * itemWidth,
                behavior: smooth ? "smooth" : "auto"
            });
        }

        function scrollNext() {
            index++;
            scrollToIndex(index);

            if (index >= half) {
                setTimeout(function () {
                    index = 0;
                    scrollToIndex(index, false);
                }, 350);
            }

            // Reset autoplay timer when user clicks manually
            if (autoplay) {
                startAutoplay();
            }
        }

        function scrollPrev() {
            index--;
            if (index < 0) {
                index = half - 1;
                scrollToIndex(index, false);
            }
            scrollToIndex(index);

            // Reset autoplay timer when user clicks manually
            if (autoplay) {
                startAutoplay();
            }
        }

        next.addEventListener("click", scrollNext);
        prev.addEventListener("click", scrollPrev);

        // Touch-Swipe
        let startX = 0;
        track.addEventListener("touchstart", function (e) {
            startX = e.touches[0].clientX;
        }, { passive: true });

        track.addEventListener("touchend", function (e) {
            const endX = e.changedTouches[0].clientX;
            if (endX < startX - 50) scrollNext();
            if (endX > startX + 50) scrollPrev();
        }, { passive: true });

        // Autoplay
        const autoplay = slot.dataset.autoplay === "true";
        const interval = parseInt(slot.dataset.interval || "4000", 10);
        let autoplayTimer;

        function startAutoplay() {
            if (!autoplay) return;
            stopAutoplay();
            autoplayTimer = setInterval(scrollNext, interval);
        }

        function stopAutoplay() {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        if (autoplay) {
            startAutoplay();

            slot.addEventListener("mouseenter", stopAutoplay);
            slot.addEventListener("mouseleave", startAutoplay);

            track.addEventListener("touchstart", stopAutoplay, { passive: true });
            track.addEventListener("touchend", startAutoplay, { passive: true });
        }
    }
};

// ----------------------------------------------------
// 4. Initialization
// ----------------------------------------------------
/**
 * Initializes AdCanvas.
 * 
 * Waits for DOM ready, then:
 * 1. Loads ad feed data
 * 2. Finds all .adcanvas-ad-slot elements
 * 3. Applies themes
 * 4. Renders appropriate layout for each slot
 * 
 * Called automatically on DOMContentLoaded or immediately if DOM is ready.
 * 
 * @async
 * @returns {Promise<void>}
 * 
 * @example
 * // Automatic – no manual call needed
 * // Engine runs when <script> element loads
 */
async function init() {
    const ads = await loadAds();

    // Validate data structure
    if (!ads || !Array.isArray(ads)) {
        console.warn('AdCanvas: Invalid data structure');
        return;
    }

    // Filter invalid ads
    const validAds = ads.filter(ad => validateAd(ad));
    if (validAds.length === 0) {
        console.warn('AdCanvas: No valid ads found');
        return;
    }

    // Apply themes and render layouts
    const slots = document.querySelectorAll(".adcanvas-ad-slot");
    if (!slots.length) return;

    slots.forEach(function (slot) {
        applyTheme(slot);

        const layout = slot.dataset.layout || "list";
        const count = parseInt(slot.dataset.count || "3", 10);

        const shuffled = validAds.slice().sort(function () {
            return Math.random() - 0.5;
        });

        const selected = shuffled.slice(0, count);

        if (layouts[layout]) {
            layouts[layout](slot, selected);
        } else {
            console.warn("AdCanvas: Unknown layout:", layout);
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

// Export functionality for ESM use
export { init, loadAds, validateAd };
