// საწყისი მონაცემები
const Arr = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
];

// შევინახოთ ინფორმაცია თამაშის დასრულების შესახებ
let finished = false;

// ფუნქცია რომელიც დახატავს ცხრილს
function drawBoard() {
    for (let i = 0; i < Arr.length; i++) {
        for (let j = 0; j < Arr.length; j++) {
            const block = "b" + i + j;
            // თუ უჯრა ცარიელი არ არის მაშინ ჩავწეროთ რიცხვი 
            if (Arr[i][j] != 0) {
                document.getElementById(block).innerHTML = Arr[i][j];
                document.getElementById(block).style.backgroundColor = "red";
            } else {
                // თუ უჯრა ცარიელია გავანულოთ უჯრის მნიშვნელობა და შევუცვალოთ ფერი
                document.getElementById(block).innerHTML = "";
                document.getElementById(block).style.backgroundColor = "white";
            }
        }
    }
}

// ფუნქცია რომელიც აურევს მასივის ელემენტებს
function shuffle() {
    // Arr.map(() => Math.random() - 0.5);
    for (let i = 0; i < Arr.length; i++) {
        for (let j = 0; j < Arr[i].length; j++) {
            const i1 = Math.floor(Math.random() * Arr.length);
            const j1 = Math.floor(Math.random() * Arr.length);
            [Arr[i][j], Arr[i1][j1]] = [Arr[i1][j1], Arr[i][j]];
        }
    }
    drawBoard()
}

// ფუნქცია რომელიც ადგილებს გაუცვლის ელემენტებს
function swapArr(oldX, oldy, newX, newY) {
    [Arr[oldX][oldY], Arr[newX][newY]] = [Arr[newX][newY], Arr[oldX][oldy]]
}

// ფუნქცია რომელიც ამოწმებს თუ რომელი მიმართულებით შეუძლია ელემენტს მოძრაობა
function moveBlock(x, y) {
    // ვამოწმებთ ელემენტის შესაძლო სვლას
    // მარცხნივ მოძრაობა
    if (x > 0 && Arr[x - 1][y] == 0) {
        [Arr[x][y], Arr[x - 1][y]] = [Arr[x - 1][y], Arr[x][y]]
    }
    // ზევით მოძრაობა
    else if (y > 0 && Arr[x][y - 1] == 0) {
        [Arr[x][y], Arr[x][y - 1]] = [Arr[x][y - 1], Arr[x][y]]
    }
    // მარჯვნივ მოძრაობა
    else if (x < 3 && Arr[x + 1][y] == 0) {
        [Arr[x][y], Arr[x + 1][y]] = [Arr[x + 1][y], Arr[x][y]]
    }
    // ქვევით მოძრაობა
    else if (y < 3 && Arr[x][y + 1] == 0) {
        [Arr[x][y], Arr[x][y + 1]] = [Arr[x][y + 1], Arr[x][y]]
    }
    drawBoard();
    check();
}

// ამოწმებს მასივის ელემენტები დალაგებულია თუ არა
function check() {
    let incr = 1;
    for (let i = 0; i < Arr.length; i++) {
        for (let j = 0; j < Arr.length; j++) {
            if (incr == 16) incr = 0;            
            if (Arr[i][j] != incr) return;
            else incr++;
        }
    }
    document.getElementById("demo").innerHTML = "You win!";
}

drawBoard();
