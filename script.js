const progressBar = document.querySelector('.progress-bar');
const progressText = document.querySelector('.progress-text');
const mainContent = document.querySelector('main');
const navItems = document.querySelectorAll('.nav-item');

mainContent.addEventListener('scroll', () => {
  const scrollPos = mainContent.scrollTop;
  const scrollMax = mainContent.scrollHeight - mainContent.offsetHeight;
  const percentage = scrollPos / scrollMax;
  progressBar.style.width = `${percentage * 100}%`;
  progressText.textContent = `${percentage}`;
});
