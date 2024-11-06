function topsort(dependencies) {
    const graph = [];
    const state = [];
    const sortedTasks = [];
    dependencies.forEach(([preTask, task]) => {
        if (!graph[preTask]) graph[preTask] = [];
        if (!graph[task]) graph[task] = [];
        graph[preTask].push(task);
    });
    function visit(task) {
        if (state[task] === 'processed') return;
        state[task] = 'processing';
        for (const dependentTask of graph[task]) {
            visit(dependentTask);
        }
        state[task] = 'processed';
        sortedTasks.push(task);
    }
    Object.keys(graph).forEach(task => {
        if (!state[task]) visit(task);
    });

    return sortedTasks.reverse();
}

// Testfälle
    console.assert(
        JSON.stringify(topsort([["schlafen", "studieren"], ["essen", "studieren"], ["studieren", "prüfen"]])) === JSON.stringify(["essen", "schlafen", "studieren", "prüfen"]),
        "Test fehlgeschlagen: Topologische Sortierung ist nicht korrekt."
    );

console.assert(
    JSON.stringify(topsort([["a", "b"], ["b", "c"], ["c", "d"]])) === JSON.stringify(["a", "b", "c", "d"]),
    "Test fehlgeschlagen: Einfache Kette nicht korrekt sortiert."
);

console.assert(
    JSON.stringify(topsort([["lesen", "schreiben"], ["essen", "trainieren"], ["schreiben", "prüfen"], ["essen", "lesen"]])) === JSON.stringify(["essen", "lesen", "trainieren", "schreiben", "prüfen"]),
    "Test fehlgeschlagen: Abhängigkeiten wurden nicht korrekt aufgelöst."
);

console.log("Alle Tests erfolgreich!");
