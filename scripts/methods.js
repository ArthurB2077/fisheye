const openModal = () => {
  Array.from(document.getElementsByClassName('bg-modal')).forEach(modal => {
    modal.style.display = 'block'
  })
}

const closeModal = () => {
  Array.from(document.getElementsByClassName('bg-modal')).forEach(modal => {
    modal.style.display = 'none'
  })
}

const logData = () => {
  for (let i = 0; i < event.target.form.length - 1; i++) {
    console.log(event.target.form[i].value)
  }
}

window.addEventListener('scroll', (event) => {
  if (window.scrollY > 0) {
    document.getElementById('header-content').style.display = 'flex'
    document.getElementById('header-content').style.animation = 'fadein 0.75s forwards'
  } else {
    document.getElementById('header-content').style.animation = 'fadeout 0.75s forwards'
  }
})

document.getElementById('header-content').addEventListener('click', (event) => {
  window.scrollY = 0
})
