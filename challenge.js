document.addEventListener('DOMContentLoaded', () => {
    const addressInput = document.getElementById('address');
    const nameContainer = document.getElementById('name-container');
    const hiddenNameInput = document.getElementById('name');
    const modal = document.getElementById('mapModal');
    const closeModal = document.getElementById('closeModal');
    const confirmBtn = document.getElementById('confirmLocation');
    const statusText = document.getElementById('statusText');
    let map = null;
    let driftInterval = null;
    let driftSpeed = 2; // Pixels par tick
    let currentDrift = { x: 1, y: 1 };

    // Générer les Colonnes pour le Nom
    for (let i = 0; i < 10; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.className = 'name-char-input';
        input.dataset.index = i;

        // Frustration: Pas d'auto-focus et obligation de séquentiel
        input.addEventListener('focus', (e) => {
            const index = parseInt(e.target.dataset.index);
            if (index > 0) {
                const prevInput = nameContainer.children[index - 1];
                if (!prevInput.value) {
                    // Si la case précédente est vide, on force le focus dessus
                    prevInput.focus();
                }
            }
        });

        // Empêcher la saisie si la case précédente est vide (double sécurité)
        input.addEventListener('keydown', (e) => {
            const index = parseInt(e.target.dataset.index);
            if (index > 0) {
                const prevInput = nameContainer.children[index - 1];
                if (!prevInput.value && e.key.length === 1) { // Si c'est un caractère
                    e.preventDefault();
                    prevInput.focus();
                }
            }
        });

        nameContainer.appendChild(input);
    }

    // Gestion de la Soumission du Formulaire
    document.getElementById('registrationForm').addEventListener('submit', (e) => {
        e.preventDefault();

        // Récupérer le nom
        const charInputs = document.querySelectorAll('.name-char-input');
        let fullName = '';
        charInputs.forEach(input => {
            fullName += input.value;
        });
        hiddenNameInput.value = fullName;

        if (!fullName.trim()) {
            alert("Veuillez entrer votre nom.");
            return;
        }

        if (!addressInput.value) {
            alert("Veuillez sélectionner une adresse.");
            return;
        }

        if (!document.getElementById('email').value) {
            alert("Veuillez entrer votre email.");
            return;
        }

        const submitBtn = document.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Traitement en cours...";
        submitBtn.disabled = true;

        // Latence Artificielle: 5-10 secondes
        const delay = Math.floor(Math.random() * 5000) + 5000;

        setTimeout(() => {
            alert(`Inscription Terminée !\nNom: ${fullName}\nEmail: ${document.getElementById('email').value}\nAdresse: ${addressInput.value}`);
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }, delay);
    });

    // Logique du Slider Email
    const emailDisplay = document.getElementById('email-display');
    const hiddenEmailInput = document.getElementById('email');
    const charSlider = document.getElementById('char-slider');
    const currentCharDisplay = document.getElementById('current-char');
    const addCharBtn = document.getElementById('add-char-btn');
    const backspaceBtn = document.getElementById('backspace-btn');

    // Jeu de caractères: a-z, A-Z, 0-9, symboles courants
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@._-";

    // Mettre à jour le max du slider
    charSlider.max = chars.length - 1;

    function updateCharDisplay() {
        const index = parseInt(charSlider.value);
        currentCharDisplay.textContent = chars[index];
    }

    charSlider.addEventListener('input', updateCharDisplay);

    addCharBtn.addEventListener('click', () => {
        const char = chars[parseInt(charSlider.value)];
        hiddenEmailInput.value += char;
        emailDisplay.textContent = hiddenEmailInput.value;

        // Frustration: Reset slider à 0
        charSlider.value = 0;
        updateCharDisplay();
    });

    backspaceBtn.addEventListener('click', () => {
        const current = hiddenEmailInput.value;
        if (current.length > 0) {
            hiddenEmailInput.value = current.slice(0, -1);
            emailDisplay.textContent = hiddenEmailInput.value;
        }
    });

    // Initialiser l'affichage
    updateCharDisplay();

    // Ouvrir la Modale
    addressInput.addEventListener('click', () => {
        modal.classList.add('active');
        initMap();
    });

    // Fermer la Modale
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        stopDrift();
    });

    // Initialiser la Carte
    function initMap() {
        if (map) {
            map.invalidateSize();
            return;
        }

        // Commencer quelque part (Paris)
        map = L.map('map', {
            zoomControl: true,
            dragging: true,
            scrollWheelZoom: true,
            doubleClickZoom: true
        }).setView([48.8566, 2.3522], 13); // Paris

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
    }

    // Confirmer la Position
    confirmBtn.addEventListener('click', () => {
        if (!map) return;

        const center = map.getCenter();
        // Ajouter un peu d'aléatoire
        const randomLat = center.lat + (Math.random() - 0.5) * 0.0001; // Tiny randomness
        const randomLng = center.lng + (Math.random() - 0.5) * 0.0001;

        statusText.innerText = "Résolution de l'adresse...";
        confirmBtn.disabled = true;
        confirmBtn.innerText = "Localisation...";

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${randomLat}&lon=${randomLng}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.display_name) {
                    addressInput.value = data.display_name;
                } else {
                    addressInput.value = `${randomLat.toFixed(6)}, ${randomLng.toFixed(6)}`;
                }
                modal.classList.remove('active');
                confirmBtn.disabled = false;
                confirmBtn.innerText = "Confirmer la Position";
            })
            .catch(() => {
                addressInput.value = `${randomLat.toFixed(6)}, ${randomLng.toFixed(6)}`;
                modal.classList.remove('active');
                confirmBtn.disabled = false;
                confirmBtn.innerText = "Confirmer la Position";
            });
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});
