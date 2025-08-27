"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

let currentAccount, timer;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 1;

    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    updateUI(currentAccount);

    if (timer) clearInterval(timer);

    startLogoutTimer();
  }
});

const updateUI = function (acc) {
  calculateBalance(acc);
  calculateSummary(acc);
  displayMovements(acc.movements);
};

const displayMovements = function (mov) {
  containerMovements.innerHTML = "";

  mov.forEach(function (m, i) {
    const type = m > 0 ? "deposit" : "withdrawal";
    const mvmnt = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${m}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", mvmnt);
  });
};

const calculateBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acu, mov) {
    return acu + mov;
  }, 0);
  // acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calculateSummary = function (acc) {
  const depositSum = acc.movements.filter((mov) => mov > 0);
  const deposit = depositSum;
  let sumIn = 0;
  depositSum.map((i) => (sumIn += i));

  labelSumIn.textContent = `${sumIn}€`;

  const withdrawalSum = acc.movements.filter((mov) => mov < 0);
  let sumOut = 0;
  withdrawalSum.map((i) => (sumOut += i));

  labelSumOut.textContent = `${Math.abs(sumOut)}€`;

  const interestSum = deposit
    .map((amt) => (amt * acc.interestRate) / 100)
    .filter((int) => {
      return int > 1;
    })
    .reduce(function (acu, mov) {
      return acu + mov;
    }, 0);

  labelSumInterest.textContent = `${interestSum}€`;
};

const startLogoutTimer = function () {
  let time = 300;

  const counter = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    time--;
  };

  counter();
  timer = setInterval(counter, 1000);
};

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const recipient = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    recipient?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recipient.movements.push(amount);

    console.log(currentAccount.username, currentAccount.movements);
    console.log(recipient.username, recipient.movements);

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  const deleteUsername = inputCloseUsername.value;
  const deletePin = Number(inputClosePin.value);

  if (
    deleteUsername === currentAccount.username &&
    deletePin === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);

    accounts.splice(index, 1);
    console.log("after deletion", accounts);

    labelWelcome.textContent = "Log in to get started";
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  sorted = !sorted;

  const movs = sorted
    ? currentAccount.movements.slice().sort((a, b) => a - b)
    : currentAccount.movements;

  displayMovements(movs);
});
