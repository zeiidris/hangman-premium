const buttons = document.querySelectorAll('.choosen')
const chooseScreen = document.getElementById('choose')
const parts = document.querySelectorAll('.figure-part')
const wrongLettersEl = document.getElementById('wrongLetters')
const correctWord = document.getElementById('correct-word')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const message = document.getElementById('message')
const playBtn = document.getElementById('btn')
const popup = document.getElementById('popup-notification-container')
const applause =document.getElementById('win')
const boo = document.getElementById('boo')
const wrong = document.getElementById('wrong')
const animals = ["Aardvark","Albatross","Alligator","Alpaca","Ant","Anteater","Antelope","Ape","Armadillo","Donkey","Baboon","Badger","Barracuda","Bat","Bear","Beaver","Bee","Bison","Boar","Buffalo","Butterfly","Camel","Capybara","Caribou","Cassowary","Cat","Caterpillar","Cattle","Chamois","Cheetah","Chicken","Chimpanzee","Chinchilla","Chough","Clam","Cobra","Cockroach","Cod","Cormorant","Coyote","Crab","Crane","Crocodile","Crow","Curlew","Deer","Dinosaur","Dog","Dogfish","Dolphin","Dotterel","Dove","Dragonfly","Duck","Dugong","Dunlin","Eagle","Echidna","Eel","Eland","Elephant","Elk","Emu","Falcon","Ferret","Finch","Fish","Flamingo","Fly","Fox","Frog","Gaur","Gazelle","Gerbil","Giraffe","Gnat","Gnu","Goat","Goldfinch","Goldfish","Goose","Gorilla","Goshawk","Grasshopper","Grouse","Guanaco","Gull","Hamster","Hare","Hawk","Hedgehog","Heron","Herring","Hippopotamus","Hornet","Horse","Human","Hummingbird","Hyena","Ibex","Ibis","Jackal","Jaguar","Jay","Jellyfish","Kangaroo","Kingfisher","Koala","Kookabura","Kouprey","Kudu","Lapwing","Lark","Lemur","Leopard","Lion","Llama","Lobster","Locust","Loris","Louse","Lyrebird","Magpie","Mallard","Manatee","Mandrill","Mantis","Marten","Meerkat","Mink","Mole","Mongoose","Monkey","Moose","Mosquito","Mouse","Mule","Narwhal","Newt","Nightingale","Octopus","Okapi","Opossum","Oryx","Ostrich","Otter","Owl","Oyster","Panther","Parrot","Partridge","Peafowl","Pelican","Penguin","Pheasant","Pig","Pigeon","Pony","Porcupine","Porpoise","Quail","Quelea","Quetzal","Rabbit","Raccoon","Rail","Ram","Rat","Raven","Reindeer","Rhinoceros","Rook","Salamander","Salmon","Sand Dollar","Sandpiper","Sardine","Scorpion","Seahorse","Seal","Shark","Sheep","Shrew","Skunk","Snail","Snake","Sparrow","Spider","Spoonbill","Squid","Squirrel","Starling","Stingray","Stinkbug","Stork","Swallow","Swan","Tapir","Tarsier","Termite","Tiger","Toad","Trout","Turtle","Viper","Vulture","Wallaby","Walrus","Wasp","Weasel","Whale","Wildcat","Wolf","Wolverine","Wombat","Woodcock","Woodpecker","Worm","Wren","Yak","Zebra"]
const computer = ['mouse', 'microphone', 'battery', 'calculator', 'controller', 'monitor','printer','laptop','keyboard','speakers', 'disc', 'tablet', 'phone','plug']
const subjects = ['maths', 'physics', 'music', 'spanish', 'chemistry', 'English', 'geography','computing', 'french', 'art', 'history', 'biology']
const D2s3 = ['idris','taha','tiss','greche']
const correctLetters = []
const wrongLetters = []
let selected 
let playable = true
// get random word
buttons.forEach(button =>{ 
    button.addEventListener('click',e => {
        chooseScreen.style.marginTop = "-100vh"
        if (e.target.id === 'animals') {
            randomWord(animals)    
        } else if(e.target.id === 'computer') {
            randomWord(computer)
        }else if(e.target.id === '2s3'){
            randomWord(D2s3)
        }else if(e.target.id === 'subjects'){
            randomWord(subjects)
        }
        displayWord()
    })
} )
function randomWord(word){
    selected = word[Math.floor(Math.random() * word.length)].toLowerCase()
}
// display correct word
function displayWord(){
    if(playable){
    correctWord.innerHTML = `${selected.split('').map(letter => `<span class='letter'>${correctLetters.includes(letter) ? letter : ''}</span>`).join('')}`
    const innerWord = correctWord.innerText.replace(/\n/g,'')
    if(innerWord == selected){
        finalMessage.innerHTML = "Congratulation, you win 😎"
        message.innerHTML = ''
        applause.play()
        popup.style.display = 'flex'
        playable = false
    }}
}

//keyboard click
window.addEventListener('keydown',e=>{
    if(playable){
    if(e.keyCode >= 65 && e.keyCode<=90){
        const letter = e.key
        displayWord()
        if(selected.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)
                displayWord()
            } 
        else{
                showNotification()
            }}
        else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)
                updateWrongLetters()
                wrong.currentTime = 0
                wrong.play()
            }else{
                showNotification()
            }
    }}}
})

// show notification telling about a clicked letter
function showNotification(){
    notification.classList.add('show')
    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000);
}
// show wrong letters
function updateWrongLetters(){
    if(playable){
    const errors = wrongLetters.length
    wrongLettersEl.innerHTML =`<p>Wrong:</p>${wrongLetters.map(letter => `<span>${letter}</span>`)}`
    parts.forEach((part,idx) =>{
        if(idx < errors){
            part.style.display ="block"
        }else{
            part.style.display = "none"
        }if(errors == parts.length){
            finalMessage.innerHTML = "Unfortunately, you lost. 😕"
            message.innerHTML = `... the word was:"${selected}"`
            boo.play()
            popup.style.display = 'flex'
            playable = false
        }
    })}
}
playBtn.addEventListener('click',()=>{
    correctLetters.splice(0)
    wrongLetters.splice(0)
    popup.style.display = "none"
    wrongLettersEl.innerHTML = ""
    chooseScreen.style.marginTop = '0'
    parts.forEach(part =>part.style.display = "none")
    randomWord([''])
    document.querySelectorAll('.audio').forEach(audio =>{
        setTimeout(() => {
            audio.pause()
            audio.currentTime = 0   
        }, 200);

    })
    playable =true
})