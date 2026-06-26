window.PEOPLE_CONFIG = {
  "Lucas V": {
    categories: ["c1", "c2", "pc"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null
    }
  },
  "Pedro L": {
    categories: ["c1", "c2", "pc"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      blockedWeeks: [1],
    }
  },
  "Murilo": {
    categories: ["c1", "c2",],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: 2,
      blockedWeeks: [1],
    }
  },
  "Ellen": {
    categories: ["c2", "pc"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      blockedDays: ["zs07"]
    }
  },
  "Victor": {
    categories: ["c2", "pc"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      blockedDays: ["zs07"]
    }
  },
  "Jp Souza": {
    categories: ["c2", "pc"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      blockedWeeks: [1],
    }
  },
  "Ana Clara": {
    categories: ["c1", "c2"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: 2
    }
  },
  "Miguelito": {
    categories: ["c1", "c2"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null
    }
  },
  "Maria L": {
    categories: ["c1", "c2"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: 2,
      blockedWeeks: [1],
      blockedDays: ["Quinta"]
    }
  },
  "Lucas J": {
    categories: ["c1", "c2"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      blockedWeeks: [1],
    }
  },
  "Joao P": {
    categories: ["c2", "pc"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      blockedWeeks: [1],
    }
  },
  "Andrey": {
    categories: ["c2", "pc"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null
    }
  },
  "Sam B": {
    categories: ["c2", "pc"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
    }
  },
  "Sofia": {
    categories: ["c2", "pc"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      blockedWeeks: [1],
      blockedDays: ["Quinta"]
    }
  },
  "Paula": {
    active: false,
    categories: ["c2", "pc"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      blockedWeeks: [1],
    }
  },
  "Anna": {
    categories: ["c2", "pc"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      blockedDays: ["Quinta"],
      blockedWeeks: [1],
    }
  },
  "Vini": {
    categories: ["c2", "pc"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      blockedWeeks: [1],
    }
  },
  "Sam I": {
    categories: ["c1"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null
    }
  },
  "Romildo": {
    categories: ["c1"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null
    }
  },
  "Pedro G.": {
    categories: ["c1"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null
    }
  },
  "Arthur": {
    categories: ["c1"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null
    }
  },
  "Deborah": {
    categories: ["c1"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null
    }
  }
};

Object.values(window.PEOPLE_CONFIG).forEach((person) => {
  const categories = [...new Set(person.categories || [])].sort();
  const onlyC2AndPc =
    JSON.stringify(categories) === JSON.stringify(["c2", "pc"]);

  if (onlyC2AndPc) {
    person.categories = [...categories, "coord"];
  }
});
