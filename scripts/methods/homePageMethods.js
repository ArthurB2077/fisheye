window.addEventListener('scroll', (event) => {
  if (window.scrollY > 0) {
    document.getElementById('header-content').style.display = 'flex'
    document.getElementById('header-content').style.animation = 'fadein 0.75s forwards'
  } else {
    document.getElementById('header-content').style.animation = 'fadeout 0.75s forwards'
  }
})

document.getElementById('header-content').addEventListener('click', () => {
  window.scrollY = 0
})
