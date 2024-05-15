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
  constructor(firstname, lastname, email, birthdate, quantity, location, checkbox) {
    this.firstName = firstname;
    this.lastName = lastname;
    this.email = email;
    this.birthdate = birthdate;
    this.quantity = quantity;
    this.location = location;
    this.checkbox = checkbox;
  }
}

//initialisation du tableau des réservations de GameOn
const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
console.log(`Tableaux des réservations :${bookings}`);
// persistance des données

//on cible le form pour le submit ensuite

// let bookingRegister = document.getElementsByClassName("btn-submit");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  //enregristrer la résa au click avec toutes les valeurs saisies ou choisies
  const firstName = document.getElementById("first").value;
  console.log(`Prénom :${firstName}`);
  const lastName = document.getElementById("last").value;
  console.log(`Nom :${lastName}`);
  const email = document.getElementById("email").value;
  console.log(`Email :${email}`);
  const birthdate = document.getElementById("birthdate").value;
  console.log(`Date de naissance :${birthdate}`);
  const quantity = document.getElementById("quantity").value;
  console.log(`Nb de tournois :${quantity}`);
  const location = document.querySelector('input[name="location"]:checked').value;
  console.log(`Ville choisie :${location}`);
  const checkbox1 = document.getElementById("checkbox1").checked;
  console.log(`CGV :${checkbox1}`);

  //verif à mettre ici 
  try {
    if (firstName.length < 2) {
      alert("Le prénom doit contenir au moins 2 caractères.");
      return false;
    }

    if (lastName.lenght < 2) {
      alert("Le nom doit contenir au moins 2 caractères.");
      return false;
    }
    //regex 
    // [a-z0-9._-] (peut contenir lettres a à z, chiffre 0 à 9, un tiret ou point ou underscore)
    // [a-z0-9._-]+@ (verifier l'arobase)
    //vérifier ce qui suit l'arobase (fournisseur) [a-z0-9._-]+@[a-z0-9._-]+
    //vérifier le point [a-z0-9._-]+@[a-z0-9._-]+\.
    //vérifier l'extension [a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //utilisation de la méthode test ppur valider la chaine de caractères
    if (!emailPattern.test(email)) {
      alert("Veuillez saisir une adresse e-mail valide.");
      return false;
    }
    if (isNaN(quantity) || quantity < 0 || quantity > 99) {
      alert("Veuillez saisir un nombre valide pour le nombre de concours.");
      return false;
    }
    if (!location) {
      alert("Veuillez sélectionner un lieu de tournoi.");
      return false;
    }

    if (!checkbox1) {
      alert("Veuillez accepter les conditions générales.");
      return false;
    }
  } catch (error) {
    console.log("Une erreur est survenue : " + error.message);
  }


  //avec ses infos on crée une instance de Booking qui sera pushé dans le tableau bookings
  let booking = new Booking(firstName, lastName, email, birthdate, quantity, location, checkbox1);


  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  console.table(bookings);

  alert(`Merci ${booking.firstName} ! Votre réservation a été reçue.`)
  console.log(booking);
});