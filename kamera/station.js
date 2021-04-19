// Interpret stations

let conditions = {
    "hasTag": function (state, tag) {
        if (state.user.tags.indexOf(tag) > -1) {
            console.log('has tag', tag);
            return true;
        } else {
            console.log('no tag', tag);
            return false;
        }
        //TODO: Add logic to check tag to user
    },
    "isItFriday": function (state, bla) {
        // Vad är det för dag?
        return true;
    },
};

let triggers = {
    "playAudio": function (state, trigger) {
        console.log("play audio because trigger: ", trigger);

        state.playAudio(trigger.audioFilename, trigger.audioType);
    },
    "startTimeLimit": function (state, trigger) {
        console.log("starting timer");
        window.setTimeout(function () {
            interpretTrigger(state, trigger.timeLimitEnd);
        }, trigger.timeLimit * 1000);
    },
    "goToStation": function (state, trigger) {
        state.tryStory(trigger.toStation);
    }
}

function interpretCondition(state, trigger) {
    if (trigger.condition === undefined) {
        return true;
    } else {
        if (conditions[trigger.condition] !== undefined) {
            console.log("found condition!")
            return conditions[trigger.condition](state, trigger.conditionArgs);
        } else {
            // console.log("fail")
            return false;
        }
    }
}

function interpretTrigger(state, trigger) {
    if (trigger.trigger !== undefined) {
        if (triggers[trigger.trigger] === undefined) {
            console.warn("Trigger not implemented", trigger.trigger);
        }
        triggers[trigger.trigger](state, trigger);
    }
}

let stationLogic = {
    getTags(user) {

    },
    interpretStation(state, station) {
        station.triggers.forEach(trigger => {
            if (interpretCondition(state, trigger)) {
                interpretTrigger(state, trigger);
            }
        });

        station.tags.forEach(tag => {
            state.user.tags.push(tag)
        })
        
        state.user.stationsVisited.push(station);
    }
}

window.Station = stationLogic;
