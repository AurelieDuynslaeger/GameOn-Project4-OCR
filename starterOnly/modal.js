function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

//span X to close modal
const modalClose = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// event listener on span modalClose
modalClose.addEventListener("click", () => {
  //if click is detected : function = modalbg {display : none;}
  modalbg.style.display = "none";
})

//Création de la class réservation
class Booking {
  constructor(firstname, lastname, email, quantity, location, checkbox) {
    this.firstName = firstname;
    this.lastName = lastname;
    this.email = email;
    this.quantity = quantity;
    this.location = location;
    this.checkbox = checkbox;
  }
}

//initialisation du tableau des réservations de GameOn
const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
// persistance des données

//on récupère le boutonde submit
let bookingRegister = document.getElementsByClassName("btn-submit");

bookingRegister.addEventListener("click", (event) => {
  event.preventDefault();

  //enregristrer la résa au click avec toutes les valeurs saisies ou choisies

  const firstName = document.getElementById("first").value;
  const lastName = document.getElementById("last").value;
  const email = document.getElementById("email").value;
  const quantity = document.getElementById("quantity").value;
  const location = document.querySelector('input[name="location"]:checked');
  const checkbox1 = document.getElementById("checkbox1").checked;

  //verif à mettre ici 

  //avec ses infos on crée une instance de Booking qui sera pushé dans le tableau bookings
  let booking = new Booking(firstName, lastName, email, quantity, location, checkbox1);

  alert(`Merci ${booking.firstName} ! Votre réservation a été reçue.`)
  console.log(booking);

  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  console.table(bookings);
});