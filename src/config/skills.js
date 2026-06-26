/* ─────────────────────────────────────────────────────────────────────────────
   SKILL CONFIG — grouped by category.
   Single source of truth shared by the immersive /skills-universe page
   and the compact homepage Skills section, so the two never drift.
───────────────────────────────────────────────────────────────────────────── */

export const CATEGORIES = [
  {
    name: 'Core',
    skills: [
      'React',
      'React Native',
      'TypeScript',
      'JavaScript',
      'Next.js',
      'Node.js',
      'HTML5',
      'CSS3',
    ],
  },
  {
    name: 'State & Data',
    skills: [
      'React Query',
      'Redux Toolkit',
      'Zustand',
      'React Hook Form',
      'Custom Hooks',
      'GraphQL',
      'REST APIs',
      'PostgreSQL',
      'Firebase',
      'Express',
    ],
  },
  {
    name: 'Performance & Quality',
    skills: [
      'Web Vitals',
      'Code Splitting',
      'Lazy Loading',
      'Tree Shaking',
      'SSR',
      'SSG',
      'PWA',
      'Accessibility',
      'WCAG',
      'ARIA',
      'SEO',
      'Responsive Design',
    ],
  },
  {
    name: 'UI & Motion',
    skills: [
      'Tailwind',
      'Material UI',
      'Styled Components',
      'CSS Modules',
      'SCSS',
      'Framer Motion',
      'CSS Animations',
      'React Router',
    ],
  },
  {
    name: 'Build & Tooling',
    skills: [
      'Webpack',
      'Vite',
      'Babel',
      'Storybook',
      'Jest',
      'React Testing Library',
      'Enzyme',
      'Git',
      'GitHub',
      'Jenkins',
      'CI/CD',
      'Docker',
    ],
  },
  {
    name: 'Architecture & AI',
    skills: [
      'System Design',
      'Micro-frontends',
      'Monorepos',
      'Feature Flags',
      'Theming',
      'Technical Design Docs',
      'Agile/Scrum',
      'DSA',
      'Performance Optimisation',
      'OpenAI API',
      'LLM Integration',
      'Cursor AI',
      'Claude',
    ],
  },
];

export default CATEGORIES;
