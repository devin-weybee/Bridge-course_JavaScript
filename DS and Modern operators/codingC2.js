const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

for (const [i, x] of game.scored.entries()) {
  console.log(i, x);
}

let sum = 0;
for (const i of Object.keys(game.odds)) {
  sum += game.odds[i];
}

console.log("Average ", (sum / Object.keys(game.odds).length).toFixed(2));

for (const i of Object.keys(game.odds)) {
  const teamStr = i === "x" ? "draw" : `victory ${game[i]}`;

  console.log(`Odd of ${teamStr} : ${game.odds[i]} `);
}

const scorers = {};

for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
  console.log(scorers);
}

console.log(scorers);
