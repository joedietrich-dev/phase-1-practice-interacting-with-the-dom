const counter = document.getElementById('counter');
const pauseButton = document.getElementById('pause');
const plusButton = document.getElementById('plus');
const minusButton = document.getElementById('minus');
const heartButton = document.getElementById('heart');
const likeList = document.querySelector('.likes');
const commentField = document.getElementById('comment-input');
const commentForm = document.getElementById('comment-form');
const commentList = document.getElementById('list');

let counterInterval;
let isTicking;

function startTimer() {
  clearInterval(counterInterval);
  if (!isTicking) {
    isTicking = true;
    counterInterval = setInterval(() => {
      const counterValue = counter.innerText;
      counter.innerText = parseInt(counterValue, 10) + 1;
    }, 1000);
  } else {
    return counterInterval;
  }
}
function stopTimer() {
  isTicking = false;
  console.log(counterInterval)
  clearInterval(counterInterval);
}
function disableButtons() {
  const functionButtons = document.querySelectorAll('button');
  functionButtons.forEach(button => {
    if (button !== pauseButton) button.disabled = true;
  })
}
function enableButtons() {
  const functionButtons = document.querySelectorAll('button');
  functionButtons.forEach(button => {
    if (button !== pauseButton) button.disabled = false;
  })
}
function changeTime(increment) {
  counter.innerText = parseInt(counter.innerText) + increment;
}

pauseButton.addEventListener('click', () => {
  if (isTicking) {
    stopTimer();
    disableButtons();
    pauseButton.innerText = 'resume';
  } else {
    startTimer();
    enableButtons();
    pauseButton.innerText = 'pause';
  }
})
plusButton.addEventListener('click', () => {
  changeTime(1);
})
minusButton.addEventListener('click', () => {
  changeTime(-1);
})
commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const comment = commentField.value;
  const commentContainer = document.createElement('p');
  commentContainer.innerText = comment;
  commentList.appendChild(commentContainer);
  commentForm.reset();
})
heartButton.addEventListener('click', () => {
  const likedTime = counter.innerText;
  const likedId = likedTime + '-likes';
  const oldLikedItem = document.getElementById(likedId);
  const newLikedItem = document.createElement('li');
  const likes = parseInt(oldLikedItem?.dataset?.likes) + 1 || 1;
  newLikedItem.dataset.likes = likes;
  newLikedItem.innerText = `${likedTime} has been liked ${likes} times`;
  newLikedItem.id = likedId
  if (oldLikedItem) {
    likeList.replaceChild(newLikedItem, oldLikedItem);
  } else {
    likeList.appendChild(newLikedItem);
  }
})

startTimer();

