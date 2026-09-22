```javascript
/* =========================================================
   DIGITAL BIRTHDAY JOURNEY
   SCRIPT.JS
========================================================= */


/* =========================================================
   01. CONFIGURATION
   GANTI BAGIAN INI SESUAI KEBUTUHAN
========================================================= */

const CONFIG = {

    boyfriendName: "[NAMA_PACAR]",

    girlfriendName: "[NAMA_KAMU]",

    age: 25,

    birthday: "[TANGGAL_ULANG_TAHUN]",

    musicFile: "assets/music.mp3",

    finalPhoto: "assets/final-photo.jpg"

};


/* =========================================================
   02. GLOBAL VARIABLES
========================================================= */

let currentChapter = 0;

let musicStarted = false;

let isMusicPlaying = false;

let countdownStarted = false;

let particlesStarted = false;


/* =========================================================
   03. DOM ELEMENTS
========================================================= */

const body = document.body;

const journey = document.getElementById("journey");

const openGiftButton =
    document.getElementById("openGiftButton");

const envelope =
    document.getElementById("envelope");

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

const chapterProgress =
    document.getElementById("chapterProgress");

const progressDots =
    document.querySelectorAll(".progress-dot");

const boyfriendName1 =
    document.getElementById("boyfriendName1");

const boyfriendName2 =
    document.getElementById("boyfriendName2");

const finalName =
    document.getElementById("finalName");

const girlfriendName =
    document.getElementById("girlfriendName");

const photoModal =
    document.getElementById("photoModal");

const modalImage =
    document.getElementById("modalImage");

const modalCaption =
    document.getElementById("modalCaption");

const closeModal =
    document.getElementById("closeModal");

const secretCard =
    document.getElementById("secretCard");

const letterEnvelope =
    document.getElementById("letterEnvelope");

const openLetterButton =
    document.getElementById("openLetterButton");

const afterLetterButton =
    document.getElementById("afterLetterButton");

const birthdayCake =
    document.getElementById("birthdayCake");

const wishButton =
    document.getElementById("wishButton");

const wishMessage =
    document.getElementById("wishMessage");

const wishContinue =
    document.getElementById("wishContinue");

const findButton =
    document.getElementById("findButton");

const foundMessage =
    document.getElementById("foundMessage");

const mysteryContinue =
    document.getElementById("mysteryContinue");

const countdown =
    document.getElementById("countdown");

const countdownText =
    document.getElementById("countdownText");

const replayButton =
    document.getElementById("replayButton");

const particles =
    document.getElementById("particles");

const finalParticles =
    document.getElementById("finalParticles");


/* =========================================================
   04. INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializePersonalization();

    initializeRevealAnimations();

    initializePhotoGallery();

    initializeSecretCard();

    initializeNavigation();

    initializeLetter();

    initializeWish();

    initializeMystery();

    initializeReplay();

    initializeMusic();

    initializeParticles();

    initializeKeyboard();

    setupFinalPhoto();

});


/* =========================================================
   05. PERSONALIZATION
========================================================= */

function initializePersonalization() {

    if (boyfriendName1) {
        boyfriendName1.textContent =
            CONFIG.boyfriendName;
    }

    if (boyfriendName2) {
        boyfriendName2.textContent =
            CONFIG.boyfriendName;
    }

    if (finalName) {
        finalName.textContent =
            CONFIG.boyfriendName;
    }

    if (girlfriendName) {
        girlfriendName.textContent =
            CONFIG.girlfriendName;
    }

    document.title =
        `Happy Birthday ${CONFIG.boyfriendName} ❤️`;

}


/* =========================================================
   06. OPEN BIRTHDAY GIFT
========================================================= */

if (openGiftButton) {

    openGiftButton.addEventListener(
        "click",
        openBirthdayJourney
    );

}


function openBirthdayJourney() {

    if (envelope) {

        envelope.classList.add("open");

    }

    openGiftButton.disabled = true;

    openGiftButton.style.opacity = "0";

    startMusic();

    createConfettiBurst();

    createHeartBurst();

    setTimeout(() => {

        const intro =
            document.getElementById("chapter0");

        if (intro) {

            intro.style.transition =
                "opacity 1.2s ease, transform 1.2s ease";

            intro.style.opacity = "0";

            intro.style.transform =
                "scale(1.04)";

        }

    }, 900);


    setTimeout(() => {

        const intro =
            document.getElementById("chapter0");

        if (intro) {

            intro.style.display = "none";

        }

        journey.classList.remove("hidden");

        chapterProgress.classList.remove("hidden");

        musicButton.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        currentChapter = 1;

        updateProgress(1);

        revealVisibleElements();

        createParticles();

    }, 1800);

}


/* =========================================================
   07. MUSIC
========================================================= */

function initializeMusic() {

    if (!music) return;

    music.volume = 0;

    music.addEventListener(
        "ended",
        () => {

            music.currentTime = 0;

            music.play().catch(() => {});

        }
    );

}


function startMusic() {

    if (!music) return;

    if (musicStarted) {

        music.play().catch(() => {});

        return;

    }

    musicStarted = true;

    music.volume = 0;

    const playPromise =
        music.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                isMusicPlaying = true;

                fadeMusicIn();

                updateMusicButton();

            })
            .catch(() => {

                isMusicPlaying = false;

                updateMusicButton();

            });

    }

}


function fadeMusicIn() {

    if (!music) return;

    let volume = 0;

    const fade =
        setInterval(() => {

            volume += 0.025;

            music.volume =
                Math.min(volume, 0.45);

            if (volume >= 0.45) {

                clearInterval(fade);

            }

        }, 100);

}


function fadeMusicOut() {

    if (!music) return;

    let volume =
        music.volume;

    const fade =
        setInterval(() => {

            volume -= 0.04;

            music.volume =
                Math.max(volume, 0);

            if (volume <= 0) {

                clearInterval(fade);

            }

        }, 50);

}


function toggleMusic() {

    if (!music) return;

    if (music.paused) {

        music.play()
            .then(() => {

                isMusicPlaying = true;

                fadeMusicIn();

                updateMusicButton();

            })
            .catch(() => {});

    } else {

        fadeMusicOut();

        setTimeout(() => {

            music.pause();

        }, 500);

        isMusicPlaying = false;

        updateMusicButton();

    }

}


function updateMusicButton() {

    if (!musicButton) return;

    musicButton.textContent =
        isMusicPlaying ? "🎵" : "🔇";

}


if (musicButton) {

    musicButton.addEventListener(
        "click",
        toggleMusic
    );

}


/* =========================================================
   08. PARTICLES
========================================================= */

function initializeParticles() {

    if (particlesStarted) return;

    particlesStarted = true;

}


function createParticles() {

    if (!particles) return;

    for (let i = 0; i < 35; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "particle";

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.animationDuration =
            `${8 + Math.random() * 15}s`;

        particle.style.animationDelay =
            `${Math.random() * 8}s`;

        particle.style.opacity =
            `${0.2 + Math.random() * 0.7}`;

        particle.style.transform =
            `scale(${0.4 + Math.random()})`;

        particles.appendChild(particle);

    }

}


/* =========================================================
   09. HEART PARTICLES
========================================================= */

function createHeartBurst() {

    const container =
        document.getElementById("particles");

    if (!container) return;

    const hearts = [
        "❤️",
        "♡",
        "♥",
        "✨"
    ];

    for (let i = 0; i < 18; i++) {

        const heart =
            document.createElement("div");

        heart.className =
            "final-heart";

        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() * hearts.length
                )
            ];

        heart.style.left =
            `${30 + Math.random() * 40}%`;

        heart.style.bottom =
            "20%";

        heart.style.animationDelay =
            `${Math.random() * 1.5}s`;

        heart.style.fontSize =
            `${12 + Math.random() * 20}px`;

        container.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 7000);

    }

}


/* =========================================================
   10. CONFETTI
========================================================= */

function createConfettiBurst() {

    const container =
        document.getElementById("particles");

    if (!container) return;

    const symbols = [
        "✦",
        "✧",
        "•",
        "♡",
        "♥"
    ];

    for (let i = 0; i < 45; i++) {

        const piece =
            document.createElement("div");

        piece.style.position =
            "absolute";

        piece.style.left =
            `${Math.random() * 100}%`;

        piece.style.top =
            `${20 + Math.random() * 30}%`;

        piece.style.fontSize =
            `${8 + Math.random() * 12}px`;

        piece.style.color =
            Math.random() > 0.5
                ? "#e8a7b8"
                : "#f7e7ce";

        piece.style.opacity =
            "0";

        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        piece.style.pointerEvents =
            "none";

        piece.animate(
            [
                {
                    opacity: 0,
                    transform:
                        "translateY(-20px) rotate(0deg)"
                },
                {
                    opacity: 1,
                    transform:
                        "translateY(30px) rotate(120deg)"
                },
                {
                    opacity: 0,
                    transform:
                        `translateY(${250 + Math.random() * 300}px)
                         rotate(${360 + Math.random() * 360}deg)`
                }
            ],
            {
                duration:
                    2500 + Math.random() * 2000,

                delay:
                    Math.random() * 600,

                easing:
                    "cubic-bezier(.2,.7,.3,1)"
            }
        );

        container.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 5000);

    }

}


/* =========================================================
   11. SCROLL REVEAL
========================================================= */

function initializeRevealAnimations() {

    const revealElements =
        document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(
            element => {

                element.classList.add("visible");

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => {

            observer.observe(element);

        }
    );

}


function revealVisibleElements() {

    const elements =
        document.querySelectorAll(
            ".chapter.active .reveal"
        );

    elements.forEach(
        element => {

            element.classList.add("visible");

        }
    );

}


/* =========================================================
   12. NAVIGATION
========================================================= */

function initializeNavigation() {

    const nextButtons =
        document.querySelectorAll(
            "[data-next]"
        );


    nextButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const targetId =
                    button.dataset.next;

                navigateToChapter(targetId);

            }
        );

    });

}


function navigateToChapter(targetId) {

    const target =
        document.getElementById(targetId);

    if (!target) return;


    target.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });


    const number =
        getChapterNumber(targetId);

    if (number !== null) {

        currentChapter =
            number;

        updateProgress(number);

    }


    setTimeout(() => {

        revealVisibleElements();

        handleChapterSpecialEvents(targetId);

    }, 500);

}


function getChapterNumber(id) {

    const match =
        id.match(/chapter(\d+)/);

    if (!match) {

        return null;

    }

    return Number(match[1]);

}


function updateProgress(number) {

    if (!progressDots.length) return;

    progressDots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index === number - 1
            );

        }
    );

}


/* =========================================================
   13. UPDATE CHAPTER BASED ON SCROLL
========================================================= */

function initializeChapterObserver() {

    const chapters =
        document.querySelectorAll(
            ".journey > .chapter"
        );


    if (!("IntersectionObserver" in window))
        return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        entry.intersectionRatio > 0.45
                    ) {

                        const id =
                            entry.target.id;

                        const number =
                            getChapterNumber(id);

                        if (number !== null) {

                            currentChapter =
                                number;

                            updateProgress(number);

                            handleChapterSpecialEvents(
                                id
                            );

                        }

                    }

                });

            },
            {
                threshold: [0.45]
            }
        );


    chapters.forEach(
        chapter => {

            observer.observe(chapter);

        }
    );

}


initializeChapterObserver();


/* =========================================================
   14. CHAPTER SPECIAL EVENTS
========================================================= */

const triggeredChapters =
    new Set();


function handleChapterSpecialEvents(
    chapterId
) {

    if (triggeredChapters.has(chapterId))
        return;


    if (chapterId === "chapter1") {

        setTimeout(() => {

            createConfettiBurst();

        }, 1000);

    }


    if (chapterId === "chapter7") {

        createStarsEffect();

    }


    if (chapterId === "chapter9") {

        if (!countdownStarted) {

            countdownStarted = true;

            startFinalCountdown();

        }

    }


    if (chapterId === "final") {

        triggerFinalSurprise();

    }


    triggeredChapters.add(chapterId);

}


/* =========================================================
   15. PHOTO GALLERY
========================================================= */

function initializePhotoGallery() {

    const cards =
        document.querySelectorAll(
            ".memory-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const image =
                    card.dataset.photo;

                const caption =
                    card.dataset.caption;

                openPhoto(
                    image,
                    caption
                );

            }
        );

    });

}


function openPhoto(
    image,
    caption
) {

    if (!photoModal) return;

    modalImage.src =
        image;

    modalCaption.textContent =
        caption;

    photoModal.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


function closePhoto() {

    if (!photoModal) return;

    photoModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

    setTimeout(() => {

        modalImage.src = "";

    }, 400);

}


if (closeModal) {

    closeModal.addEventListener(
        "click",
        closePhoto
    );

}


if (photoModal) {

    photoModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                photoModal
            ) {

                closePhoto();

            }

        }
    );

}


/* =========================================================
   16. SECRET CARD
========================================================= */

function initializeSecretCard() {

    if (!secretCard) return;


    secretCard.addEventListener(
        "click",
        () => {

            secretCard.classList.toggle(
                "revealed"
            );

            createHeartBurst();

        }
    );

}


/* =========================================================
   17. LOVE LETTER
========================================================= */

function initializeLetter() {

    if (!openLetterButton) return;


    openLetterButton.addEventListener(
        "click",
        openLoveLetter
    );

}


function openLoveLetter() {

    if (!letterEnvelope) return;

    letterEnvelope.classList.add(
        "open"
    );

    openLetterButton.classList.add(
        "hidden"
    );


    setTimeout(() => {

        if (afterLetterButton) {

            afterLetterButton.classList.remove(
                "hidden"
            );

        }

    }, 1600);


    createHeartBurst();

}


/* =========================================================
   18. MAKE A WISH
========================================================= */

function initializeWish() {

    if (!wishButton) return;


    wishButton.addEventListener(
        "click",
        makeWish
    );

}


function makeWish() {

    if (!birthdayCake) return;


    birthdayCake.classList.add(
        "blown"
    );


    wishButton.disabled =
        true;

    wishButton.style.opacity =
        "0.4";


    createStarsEffect();

    createHeartBurst();

    createConfettiBurst();


    setTimeout(() => {

        if (wishMessage) {

            wishMessage.classList.remove(
                "hidden"
            );

        }

    }, 800);


    setTimeout(() => {

        if (wishContinue) {

            wishContinue.classList.remove(
                "hidden"
            );

        }

    }, 2200);

}


/* =========================================================
   19. STAR EFFECT
========================================================= */

function createStarsEffect() {

    const container =
        document.getElementById(
            "particles"
        );

    if (!container) return;


    for (let i = 0; i < 30; i++) {

        const star =
            document.createElement("div");

        star.textContent =
            Math.random() > 0.5
                ? "✦"
                : "✧";

        star.style.position =
            "absolute";

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.fontSize =
            `${8 + Math.random() * 12}px`;

        star.style.color =
            "#f7e7ce";

        star.style.opacity =
            "0";

        star.animate(
            [
                {
                    opacity: 0,
                    transform:
                        "scale(0)"
                },
                {
                    opacity: 1,
                    transform:
                        "scale(1.4)"
                },
                {
                    opacity: 0,
                    transform:
                        "scale(0)"
                }
            ],
            {
                duration:
                    1800 + Math.random() * 1800,

                delay:
                    Math.random() * 1500
            }
        );

        container.appendChild(star);


        setTimeout(() => {

            star.remove();

        }, 4000);

    }

}


/* =========================================================
   20. HIDDEN MESSAGE
========================================================= */

function initializeMystery() {

    if (!findButton) return;


    findButton.addEventListener(
        "click",
        () => {

            findButton.classList.add(
                "hidden"
            );


            setTimeout(() => {

                if (foundMessage) {

                    foundMessage.classList.remove(
                        "hidden"
                    );

                }

                createStarsEffect();

            }, 800);


            setTimeout(() => {

                if (mysteryContinue) {

                    mysteryContinue.classList.remove(
                        "hidden"
                    );

                }

            }, 2200);

        }
    );

}


/* =========================================================
   21. FINAL COUNTDOWN
========================================================= */

function startFinalCountdown() {

    if (!countdown) return;


    let number = 3;

    countdown.textContent =
        number;


    countdownText.textContent =
        "Get ready...";


    const timer =
        setInterval(() => {

            number--;


            if (number > 0) {

                countdown.textContent =
                    number;

                countdown.style.animation =
                    "none";

                void countdown.offsetWidth;

                countdown.style.animation =
                    "countdownPulse 1s ease-in-out";

            }


            if (number === 0) {

                countdown.textContent =
                    "❤️";

                countdownText.textContent =
                    "Here we go...";


                clearInterval(timer);


                setTimeout(() => {

                    goToFinal();

                }, 1200);

            }

        }, 1300);

}


/* =========================================================
   22. GO TO FINAL
========================================================= */

function goToFinal() {

    const final =
        document.getElementById(
            "final"
        );

    if (!final) return;


    final.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });


    setTimeout(() => {

        triggerFinalSurprise();

    }, 1200);

}


/* =========================================================
   23. FINAL SURPRISE
========================================================= */

let finalTriggered =
    false;


function triggerFinalSurprise() {

    if (finalTriggered)
        return;


    finalTriggered = true;


    if (music) {

        music.volume =
            Math.min(
                music.volume + 0.08,
                0.55
            );

    }


    createFinalHearts();

    createFinalConfetti();

    createStarsEffect();


    const finalSection =
        document.getElementById(
            "final"
        );


    if (finalSection) {

        finalSection.classList.add(
            "final-active"
        );

    }

}


/* =========================================================
   24. FINAL HEARTS
========================================================= */

function createFinalHearts() {

    if (!finalParticles)
        return;


    const hearts = [
        "❤️",
        "♡",
        "♥",
        "💗",
        "✨"
    ];


    for (let i = 0; i < 30; i++) {

        const heart =
            document.createElement(
                "div"
            );

        heart.className =
            "final-heart";

        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        heart.style.left =
            `${Math.random() * 100}%`;

        heart.style.bottom =
            `${-10 + Math.random() * 20}%`;

        heart.style.animationDuration =
            `${5 + Math.random() * 7}s`;

        heart.style.animationDelay =
            `${Math.random() * 5}s`;

        heart.style.fontSize =
            `${12 + Math.random() * 20}px`;


        finalParticles.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        }, 14000);

    }

}


/* =========================================================
   25. FINAL CONFETTI
========================================================= */

function createFinalConfetti() {

    if (!finalParticles)
        return;


    const symbols = [
        "✦",
        "✧",
        "♡",
        "♥",
        "·"
    ];


    for (let i = 0; i < 70; i++) {

        const piece =
            document.createElement(
                "span"
            );


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.position =
            "absolute";

        piece.style.left =
            `${Math.random() * 100}%`;

        piece.style.top =
            "-20px";

        piece.style.fontSize =
            `${8 + Math.random() * 15}px`;

        piece.style.color =
            Math.random() > 0.5
                ? "#e8a7b8"
                : "#f7e7ce";


        piece.animate(
            [
                {
                    opacity: 0,

                    transform:
                        "translateY(0) rotate(0)"
                },

                {
                    opacity: 1
                },

                {
                    opacity: 0,

                    transform:
                        `translateY(${window.innerHeight + 100}px)
                         rotate(${Math.random() * 720}deg)`
                }

            ],
            {
                duration:
                    3500 + Math.random() * 4000,

                delay:
                    Math.random() * 3000,

                easing:
                    "cubic-bezier(.2,.7,.3,1)"
            }
        );


        finalParticles.appendChild(
            piece
        );


        setTimeout(() => {

            piece.remove();

        }, 8000);

    }

}


/* =========================================================
   26. FINAL PHOTO
========================================================= */

function setupFinalPhoto() {

    const finalPhoto =
        document.querySelector(
            ".final-photo img"
        );


    if (!finalPhoto) return;


    finalPhoto.src =
        CONFIG.finalPhoto;


    finalPhoto.onerror =
        () => {

            finalPhoto.style.display =
                "none";

            const parent =
                finalPhoto.parentElement;

            if (parent) {

                parent.style.display =
                    "none";

            }

        };

}


/* =========================================================
   27. REPLAY JOURNEY
========================================================= */

function initializeReplay() {

    if (!replayButton) return;


    replayButton.addEventListener(
        "click",
        replayJourney
    );

}


function replayJourney() {

    finalTriggered =
        false;

    countdownStarted =
        false;

    triggeredChapters.clear();


    if (music) {

        music.currentTime =
            0;

        music.volume =
            0.45;

        if (music.paused) {

            music.play().catch(
                () => {}
            );

        }

    }


    const intro =
        document.getElementById(
            "chapter0"
        );


    if (intro) {

        intro.style.display =
            "flex";

        intro.style.opacity =
            "1";

        intro.style.transform =
            "scale(1)";

    }


    if (journey) {

        journey.classList.add(
            "hidden"
        );

    }


    if (chapterProgress) {

        chapterProgress.classList.add(
            "hidden"
        );

    }


    if (musicButton) {

        musicButton.classList.add(
            "hidden"
        );

    }


    if (envelope) {

        envelope.classList.remove(
            "open"
        );

    }


    if (openGiftButton) {

        openGiftButton.disabled =
            false;

        openGiftButton.style.opacity =
            "1";

    }


    if (secretCard) {

        secretCard.classList.remove(
            "revealed"
        );

    }


    if (letterEnvelope) {

        letterEnvelope.classList.remove(
            "open"
        );

    }


    if (afterLetterButton) {

        afterLetterButton.classList.add(
            "hidden"
        );

    }


    if (openLetterButton) {

        openLetterButton.classList.remove(
            "hidden"
        );

    }


    if (birthdayCake) {

        birthdayCake.classList.remove(
            "blown"
        );

    }


    if (wishButton) {

        wishButton.disabled =
            false;

        wishButton.style.opacity =
            "1";

    }


    if (wishMessage) {

        wishMessage.classList.add(
            "hidden"
        );

    }


    if (wishContinue) {

        wishContinue.classList.add(
            "hidden"
        );

    }


    if (findButton) {

        findButton.classList.remove(
            "hidden"
        );

    }


    if (foundMessage) {

        foundMessage.classList.add(
            "hidden"
        );

    }


    if (mysteryContinue) {

        mysteryContinue.classList.add(
            "hidden"
        );

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   28. KEYBOARD CONTROLS
========================================================= */

function initializeKeyboard() {

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closePhoto();

            }


            if (
                event.code ===
                "Space" &&
                document.activeElement.tagName !==
                "BUTTON"
            ) {

                event.preventDefault();

                toggleMusic();

            }

        }
    );

}


/* =========================================================
   29. TOUCH EFFECT
========================================================= */

document.addEventListener(
    "touchstart",
    event => {

        const target =
            event.target.closest(
                ".primary-button, .next-button, .memory-card, .love-card"
            );


        if (!target) return;


        target.style.transform =
            "scale(0.97)";


        setTimeout(() => {

            target.style.transform =
                "";

        }, 120);

    },
    {
        passive: true
    }
);


/* =========================================================
   30. SHOOTING STAR
========================================================= */

function createShootingStar() {

    const star =
        document.createElement(
            "div"
        );


    star.style.position =
        "fixed";

    star.style.width =
        "100px";

    star.style.height =
        "1px";

    star.style.background =
        "linear-gradient(90deg, transparent, #fff)";

    star.style.top =
        `${10 + Math.random() * 40}%`;

    star.style.left =
        `${60 + Math.random() * 20}%`;

    star.style.transform =
        "rotate(-35deg)";

    star.style.zIndex =
        "100";


    document.body.appendChild(
        star
    );


    star.animate(
        [
            {
                opacity: 0,
                transform:
                    "translate(0,0) rotate(-35deg)"
            },

            {
                opacity: 1
            },

            {
                opacity: 0,
                transform:
                    "translate(-400px,300px) rotate(-35deg)"
            }
        ],
        {
            duration: 1500,

            easing:
                "ease-out"
        }
    );


    setTimeout(() => {

        star.remove();

    }, 1600);

}


setInterval(
    () => {

        if (
            currentChapter === 7
        ) {

            createShootingStar();

        }

    },
    5000
);


/* =========================================================
   31. PREVENT IMAGE DRAG
========================================================= */

document
    .querySelectorAll("img")
    .forEach(img => {

        img.setAttribute(
            "draggable",
            "false"
        );

    });


/* =========================================================
   32. PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (!musicStarted)
            return;


        if (document.hidden) {

            if (
                music &&
                !music.paused
            ) {

                music.pause();

            }

        } else {

            if (
                music &&
                isMusicPlaying
            ) {

                music.play().catch(
                    () => {}
                );

            }

        }

    }
);


/* =========================================================
   33. SAFETY CHECK
========================================================= */

window.addEventListener(
    "error",
    event => {

        console.warn(
            "Birthday Journey:",
            event.message
        );

    }
);


/* =========================================================
   34. INITIAL STATE
========================================================= */

if (journey) {

    journey.classList.add(
        "hidden"
    );

}


if (musicButton) {

    musicButton.classList.add(
        "hidden"
    );

}


if (chapterProgress) {

    chapterProgress.classList.add(
        "hidden"
    );
}


/* =========================================================
   END
========================================================= */
```
