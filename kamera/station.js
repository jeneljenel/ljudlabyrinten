// Interpret stations

let conditions = {
    "hasTag": function (user, tag) {
        console.log(user, tag);
        //TODO: Add logic to check tag to user
        return true;
    },
    "isItFriday": function (user, bla) {
        // Vad är det för dag?
        return true;
    }
};

let triggers = {
    "playAudio": function (user, trigger) {
        console.log("play audio", trigger);
        // TODO: Add audio playing
    },
    "startTimeLimit": function (user, trigger) {
        // TODO: gör allt det svåra
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
        // TODO: add tags to user
    }
}

window.Station = stationLogic;
