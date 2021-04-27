
function state() {
    return {
        game: {
            isLoading: true,
        },
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
                effect: null,
                help: null,
            },
        },

        fakeId: "adventurer-01",

        startGame: function() {
            this.startGame();
        },

        fakeScan: function(story_id) {
            this.tryStory(story_id);
            this.user.showQRScanner = false;
        },

        showQRScanner: function () {
            this.user.showQRScanner = true;
            scanQRCode(story_id => {
                this.tryStory(story_id);
            });
        },
        
        tryStory: function (story_id, optionalUser) {
            let user = this.user;
            let state = this;
            if (optionalUser !== undefined) {
                user = optionalUser;
            }
            state.user = user;
            var story = loadStory(story_id, storyData => {
                window.Station.interpretStation(state, storyData);
            });
        },
        
        withUser: function (callback) {
            callback(this.user);
        },

        playAudio: function (filepath, type) {
            let story = this.story;
            let state = this;

            if (type ==" story" && story.isPlaying == true) {
                console.log("Story is playing, wait until finished.")
            } else {
                audio = new Audio("data/audio/" + filepath);
                if (this.audio.track[type] !== null) {
                    // Would be nice to fade it here...
                    this.audio.track[type].pause();
                }
                this.audio.track[type] = audio;
                this.audio.track[type].play();

                if (type == "story") {
                    story.isPlaying = true;
                    console.log("story isPlaying value should be set to true: ", story.isPlaying)
                    this.audio.track[type].addEventListener("ended", () => {
                        state.storyAudioEnded();
                    });
                } else {
                    console.log("File type: ", type, " story.isPlaying: ", story.isPlaying);
                }
            }
        },

        storyAudioEnded: function () {
            this.story.isPlaying = false;            
        }
    };
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

function startGame() {
    console.log("startar timer ... ska stänga av om 5...")
    window.setTimeout(function () {
        interpretTrigger(state, this.game.isLoading = false);
    }, 5 * 1000);
}



window.state = state;