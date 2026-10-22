// Transcribed and visually verified against Tables I–II, report pp. 3–4.
// Means and standard deviations across 30 training trials. No raw trials inferred.
export const results = {
  replication: {
    label: 'Replication',
    pr: [
      { name: 'CONTENT', mean: 0.6391, sd: 0.0025 },
      { name: 'GRU baseline', mean: 0.6401, sd: 0.0017 },
    ],
    roc: [
      { name: 'CONTENT', mean: 0.797, sd: 0.0014 },
      { name: 'GRU baseline', mean: 0.7979, sd: 0.0013 },
    ],
    interpretation:
      'The added architecture did not show a statistically significant PR-AUC advantage in our initial configuration.',
  },
  tuned: {
    label: 'After tuning',
    pr: [
      { name: 'CONTENT', mean: 0.6464, sd: 0.0022 },
      { name: 'GRU baseline', mean: 0.6391, sd: 0.0025 },
    ],
    roc: [
      { name: 'CONTENT', mean: 0.8026, sd: 0.0014 },
      { name: 'GRU baseline', mean: 0.797, sd: 0.0014 },
    ],
    interpretation:
      'After tuning, CONTENT’s mean PR-AUC was higher. The report’s test gives p < 0.0001 for this comparison.',
  },
};
export const metrics = {
  pr: { label: 'PR-AUC', min: 0.63, max: 0.655 },
  roc: { label: 'ROC-AUC', min: 0.79, max: 0.81 },
};
