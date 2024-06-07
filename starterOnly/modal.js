document.addEventListener('DOMContentLoaded', () => {

  // DOM Elements
  const modalbg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".modal-btn");
  const formData = document.querySelectorAll(".formData");
  // span X to close modal
  const modalClose = document.querySelector(".close");
  // on cible le form pour le submit
  let form = document.querySelector("form");
  //nav mobile
  const icon = document.querySelector('.icon');

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
  // Attachez l'événement click à l'élément .icon
  icon.addEventListener('click', editNav);

  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

  // launch modal form
  function launchModal(event) {
    if (event && event.type === "click") {
      modalbg.style.display = "flex";
    }
  }

  // close modal event
  modalClose.addEventListener("click", closeModal);

  function closeModal() {
    // si le click est détecté alors la modal passe en display none
    modalbg.style.display = "none";
    // réinitialiser le contenu de la modal au formulaire initial
    document.querySelector(".modal-body").innerHTML = initialModalContent;
    // récupérer à nouveau le form élément car le contenu de la modal a été réinitialisé
    form = document.querySelector("form");
    // réattacher les écouteurs d'événement pour le formulaire
    form.addEventListener("submit", handleSubmit);
  }

  // fonction pour changer le contenu de la modal par le message de validation
  function validate() {
    // on cible le body de la modale
    const modalBody = document.querySelector(".modal-body");
    // on lui donne ce qu'on souhaite afficher dedans à la réservation
    // message + bouton fermer
    modalBody.innerHTML = `
    <div class="valid-register">
      <h2>Votre inscription a bien été reçue !</h2>
      <button class="btn-close">Fermer</button>
    </div>
  `;
    // on écoute le click sur le bouton 'fermer', au click on met la modale en display none
    const btnClose = document.querySelector(".btn-close");
    btnClose.addEventListener("click", closeModal);
  }

  // initialisation du tableau des réservations de GameOn
  const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
  // tableau des réservations dans la console 
  console.table(bookings);
  // JSON des réservations dans la console
  console.log(JSON.stringify(bookings, null, 2));

  // on écoute l'event submit sur le formulaire et on fait les vérifs
  form.addEventListener("submit", handleSubmit);

  function handleSubmit(event) {
    // on annule le comportement par défaut du navigateur qui est de recharger la page
    event.preventDefault();

    // enregistrer la résa au click avec toutes les valeurs saisies ou choisies
    const firstName = document.getElementById("first").value.trim();
    console.log(`Prénom :${firstName}`);
    const lastName = document.getElementById("last").value.trim();
    console.log(`Nom :${lastName}`);
    const email = document.getElementById("email").value.trim();
    console.log(`Email :${email}`);
    // trim() : supprime les espaces aux deux extrémités de cette chaîne et renvoie une nouvelle chaîne, sans modifier la chaîne d'origine.
    const birthdate = document.getElementById("birthdate").value.trim();
    console.log(`Date de naissance :${birthdate}`);
    const quantity = document.getElementById("quantity").value;
    console.log(`Nb de tournois :${quantity}`);
    const radioLocation = document.querySelector('input[name="location"]:checked');
    console.log(`Ville choisie :${radioLocation}`);
    const checkbox1 = document.getElementById("checkbox1").checked;
    console.log(`CGV :${checkbox1}`);

    // Réinitialisation des attributs data-error et data-error-visible pour tous les champs
    formData.forEach(data => {
      data.setAttribute("data-error", "");
      data.setAttribute("data-error-visible", "false");
    });

    // initialisation du tableau d'erreurs
    const errors = [];

    // vérifications des saisies utilisateur
    if (firstName.length < 2) {
      errors.push({ fieldName: "first", message: "Veuillez entrer 2 caractères ou plus pour le prénom." });
    }

    if (lastName.length < 2) {
      errors.push({ fieldName: "last", message: "Veuillez entrer 2 caractères ou plus pour le nom." });
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      errors.push({ fieldName: "email", message: "Veuillez saisir une adresse e-mail valide." });
    }

    if (birthdate === "") {
      errors.push({ fieldName: "birthdate", message: "Veuillez saisir votre date de naissance." });
    }

    if (isNaN(quantity) || quantity < 0 || quantity > 99) {
      errors.push({ fieldName: "quantity", message: "Veuillez saisir un nombre valide pour le nombre de concours." });
    }

    if (!radioLocation) {
      errors.push({ fieldName: "location", message: "Veuillez sélectionner un lieu de tournoi." });
    }

    if (!checkbox1) {
      errors.push({ fieldName: "checkbox1", message: "Veuillez accepter les conditions générales." });
    }

    if (errors.length === 0) {
      const location = radioLocation.value;

      const booking = {
        firstName,
        lastName,
        email,
        birthdate,
        quantity,
        location,
        checkbox: checkbox1
      };

      bookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(bookings));

      console.log(booking);
      validate();
      form.reset();
    } else {
      errors.forEach(error => {
        if (error.fieldName === "location") {
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
          const fieldElement = document.getElementById(error.fieldName);
          if (fieldElement) {
            fieldElement.parentNode.setAttribute("data-error", error.message);
            fieldElement.parentNode.setAttribute("data-error-visible", "true");
          }
        }
      });
    }
  }
});