const images = [`img/o.png`, `img/x.png`];
const mStyle = ['o', 'x'];
let moves = ['', '', '', '', '', '', '', '', ''];
let mCounter = 0;
function mainGame(index) {
    let bgImage = document.getElementById('t' + index);
    document.getElementById('b' + index).setAttribute('hidden', true);
    bgImage.style.backgroundImage = `url('${images[1]}')`;
    moves[index] = mStyle[1];
    let button = document.getElementsByClassName('button');
    for (var i = 0; i < button.length; i++) {
        button[i].setAttribute('disabled', true);
    }
    mCounter++;
    if (mCounter > 4 && determineWinner() != '0') {
        document.getElementById('resutlmsg').style.opacity = 1;
        document.getElementById('result').innerText = determineWinner();
        return;
    }
    setTimeout(() => {
        cMove();
        if (mCounter > 4 && determineWinner() != '0') {
            document.getElementById('resutlmsg').style.opacity = 1;
            document.getElementById('result').innerText = determineWinner();
            return;
        }
        for (var i = 0; i < button.length; i++) {
            button[i].disabled = false;
        }

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