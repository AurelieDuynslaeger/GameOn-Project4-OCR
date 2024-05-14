
// 1 - récupérer les champs du formulaire :
const form = document.querySelector("form");

const firstName = document.getElementById("first").value;
const lastName = document.getElementById("last").value;
const email = document.getElementById("email").value;
const quantity = document.getElementById("quantity").value;
const location = document.querySelector('input[name="location"]:checked');
const checkbox1 = document.getElementById("checkbox1").checked;

//empêcher le comportement par défaut (réaffichier la page) au submit de l'utilisateur, appel au serveur => rechargement de la page qui empêche l'éxécution du code;
form.addEventListener("submit", (event) => {
    try {
        event.preventDefault();
        // 2 - Vérifier les entrées
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
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
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

})

//try/catch pour les erreurs
//try validation, catch erreurs dans le console
//en cas d'erreur le code s'arrete et c'est donc le catch qui prend le relai
