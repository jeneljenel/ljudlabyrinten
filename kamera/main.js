/*
    Användaren:
        - Typ av användare (äventyrlig/klurig/engelsman)
        - Platser den redan varit
        - Val som har gjorts (koder som skannats, kanske samma som platser den varit)

    Station:
        - Ljud ska troligen spelas upp
        - En eller flera timers kan startas och när den går ut händer NÅNTING
        - Spara värden för senare bruk
        - Deaktivera andra stationer
        - Aktivera andra stationer
        - Byta akt
        - Sätta ett tema (påverka musik och stämning)

    {
        id: "spoket-under-rulltrappan",
        name: "Spöket under rulltrappan",
        tags: [
            "danger",
            "puzzle"
        ],
        triggers: [
            // use-case, play simple audio
            {
                trigger: "playAudio",
                audioType: "story", // story|background
                audioFilename: "simpleaudio1.mp4"
            }
            
            // use-case, play different audio by player type
            {
                condition: "hasTag",
                conditionArgs: "adventurer",
                trigger: "playAudio",
                audioType: "story", // story|background
                audioFilename: "adventure1.mp4"
            },
            {
                condition: "hasTag",
                conditionArgs: "puzzler",
                trigger: "playAudio",
                audioType: "story", // story|background
                audioFilename: "puzzler1.mp4"
            },
            
            // use-case, play audio AND set timer for adventurers
            {
                condition: "hasTag",
                conditionArgs: "adventurer",
                trigger: "playAudio",
                audioType: "story", // story|background
                audioFilename: "adventure1.mp4"
            },
            {
                condition: "hasTag",
                conditionArgs: "adventurer",
                trigger: "startTimeLimit",
                timeLimit: 240,
                timeLimitFailure: "goToStation",
                timeLimitFailureArgs: "adventure-failed-1",
            },
        ]
    }

*/
var state = {
    story: {
        loaded: false,
        audioPath: null,
        data: {}
    },
    user: {
        showCamera: false,
        showQRScanner: false,
        audiosource: false,
        stationsVisited: [], // array of story ids already visited
        scariness: 1, // 1-3, 3 is terrifying
        tags: []
    },
    audio: {
        audioElement: null,
        playing: false,
        playStatus: "gurka"
    },
    fakeId: "play-simple-audio",
    
    init: function () {
        var audioElement = getAudio();
        audioElement.addEventListener('canplaythrough', event => {
            audioElement.play();
        });
    },
    
    fakeScan: function(story_id) {
        this.tryStory(story_id);
    },

    showQRScanner: function () {
        this.user.showQRScanner = true;
        scanQRCode(story_id => {
            this.tryStory(story_id);
        });
    },
    
    tryStory: function (story_id) {
        var story = loadStory(story_id, storyData => {
            window.Station.interpretStation(this.user, storyData);
        });
    },

    playPauseAudio: function () {
        if (this.audio.playing === false) {
            this.audio.playing = true;
            this.audio.audioElement.play();
        } else {
            this.audio.playing = false;
            this.audio.audioElement.pause();
        }
    }
}

function getAudio() {
    return document.getElementById("audioPlayer");    
}

function getSource() {
    return document.getElementById("audioSource");
}

function loadStory(story_id, callback) {
    $.get("data/stations/" + story_id + ".json", callback); 
}

window.state = state;