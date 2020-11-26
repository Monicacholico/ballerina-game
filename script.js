const scenarios = document.querySelectorAll('.scenario');
const counter = document.querySelector('.counter');
const ballerinas = document.querySelectorAll('.ballerina');
let lastScenario;
let timeUp = false;
let score = 0;

console.log('hello');

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomScenario(scenarios) {
    const idx = Math.floor(Math.random() * scenarios.length);
    const scenario = scenarios[idx];
    if(scenario === lastScenario) {
        console.log('Nah, that is the same one')
        return randomScenario(scenarios);
    }
    lastScenario = scenario;

    console.log(scenario);

    return scenario;
}

function popUp() {
    const time = randomTime(200, 1000);
    const scenario = randomScenario(scenarios);
    scenario.classList.add('up');
    setTimeout(() => {
        scenario.classList.remove('up');
        if(!timeUp) {
            popUp();
        }
    }, time)
}

function startGame() {
    score = 0;
    counter.textContent = 0;
    timeUp = false;
    popUp();
    setTimeout(() => timeUp = true, 10000);
}

function bonk(e) {
 if(!e.isTrusted) return;
 score++;
 this.classList.remove('up');
 counter.textContent = score;

}

const button = document.querySelector('button');
button.addEventListener('click', startGame);
ballerinas.forEach(ballerina => ballerina.addEventListener('click', bonk))