# TODO
- Timer @timer

# TODO - for fun / experimental
- Fix style on webpage
- Fix drop-down menu for fake

# DONE
- Play audio
- Stop play audio
- Handle ended audio files in the GUI.

## Timer {Timer}
En timer för hela sagan.
- sagan är uppdelad i ett par delar.

- efter x minuter ska sagan

Scenario A - adventurer:
    Story 1 (del 1 i den linjära storyn)
    * Timer 1 på.
        1. spela ljudfilen klart
        2. sätt på bakgrundsmusik
        3. innan Timer 1 är slut sätt på hjälpfil för att hitta till station 1 i Akt 1.
        (4. när Timer 1 är slut = sätt på ljudfil station 1 i Akt 1. )

    Akt 1 (innehåller 5 fristående stationer, 5 fristeående audiotracks) 
    * Timer 2 sätts på (för hela Akt 1) 15 sek
        1.

    
    Story 2 (del 2 i den linjära storyn)

    Story 3 (del 3 och sista delen av den linjära storyn)


# HELP
- ska kunna scanna en kod för att få hjälp VS att spela hjälp



# LARS Notes of data struktur
## Användaren:
    - Typ av användare (äventyrlig/klurig/engelsman)
    - Platser den redan varit
    - Val som har gjorts (koder som skannats, kanske samma som platser den varit)
## Station:
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