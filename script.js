const images = [`img/o.png`, `img/x.png`];
const mStyle = ['o', 'x'];
let moves = ['', '', '', '', '', '', '', '', ''];
let mCounter = 0;
var button = document.getElementsByClassName('button');
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
    while (true) {
        var comMove = Math.floor(Math.random() * 9);
        if (!cMoveControl(comMove)) continue;
        break;
    }
    document.getElementById('t' + comMove).style.backgroundImage = `url('${images[0]}')`;
    moves[comMove] = mStyle[0];
    document.getElementById('b' + comMove).hidden = true;
    mCounter++;
}
function cMoveControl(comMove) {
    if (moves[comMove] == '') return true;
    else return false;
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
        button[i].disabled = false;
    }
    document.getElementById('result-message-container').style.opacity = 0;
    mCounter = 0;
}