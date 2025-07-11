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

document.addEventListener('DOMContentLoaded', function() {
  // Existing slideshow code (unchanged)
  const slides = document.querySelector('.slides');
  const slideElements = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;

  function updateSlidePosition() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlidePosition();
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slideElements.length) % slideElements.length;
    updateSlidePosition();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slideElements.length;
    updateSlidePosition();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.getAttribute('data-slide')));
    });
  });

  updateSlidePosition();

  // New shoppable form logic
  const form = document.getElementById('customize-form');
  const totalPriceElement = document.getElementById('total-price');
  const optionImage = document.getElementById('option-image');
  const basePrice = 44299; // Base price in dollars

  function updatePriceAndImage() {
    let totalPrice = basePrice;
    let selectedImage = 'images/default-option.jpg';

    // Get selected options and calculate total price
    const solar = document.getElementById('solar');
    const waterTank = document.getElementById('water-tank');
    const starlink = document.getElementById('starlink');
    const waterFilter = document.getElementById('water-filter');
    const cabinets = document.getElementById('cabinets');
    const shower = document.getElementById('shower');

    const options = [solar, waterTank, starlink, waterFilter, cabinets, shower];
    options.forEach(option => {
      const selectedOption = option.options[option.selectedIndex];
      totalPrice += parseInt(selectedOption.getAttribute('data-price')) || 0;
      // Update image to the last non-default selection
      if (selectedOption.getAttribute('data-image') !== 'images/default-option.jpg') {
        selectedImage = selectedOption.getAttribute('data-image');
      }
    });

    // Update total price display
    totalPriceElement.textContent = `$${totalPrice.toLocaleString()}`;

    // Update image
    optionImage.src = selectedImage;
    optionImage.alt = `Selected ${solar.value || waterTank.value || starlink.value || waterFilter.value || cabinets.value || shower.value} Option`;

    // Update form action for payment (replace with your payment URL structure)
    const paymentParams = `solar=${solar.value}&waterTank=${waterTank.value}&starlink=${starlink.value}&waterFilter=${waterFilter.value}&cabinets=${cabinets.value}&shower=${shower.value}&total=${totalPrice}`;
    form.action = `https://payment.com/checkout?${paymentParams}`;
  }

  // Add event listeners to all dropdowns
  const selects = document.querySelectorAll('select');
  selects.forEach(select => {
    select.addEventListener('change', updatePriceAndImage);
  });

  // Initialize price and image
  updatePriceAndImage();
});
