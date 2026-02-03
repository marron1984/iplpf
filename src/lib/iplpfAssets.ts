/**
 * IPLPF Official Assets - Centralized Image URLs
 * All images are hotlinked from iplpf.org (no local storage)
 */

// Official Logo - Used across all pages (/ and /lplpf/)
export const OFFICIAL_LOGO_URL = 'https://iplpf.org/wp-content/uploads/2026/01/%E3%83%95%E3%83%83%E3%82%BF%E3%83%BC%E3%83%AD%E3%82%B4-768x222.png';

// Hero Image - Main visual for top pages
export const HERO_URL = 'https://iplpf.org/wp-content/uploads/2026/01/HP_TOP%E7%94%BB%E5%83%8F-3-c-scaled.png';

// Mission Image - "めざすもの" section
export const MISSION_URL = 'https://iplpf.org/wp-content/uploads/2026/01/%E3%82%81%E3%81%96%E3%81%99%E3%82%82%E3%81%AE%E5%90%8C%E3%82%B5%E3%82%A4%E3%82%BAOL2.png';

// SDGs Poster - Sustainability initiatives
export const SDGS_URL = 'https://iplpf.org/wp-content/uploads/2023/06/sdg_poster.png';

// Noto Disaster Support - Disaster relief activities
export const NOTO_URL = 'https://iplpf.org/wp-content/uploads/2024/02/noto_20240127_5.png';

// Partner - Nissan logo
export const PARTNER_NISSAN_URL = 'https://iplpf.org/wp-content/uploads/2023/06/nissan-2.png';

// Header Logo (smaller version for navigation) - same as official
export const HEADER_LOGO_URL = 'https://iplpf.org/wp-content/uploads/2026/01/%E5%B7%A6%E4%B8%8A%E3%83%AD%E3%82%B4%E3%83%9E%E3%83%BC%E3%82%AF.png';

// Export all as a single object for convenience
export const IPLPF_ASSETS = {
  logo: {
    official: OFFICIAL_LOGO_URL,
    header: HEADER_LOGO_URL,
  },
  images: {
    hero: HERO_URL,
    mission: MISSION_URL,
    sdgs: SDGS_URL,
    noto: NOTO_URL,
    partnerNissan: PARTNER_NISSAN_URL,
  },
} as const;
