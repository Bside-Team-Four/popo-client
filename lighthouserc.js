module.exports = {
  ci: {
    collect: {
      startServerCommand: 'yarn start',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci_reports',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', {
          minScore: 0.7,
        }],
        'categories:accessibility': ['warn', {
          minScore: 0.7,
        }],
      },
    },
  },
};
