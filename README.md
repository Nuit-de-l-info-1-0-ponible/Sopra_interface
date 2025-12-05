Voici une proposition de README.md adaptée à ton projet. J'ai adopté un ton un peu humoristique et "ironique" qui colle parfaitement à l'esprit d'un défi "Bad UI" / Nuit de l'Info.

📝 Le Formulaire de l'Enfer (Bad UI Challenge)
Bienvenue sur le formulaire d'inscription le plus frustrant du web. Ce projet a été conçu dans le cadre d'un défi de Bad User Experience (UX). L'objectif ? Créer une interface visuellement propre, mais dont l'interaction est un véritable cauchemar pour l'utilisateur.

"Si une machine doit être notre servante, elle doit être conçue pour être facile à utiliser." — Donald Norman.

Nous avons décidé de faire exactement l'inverse.

😈 Les Fonctionnalités (ou "Tortures")
Ce formulaire propose trois épreuves distinctes pour tester la patience de l'utilisateur :

1. La Saisie du Nom "En Silos"
Fini la simplicité d'un champ texte unique.

Le concept : Le nom doit être saisi lettre par lettre dans 10 cases distinctes.

Le piège : Il n'y a pas d'auto-focus (le curseur ne passe pas automatiquement à la case suivante). Vous devez cliquer ou faire Tab pour chaque lettre. De plus, impossible de remplir la case N si la case N-1 est vide.

2. L'Email au "Slider Micrométrique"
Pourquoi taper son email quand on peut le chercher caractère par caractère ?

Le concept : Un curseur (slider) permet de faire défiler les caractères ASCII (a-z, A-Z, 0-9, symboles).

Le piège : Une fois le bon caractère trouvé et ajouté, le slider se réinitialise immédiatement à zéro. Vous devez recommencer le défilement pour chaque lettre.

Bonus : Un bouton "Backspace" est disponible en cas d'erreur (heureusement).

3. La Livraison par Drone (GPS Aléatoire)
Nous avons besoin de votre position exacte... ou presque.

Le concept : Une modale s'ouvre avec une carte Leaflet (OpenStreetMap).

Le piège : Lors de la confirmation, le système simule une "localisation satellite" qui ajoute une déviation aléatoire (bruit GPS) à vos coordonnées, changeant potentiellement votre adresse.

4. La Latence Artificielle
Une fois le formulaire soumis, une attente aléatoire de 5 à 10 secondes est imposée pour simuler un "traitement complexe", bloquant l'interface.

🛠️ Stack Technique
HTML5 / CSS3 (Design moderne et épuré pour tromper l'ennemi).

JavaScript (Vanilla) pour la logique de frustration.

Leaflet.js pour la gestion de la carte interactive.

OpenStreetMap / Nominatim API pour le géocodage inverse.

🚀 Comment lancer le projet
Pas de npm install, pas de build complexe. C'est du web brut.

Clonez ce dépôt (ou téléchargez les fichiers).

Assurez-vous d'avoir les fichiers suivants dans le même dossier :

index.html

style.css

challenge.js

Ouvrez simplement index.html dans votre navigateur web préféré. (Une connexion internet est requise pour charger la carte et les styles Leaflet).
