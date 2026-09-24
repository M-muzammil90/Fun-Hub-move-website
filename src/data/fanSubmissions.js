import animeImg from '../assets/images/anime_cat_art_1790241330377.jpg';
import cyberImg from '../assets/images/fandom_cyber_warrior_1790241253788.jpg';
import heroImg from '../assets/images/hero_soul_conductor_1790241240007.jpg';
import cosplayImg from '../assets/images/cosplay_cat_art_1790241376494.jpg';

export const initialFanSubmissions = [
  {
    id: 'sub-1',
    userId: 'usr-2',
    creator: 'Irakli.T',
    title: 'Echoes of the Void: Digital Fan Illustration',
    description: 'A 40-hour digital painting depicting Koren during the celestial convergence rift.',
    content: 'Painted using procreate with custom oil brushes. Explored the spiritual luminescence contrasting against deep obsidian shadow planes.',
    category: 'Anime',
    categorySlug: 'anime',
    image: heroImg,
    status: 'approved',
    adminNote: 'Stunning craftsmanship, approved for front page showcase.',
    submissionDate: '2026-03-12'
  },
  {
    id: 'sub-2',
    userId: 'usr-3',
    creator: 'Anna.S',
    title: 'Cyber Berserker Foam Armor Build Log',
    description: 'Step-by-step breakdown of high-density EVA foam thermoforming with chrome automotive vinyl wrap.',
    content: 'Total weight under 4.2kg. Integrated neodymium magnetic clasps along the shoulder pauldrons and micro servo motors for visor retraction.',
    category: 'Cosplay',
    categorySlug: 'cosplay',
    image: cyberImg,
    status: 'approved',
    adminNote: 'Detailed tutorial documentation. Exemplary community guide.',
    submissionDate: '2026-03-10'
  },
  {
    id: 'sub-3',
    userId: 'usr-4',
    creator: 'Vika.J',
    title: 'Spider-Verse Dimensional Weaving Theory',
    description: 'An analysis examining the geometric string theory patterns hidden within the background graffiti.',
    content: 'Examining frame 14:22 in Across Realms, the visual motifs mimic Calabi-Yau manifolds, hinting at the true origin of the anomaly.',
    category: 'Comics',
    categorySlug: 'comics',
    image: animeImg,
    status: 'approved',
    adminNote: 'High engagement theory post.',
    submissionDate: '2026-03-08'
  },
  {
    id: 'sub-4',
    userId: 'usr-5',
    creator: 'Alesanda.B',
    title: 'Astral Valkyrie Custom LED Wing Rig',
    description: 'Mechanized 2-meter wingspan with programmable WS2812B addressable LED sequences.',
    content: 'Controlled via an ESP32 microcontroller synched to ambient audio beat frequencies.',
    category: 'Cosplay',
    categorySlug: 'cosplay',
    image: cosplayImg,
    status: 'pending',
    adminNote: 'Pending video check on electrical safety guidelines.',
    submissionDate: '2026-03-14'
  },
  {
    id: 'sub-5',
    userId: 'usr-6',
    creator: 'Dadd.H',
    title: 'Unreleased OST Acoustic Guitar Fingerstyle Cover',
    description: 'Arrangement of the Soul Conductor twilight lament for solo 12-string acoustic.',
    content: 'Tuned in DADGAD. Recorded in home studio with dual Neumann condenser microphones.',
    category: 'Gaming',
    categorySlug: 'gaming',
    image: heroImg,
    status: 'pending',
    adminNote: 'Audio review in progress.',
    submissionDate: '2026-03-15'
  }
];
