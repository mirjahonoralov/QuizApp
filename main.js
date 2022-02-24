const TEST_NUMBER = document.getElementById("test_number");
const TIMER = document.getElementById("timer");
const NUM_1 = document.querySelector(".num_1");
const NUM_2 = document.querySelector(".num_2");
const OPERTATION = document.querySelector(".operation");
const ANSWERS_CONTENT = document.querySelector(".answers_content");
const POINTS = document.querySelector(".points");
const RESULT = document.querySelector(".result");
let testList = [];
let interval;

// LOGICAL

const randomNumber = (a = 50, b = 50) =>
  Math.floor([a - b, a + b][Math.floor(Math.random() * 2)] * Math.random());

const randomOperation = () => ["+", "-", "*"][Math.floor(Math.random() * 3)];

const getAnswers = (correctAnswer) => {
  let answers = [correctAnswer];
  for (let i = 0; i < 3; i++) answers.push(randomNumber(correctAnswer, 50));
  return answers.sort(() => Math.random() - 0.5);
};

const pushPoint = (point) => {
  let element = 0;
  if (point === 1) element = "success";
  else if (point === -1) element = "failed";
  else element = "timed";
  const mark = document.createElement("div");
  mark.classList = `point ${element} me-3 my-2`;
  POINTS.appendChild(mark);
};

function checkAnswer(selectedAnswer) {
  let currentTest = testList[testList.length - 1];
  const { correctAnswer } = currentTest;
  if (selectedAnswer == correctAnswer) currentTest.answer_status = 1;
  else currentTest.answer_status = -1;
  clearInterval(interval);
  startQuiz();
}

const createTest = () => {
  if (testList.length > 0 && testList.length <= 10) {
    pushPoint(testList[testList.length - 1].answer_status);
    finishTest(testList);
  } else if (testList.length > 10) return;
  timer();
  const num_1 = randomNumber();
  const num_2 = randomNumber();
  const operation = randomOperation();
  const correctAnswer = eval(`${num_1} ${operation} ${num_2}`);
  const answers = getAnswers(correctAnswer);
  const test = {
    num_1,
    num_2,
    operation,
    correctAnswer,
    answers,
    answer_status: 0,
  };
  testList.push(test);
  renderCounter();
};

const finishTest = (testList) => {
  let success = 0,
    failed = 0,
    timed = 0;
  testList.forEach(({ answer_status }) => {
    if (answer_status === 1) success++;
    else if (answer_status === -1) failed++;
    else timed++;
  });
  RESULT.innerHTML = `
  <div class="col-sm col-6 p-0 mx-sm-3 text-center justify-content-center d-flex align-items-center">
    <span class="fw-bold">Succes</span></span> <div class="ms-2 result-point success">${success}</div>
  </div>
  <div class="col-sm col-6 p-0 mx-sm-3 text-center justify-content-center d-flex align-items-center">
    <span class="fw-bold">Failed</span> <div class="ms-2 result-point failed">${failed}</div>
  </div>
  <div class="col-sm col-6 p-0 mx-sm-3 text-center justify-content-center d-flex align-items-center">
    <span class="fw-bold">Timed</span> <div class="ms-2 result-point timed">${timed}</div>
  </div>
  `;
};

// RENDER

const renderCounter = () => (TEST_NUMBER.innerHTML = testList.length);

const renderCalculation = () => {
  const { num_1, num_2, operation } = testList[testList.length - 1];
  NUM_1.innerHTML = num_1;
  NUM_2.innerHTML = num_2;
  OPERTATION.innerHTML = operation;
};

const renderAnswers = () => {
  const { answers } = testList[testList.length - 1];
  const [a, b, c, d] = answers;
  ANSWERS_CONTENT.innerHTML = `
  <div class="col-9 m-auto">
    <div class="row">
        <div class="col p-3 text-white fs-3 text-center bg-secondary m-2 rounded-3" onclick="checkAnswer(this.innerText)">
          ${a}
        </div>
        <div class="col p-3 text-white fs-3 text-center bg-secondary m-2 rounded-3" onclick="checkAnswer(this.innerText)">
          ${b}
        </div>
    </div>
    <div class="row">
        <div class="col p-3 text-white fs-3 text-center bg-secondary m-2 rounded-3" onclick="checkAnswer(this.innerText)">
          ${c}
        </div>
        <div class="col p-3 text-white fs-3 text-center bg-secondary m-2 rounded-3" onclick="checkAnswer(this.innerText)">
          ${d}
        </div>
    </div>
  </div>
  `;
};

const timer = () => {
  let count = 10;
  interval = setInterval(() => {
    TIMER.innerHTML = --count;
    if (count === 0) {
      clearInterval(interval);
      startQuiz();
    }
  }, 1000);
};

function startQuiz() {
  createTest();
  renderCalculation();
  renderAnswers();
}

startQuiz();
