module.exports = {
  ci: {
    collect: {
      startServerCommand: "npx @11ty/eleventy --serve",
      url: ["http://localhost:8080"],
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
