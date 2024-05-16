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

//on submit sur le form
function validate() {
  //message de validation de la réservation 
  const firstname = document.getElementById("first").value.trim();
  alert(`Merci ${firstname} ! Votre réservation a été reçue.`);
  return true;
}

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
// persistance des données
const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
//tableau des reservations dans la console 
console.table(bookings);
//JSON des réservations dans la console
console.log(JSON.stringify(bookings, null, 2));


//on cible le form pour le submit ensuite
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  //enregristrer la résa au click avec toutes les valeurs saisies ou choisies
  const firstName = document.getElementById("first").value.trim();
  console.log(`Prénom :${firstName}`);
  const lastName = document.getElementById("last").value.trim();
  console.log(`Nom :${lastName}`);
  const email = document.getElementById("email").value.trim();
  console.log(`Email :${email}`);
  //trim() : supprime les espaces aux deux extrémités de cette chaîne et renvoie une nouvelle chaîne, sans modifier la chaîne d'origine.
  const birthdate = document.getElementById("birthdate").value.trim();
  console.log(`Date de naissance :${birthdate}`);
  const quantity = document.getElementById("quantity").value;
  console.log(`Nb de tournois :${quantity}`);
  const radioLocation = document.querySelector('input[name="location"]:checked');
  console.log(`Ville choisie :${radioLocation}`);
  const checkbox1 = document.getElementById("checkbox1").checked;
  console.log(`CGV :${checkbox1}`);

  //Réinitialisation des attributs data-error et data-error-visible pour tous les champs
  formData.forEach(data => {
    data.setAttribute("data-error", "");
    data.setAttribute("data-error-visible", "false");
  });

  //initialisation du tableau d'erreurs
  const errors = [];

  //verifications

  if (firstName.length < 2) {
    errors.push({ fieldName: "first", message: "Veuillez entrer 2 caractères ou plus pour le prénom." })
  }

  //return false arrête l'éxécution du formulaire != submit

  if (lastName.length < 2) {
    errors.push({ fieldName: "last", message: "Veuillez entrer 2 caractères ou plus pour le nom." })
  }
  //regex 
  // [a-z0-9._-] (peut contenir lettres a à z, chiffre 0 à 9, un tiret ou point ou underscore)
  // [a-z0-9._-]+@ (verifier l'arobase)
  //vérifier ce qui suit l'arobase (fournisseur) [a-z0-9._-]+@[a-z0-9._-]+
  //vérifier le point [a-z0-9._-]+@[a-z0-9._-]+\.
  //vérifier l'extension [a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //utilisation de la méthode test pour valider la chaine de caractères
  if (!emailPattern.test(email)) {
    errors.push({ fieldName: "email", message: "Veuillez saisir une adresse e-mail valide." })
  }

  // Vérification si la date de naissance est vide
  if (birthdate === "") {
    errors.push({ fieldName: "birthdate", message: "Veuillez saisir votre date de naissance." })
  }

  //isNan = verif si ce qui a été saisie dans quantité est bien un nombre
  if (isNaN(quantity) || quantity < 0 || quantity > 99) {
    errors.push({ fieldName: "quantity", message: "Veuillez saisir un nombre valide pour le nombre de concours." })
  }
  //verif si l'un des radio a été choisi
  if (!radioLocation) {
    errors.push({ fieldName: "location", message: "Veuillez sélectionner un lieu de tournoi." })
  }

  //verif si la checkbox des CGV a bien été cochée
  if (!checkbox1) {
    errors.push({ fieldName: "checkbox1", message: "Veuillez accepter les conditions générales." })
  }

  if (errors.length === 0) {
    const location = radioLocation.value;

    // validate() déclenché au submit du form (alert);
    //avec ses infos on crée une instance de Booking qui sera pushé dans le tableau bookings
    let booking = new Booking(firstName, lastName, email, birthdate, quantity, location, checkbox1);

    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    console.log(booking);
    validate();
    //méthode reset permet de vider les champs du formulaire
    form.reset();
  } else {
    //affichage des erreurs
    errors.forEach(error => {
      const fieldElement = document.getElementById(error.fieldName);
      if (fieldElement) {
        fieldElement.parentNode.setAttribute("data-error", error.message);
        fieldElement.parentNode.setAttribute("data-error-visible", "true");
      }
    });
  }
});

