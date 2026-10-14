const API = "https://api.audius.co/v1";
const APP_NAME = "love_tracker";

const audio = document.querySelector("#audioPlayer");
const albumCover = document.querySelector("#albumCover");
const songTitle = document.querySelector("#songTitle");
const artistName = document.querySelector("#artistName");
const playBtn = document.querySelector("#playBtn");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const shuffleBtn = document.querySelector("#shuffleBtn");
const progressBar = document.querySelector("#progressBar");
const currentTime = document.querySelector("#currentTime");
const duration = document.querySelector("#duration");
const musicStatus = document.querySelector("#musicStatus");

const letterBtn = document.querySelector("#letterBtn");
const letterModal = document.querySelector("#letterModal");
const infoModal = document.querySelector("#infoModal");
const infoTitle = document.querySelector("#infoTitle");
const infoText = document.querySelector("#infoText");
const loveBtn = document.querySelector("#loveBtn");
const nightBtn = document.querySelector("#nightBtn");
const surpriseBtn = document.querySelector("#surpriseBtn");
const aboutNav = document.querySelector("#aboutNav");
const aboutSection = document.querySelector("#about");


let songs = [];
let currentIndex = -1;
let isShuffle = true;
let isLoading = false;
let currentQueryIndex = 0;
let playedSongs = new Set();
let failedSongs = new Set();

