// Burger Menu
export const burgerMenu = () => {
  const burger = document.querySelector('.burger'),
        menu = document.querySelector('.nav__menu'),
        body = document.querySelector('body'),
        navBtns = document.querySelector('.nav__btns');

  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active');
      burger.classList.add('active-burger');
      body.classList.add('locked');
    } else {
      menu.classList.remove('active');
      burger.classList.remove('active-burger');
      body.classList.remove('locked');
    }
  });
  // Navbar Breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active');
      burger.classList.remove('active-burger');
      body.classList.remove('locked');
      navBtns.classList.remove('active');
    } else {
      menu.classList.add('active');
      burger.classList.add('active-burger');
      body.classList.add('locked');
      navBtns.classList.add('active');
    }
  });
};