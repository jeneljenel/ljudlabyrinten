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
    "onHelp": function (state, trigger) {
        // does nothing on station load
    },
    "playAudio": function (state, trigger) {
        console.log("play audio because trigger: ", trigger);

        state.playAudio(trigger.audioFilename, trigger.audioType);
    },
    "startTimeLimit": function (state, trigger) {
        console.log("starting timer");
        let timer = window.setTimeout(function () {
            interpretTrigger(state, trigger.timeLimitEnd);
        }, trigger.timeLimit * 1000);
        state.user.timers[trigger.timerName] = timer;
    },
    "goToStation": function (state, trigger) {
        state.tryStory(trigger.toStation);
    },
    "cancelTimer": function (state, trigger) {
        let timer = state.user.timers[trigger.timerName];
        if (timer !== undefined) {
            window.clearTimeout(timer);
            console.log("cancelled timer:", trigger.timerName, "reason: station trigger");
            state.user.timers[trigger.timerName] = "cancelled";
        }
    }
}

let onLeave = {
    "startTimeLimit": function (state, trigger) {
        if (trigger.cancelOnLeave && state.user.timers[trigger.timerName]) {
            let timer = state.user.timers[trigger.timerName];
            window.clearTimeout(timer);
            console.log("cancelled timer:", trigger.timerName, "reason: cancelOnLeave was set");
            state.user.timers[trigger.timerName] = "cancelled";
        }
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

function triggerOnLeave(state, trigger) {
    if (trigger.trigger !== undefined) {
        if (onLeave[trigger.trigger]) {
            onLeave[trigger.trigger](state, trigger);
        }
    }
}

let stationLogic = {
    getTags(user) {

    },
    interpretStation(state, station) {
        let leavingStation = state.user.stationsVisited[state.user.stationsVisited.length - 1];
        if (leavingStation !== undefined) {
            leavingStation.triggers.forEach(trigger => {
                triggerOnLeave(state, trigger);
            });
        }

        station.triggers.forEach(trigger => {
            if (interpretCondition(state, trigger)) {
                interpretTrigger(state, trigger);
            }
        });

        station.tags.forEach(tag => {
            state.user.tags.push(tag)
        })
        
        state.user.stationsVisited.push(station);
    },
    doHelp(state) {
        let station = state.user.stationsVisited[state.user.stationsVisited.length - 1];
        if (station !== undefined) {
            if (state.user.helpAvailable > 0 && station.helpUsed === undefined) {
                station.triggers.forEach(trigger => {
                    if (trigger.trigger == "onHelp") {
                        interpretTrigger(state, trigger.runTrigger);
                    }
                });
                state.user.helpAvailable--;
                station.helpUsed = true;
            } else {
                interpretTrigger(state, {
                    trigger: "playAudio",
                    audioType: "help", 
                    audioFilename: "out-of-help.mp3"
                })
            }
        }

    }
}

window.Station = stationLogic;
