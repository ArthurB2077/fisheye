// eslint-disable-next-line no-unused-vars
const openModal = () => {
  Array.from(document.getElementsByClassName('bg-modal')).forEach(modal => {
    modal.style.display = 'block'
  })
}

// eslint-disable-next-line no-unused-vars
const closeModal = () => {
  Array.from(document.getElementsByClassName('bg-modal')).forEach(modal => {
    modal.style.display = 'none'
  })
}

// eslint-disable-next-line no-unused-vars
const logData = () => {
  for (let i = 0; i < event.target.form.length - 1; i++) {
    console.log(event.target.form[i].value)
  }
}

// eslint-disable-next-line no-unused-vars
const manageMenu = () => {
  if (document.getElementById('menu-arrow').className === 'menu-close') {
    document.getElementById('menu-arrow').classList.replace('menu-close', 'menu-open')
    document.getElementById('menu-arrow').removeAttribute('style')
    document.getElementById('arrow-svg').style.animation = 'rotate-arrow 1s forwards'
    document.getElementById('menu-list-container').removeAttribute('style')
    document.getElementById('menu-list-container').style.animation = 'open-bg 1s forwards'
    Array.from(document.getElementsByClassName('list-item')).forEach(item => {
      item.removeAttribute('style')
      // item.style.display = 'list-item'
      item.style.animation = 'open-items 1s forwards'
    })
  } else {
    document.getElementById('menu-arrow').classList.replace('menu-open', 'menu-close')
    document.getElementById('menu-arrow').removeAttribute('style')
    document.getElementById('arrow-svg').style.animation = 'rotate-arrow-back 1s forwards'
    document.getElementById('menu-list-container').removeAttribute('style')
    document.getElementById('menu-list-container').style.animation = 'close-bg 1s forwards'
    Array.from(document.getElementsByClassName('list-item')).forEach(item => {
      item.removeAttribute('style')
      // item.style.display = 'none'
      item.style.animation = 'close-items 1s forwards'
    })
  }
}
