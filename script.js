document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const welcomeText = document.getElementById('welcome');
    const chiSonoSection = document.getElementById('chi-sono');
    const progettiSection = document.getElementById('progetti');
    const projectSection = document.getElementById('project');

    // Preloader
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 800); // Cambia il tempo a tuo piacimento

    // Animazione scritta "Welcome"
    const welcomeString = 'elcome!'; // Solo le lettere da cancellare e riscrivere
    let index = 0;
    let deleting = false; // Flag per sapere se stiamo cancellando o scrivendo
    let currentText = 'W'; // Iniziamo con 'W' fissato

    function animateText() {
        if (deleting) {
            // Se stiamo cancellando
            currentText = 'W' + welcomeString.substring(0, index);
            index--;

            if (index < 0) {
                deleting = false; // Iniziamo a scrivere
                index = 0; // Reset dell'indice
            }
        } else {
            // Se stiamo scrivendo
            currentText = 'W' + welcomeString.substring(0, index);
            index++;

            if (index > welcomeString.length) {
                deleting = true; // Iniziamo a cancellare
                index = welcomeString.length; // Reset dell'indice
            }
        }

        welcomeText.innerText = currentText; // Aggiorna il testo visualizzato
        setTimeout(animateText, 400); // Cambia la velocità di animazione qui
    }

    animateText(); // Avvia l'animazione

    // Espansione delle sezioni
    chiSonoSection.classList.add('open');  // Sezioni aperte di default
    progettiSection.classList.add('open');  // Sezioni aperte di default
    projectSection.classList.add('open');  // Sezioni aperte di default

    chiSonoSection.querySelector('h2').addEventListener('click', () => {
        chiSonoSection.classList.toggle('open');
    });

    progettiSection.querySelector('h2').addEventListener('click', () => {
        progettiSection.classList.toggle('open');
    });

    projectSection.querySelector('h2').addEventListener('click', () => {
        project.classList.toggle('open');
    });
});
