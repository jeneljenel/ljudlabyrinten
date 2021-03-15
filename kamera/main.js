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
        storiesVisited: [], // array of story ids already visited
        actsVisited: [], // array of act ids already visited
        scariness: 1 // 1-3, 3 is terrifying
    },
    audio: {
        audioElement: null,
        playing: false,
        playStatus: "gurka"
    },
    fakeScan: function() {
        var story_id = "ljudfil1";
            this.user.showQRScanner = false;
            var story = loadStory(story_id);
            // var audioPath = "/data/audio/" + story_id + "-level-" + this.user.scariness + ".mp4";
            var audioPath = "ljudfiler/ljudfil1.mp4";
            this.story.audioPath = audioPath;
            this.story.data = story;
            this.story.loaded = true;
    },
    showQRScanner: function () {
        this.user.showQRScanner = true;
        scanQRCode(story_id => {
            this.user.showQRScanner = false;
            var story = loadStory(story_id);
            var audioPath = "/data/audio/" + story_id + "-level-" + this.user.scariness + ".mp4";
            var audioPath = "data/audio/ljudfil1-level-1.mp3";
            this.story.audioPath = audioPath;
            this.story.data = story;
            this.story.loaded = true;
            var audioElement = loadAudio(audioPath);
            this.audio.audioElement = audioElement;
            
            // load audio
            // start playing audio
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

function loadAudio(audioPath) {
    var x = document.getElementById("myAudio");    
    return x;
}

function loadStory(story_id) {
    return {
        id: "story1",
        act: "1",
        title: "My title goes here"
    };
}

window.state = state;