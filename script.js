
/* =========================================
   THE MUSEUM OF US
   COMPLETE JAVASCRIPT
========================================= */


// ELEMENTS

const entrance = document.getElementById("entrance");
const enterBtn = document.getElementById("enterBtn");

const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const closePopup = document.getElementById("closePopup");

const starsContainer = document.getElementById("stars");

const museumSong = document.getElementById("museumSong");
const musicToggle = document.getElementById("musicToggle");

const roomOrder = [
    "wordsRoom",
    "constellationRoom",
    "lettersRoom",
    "finalRoom"
];


// BACKGROUND STARS

for (let i = 0; i < 100; i++) {

    const star = document.createElement("div");

    star.className = "star-bg";
    star.innerHTML = "✦";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.fontSize = Math.random() * 10 + 5 + "px";
    star.style.animationDelay = Math.random() * 3 + "s";

    starsContainer.appendChild(star);

}


// MUSIC SYSTEM

museumSong.volume = 0.5;

function updateMusicButton() {

    if (museumSong.paused) {

        musicToggle.innerHTML = "♫ Play Music";

    } else {

        musicToggle.innerHTML = "♫ Pause Music";

    }

}

async function playMusic() {

    try {

        await museumSong.play();

        updateMusicButton();

    } catch (error) {

        musicToggle.innerHTML = "♫ Play Music";

        console.log("Music playback error:", error);

    }

}

function pauseMusic() {

    museumSong.pause();

    updateMusicButton();

}

musicToggle.addEventListener("click", function () {

    if (museumSong.paused) {

        playMusic();

    } else {

        pauseMusic();

    }

});


// ENTER MUSEUM

enterBtn.addEventListener("click", function () {

    playMusic();

    showRoom("wordsRoom");

});


// POPUP SYSTEM

function openPopup(message) {

    popupText.innerText = message;

    popup.style.display = "flex";

}

function closePop() {

    popup.style.display = "none";

}

closePopup.addEventListener("click", closePop);

popup.addEventListener("click", function (event) {

    if (event.target === popup) {

        closePop();

    }

});

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closePop();

    }

});


// WORDS ROOM

document.querySelectorAll(".word-card").forEach(function (card) {

    card.addEventListener("click", function () {

        openPopup(card.dataset.message);

    });

});


// CONSTELLATION ROOM

document.querySelectorAll(".star").forEach(function (star) {

    star.addEventListener("click", function () {

        openPopup(star.dataset.memory);

    });

});


// LETTERS ROOM

document.querySelectorAll(".letter-card").forEach(function (letter) {

    letter.addEventListener("click", function () {

        openPopup(letter.dataset.letter);

    });

});


// PROGRESS BAR

const progressBox = document.createElement("div");

progressBox.id = "museumProgress";

progressBox.innerHTML = `
    <p id="progressText">EXHIBIT 1 OF 4</p>

    <div id="progressTrack">
        <div id="progressFill"></div>
    </div>
`;

document.body.appendChild(progressBox);


// UPDATE PROGRESS

function updateProgress(roomId) {

    progressBox.style.display = "block";

    const index = roomOrder.indexOf(roomId);

    if (index === -1) return;

    document.getElementById("progressText").innerText =
        "EXHIBIT " + (index + 1) + " OF 4";

    document.getElementById("progressFill").style.width =
        ((index + 1) / 4) * 100 + "%";

}


// SHOW ROOM

function showRoom(roomId) {

    document.querySelectorAll(".room").forEach(function (room) {

        room.style.display = "none";

    });

    entrance.style.display = "none";

    const selectedRoom = document.getElementById(roomId);

    selectedRoom.style.display = "block";

    updateProgress(roomId);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// GO TO ENTRANCE

function goToEntrance() {

    roomOrder.forEach(function (id) {

        document.getElementById(id).style.display = "none";

    });

    entrance.style.display = "flex";

    progressBox.style.display = "none";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// NAVIGATION BUTTONS

roomOrder.forEach(function (roomId, index) {

    const room = document.getElementById(roomId);

    const navigation = document.createElement("div");

    navigation.className = "museum-navigation";

    navigation.innerHTML = `
        <button class="back-button">← Previous</button>

        <button class="home-button">Entrance ⌂</button>
    `;

    room.appendChild(navigation);


    // PREVIOUS

    navigation.querySelector(".back-button").addEventListener("click", function () {

        if (index === 0) {

            goToEntrance();

        } else {

            showRoom(roomOrder[index - 1]);

        }

    });


    // ENTRANCE

    navigation.querySelector(".home-button").addEventListener("click", function () {

        goToEntrance();

    });

});


// NEXT ROOM BUTTONS

const nextRoomNames = [
    "Discover The Stars ✦",
    "Continue To Letters ✦",
    "Visit The Final Exhibit ✦"
];

for (let i = 0; i < 3; i++) {

    const room = document.getElementById(roomOrder[i]);

    const nextButton = document.createElement("button");

    nextButton.className = "next-room-btn";

    nextButton.innerText = nextRoomNames[i];

    room.insertBefore(
        nextButton,
        room.querySelector(".museum-navigation")
    );

    nextButton.addEventListener("click", function () {

        showRoom(roomOrder[i + 1]);

    });

}


// INITIAL STATE

document.getElementById("finalRoom").style.display = "none";

updateMusicButton();


// END
