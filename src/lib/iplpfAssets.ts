/**
 * IPLPF Official Assets - Centralized Image URLs
 * All images served locally from /public/projects/
 */

// Official Logo - Footer (wide version)
export const OFFICIAL_LOGO_URL = '/projects/logo-blue-large.png';

// Hero Image - Main visual for top pages (staff at collapsed bridge)
export const HERO_URL = '/projects/staff-bridge.png';

// Mission Image - "めざすもの" section (UN flag at camp)
export const MISSION_URL = '/projects/un-flag-camp.png';

// SDGs Poster - Reuse handover photo (international cooperation)
export const SDGS_URL = '/projects/handover.png';

// Noto/Disaster Support - Earthquake damage photo
export const NOTO_URL = '/projects/myanmar-quake-school.png';

// Partner - Nissan logo (removed - using logo instead)
export const PARTNER_NISSAN_URL = '/projects/logo-blue-large.png';

// Header Logo (smaller logo mark for navigation)
export const HEADER_LOGO_URL = '/projects/logo-blue-small.png';

// ============================================
// Children's Photos - For donation page visuals
// ============================================

// Children / life photos from field
export const CHILD_PHILIPPINES_BOY = '/projects/myanmar-girl-smile.png';
export const CHILD_CAMBODIA_1 = '/projects/myanmar-children-food.png';
export const CHILD_CAMBODIA_2 = '/projects/myanmar-girl-water.png';
export const CHILD_CAMBODIA_3 = '/projects/myanmar-family-well.png';
export const CHILD_MYANMAR_1 = '/projects/myanmar-girl-water.png';
export const CHILD_MYANMAR_2 = '/projects/myanmar-family-well.png';

// ============================================
// Project Photos - Field activities & disaster relief
// ============================================

// Myanmar - Children daily life
export const PROJECT_MYANMAR_GIRL_WATER = '/projects/myanmar-girl-water.png';
export const PROJECT_MYANMAR_GIRL_SMILE = '/projects/myanmar-girl-smile.png';
export const PROJECT_MYANMAR_CHILDREN_FOOD = '/projects/myanmar-children-food.png';
export const PROJECT_MYANMAR_FAMILY_WELL = '/projects/myanmar-family-well.png';

// Myanmar Earthquake 2025 - Disaster relief
export const PROJECT_MYANMAR_QUAKE_TEMPLE = '/projects/myanmar-quake-temple.png';
export const PROJECT_MYANMAR_QUAKE_PAGODA = '/projects/myanmar-quake-pagoda.png';
export const PROJECT_MYANMAR_QUAKE_SCHOOL = '/projects/myanmar-quake-school.png';
export const PROJECT_MYANMAR_QUAKE_BRIDGE = '/projects/myanmar-quake-bridge.png';

// Field Staff - On-ground activities
export const PROJECT_STAFF_SCHOOL = '/projects/staff-school.png';
export const PROJECT_STAFF_BRIDGE = '/projects/staff-bridge.png';
export const PROJECT_STAFF_TEMPLE = '/projects/staff-temple.png';
export const PROJECT_UN_FLAG_CAMP = '/projects/un-flag-camp.png';
export const PROJECT_HANDOVER = '/projects/handover.png';

// Children photo collection for galleries
export const CHILDREN_PHOTOS = [
  { src: CHILD_PHILIPPINES_BOY, alt: '支援地域の子どもたち', country: '支援地域' },
  { src: CHILD_CAMBODIA_1, alt: '子どもたちへの給食', country: '給食支援' },
  { src: CHILD_CAMBODIA_2, alt: '生活用水の確保', country: '水支援' },
  { src: CHILD_CAMBODIA_3, alt: '井戸建設', country: '井戸支援' },
  { src: CHILD_MYANMAR_1, alt: '生活用水の確保', country: '水支援' },
  { src: CHILD_MYANMAR_2, alt: '井戸建設', country: '井戸支援' },
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
