const container = document.querySelector(".container");
const count = document.querySelector("#count");
const amount = document.querySelector("#amount");
const select = document.querySelector("#movie");
const discount = document.querySelector("#person");
const seats = document.querySelectorAll(".seat:not(.reserved");
const screen = document.querySelector(".screen");

getFromLocalStorage();
calculateTotal();
person();

container.addEventListener("click", (e) => {
  // console.log(e.target);
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    //   console.log(e.target);
    e.target.classList.toggle("selected");
    calculateTotal();
  }
});

select.addEventListener("change", (e) => {
  person()
   calculateTotal();
});

function person(){
  if (select.selectedIndex == 1) {
    screen.style.backgroundImage = "url(./img/arog.jpg)";
    screen.style.backgroundSize = "cover";
    screen.style.backgroundPosition = "center center";
  } else if (select.selectedIndex == 2) {
    screen.style.backgroundImage = "url(./img/yahsibatı.jfif)";
    screen.style.backgroundSize = "cover";
    screen.style.backgroundPosition = "center center";
  } else if (select.selectedIndex == 3) {
    screen.style.backgroundImage = "url(./img/gora.jfif)";
    screen.style.backgroundSize = "cover";
    screen.style.backgroundPosition = "center center";
  }
}

discount.addEventListener("change", (e) => {
  calculateTotal();
});

function calculateTotal() {
  const selectedSeats = container.querySelectorAll(".seat.selected");
  //   console.log(seats);
  //   console.log(selectedSeats);

  const selectedSeatsArr = [];

  selectedSeats.forEach((seat) => {
    selectedSeatsArr.push(seat);
  });
  //   console.log(selectedSeatsArr);
  //?spread ile kısayol
  // const selectedSeatsArr=[...selectedSeats];
  // console.log(selectedSeatsArr);

  const seatsArr = [];
  seats.forEach((seat) => {
    seatsArr.push(seat);
  });
  // console.log(seatsArr);
  //?spread ile kısayol
  //   const seatsArr=[...seats];
  //   console.log(seatsArr);

  let selectedSeatIndexs = selectedSeatsArr.map((seat) =>
    seatsArr.indexOf(seat)
  );
  // console.log(selectedSeatIndexs);

  let selectedSeatCount = selectedSeats.length;
  // console.log(selectedSeatCount);
  let price = select.value;
  // console.log(price);
  let discountt = discount.value;
  // console.log(discountt);
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * price * discountt;

  saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  //  console.log(selectedSeats);
  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  //  console.log(selectedMovieIndex);
  if (selectedMovieIndex != null) {
    select.selectedIndex = selectedMovieIndex;
  }

  const selectedPersonIndex = localStorage.getItem("selectedPersonIndex");
  //  console.log(selectedMovieIndex);
  if (selectedPersonIndex != null) {
    discount.selectedIndex = selectedPersonIndex;
  }
}


function saveToLocalStorage(indexs) {
  localStorage.setItem("selectedSeats", JSON.stringify(indexs));
  localStorage.setItem("selectedMovieIndex", select.selectedIndex);
  localStorage.setItem("selectedPersonIndex",discount.selectedIndex)
}

// container.addEventListener("mousemove", (e) => {
//   const x = e.clientX;
//   const y = e.clientY;
//   const rect = container.getBoundingClientRect();
//   const centerX = rect.left + rect.width / 2;
//   const centerY = rect.top + rect.height / 2;
//   xdeg = ((x - centerX) / (rect.width / 2)) * -6;
//   ydeg = ((centerY - y) / (rect.height / 2)) * -6;
//   const depth = 400;
//   container.style.transform = `perspective(${depth}px) rotateX(${ydeg}deg) rotateY(${xdeg}deg)`;
// });


