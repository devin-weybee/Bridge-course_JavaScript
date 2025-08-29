let addNewListCard = document.querySelector(".add-new-list-card");
let cardContainer = document.querySelector(".card-container");
let add_new_list = document.querySelector(".add-new-list-btn");
let show_date = document.querySelector(".show-date");
const sortSelect = document.querySelector("select");
const search_text = document.querySelector(".search-bar");

document.querySelector(".card-list").innerHTML = "";
show_date.innerHTML = "";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const currentDateObject = new Date();
const currentDate = `${days[currentDateObject.getDay()]}, ${
  month[currentDateObject.getMonth()]
} ${currentDateObject.getDate()}`;
show_date.textContent = currentDate;

// card container - CRUD Operation
cardContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-task-btn")) {
    const cardBody = e.target.parentElement.parentElement;
    const taskInput = cardBody.querySelector(".task-input");
    const cardList = cardBody.querySelector(".card-list");
    let taskValue = taskInput.value.trim();
    if (taskValue === "") return;

    const task = `
      <p class="textToStrikethrough">
        <input type="checkbox" class="myCheck" /> ${taskValue}
        <i class="fa-solid fa-xmark delete-icon"></i>
      </p>`;

    cardList.insertAdjacentHTML("afterbegin", task);
    taskInput.value = "";
  }

  if (e.target.classList.contains("delete-icon")) {
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.parentElement.remove();
  }
});

//cards - strike through functionality
cardContainer.addEventListener("change", function (e) {
  if (e.target.classList.contains("myCheck")) {
    let parent = e.target.parentElement;
    parent.style.textDecoration = e.target.checked ? "line-through" : "none";
  }
});

// add new list card
addNewListCard.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();

    const titleValue = addNewListCard
      .querySelector(".title-input")
      .value.trim();
    const dateValue = addNewListCard.querySelector(".date-input").value.trim();
    const dateObject = new Date(dateValue);
    const inputDate = `${days[dateObject.getDay()]}, ${
      month[dateObject.getMonth()]
    } ${dateObject.getDate()}`;

    const dueDate =
      inputDate === currentDate
        ? "Today"
        : dateObject.getDate() === currentDateObject.getDate() + 1
        ? "Tomorrow"
        : dateValue;

    const taskValue = addNewListCard
      .querySelector(".add-task input")
      .value.trim();

    if (titleValue === "" || dateValue === "") return;

    const newCard = `
      <div class="card" data-date="${dateValue}">
        <div class="card-head">
          <h3>${titleValue}</h3>
          <i class="fa-solid fa-trash"></i>
        </div>
        <div class="card-body">
          <h6><i class="fa-regular fa-calendar"></i> ${dueDate}</h6>
          <div class="card-list">
            ${
              taskValue
                ? `<p class="textToStrikethrough">
                     <input type="checkbox" class="myCheck" /> ${taskValue}
                     <i class="fa-solid fa-xmark delete-icon"></i>
                   </p>`
                : ""
            }
          </div>
          <div class="add-task">
            <input type="text" class="task-input" placeholder="Add Your Task" />
            <button class="add-task-btn">+</button>
          </div>
        </div>
      </div>
    `;

    addNewListCard.insertAdjacentHTML("beforebegin", newCard);

    addNewListCard.querySelector(".title-input").value = "";
    addNewListCard.querySelector(".date-input").value = "";
    addNewListCard.querySelector(".add-task input").value = "";
  }
});

add_new_list.addEventListener("click", function () {
  document.querySelector(".title-input").focus();
});

//sort functionality
sortSelect.addEventListener("change", function () {
  const sortValue = sortSelect.value;

  const cards = Array.from(cardContainer.querySelectorAll(".card")).filter(
    (card) => card.querySelector("h3")
  );

  if (sortValue === "A-Z") {
    cards.sort((a, b) => {
      const titleA = a.querySelector("h3").textContent.toLowerCase();
      const titleB = b.querySelector("h3").textContent.toLowerCase();
      console.log(titleA.localeCompare(titleB));
      return titleA.localeCompare(titleB);
    });
  } else if (sortValue === "Z-A") {
    cards.sort((a, b) => {
      const titleA = a.querySelector("h3").textContent.toLowerCase();
      const titleB = b.querySelector("h3").textContent.toLowerCase();
      return titleB.localeCompare(titleA);
    });
  } else if (sortValue === "Oldest") {
    cards.sort((a, b) => {
      console.log(a.dataset)
      return new Date(a.dataset.date) - new Date(b.dataset.date);
    });
  } else if (sortValue === "Newest") {
    cards.sort((a, b) => {
      return new Date(b.dataset.date) - new Date(a.dataset.date);
    });
  }

  const addNewListCard = document.querySelector(".add-new-list-card");
  cardContainer.innerHTML = "";
  cards.forEach((card) => cardContainer.appendChild(card));
  cardContainer.appendChild(addNewListCard);
});

//search functionality
search_text.addEventListener("focus", function () {
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const searchValue = search_text.value.trim().toLowerCase();

      const cards = Array.from(cardContainer.querySelectorAll(".card")).filter(
        (card) => card.querySelector("h3")
      );

      cards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        if (title.includes(searchValue)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    }
  });
});

//show all functinality
function showAll() {
  search_text.value = "";

  const cards = Array.from(cardContainer.querySelectorAll(".card")).filter(
    (card) => card.querySelector("h3")
  );

  cards.forEach((card) => {
    card.style.display = "";
  });

  const sortSelect = document.querySelector("select");
  sortSelect.value = "Sort";
}
