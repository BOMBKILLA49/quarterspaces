const countdown = document.querySelector('.countdown');
const countdownItems = document.querySelectorAll('.countdown-item');

const launchDate = new Date('2024-03-15 00:00:00');

function updateCountdown() {
  const currentTime = new Date();
  const timeDifference = launchDate - currentTime;

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  countdownItems.forEach((item, index) => {
    item.querySelector('.days').textContent = days;
    item.querySelector('.hours').textContent = hours;
    item.querySelector('.minutes').textContent = minutes;
    item.querySelector('.seconds').textContent = seconds;
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);