class Vorrang {
  constructor(relations) {
    // Set mit allen Knoten (Aktivitäten)
    this.nodes = new Set();
    // Adjazenzliste als Map (Knoten -> Set von Nachfolgern)
    this.adjList = new Map();
    // Knoten mit ihrem In-Degree (Anzahl eingehender Kanten)
    this.inDegree = new Map();

    // Initialisierung der Datenstrukturen
    for (const [before, after] of relations) {
      this.nodes.add(before);
      this.nodes.add(after);

      if (!this.adjList.has(before)) {
        this.adjList.set(before, new Set());
      }
      this.adjList.get(before).add(after);

      if (!this.inDegree.has(before)) {
        this.inDegree.set(before, 0);
      }
      if (!this.inDegree.has(after)) {
        this.inDegree.set(after, 0);
      }
      this.inDegree.set(after, this.inDegree.get(after) + 1);
    }

    // Initialisiere die Menge der Knoten mit In-Degree 0
    this.zeroInDegree = new Set();
    for (const [node, degree] of this.inDegree.entries()) {
      if (degree === 0) {
        this.zeroInDegree.add(node);
      }
    }

    // Initialisiere Iteratorstatus
    this.iteratorState = {
      zeroInDegree: new Set(this.zeroInDegree),
      inDegree: new Map(this.inDegree)
    };
  }

  next() {
    const { zeroInDegree, inDegree } = this.iteratorState;

    if (zeroInDegree.size === 0) {
      return { done: true };
    } else {
      // Wähle einen Knoten aus zeroInDegree
      const iterator = zeroInDegree.values();
      const node = iterator.next().value;
      zeroInDegree.delete(node);

      // Reduziere den In-Degree der Nachfolger
      const successors = this.adjList.get(node) || new Set();
      for (const successor of successors) {
        inDegree.set(successor, inDegree.get(successor) - 1);
        if (inDegree.get(successor) === 0) {
          zeroInDegree.add(successor);
        }
      }

      return { value: node, done: false };
    }
  }

  [Symbol.iterator]() {
    return this;
  }
}


const a = new Vorrang(["schlafen", "essen"], ["essen", "lernen"], ["lernen", "arbeiten"], ["arbeiten", "fernsehen"], ["fernsehen", "schlafen"]);
console.log(a.adjList);
a.next();
console.log(a.inDegree);

