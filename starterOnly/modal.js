// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
//span X to close modal
const modalClose = document.querySelector(".close");
//on cible le form pour le submit
const form = document.querySelector("form");

// on capture le contenu initial de la modal
const initialModalContent = document.querySelector(".modal-body").innerHTML;


function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal
// écouteur d'evènement sur le bouton X de la modal
modalClose.addEventListener("click", () => {
  //si le click est détecté alors la modal passe en display none
  modalbg.style.display = "none";
  // réinitialiser le contenu de la modal au formulaire initial
  document.querySelector(".modal-body").innerHTML = initialModalContent;
  // réattacher les écouteurs d'événement pour le formulaire et les boutons
  form.addEventListener("submit", handleSubmit);
});


//on submit sur le form = quand le formulaire est soumis et que les vérifs passées sont bonnes, la pop up de validation apparaît.
// function validate() {
//   //message de validation de la réservation 
//   const firstname = document.getElementById("first").value.trim();
//   alert(`Merci ${firstname} ! Votre réservation a été reçue.`);
//   return true;
// }

// fonction pour changer le contenu de la modal par le message de validation
function validate() {
  //on cible le body de la modale
  const modalBody = document.querySelector(".modal-body");
  //on lui donne ce qu'on souhaite afficher dedans à la reservation
  //message + bouton fermer
  modalBody.innerHTML = `
    <div class="valid-register">
    <h2>Merci!<br>Votre inscription a bien été reçue.</h2>
    <button class="btn-close">Fermer</button>
    </div>
  `;

  //on écoute le click sur le bouton 'fermer', au click on met la modale en display none
  const btnClose = document.querySelector(".btn-close");
  btnClose.addEventListener("click", () => {
    modalbg.style.display = "none";
  });
}

//initialisation du tableau des réservations de GameOn
//persistance des données
const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
//tableau des reservations dans la console 
console.table(bookings);
//JSON des réservations dans la console
console.log(JSON.stringify(bookings, null, 2));

// on écoute l'event submit sur le formulaire et on fait les vérifs
form.addEventListener("submit", handleSubmit);

//on écoute l'event submit sur le formulaire et on fait les vérifs
function handleSubmit(event) {
  //on annule le comportement par défaut du navigateur qui est de rechargé la page
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
  //dans le css, le style pour les errreurs était présent
  //j'ai repris les attributs et à chaque déclenchement du formulaire, le data-error de chaque input est mis à vide, et le data-error-visible est mis à faux
  formData.forEach(data => {
    data.setAttribute("data-error", "");
    data.setAttribute("data-error-visible", "false");
  });

  //initialisation du tableau d'erreurs
  //stockage des erreurs pour les afficher sous les inputs concernés s'il y en a
  const errors = [];

  //verifications des saisies utilisateur
  if (firstName.length < 2) {
    //on vérifie si le prénom est au moins long de 2 caractères
    //si non, on pousse dans le tableau d'erreurs pour pouvoir l'afficher ensuite
    errors.push({ fieldName: "first", message: "Veuillez entrer 2 caractères ou plus pour le prénom." })
  }

  if (lastName.length < 2) {
    //on vérifie si le nom est au moins long de 2 caractères
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
    //on vérifie si le mail est conforme à l'expression régulière que l'on a défini au desssus
    errors.push({ fieldName: "email", message: "Veuillez saisir une adresse e-mail valide." })
  }

  // Vérification si la date de naissance est vide
  if (birthdate === "") {
    //on vérifie si le champ date n'est pas vide
    errors.push({ fieldName: "birthdate", message: "Veuillez saisir votre date de naissance." })
  }

  //isNan = verif si ce qui a été saisie dans quantité est bien un nombre
  if (isNaN(quantity) || quantity < 0 || quantity > 99) {
    //on vérifie si la saisie est un nombre, et qu'il est supérieur à 0 et inférieur à 99
    errors.push({ fieldName: "quantity", message: "Veuillez saisir un nombre valide pour le nombre de concours." })
  }
  //verif si l'un des radio a été choisi
  if (!radioLocation) {
    //on vérifie si un des radio pour la ville a été coché
    errors.push({ fieldName: "location", message: "Veuillez sélectionner un lieu de tournoi." })
  }

  //verif si la checkbox des CGV a bien été cochée
  if (!checkbox1) {
    //on vérifie si la checkbox des conditions générales a été cochée
    errors.push({ fieldName: "checkbox1", message: "Veuillez accepter les conditions générales." })
  }

  if (errors.length === 0) {
    //on vérifie ici si le nombre d'erreurs est strictement égale à 0 alors on fait le traitement

    //on attribue la valeur du radio à location
    const location = radioLocation.value;

    //avec ses infos on crée un objet booking qui sera pushé dans le tableau bookings
    const booking = {
      firstName,
      lastName,
      email,
      birthdate,
      quantity,
      location,
      checkbox: checkbox1
    }

    //on pousse la résa dans le tableau bookings du local storage initialisé plus haut
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    console.log(booking);
    //on déclenche la fonction validate() pour le pop up de confirmation
    validate();
    //méthode reset permet de vider les champs du formulaire
    form.reset();
  } else {
    // Affichage des erreurs
    errors.forEach(error => {
      if (error.fieldName === "location") {
        //si le fieldName est strictement égale à "location", on vient attribuer le message d'erreur au conteneur des radios
        //on cible les inputs radio dont le name est location  
        const radioInputs = document.querySelectorAll('input[name="location"]');
        if (radioInputs) {
          radioInputs.forEach(radio => {
            const radioContainer = radio.parentElement;
            if (radioContainer) {
              radioContainer.setAttribute("data-error", error.message);
              radioContainer.setAttribute("data-error-visible", "true");
            }
          });
        }
      } else {
        // sinon pour les autres champs (inputs text, number etc...), on vient remplir le champ data-error avec le message d'erreur spécifié et on passe le data-error-visible en true pour que l'erreur prenne le style qui lui est attribué dans le css
        const fieldElement = document.getElementById(error.fieldName);
        if (fieldElement) {
          fieldElement.parentNode.setAttribute("data-error", error.message);
          fieldElement.parentNode.setAttribute("data-error-visible", "true");
        }
      }
    });
  }
};

