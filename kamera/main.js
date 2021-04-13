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

    data/audio
        - Type: vissa sortes ljudspår ska kunna avbrytas såsom bakgrundsljud. Men användaren ska inte avbryta en story? 

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
        isPlaying: false,
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
        track: {
            story: null,
            music: null,
            message: null,
            effect: null
        },
    },
    fakeId: "audio-and-timer",
    
    init: function () {
        // var audioElement = getAudio();
        // audioElement.addEventListener('canplaythrough', event => {
        //     audioElement.play();
        // });
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
    
    tryStory: function (story_id, optionalUser) {
        let user = this.user;
        if (optionalUser !== undefined) {
            user = optionalUser;
        }
        var story = loadStory(story_id, storyData => {
            window.Station.interpretStation(user, storyData);
        });
    },
    
    withUser: function (callback) {
        callback(this.user);
    },

    playAudio: function (filepath, type) {
        if (this.audio.track[type] !== null) {
            this.audio.track[type].pause();
        }
        audio = new Audio("data/audio/" + filepath);
        this.audio.track[type] = audio;
        this.audio.track[type].play();
        // Handle story type; do not interupt a story
        if (type == "story") {
            this.story.isPlaying = true;
            this.audio.track[type].addEventListener("ended", event => {
                console.log("Ended")
                window.state.storyAudioEnded();
            });
        }
    },

    storyAudioEnded: function () {
        // TODO: This is not behaving with Alpine right now
        this.story.isPlaying = false;
        console.log(this.story.isPlaying);

    }
}

document.addEventListener("DOMContentLoaded", function() {
    window.initQR();
});

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