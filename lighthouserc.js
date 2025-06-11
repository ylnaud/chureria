module.exports = {
  ci: {
    collect: {
      startServerCommand: "npx serve _site",
      url: ["http://localhost:3000"],
      numberOfRuns: 1
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.7 }],
        "categories:accessibility": ["error", { minScore: 0.9 }]
      }
    },
    upload: {
      target: "temporary-public-storage"
    }
  }
}