const searchQueries = [
    "Arijit Singh romantic songs",
    "Arijit Singh love songs",
    "Arijit Singh Bollywood hits",
    "Shreya Ghoshal romantic songs",
    "Jubin Nautiyal love songs",
    "Darshan Raval romantic songs",
    "Armaan Malik love songs",
    "Vishal Mishra romantic songs",
    "Atif Aslam Bollywood songs",
    "Mohit Chauhan romantic songs",
    "Sonu Nigam romantic songs",
    "KK Bollywood love songs",
    "Shaan romantic songs",
    "B Praak romantic songs",
    "Anuv Jain love songs",
    "King romantic songs",
    "Akhil romantic songs",
    "Papon love songs",
    "Rahat Fateh Ali Khan romantic songs",
    "Palak Muchhal romantic songs",

    "Tum Hi Ho Aashiqui 2",
    "Chahun Main Ya Naa",
    "Sun Raha Hai",
    "Kesariya Brahmastra",
    "Apna Bana Le Bhediya",
    "Heeriye Arijit Singh",
    "O Maahi Dunki",
    "Chaleya Jawan",
    "Ve Kamleya Rocky Aur Rani",
    "Tere Vaaste Zara Hatke Zara Bachke",
    "Phir Aur Kya Chahiye",
    "Satranga Animal",
    "Pehle Bhi Main Animal",
    "Sajni Laapataa Ladies",
    "Ranjha Shershaah",
    "Raataan Lambiyan",
    "Tera Ban Jaunga",
    "Kaise Hua Kabir Singh",
    "Maan Meri Jaan",
    "Husn Anuv Jain",
    "Jo Tum Mere Ho",
    "Khairiyat Chhichhore",
    "Tere Hawaale",
    "Hawayein Jab Harry Met Sejal",
    "Shayad Love Aaj Kal",
    "Dil Diyan Gallan",
    "Tera Hone Laga Hoon",
    "Jeene Laga Hoon",
    "Tum Se Hi Jab We Met",
    "Pee Loon Once Upon a Time in Mumbaai",
    "Tujhe Kitna Chahne Lage",
    "Bolna Kapoor and Sons",
    "Samjhawan Humpty Sharma",
    "Gerua Dilwale",
    "Janam Janam Dilwale",
    "Agar Tum Saath Ho",
    "Aayat Bajirao Mastani",
    "Mast Magan 2 States",
    "Soch Na Sake Airlift",
    "Humsafar Badrinath Ki Dulhania",

    "90s Hindi romantic songs",
    "90s Bollywood love songs",
    "old Hindi romantic songs",
    "90s Hindi melody songs",
    "90s Bollywood romantic hits",
    "Kumar Sanu romantic songs",
    "Udit Narayan love songs",
    "Alka Yagnik romantic songs",
    "Abhijeet Bhattacharya love songs",
    "Sonu Nigam 90s songs",
    "Anuradha Paudwal romantic songs",
    "Sadhana Sargam love songs",
    "Hariharan romantic songs",
    "Vinod Rathod romantic songs",
    "Asha Bhosle romantic songs",
    "Lata Mangeshkar 90s songs",
    "90s Hindi duet songs",
    "90s Bollywood evergreen love songs",
    "90s Hindi sad romantic songs",
    "90s Bollywood melody hits",

    "Pehla Nasha Jo Jeeta Wohi Sikandar",
    "Ek Ladki Ko Dekha 1942 A Love Story",
    "Kuch Kuch Hota Hai title song",
    "Tujhe Dekha To Dilwale Dulhania Le Jayenge",
    "Ho Gaya Hai Tujhko DDLJ",
    "Mere Khwabon Mein DDLJ",
    "Zara Sa Jhoom Loon Main",
    "Ae Mere Humsafar Qayamat Se Qayamat Tak",
    "Papa Kehte Hain QSQT",
    "Gazab Ka Hai Din",
    "Dil Hai Ke Manta Nahin title song",
    "Main Duniya Bhula Doonga",
    "Dheere Dheere Se Aashiqui",
    "Ab Tere Bin Aashiqui",
    "Nazar Ke Samne Aashiqui",
    "Saanson Ki Zarurat Hai Aashiqui",
    "Mera Dil Bhi Kitna Pagal Hai",
    "Tu Pyar Hai Kisi Aur Ka",
    "Do Dil Mil Rahe Hain Pardes",
    "Meri Mehbooba Pardes",
    "I Love You Barfi",
    "Tip Tip Barsa Pani",
    "Pardesi Pardesi Raja Hindustani",
    "Aaye Ho Meri Zindagi Mein",
    "Kitna Pyaara Tujhe Rab Ne Banaya",
    "Bahut Pyaar Karte Hain Saajan",
    "Dekha Hai Pehli Baar Saajan",
    "Tumse Milne Ki Tamanna Saajan",
    "Jeeye To Jeeye Kaise Saajan",
    "Mujhe Neend Na Aaye Dil",
    "Humko Sirf Tumse Barsaat",
    "Teri Umeed Tera Intezar Deewana",
    "Aisi Deewangi Deewana",
    "Sochenge Tumhe Pyaar Deewana",
    "Payalay Chunmun Virasat",
    "Chand Chhupa Hum Dil De Chuke Sanam",
    "Aankhon Ki Gustakhiyan",
    "Tadap Tadap Hum Dil De Chuke Sanam",
    "Jiya Jale Dil Se",
    "Satrangi Re Dil Se",
    "Chaiyya Chaiyya Dil Se",
    "Dil To Pagal Hai title song",
    "Are Re Are Dil To Pagal Hai",
    "Bholi Si Surat",
    "Koi Ladki Hai Dil To Pagal Hai",
    "Le Gayi Dil To Pagal Hai",
    "Ishq Bina Taal",
    "Nahin Samne Taal",
    "Ramta Jogi Taal",
    "Taal Se Taal Mila",
    "Hum Dil De Chuke Sanam",
    "Madhosh Dil Ki Dhadkan Jab Pyaar Kisise Hota Hai",
    "Is Dil Mein Kya Hai Jab Pyaar Kisise Hota Hai",
    "Pyaar Kiya To Nibhana Major Saab",
    "Akhiyaan Milaoon Raja",
    "Kisi Disco Mein Jaaye Bade Miyan Chote Miyan",
    "Sona Kitna Sona Hai Hero No 1",
    "Meri Pant Bhi Sexy Dulhan Bhi Sexy",
    "Chamma Chamma China Gate",
    "Chunari Chunari Biwi No 1",
    "Hai Na Bolo Pukar",
    "Kehna Hi Kya Bombay",
    "Tu Hi Re Bombay",
    "Humma Humma Bombay",
    "Uyire Bombay Hindi songs",
    "Ruk Ja O Dil Deewane DDLJ",
    "Ho Nahi Sakta Diljale",
    "Mera Mulk Mera Desh Diljale",
    "Mere Mehboob Mere Sanam Duplicate",
    "Ladna Jhagadna Duplicate",
    "Badi Mushkil Lajja",
    "Pyaar Dilon Ka Mela Dulhan Hum Le Jayenge",
    "Odh Li Chunariya Pyaar Kiya To Darna Kya",
    "Deewana Main Chala Pyaar Kiya To Darna Kya",

    "Kumar Sanu Alka Yagnik duets",
    "Udit Narayan Alka Yagnik duets",
    "Kumar Sanu Anuradha Paudwal",
    "Udit Narayan Sadhana Sargam",
    "Abhijeet Alka Yagnik songs",
    "Sonu Nigam Alka Yagnik songs",
    "Lata Mangeshkar Udit Narayan duets",
    "90s Bollywood wedding love songs",
    "90s Bollywood rainy songs",
    "90s Bollywood heart touching songs",
    "90s Hindi evergreen melodies",
    "90s Hindi romantic duet hits",

    "Hindi romantic hits 2000s",
    "Hindi romantic hits 2010s",
    "Hindi romantic hits 2020s",
    "Bollywood love songs 2000",
    "Bollywood love songs 2005",
    "Bollywood love songs 2010",
    "Bollywood love songs 2015",
    "Bollywood love songs 2020",
    "Bollywood love songs 2024",
    "Bollywood love songs 2025",
    "Hindi indie romantic songs",
    "Hindi acoustic love songs",
    "Hindi unplugged romantic songs",
    "Hindi lofi romantic songs",
    "Bollywood lofi love songs",
    "Hindi female romantic songs",
    "Hindi male romantic songs",
    "Hindi romantic duets",
    "Hindi soulful love songs",
    "Hindi evergreen romantic songs",
    "Bollywood sad love songs",
    "Bollywood happy romantic songs",
    "Hindi couple songs",
    "Hindi melody hits",
    "Indian independent love songs",
    "Hindi romantic playlist"
];


