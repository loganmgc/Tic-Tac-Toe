const images = [`img/o.png`, `img/x.png`];
const mStyle = ['o', 'x'];
let moves = ['', '', '', '', '', '', '', '', ''];
let mCounter = 0;
const button = document.getElementsByClassName('button');
function mainGame(index) {
    let bgImage = document.getElementById('t' + index);
    document.getElementById('b' + index).setAttribute('hidden', true);
    bgImage.style.backgroundImage = `url('${images[1]}')`;
    moves[index] = mStyle[1];
    disableButtons(true);
    mCounter++;
    if (mCounter > 4 && determineWinner() != '0') {
        updateResultMessage();
        return;
    }
    setTimeout(() => {
        cMove();
        if (mCounter > 4 && determineWinner() != '0') {
            updateResultMessage();
            return;
        }
        disableButtons(false);
    }, 1500);
}
function cMove() {
    let comMove = moveDecision();
    document.getElementById('t' + comMove).style.backgroundImage = `url('${images[0]}')`;
    moves[comMove] = mStyle[0];
    document.getElementById('b' + comMove).hidden = true;
    mCounter++;
}
function moveDecision() {
    if (mCounter === 1 && moves[4] === '') {
        return 4;
    }
    const comMove = movePatterns();
    if (comMove !== null) {
        return comMove;
    }
    while (true) {
        const randomMove = Math.floor(Math.random() * 9);
        if (moves[randomMove] == '') {
            return randomMove;
        }
    }
}
function movePatterns() {
    const winPatterns = [
        [1, 2, 0], [3, 6, 0], [4, 8, 0], [4, 7, 1], [0, 1, 2],
        [4, 6, 2], [5, 8, 2], [4, 5, 3], [3, 4, 5], [0, 3, 6],
        [2, 4, 6], [7, 8, 6], [1, 4, 7], [0, 4, 8], [2, 5, 8],
        [6, 7, 8], [0, 2, 1], [0, 6, 3], [0, 8, 4], [1, 7, 4],
        [2, 6, 4], [3, 5, 4], [2, 8, 5], [6, 8, 7]
    ];
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (moves[a] === 'o' && moves[a] === moves[b] && moves[c] === '') {
            return c;
        }
    }
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (moves[a] !== '' && moves[a] === moves[b] && moves[c] === '') {
            return c;
        }
    }
    return null;
}
function determineWinner() {
    const winner = checkWin();
    if (winner) {
        return winner === 'x' ? 'YOU WIN' : 'YOU LOSE';
    } else if (!winner && mCounter == 9) {
        return 'DRAW';
    }
    return '0';
}
function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
            return moves[a];
        }
    }
    return null;
}
function disableButtons(state) {
    let buttons = document.getElementsByClassName('button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = state;
    }
}
function updateResultMessage() {
    document.getElementById('result-message-container').style.opacity = 1;
    document.getElementById('result-message').innerText = determineWinner();
    button[9].removeAttribute('disabled');
}
function newGame() {
    for (var i = 0; i < moves.length; i++) {
        moves[i] = '';
        document.getElementById('b' + i).removeAttribute('hidden');
        document.getElementById('t' + i).style.backgroundImage = '';
    }
    disableButtons(false);
    document.getElementById('result-message-container').style.opacity = 0;
    mCounter = 0;
}