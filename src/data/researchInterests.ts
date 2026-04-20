/**
 * Icons: Lucide kebab names matching `@lucide/astro/icons/<name>`
 */
export type ResearchInterestIconId =
  | 'shield-check'
  | 'scan-search'
  | 'users'
  | 'brain'
  | 'scale'
  | 'sparkles';

export const researchInterests: { text: string; icon: ResearchInterestIconId }[] = [
  {
    icon: 'shield-check',
    text:
      'Usable deepfake detection — explainable, workflow-aligned interfaces that surface model behavior without replacing human judgment',
  },
  {
    icon: 'scan-search',
    text:
      'Digital media forensics — computer vision, metadata, audio manipulation, and speaker identity verification',
  },
  {
    icon: 'users',
    text:
      'Human–computer interaction — mixed-methods research with expert practitioners (interviews, diary studies, usability tests, surveys)',
  },
  {
    icon: 'brain',
    text: 'Explainable AI (XAI) — transparency in high-stakes AI tool design',
  },
  {
    icon: 'scale',
    text: 'AI ethics & governance — sociotechnical approaches to synthetic media harms',
  },
  {
    icon: 'sparkles',
    text: 'Simulation-based learning — scenario generation and training for verification competencies',
  },
];
