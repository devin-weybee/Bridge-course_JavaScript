document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

const input = document.querySelector("textarea");

document.querySelector("button").addEventListener("click", function () {
  const textInput = input.value;
  const data = textInput.split("\n");
  console.log(data);

  for (const [i, j] of data.entries()) {
    const [first, second] = j.toLowerCase().trim().split("_");

    const output = first + second.replace(second[0], second[0].toUpperCase())

    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});
