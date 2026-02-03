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

// ============================================
// Children's Photos - For donation page visuals
// ============================================

// Philippines - Boy portrait (main hero visual)
export const CHILD_PHILIPPINES_BOY = 'https://iplpf.org/wp-content/uploads/2026/01/%E3%83%95%E3%82%A3%E3%83%AA%E3%83%94%E3%83%B3%E7%94%B7%E3%81%AE%E5%AD%90-768x576.png';

// Cambodia - Children photos
export const CHILD_CAMBODIA_1 = 'https://iplpf.org/wp-content/uploads/2026/01/%E3%82%AB%E3%83%B3%E3%83%9C%E3%82%B8%E3%82%A2%E3%81%AE%E5%AD%90%E3%81%A9%E3%82%82%E3%81%9F%E3%81%A1-768x576.png';
export const CHILD_CAMBODIA_2 = 'https://iplpf.org/wp-content/uploads/2026/01/%E3%82%AB%E3%83%B3%E3%83%9C%E3%82%B8%E3%82%A2%E3%81%AE%E5%AD%90%E3%81%A9%E3%82%82%E3%81%9F%E3%81%A1%EF%BC%92-768x576.png';
export const CHILD_CAMBODIA_3 = 'https://iplpf.org/wp-content/uploads/2026/01/%E3%82%AB%E3%83%B3%E3%83%9C%E3%82%B8%E3%82%A2%E3%81%AE%E5%AD%90%E3%81%A9%E3%82%82%E3%81%9F%E3%81%A13-768x576.png';

// Myanmar - Children photos
export const CHILD_MYANMAR_1 = 'https://iplpf.org/wp-content/uploads/2026/01/%E3%83%9F%E3%83%A3%E3%83%B3%E3%83%9E%E3%83%BC%E3%81%AE%E5%AD%90%E3%81%A9%E3%82%82%E3%81%9F%E3%81%A1-768x576.png';
export const CHILD_MYANMAR_2 = 'https://iplpf.org/wp-content/uploads/2026/01/%E3%83%9F%E3%83%A3%E3%83%B3%E3%83%9E%E3%83%BC%E3%81%AE%E5%AD%90%E3%81%A9%E3%82%82%E3%81%9F%E3%81%A12-768x576.png';

// Children photo collection for galleries
export const CHILDREN_PHOTOS = [
  { src: CHILD_PHILIPPINES_BOY, alt: 'フィリピンの男の子', country: 'フィリピン' },
  { src: CHILD_CAMBODIA_1, alt: 'カンボジアの子どもたち', country: 'カンボジア' },
  { src: CHILD_CAMBODIA_2, alt: 'カンボジアの子どもたち', country: 'カンボジア' },
  { src: CHILD_CAMBODIA_3, alt: 'カンボジアの子どもたち', country: 'カンボジア' },
  { src: CHILD_MYANMAR_1, alt: 'ミャンマーの子どもたち', country: 'ミャンマー' },
  { src: CHILD_MYANMAR_2, alt: 'ミャンマーの子どもたち', country: 'ミャンマー' },
] as const;

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
  children: {
    philippinesBoy: CHILD_PHILIPPINES_BOY,
    cambodia1: CHILD_CAMBODIA_1,
    cambodia2: CHILD_CAMBODIA_2,
    cambodia3: CHILD_CAMBODIA_3,
    myanmar1: CHILD_MYANMAR_1,
    myanmar2: CHILD_MYANMAR_2,
  },
} as const;
