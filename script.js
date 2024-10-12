document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const welcomeText = document.getElementById('welcome');
    const sections = [
        document.getElementById('chi-sono'),
        document.getElementById('progetti'),
        document.getElementById('project')
    ];

    // Preloader
    setTimeout(() => {
        preloader.style.opacity = '0'; // Inizia a ridurre l'opacità
        setTimeout(() => {
            preloader.style.display = 'none'; // Nascondi dopo la transizione
        }, 500); // Dura quanto la transizione nel CSS
    }, 500); // Cambia il tempo a tuo piacimento

    // Traduzioni di "Welcome"
    const fixedTranslations = [
        'Welcome!',            // Inglese (fisso)
        'Benvenuto!'          // Italiano (fisso)
    ];

    // Altre traduzioni che verranno mescolate
    const otherTranslations = [
        'Bienvenue!',         // Francese
        '¡Bienvenido!',       // Spagnolo
        'Willkommen!',        // Tedesco
        'Benvingut!',         // Catalano
        'Velkommen!',         // Danese
        '환영합니다!',         // Coreano (Hwan-yeong-hamnida)
        '欢迎!',              // Cinese (Semplificato, Huānyíng)
        'Добро пожаловать!',   // Russo (Dobro pozhalovat!)
        'Welkom!',            // Olandese
        'Bem-vindo!',         // Portoghese
        'Tervetuloa!',       // Finlandese
        'Selamat datang!',    // Malese
        'Välkommen!',         // Svedese
        'Kalimera!',          // Greco
        'Jambo!',             // Swahili
        'Ciao!',              // Italiano (informale)
        'Bienvenido!'        // Spagnolo (informale)
    ];

    // Funzione per mescolare l'array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Scambia gli elementi
        }
        return array;
    }

    // Mescola le altre traduzioni
    const shuffledOtherTranslations = shuffle([...otherTranslations]);

    // Combina le traduzioni fisse con le traduzioni mescolate
    const translations = [...fixedTranslations, ...shuffledOtherTranslations];

    let currentTranslationIndex = 0; // Indice della traduzione attuale
    let welcomeString = translations[currentTranslationIndex]; // Stringa di benvenuto completa
    let index = 0;
    let deleting = false; 

    function animateText() {
        if (deleting) {
            index--;
            if (index < 0) {
                deleting = false; 
                index = 0;
                // Cambia alla prossima traduzione
                currentTranslationIndex = (currentTranslationIndex + 1) % translations.length;
                welcomeString = translations[currentTranslationIndex]; // Aggiorna la welcomeString
                document.title = welcomeString; // Aggiorna il titolo
                fadeOut(); // Inizia l'effetto di dissolvenza
                return;
            }
        } else {
            index++;
            if (index > welcomeString.length) {
                deleting = true; 
                index = welcomeString.length;
            }
        }

        welcomeText.innerText = welcomeString.substring(0, index); // Mostra solo una parte della stringa
        setTimeout(animateText, deleting ? 100 : 400); // Cambia il tempo in base allo stato di cancellazione
    }

    function fadeOut() {
        welcomeText.style.opacity = '0'; // Inizia a dissolvere
        setTimeout(() => {
            index = 0; // Resetta l'indice
            welcomeText.innerText = ''; // Cancella il testo
            welcomeText.style.opacity = '1'; // Rendi visibile per la nuova traduzione
            animateText(); // Riavvia l'animazione
        }, 300); // Tempo di dissolvenza
    }

    // Imposta inizialmente il titolo
    document.title = welcomeString;

    animateText();

    // Animazione di apparizione delle sezioni
    sections.forEach(section => {
        section.style.opacity = '0'; // Imposta l'opacità a zero all'inizio
        setTimeout(() => {
            section.style.opacity = '1'; // Fai apparire lentamente la sezione
            section.style.transition = 'opacity 0.5s ease'; // Aggiungi transizione
        }, 100); // Piccola attesa per l'effetto

        // Apri la sezione al passaggio del mouse
        section.addEventListener('mouseenter', () => {
            toggleSection(section, true); // Passa 'true' per aprire
        });

        // Chiudi la sezione quando il cursore esce
        section.addEventListener('mouseleave', () => {
            // Non fare nulla qui, poiché vogliamo mantenere il box aperto
        });
    });

    // Imposta la sezione "Chi Sono" come aperta di default
    const chiSonoSection = document.getElementById('chi-sono');
    const chiSonoDescription = chiSonoSection.querySelector('.description');
    chiSonoSection.classList.add('open'); // Aggiungi classe open
    chiSonoDescription.style.maxHeight = chiSonoDescription.scrollHeight + 'px'; 
    chiSonoDescription.style.opacity = '1'; // Rendi visibile

    function toggleSection(section, isMouseEnter) {
        const description = section.querySelector('.description');

        if (isMouseEnter) {
            // Chiudi tutte le sezioni ad eccezione di quella attualmente attiva
            sections.forEach(s => {
                if (s !== section) {
                    const desc = s.querySelector('.description');
                    s.classList.remove('open');
                    desc.style.maxHeight = '0'; 
                    desc.style.opacity = '0'; // Nascondi
                }
            });

            // Apri la sezione corrente
            section.classList.add('open'); // Aggiungi classe open al passaggio del mouse
            description.style.maxHeight = description.scrollHeight + 'px'; 
            description.style.opacity = '1'; // Rendi visibile
        } else {
            // Non chiudere qui, poiché vogliamo mantenere il box aperto
        }
    }
});
