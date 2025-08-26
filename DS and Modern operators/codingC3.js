const gameEvents = new Map([
  [17, "⚽ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽ GOAL"],
  [80, "⚽ GOAL"],
  [92, "🔶 Yellow card"],
]);

const events = [...new Set(gameEvents.values())];
console.log(events);

gameEvents.delete(64);
console.log(gameEvents);

const time = [...gameEvents.keys()].pop()
console.log(`An event happened, on average, every ${time / gameEvents.size} minutes`);

for (const x of gameEvents) {
  x[0] < 45
    ? console.log(`[First Half]${x[0]}: ${x[1]}`)
    : console.log(`[Second Half]${x[0]}: ${x[1]}`);
}
