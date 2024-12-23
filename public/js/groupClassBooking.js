const headerRow = document.getElementById("header-row");
const tableBody = document.getElementById("table-body");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");


const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const times = [
  "07:00-08:00",
  "08:00-09:00",
  "09:00-10:00",
  "17:00-18:00",
  "18:00-19:00",
  "19:00-20:00",
  "20:00-21:00",
  "21:00-22:00",
];

function populateTable() {
  const today = new Date();
  const todayIndex = today.getDay();

  for (let i = 0; i < 7; i++) {
    const dayIndex = (todayIndex + i) % 7;
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayName = daysOfWeek[dayIndex];
    const formattedDate = `${date
      .getDate()
      .toString()
      .padStart(2, "0")}. ${date.toLocaleString("default", { month: "long" })}`;
    const th = document.createElement("th");
    th.innerHTML = `<div>${dayName}<br>${formattedDate}</div>`;
    headerRow.appendChild(th);
  }

  times.forEach((time) => {
    const row = document.createElement("tr");
    for (let i = 0; i < 7; i++) {
      const td = document.createElement("td");
      td.innerHTML = `
        <div>${time}</div>
        <p>Training: Yoga</p>
        <p>Trainer: Milos</p>
        <p>Room: 101</p>
        <p>Participants: 4/40</p>
        <div><button onclick="openModal()">Book</button></div>`;
      row.appendChild(td);
    }
    tableBody.appendChild(row);
  });
}

function shiftTable() {
  const firstHeaderCell = headerRow.firstChild;
  headerRow.appendChild(firstHeaderCell);

  const rows = tableBody.children;
  for (const row of rows) {
    const firstCell = row.firstChild;
    row.appendChild(firstCell);
  }
}

function openModal(time, training, trainer, room) {
  modalContent.innerHTML = `
    <div class="booking-modal-header">
      <h3>Book your spot for training via your HBG account</h3>
      <div class="close" onclick="closeModal()">
        <span class="eks">&#x2718;</span>
      </div>
    </div>
    <div class="main">
      <p>Input your information from HBG account to reserve<br>
      your spot for ${training} training with ${trainer} on ${room} at ${time}!</p>
      <form>
        <div class="contact-info">
          <div class="email">
            <label for="email">Email:</label><br>
            <input type="email" id="email" placeholder="Email" required />
          </div>
          <div class="pin-number">
            <label for="number">PIN code:</label><br>
            <input type="text" id="number" placeholder="PIN code">
          </div>
        </div>
        <p>If you don't know your PIN code, check your email inbox or contact our gym</p>
        <input type="submit" class="book-modal-btn" value="Book">
      </form>
    </div>`;

  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

window.onclick = function (event) {

  if (event.target === modal) {
    closeModal();
  }
};

window.onload = () => {
  populateTable();

  const now = new Date();
  const timeUntilMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  ) - now;

  setTimeout(() => {
    shiftTable();
    setInterval(shiftTable, 24 * 60 * 60 * 1000);
  }, timeUntilMidnight);
};
