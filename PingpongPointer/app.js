const ResetBtn = document.querySelector('#ResetBtn')
const score = document.querySelector('#score')
const p1Name = document.querySelector('#p1Name')
const p2Name = document.querySelector('#p2Name')

const nameP1Value = document.createElement('span')
const nameP2Value = document.createElement('span')
// const scoreContiner = document.querySelector('#score-continer')


const nameEnterBtn = document.querySelector('#nameEnter')


const NameTagText = document.querySelector('#NameTagText')


const playerNameFrom = document.querySelector('#playerNameFrom')


const nameH1 = document.createElement('h1')
const span1 = document.createElement('span')
const span2 = document.createElement('span')
const vsSpan = document.createElement('span')


// 플레이어 이름 입력 
// 입력하지 않으면 게임 불가함
playerNameFrom.addEventListener('submit', function (e) {
    vsSpan.classList.remove('none')
    span1.innerText = p1Name.value;
    vsSpan.innerText = '  vs  ';
    span2.innerText = p2Name.value;
    if (p1.name.innerText !== '' && p2.name.innerText !== '') {
        p1Name.classList.add('none');
        p2Name.classList.add('none');
        nameEnterBtn.classList.add('none');
        NameTagText.append(nameH1);
        nameH1.append(span1);
        nameH1.append(vsSpan);
        nameH1.append(span2);

        isGameOver = false;
        p1.name = span1;
        p2.name = span2;
        // vsSpan.classList.add('none')
    } else if (p1.name.innerText === '' && p2.name.innerText === '') {
        alert("You can't submit empty name")
        vsSpan.classList.add('none')
    }
    e.preventDefault();
    nameH1.classList.remove('none')
})


// 버튼 하나 하나 설정하지 않고 설정들을
// 객체로 만들어 하나의 함수로 해당 버튼을 역할을 하게 만든다'
//  객체의 사용 방법을 알아내었다.
const p1 = {
    name: span1,
    score: 0,
    PlusButton: document.querySelector('#playerOneScoreBtn'),
    MinusButton: document.querySelector('#playerOneScoreMinusBtn'),
    scoreText: document.querySelector('#playerOne')
}

const p2 = {
    name: span2,
    score: 0,
    PlusButton: document.querySelector('#playerTwoScoreBtn'),
    MinusButton: document.querySelector('#playerTwoScoreMinusBtn'),
    scoreText: document.querySelector('#playerTwo')
};

let winningScore = parseInt(score.value);
let isGameOver = false;


// 함수 객체를 이용하여 하나의 함수로 버튼에 
// 이벤트 리스너 함수만 넣고 두개의 버튼 모두 같은 역할을 수행시킬 수 있다.

// 플러스 버튼 함수
function PlusButtonFunc(player, enemy) {
    // 상대의 점수가 이미 socre.value에 도달하고 게임을 종료하였음에도 
    // 나의 플러스 버튼을 눌렀읋 떄  alert를 보내며 누른 플러스만큼
    // 1 빼준다 게임 종류 이후에 실행되는 if문
    if (p1.name.innerText === '' && p1.name.innerText === '') {
        isGameOver = true;
        alert('Enter name!')
    }
    if (enemy.score === winningScore) {
        alert("you alread lose you can't up your score");
        player.score -= 1;
    }
    // isGameOver 변수가 false일 경우 실행하고 
    // 누르면 1점 + 설정해 놓은 점수에 도달하면 
    // 승자, 패자 색을 넣어주는 winner, loser 클래스 추가
    // isGameOver 변수 값을 true로 설정해주고 게임 종료를 알리며
    // 플러스 버튼은 잠긴다.
    else if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            player.scoreText.classList.add('winner');
            enemy.scoreText.classList.add('loser');
            player.name.classList.add('winner');
            enemy.name.classList.add('loser');
            isGameOver = true;
            player.PlusButton.disabled = true;
            enemy.PlusButton.disabled = true;

            // 이 if문은 탁구 룰에 따라 듀스를 실행문 이다.
            if (winningScore - enemy.score === 1) {
                winningScore += 1;
                // 반복문으로 함께 해당되는 설정은 줄여준다. 
                for (let p of [player, enemy]) {
                    p.scoreText.classList.remove('winner', 'loser');
                    p.name.classList.remove('winner', 'loser');
                    isGameOver = false;
                    p.PlusButton.disabled = false;
                }
            }
        }
        player.scoreText.textContent = player.score;
    }
}

// 객체 활용 플러스 함수 실행
p1.PlusButton.addEventListener('click', function () {
    PlusButtonFunc(p1, p2)
})
// 객체 활용 플러스 함수 실행
p2.PlusButton.addEventListener('click', function () {
    PlusButtonFunc(p2, p1)
})


// 마이너스 버튼 함수
function MinusButtonFunc(player, enemy) {
    // 플러스 버튼을 눌러 isGameOver변수를 true로 만들어 게임이 종료,
    // 승자와 패자가 결정된 경우 색상이 들어있는 경우에
    // 승자의 -버튼을 누르면 잠겨져 있던 플러스 버튼이 풀리고 색상 클래스가 
    // 제거되면서 점수를 빼주고 다시 게임 진행상황으로 돌아오게 할 수 있다.
    // 게임이 종료되 지 않는 상황에도 물론 작동한다.
    isGameOver = false;
    player.score -= 1;
    for (let p of [p1, p2]) {
        p.scoreText.classList.remove('loser', 'winner');
        p.name.classList.remove('loser', 'winner');
        p.PlusButton.disabled = false;
    }
    // 점수를 음수로 내릴 경우 작동하는  if문
    if (player.score < 0) {
        player.score += 1;
        alert("error! point can't smaller then 0");
    }
    // 게임 종료된 경우에 승자의 점수를 빼는 것이 아닌
    //  패자의 마이너스 버튼을 누른 경우 실행되는 if문
    if (enemy.score === winningScore) {
        alert('you already lose');
        player.PlusButton.disabled = true;
        enemy.PlusButton.disabled = true;
        player.scoreText.classList.add('loser');
        enemy.scoreText.classList.add('winner');
        player.name.classList.add('loser');
        enemy.name.classList.add('winner');
        player.score += 1;
    }
    player.scoreText.textContent = player.score;
}

p1.MinusButton.addEventListener('click', function () {
    MinusButtonFunc(p1, p2);
})

p2.MinusButton.addEventListener('click', function () {
    MinusButtonFunc(p2, p1);
})

// 게임 리셋 버튼 함수
function reset() {
    isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.scoreText.textContent = 0;
        p.scoreText.classList.remove('loser', 'winner');
        p.name.classList.remove('loser', 'winner');
        p.PlusButton.disabled = false;
    }
    p1Name.classList.remove('none')
    p2Name.classList.remove('none')
    nameEnterBtn.classList.remove('none')
    nameH1.classList.add('none')
    p1.name.innerText = ''
    p1Name.value = ''
    p2Name.value = ''
}

// 설정해놓은 게임 종류 점수를 바꾸는 html seletor의 숫자를 바꿀 시
// 진행 중이던 게임은 리셋되고 다시 시작하게 된다. 마치 리셋 버튼을 누른 것 처럼
score.addEventListener('change', function () {
    reset();
    winningScore = parseInt(this.value);
})

// 게임 리셋 실행 이벤트 리스너
ResetBtn.addEventListener('click', function () {
    reset();
})
