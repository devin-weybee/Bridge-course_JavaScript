const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  
  getAnswer() {
    const ans = Number(prompt(`${this.question}\n${this.options.join("\n")}`));

    this.answers[ans]++;

    const type = prompt("Enter Type of input :")
    this.displayResult(type);
  },

  displayResult(type) {
    if (type === "array") {
      console.log(this.answers);
    }else if(type === "string"){
        console.log(`Poll results are ${this.answers.join(', ')}`)
    }
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.getAnswer.bind(poll));
