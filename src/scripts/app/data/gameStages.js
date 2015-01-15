export default [
  { stage: '01', next: '02', locked: false },
  { stage: '02', next: '03', locked: true  },
  { stage: '03', next: '04', locked: true  },
  { stage: '04', next: '05', locked: true  },
  { stage: '05', next: '06', locked: true  },
  { stage: '06', next: '07', locked: true  },
  { stage: '07', next: '08', locked: true  },
  { stage: '08', next: '09', locked: true  },
  { stage: '09', next: '10', locked: true  },
  { stage: '10', next: null, locked: true  }
];
