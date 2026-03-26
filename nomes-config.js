window.PEOPLE_CONFIG = {
  "Lucas V": {
    categories: ["c1", "c2"],
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
      BlockedWeeks: [1],
    }
  },
  "Murilo": {
    categories: ["c1", "c2",],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: 2,
      BlockedWeeks: [1],
    }
  },
  "Ellen": {
    categories: ["c1", "c2"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      BlockedDays: ["zs07"]
    }
  },
  "Victor": {
    categories: ["c1", "c2"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      BlockedDays: ["zs07"]
    }
  },
  "Jp Souza": {
    categories: ["c1", "c2", "pc"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      BlockedWeeks: [1],
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
      BlockedWeeks: [1],
      BlockedDays: ["Quinta"]
    }
  },
  "Lucas J": {
    categories: ["c1", "c2"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      BlockedWeeks: [1],
    }
  },
  "Edu": {
    categories: ["c1","c2"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null
    }
  },
  "Joao P": {
    categories: ["c2", "pc"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      BlockedWeeks: [1],
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
      BlockedWeeks: [1],
      BlockedDays: ["Quinta"]
    }
  },
  "Paula": {
    categories: ["c2", "pc"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      BlockedWeeks: [1],
    }
  },
  "Anna": {
    categories: ["c2", "pc"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      blockedDays: ["Quinta"],
      BlockedWeeks: [1],
    }
  },
  "Leo": {
    categories: ["c2", "pc"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      BlockedWeeks: [1],
    }
  },
  "Vini": {
    categories: ["c2", "pc"],
    rules: {
      noConsecutiveWeeks: true,
      maxTotal: null,
      BlockedWeeks: [1],
    }
  }
};

Object.values(window.PEOPLE_CONFIG).forEach((person) => {
  const categories = [...new Set(person.categories || [])].sort();
  const onlyC2AndPc =
    JSON.stringify(categories) === JSON.stringify(["c2", "pc"]);

  if (onlyC2AndPc) {
    person.categories = [...categories, "superv"];
  }
});
