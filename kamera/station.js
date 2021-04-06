// Interpret stations

let conditions = {
    "hasTag": function (user, tag) {
        if (user.tags.indexOf(tag) > -1) {
            console.log('has tag', tag);
            return true;
        } else {
            console.log('no tag', tag);
            return false;
        }
        //TODO: Add logic to check tag to user
    },
    "isItFriday": function (user, bla) {
        // Vad är det för dag?
        return true;
    },
};

let triggers = {
    "playAudio": function (user, trigger) {
        console.log("play audio", trigger);
        console.log("spela: ", trigger.station_id);
        audio = new Audio("data/audio/" + trigger.audioFilename);
        audio.play();   
    },
    "startTimeLimit": function (user, trigger) {
        console.log("starting timer");
        window.setTimeout(function () {
            // TODO: Connect this back to Alpine so goToStation works right with tags
            interpretTrigger(user, trigger.timeLimitEnd);
        }, trigger.timeLimit * 1000);
    },
    "goToStation": function (user, trigger) {
        window.state.tryStory(trigger.toStation, user);
    }
}

function interpretCondition(user, trigger) {
    if (trigger.condition === undefined) {
        return true;
    } else {
        if (conditions[trigger.condition] !== undefined) {
            console.log("found condition!")
            return conditions[trigger.condition](user, trigger.conditionArgs);
        } else {
            console.log("fail")
            return false;
        }
    }
}

function interpretTrigger(user, trigger) {
    if (trigger.trigger !== undefined) {
        if (triggers[trigger.trigger] === undefined) {
            console.warn("Trigger not implemented", trigger.trigger);
        }
        triggers[trigger.trigger](user, trigger);
    }
}

let stationLogic = {
    getTags(user) {

    },
    interpretStation(user, station) {
        station.triggers.forEach(trigger => {
            if (interpretCondition(user, trigger)) {
                interpretTrigger(user, trigger);
            }
        });

        station.tags.forEach(tag => {
            user.tags.push(tag)
        })
        
        user.stationsVisited.push(station);
    }
}

window.Station = stationLogic;