function setStatus(message) {
    if (musicStatus) {
        musicStatus.textContent = message;
    }

    if (artistName) {
        artistName.textContent = message;
    }
}

function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function getArtwork(track) {
    if (typeof track.artwork === "string") {
        return track.artwork;
    }

    return (
        track.artwork?.["480x480"] ||
        track.artwork?.["1000x1000"] ||
        track.artwork?.["150x150"] ||
        track.user?.profile_picture?.["480x480"] ||
        "love-bg.jpeg"
    );
}

async function fetchSongs(query, offset = 0) {
    const params = new URLSearchParams({
        query,
        offset: String(offset),
        limit: "100",
        sort_method: "popular"
    });

    const response = await fetch(
        `${API}/tracks/search?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error(`Music API error: ${response.status}`);
    }

    const result = await response.json();

    if (!Array.isArray(result.data)) {
        return [];
    }

    return result.data
        .filter(track => track.id && track.title)
        .map(track => ({
            id: String(track.id),
            title: track.title,
            artist: track.user?.name || "Unknown Artist",
            artwork: getArtwork(track),
            duration: track.duration || 0,
            streamUrl:
                `${API}/tracks/${encodeURIComponent(track.id)}/stream` +
                `?app_name=${encodeURIComponent(APP_NAME)}`
        }));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

async function loadSongs() {
    if (isLoading || currentQueryIndex >= searchQueries.length) {
        return;
    }

    isLoading = true;
    setStatus("Searching for Hindi and Bollywood songs...");

    const queries = searchQueries.slice(
        currentQueryIndex,
        currentQueryIndex + 5
    );

    currentQueryIndex += queries.length;

    try {
        const results = await Promise.allSettled(
            queries.map(query => fetchSongs(query))
        );

        results.forEach(result => {
            if (result.status !== "fulfilled") {
                return;
            }

            result.value.forEach(song => {
                if (!songs.some(existing => existing.id === song.id)) {
                    songs.push(song);
                }
            });
        });

        if (songs.length > 1) {
            shuffleArray(songs);
        }

        if (songs.length > 0) {
            setStatus(`${songs.length} Indian music tracks found ❤️`);

            if (currentIndex === -1) {
                playRandomSong();
            }
        } else if (currentQueryIndex < searchQueries.length) {
            setStatus("Trying more Hindi music searches...");
        } else {
            setStatus("No tracks found. Please try again later.");
        }
    } catch (error) {
        setStatus("Unable to load music. Check your internet connection.");
    } finally {
        isLoading = false;
    }
}

function getNextIndex() {
    if (songs.length === 0) {
        return -1;
    }

    if (songs.length === 1) {
        return 0;
    }

    if (!isShuffle) {
        return (currentIndex + 1) % songs.length;
    }

    const available = songs
        .map((song, index) => ({ song, index }))
        .filter(({ song, index }) =>
            index !== currentIndex &&
            !playedSongs.has(song.id) &&
            !failedSongs.has(song.id)
        );

    if (available.length === 0) {
        playedSongs.clear();

        const remaining = songs
            .map((song, index) => ({ song, index }))
            .filter(({ song, index }) =>
                index !== currentIndex &&
                !failedSongs.has(song.id)
            );

        if (remaining.length === 0) {
            failedSongs.clear();
            return (currentIndex + 1) % songs.length;
        }

        return remaining[
            Math.floor(Math.random() * remaining.length)
        ].index;
    }

    return available[
        Math.floor(Math.random() * available.length)
    ].index;
}

async function playSong(index) {
    if (!songs.length || index < 0 || index >= songs.length) {
        return;
    }

    currentIndex = index;

    const song = songs[index];

    playedSongs.add(song.id);

    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    albumCover.src = song.artwork;
    albumCover.alt = `${song.title} album artwork`;

    albumCover.onerror = () => {
        albumCover.onerror = null;
        albumCover.src = "love-bg.jpeg";
    };

    audio.src = song.streamUrl;
    audio.load();

    playBtn.textContent = "⏳";
    setStatus(`Loading: ${song.title}`);

    try {
        await audio.play();

        playBtn.textContent = "⏸";
        setStatus(`Now playing: ${song.title} ❤️`);
    } catch (error) {
        playBtn.textContent = "▶";

        if (error.name === "NotAllowedError") {
            setStatus("Tap play to start the music.");
            return;
        }

        failedSongs.add(song.id);

        if (songs.some(item => !failedSongs.has(item.id))) {
            setStatus("This track is unavailable. Trying another...");
            setTimeout(playRandomSong, 500);
        } else {
            setStatus("No playable tracks found. Try again later.");
        }
    }

    if (
        songs.length < 1000 &&
        currentQueryIndex < searchQueries.length
    ) {
        loadSongs();
    }
}

function playRandomSong() {
    const index = getNextIndex();

    if (index !== -1) {
        playSong(index);
    } else if (currentQueryIndex < searchQueries.length) {
        loadSongs();
    } else {
        setStatus("No more tracks available.");
    }
}

playBtn.addEventListener("click", () => {
    if (!songs.length) {
        loadSongs();
        return;
    }

    if (audio.paused) {
        if (!audio.src) {
            playRandomSong();
            return;
        }

        audio.play()
            .then(() => {
                playBtn.textContent = "⏸";
            })
            .catch(() => {
                setStatus("Tap play again to start music.");
            });
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
});

nextBtn.addEventListener("click", playRandomSong);

prevBtn.addEventListener("click", () => {
    if (!songs.length) {
        return;
    }

    if (audio.currentTime > 3) {
        audio.currentTime = 0;
    } else if (!isShuffle && currentIndex > 0) {
        playSong(currentIndex - 1);
    } else {
        playRandomSong();
    }
});

shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle("active", isShuffle);
    shuffleBtn.setAttribute("aria-pressed", String(isShuffle));

    setStatus(
        isShuffle
            ? "Random Bollywood shuffle enabled 🔀"
            : "Sequential playback enabled"
    );
});

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(audio.currentTime);

    if (Number.isFinite(audio.duration) && audio.duration > 0) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
    }
});

progressBar.addEventListener("input", () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
        audio.currentTime =
            (Number(progressBar.value) / 100) * audio.duration;
    }
});

audio.addEventListener("ended", playRandomSong);

audio.addEventListener("error", () => {
    if (currentIndex !== -1) {
        failedSongs.add(songs[currentIndex].id);

        if (songs.some(song => !failedSongs.has(song.id))) {
            setTimeout(playRandomSong, 500);
        } else {
            setStatus("Unable to play tracks. Try again later.");
        }
    }
});

audio.volume = 0.8;

letterBtn.addEventListener("click", () => {
    letterModal.classList.add("show");
});

document.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", () => {
        button.closest(".modal").classList.remove("show");
    });
});

document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal.show").forEach(modal => {
            modal.classList.remove("show");
        });
    }
});

function createHearts(count) {
    const symbols = ["❤️", "💗", "💕", "💖", "💘"];

    for (let i = 0; i < count; i++) {
        const heart = document.createElement("span");

        heart.className = "heart-particle";
        heart.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDelay = `${Math.random() * 1.5}s`;

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);
    }
}

loveBtn.addEventListener("click", () => {
    createHearts(20);

    infoTitle.textContent = "A Little Love ❤️";
    infoText.textContent =
        "In every lifetime, I would still choose you. " +
        "You are my happiness and my favorite person.";

    infoModal.classList.add("show");
});

nightBtn.addEventListener("click", () => {
    document.body.classList.toggle("night-theme");

    const isNight = document.body.classList.contains("night-theme");

    nightBtn.innerHTML = isNight
        ? '<i class="fa-solid fa-sun"></i> Day'
        : '<i class="fa-solid fa-moon"></i> Night';
});

surpriseBtn.addEventListener("click", () => {
    createHearts(35);

    const messages = [
        "You are my favorite notification. ❤️",
        "Every love song reminds me of you. 🎵",
        "You make ordinary moments magical. ✨",
        "My favorite place is beside you. 💗",
        "You are my favorite melody. 🎶",
        "You are the reason behind my happiest smiles. 🥰",
        "One heart, one love, and that is you. 💞"
    ];

    infoTitle.textContent = "Your Little Surprise ✨";
    infoText.textContent =
        messages[Math.floor(Math.random() * messages.length)];

    infoModal.classList.add("show");
});

shuffleBtn.classList.add("active");
shuffleBtn.setAttribute("aria-pressed", "true");

loadSongs();

aboutNav.addEventListener("click", function (event) {
    event.preventDefault();

    aboutSection.classList.toggle("about-visible");

    if (aboutSection.classList.contains("about-visible")) {
        aboutSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});