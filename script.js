const answers = {};

const boxes = document.querySelectorAll('.choice-grid div');

for (const box of boxes) {
    box.addEventListener('click', clickBox);
}

function findResult(){
    if(answers.one === answers.two || answers.one === answers.three)
        return answers.one;
    if(answers.two === answers.one || answers.two === answers.three)
        return answers.two;
    if(answers.three === answers.one || answers.three === answers.two)
        return answers.three;
    return answers.one;
}

function endResult(key){
    console.log(RESULTS_MAP[key]);
    const show = document.querySelector('#result');
    show.querySelector('h1').textContent = RESULTS_MAP[key].title;
    show.querySelector('p').textContent = RESULTS_MAP[key].contents;
    show.classList.remove('hidden');
    const button = document.querySelector('#button');
    button.addEventListener('click',resetQuiz);
}

function resetQuiz(){
    for (const key in answers) {
        delete answers[key];
    }
    console.log(answers);
    const unshow = document.querySelector('#result');
    unshow.classList.add('hidden');
    for (const box of boxes) {
        box.classList.remove('opacity');
        box.classList.remove('selected');
        box.addEventListener('click', clickBox);
        box.querySelector('.checkbox').src = "images/unchecked.png";
    }

}

function getOpacity(selected){
    const ansId = selected.dataset.choiceId;
    const listAnswer = selected.parentNode.querySelectorAll('div');
    for (const ans of listAnswer) {
        if(ans.dataset.choiceId !== ansId){
            ans.classList.add('opacity');
            ans.querySelector('.checkbox').src = "images/unchecked.png";
            ans.classList.remove('selected');
        }
    }
}

function clickBox(event){
    console.log("selected");
    const box = event.currentTarget;

    box.querySelector('.checkbox').src = "images/checked.png";
    box.classList.add('selected');
    box.classList.remove('opacity');

    getOpacity(box);

    answers[box.dataset.questionId] = box.dataset.choiceId;
    console.log(answers)

    if(answers.one && answers.two && answers.three){
        for (const box of boxes) {
            box.removeEventListener('click', clickBox);
        }
        console.log('Finito selezione');
        endResult(findResult());
    }
}
