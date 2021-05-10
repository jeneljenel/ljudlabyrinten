
function state() {
    return {
        story: {
            isPlaying: false,
            data: {}
        },
        user: {
            showCamera: false,
            showQRScanner: false,
            audioSource: false,
            stationsVisited: [], // list of station visited
            scariness: 1, // 1-3, 3 is terrifying
            tags: [],
            timers: {},
            helpAvailable: 3
        },
        audio: {
            track: {
                story: null,
                music: null,
                // message: null,
                // effect: null,
                help: null,
            },
        },

        fakeId: "adventurer-01",

        fakeScan: function(story_id) {
            console.log("fakeScan", story_id);
            if (story_id == "help") {
                this.tryHelp();
            } else {
                this.tryStory(story_id);
                this.user.showQRScanner = false;
            }
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
            let visited = [];

            if (optionalUser !== undefined) {
                user = optionalUser;
            }
            state.user = user;

            for (var i = 0; i < user.stationsVisited.length; i++) {
                visited.push(user.stationsVisited[i].id)
            }
            
            if (visited.includes(story_id)) {
                console.log("can't play story user already visited.")
            } else {
                var story = loadStory(story_id, storyData => {
                    window.Station.interpretStation(state, storyData);
                });
            }
    
        },
        
        tryHelp: function () {
            window.Station.doHelp(this);
        },
        
        withUser: function (callback) {
            callback(this.user);
        },
        
        playAudio: function (filepath, type) {
            let story = this.story;
            let state = this;
            if (type == "story" && story.isPlaying == true) {
                console.log("Story is playing, wait until finished.")
            } else {
                audio = new Audio("data/audio/" + filepath);
               
               
                if (this.audio.track[type] !== null) {
                    if (this.audio.track[type] !== null) {
                
                        // Would be nice to fade it here...
                               var myAudio1 = document.getElementById("audioPlayer");
                                myAudio1.volume = 0;   
                         
                       var myAudio2 = document.getElementById("audioSource");
                                myAudio2.volume = 0;  

                                this.audio.track[type].volume = 0.001;
                              
                                //this.audio.track[type].pause();
                                
                            }
            }
                if (this.audio.track["music"]) {
                    this.audio.track["music"].pause();
                }
                this.audio.track[type] = audio;
                this.audio.track[type].play();

                if (type == "story") {
                    story.isPlaying = true;
                    // console.log("story isPlaying value should be set to true: ", story.isPlaying)
                    this.audio.track[type].addEventListener("ended", () => {
                        state.storyAudioEnded();
                    });
                } else {
                    this.audio.track[type].addEventListener("ended", () => {
                        this.audio.track["music"].play();
                    });
                    // console.log("File type: ", type, " story.isPlaying: ", story.isPlaying);
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


window.state = state;