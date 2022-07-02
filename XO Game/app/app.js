const Player1 = "x";
const Player2 = "o";

// გამარჯვებისთვის საჭირო ყველა შესაძლო კომბინაცია
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const board = document.getElementById("board");
// მასივი სადაც ვინახავთ ცხრილის თითოეულ უჯრას
const cellElements = document.querySelectorAll("[data-cell]");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);

// თამაშის ახლიდან დაწყება
restartButton.addEventListener("click", startGame);

// მთავარი ფუნქცია რომლის გამოძახებისასაც იწყება თამაში
function startGame() {
  PlayerTurn = false; // მოთამაშე რომელიც იწყებს თამაშს - false ? 'X' : 'O'
  cellElements.forEach((cell) => {
    // ახალი თამაშის დაწყებისას საჭიროა წავშალოთ წინა თამაშში შევსებული უჯრები
    cell.classList.remove(Player1);
    cell.classList.remove(Player2);
    cell.removeEventListener("click", handleClick);
    // თითოეული უკრის კლიკზე გამოვიძახოთ ფუნქცია
    // რომელიც უჯრაში ჩაწერს შესაბამის სიმბოლოს
    cell.addEventListener("click", handleClick, { once: true });
  });
  winningMessageElement.classList.remove("show");
}

// ფუნქცია რომელიც რეაგირებას მოახდენს უჯრის კლიკზე
function handleClick(e) {
  const cell = e.target;
  // შევამოწმოთ რომელი მოთამაშის სვლაა და უჯრაში ჩავწეროთ შესაბამისი სიმბოლო
  const currentClass = PlayerTurn ? Player1 : Player2;
  cell.classList.add(currentClass);
  // გამოვიძახოთ ფუნქცია რომელიც შეამოწმებს რომელიმე მოთამაშემ ხომ არ გაიმარჯვა
  if (checkWin(currentClass)) {
    // თუ ფუნქციის მიერ დაბრუნებული შედეგი ჭეშმარიტია
    // გაიმარჯვა მოთამაშემ რომლის სვლაც იყო
    endGame(false);
  } else if (isDraw()) {
    // ფუნქცია რომელიც შეამოწმებს თამაში დამთავრდა ფრით თუ არა
    // გამოვიძახოთ ფუნქცია რომელიც დაამთავრებს თამაშს და გამოიტანს შესაბამის შეტყობინებას
    endGame(true);
  } else {
    // შევცვალოთ მოთამაშე. X -> O || O -> X
    PlayerTurn = !PlayerTurn;
  }
}

// ფუნქცია რომელიც დაასრულებს თამაშს და გამოიტანს შესაბამის შეტყობინებას
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "ფრე!";
  } else {
    winningMessageTextElement.innerText = `გაიმარჯვა ${PlayerTurn ? "Player1-მა" : "Player2-მა"}!`;
  }
  winningMessageElement.classList.add("show");
}

// ფუნქცია რომელიც შეამოწმებს თამაში ფრით დასრულდა თუ არა
function isDraw() {
  // ცხრილის ყოველ უჯრაზე იტერაციისას შევამოწმოთ მასში ჩაწერილია თუ არა რაიმე სიმბოლო
  // თუ ცხრილის ყველა უჯრა შევსებულია დავაბრუნოთ true ანუ თამაში დასრულდა ფრით
  return [...cellElements].every(
    (cell) =>
      cell.classList.contains(Player1) || cell.classList.contains(Player2)
  );
}

// ფუნქცია რომელიც შეამოწმებს თუ რომელმა მოთამაშემ გაიმარჯვა
function checkWin(currentClass) {
  // შესაძლო კომბინაციებში იტერაციისას შევამოწმოთ მოთამაშის მიერ შევსებული კომბინაცია
  // თუ მიმდინარე მოთამაშის მიერ შევსებული კომბინაცია იქნება მასივში დავაბრუნოთ true
  return WINNING_COMBINATIONS.some((combination) =>
    combination.every((index) =>
      cellElements[index].classList.contains(currentClass)
    )
  );
}

startGame();
