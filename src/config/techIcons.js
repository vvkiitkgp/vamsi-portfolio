/* ─────────────────────────────────────────────────────────────────────────────
   TECH ICON REGISTRY
   Maps a tech name → { Icon, color }. Consumed by both the homepage Skills
   section and the project cards so brand logos stay consistent everywhere.

   Names without a brand logo (abstract concepts like "System Design", "DSA")
   intentionally have no entry — getTechIcon() falls back to a generic code
   glyph so an unmapped string never crashes the UI.
───────────────────────────────────────────────────────────────────────────── */

import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiHtml5,
  SiCss,
  SiReactquery,
  SiRedux,
  SiReacthookform,
  SiGraphql,
  SiPostgresql,
  SiFirebase,
  SiExpress,
  SiTailwindcss,
  SiMui,
  SiStyledcomponents,
  SiCssmodules,
  SiSass,
  SiFramer,
  SiReactrouter,
  SiWebpack,
  SiVite,
  SiBabel,
  SiStorybook,
  SiJest,
  SiTestinglibrary,
  SiGit,
  SiGithub,
  SiJenkins,
  SiDocker,
  SiPwa,
  SiOpenai,
  SiClaude,
  SiSupabase,
} from 'react-icons/si';
import { TbCode } from 'react-icons/tb';

/**
 * Registry keyed by the exact skill/tech label used across the app.
 * `color` is the official brand color, used to tint the logo.
 */
const TECH_ICONS = {
  // Core
  React: { Icon: SiReact, color: '#61DAFB' },
  'React Native': { Icon: SiReact, color: '#61DAFB' },
  TypeScript: { Icon: SiTypescript, color: '#3178C6' },
  JavaScript: { Icon: SiJavascript, color: '#F7DF1E' },
  'Next.js': { Icon: SiNextdotjs, color: '#111827' },
  'Node.js': { Icon: SiNodedotjs, color: '#5FA04E' },
  HTML5: { Icon: SiHtml5, color: '#E34F26' },
  CSS3: { Icon: SiCss, color: '#1572B6' },

  // State & Data
  'React Query': { Icon: SiReactquery, color: '#FF4154' },
  'Redux Toolkit': { Icon: SiRedux, color: '#764ABC' },
  'React Hook Form': { Icon: SiReacthookform, color: '#EC5990' },
  GraphQL: { Icon: SiGraphql, color: '#E10098' },
  PostgreSQL: { Icon: SiPostgresql, color: '#4169E1' },
  Firebase: { Icon: SiFirebase, color: '#DD2C00' },
  Express: { Icon: SiExpress, color: '#111827' },
  Supabase: { Icon: SiSupabase, color: '#3FCF8E' },

  // UI & Motion
  Tailwind: { Icon: SiTailwindcss, color: '#06B6D4' },
  'Material UI': { Icon: SiMui, color: '#007FFF' },
  'Styled Components': { Icon: SiStyledcomponents, color: '#DB7093' },
  'CSS Modules': { Icon: SiCssmodules, color: '#000000' },
  SCSS: { Icon: SiSass, color: '#CC6699' },
  'Framer Motion': { Icon: SiFramer, color: '#0055FF' },
  'React Router': { Icon: SiReactrouter, color: '#CA4245' },

  // Build & Tooling
  Webpack: { Icon: SiWebpack, color: '#8DD6F9' },
  Vite: { Icon: SiVite, color: '#646CFF' },
  Babel: { Icon: SiBabel, color: '#F9DC3E' },
  Storybook: { Icon: SiStorybook, color: '#FF4785' },
  Jest: { Icon: SiJest, color: '#C21325' },
  'React Testing Library': { Icon: SiTestinglibrary, color: '#E33332' },
  Git: { Icon: SiGit, color: '#F05032' },
  GitHub: { Icon: SiGithub, color: '#111827' },
  Jenkins: { Icon: SiJenkins, color: '#D24939' },
  Docker: { Icon: SiDocker, color: '#2496ED' },
  PWA: { Icon: SiPwa, color: '#5A0FC8' },

  // AI
  'OpenAI API': { Icon: SiOpenai, color: '#412991' },
  Claude: { Icon: SiClaude, color: '#D97757' },
  'Claude Code': { Icon: SiClaude, color: '#D97757' },
  'Anthropic API': { Icon: SiClaude, color: '#D97757' },
  'Cursor AI': { Icon: TbCode, color: '#111827' },
};

const FALLBACK = { Icon: TbCode, color: '#6B7280' };

/**
 * Returns { Icon, color } for a tech name, falling back to a generic glyph
 * for unmapped names so callers can render unconditionally.
 */
export function getTechIcon(name) {
  return TECH_ICONS[name] || FALLBACK;
}

export default TECH_ICONS;
