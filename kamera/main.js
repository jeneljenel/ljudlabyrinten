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
        scariness: 1 // 1-3, 3 is terrifying
    },
    audio: {
        audioElement: null,
        playing: false,
        playStatus: "gurka"
    },
    fakeId: "1",
    
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
            if (
                // Are we on the first station? Allow station 1 specifically
                (this.story.data.station_id === undefined && storyData.station_id == "1") ||
                // Otherwise, check if this station is allowed in current story
                (this.story.data.toStations.includes(storyData.station_id))
                ) {
                this.user.stationsVisited.push(storyData);
                this.user.showQRScanner = false;
                var audioPath = "/data/audio/" + story_id + "-level-" + this.user.scariness + ".mp4";
                this.story.audioPath = audioPath;
                this.story.data = storyData;
                this.story.loaded = true;
                var audioElement = getAudio();
                var source = getSource();
                source.src = audioPath;
                audioElement.load();
            } else {
                // TODO: Complain at user about their crappy scanning
                // only update this.story.audioPath
                console.log("illegal move");
            }
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