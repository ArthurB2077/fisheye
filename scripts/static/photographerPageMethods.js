// eslint-disable-next-line no-unused-vars
const openModal = () => {
  document.getElementById('responsive-contact').style.display = 'none'
  Array.from(document.getElementsByClassName('bg-modal')).forEach(modal => {
    modal.style.display = 'block'
  })
  document.getElementById('first').focus()
}

// eslint-disable-next-line no-unused-vars
const closeModal = () => {
  Array.from(document.getElementsByClassName('bg-modal')).forEach(modal => {
    modal.style.display = 'none'
  })
  document.getElementById('responsive-contact').removeAttribute('style')
  document.getElementById('contact').focus()
}

/**
 * FR : Active le close modal par la touche entrer
 *
 * EN: Activates the action button with the enter key.
 *
 * @param {KeyboardEvent} event
 */
const closeKeyUpHandler = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault()
    closeModal()
  }
}

const filterKeyUpHandler = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault()
    manageMenu()
  }
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
    document.getElementById('menu-arrow').setAttribute('aria-label', 'Menu déplié')
    document.getElementById('arrow-svg').style.animation = 'rotate-arrow 1s forwards'
    document.getElementById('menu-list-container').removeAttribute('style')
    document.getElementById('menu-list-container').style.animation = 'open-bg 1s forwards'
    Array.from(document.getElementsByClassName('list-item')).forEach(item => {
      item.removeAttribute('style')
      item.style.animation = 'open-items 1s forwards'
    })
    Array.from(document.getElementsByClassName('item')).forEach(item => {
      item.setAttribute('tabindex', '1')
    })
  } else {
    document.getElementById('menu-arrow').classList.replace('menu-open', 'menu-close')
    document.getElementById('menu-arrow').removeAttribute('style')
    document.getElementById('menu-arrow').setAttribute('aria-label', 'Menu replié')
    document.getElementById('arrow-svg').style.animation = 'rotate-arrow-back 1s forwards'
    document.getElementById('menu-list-container').removeAttribute('style')
    document.getElementById('menu-list-container').style.animation = 'close-bg 1s forwards'
    Array.from(document.getElementsByClassName('list-item')).forEach(item => {
      item.removeAttribute('style')
      item.style.animation = 'close-items 1s forwards'
    })
    Array.from(document.getElementsByClassName('item')).forEach(item => {
      item.setAttribute('tabindex', '-1')
    })
  }
}

const openLightbox = () => {
  document.querySelectorAll("[tabindex = '0']").forEach(el => {
    el.setAttribute('tabindex', '-10')
  })
  document.querySelectorAll("[tabindex = '1']").forEach(el => {
    el.setAttribute('tabindex', '-1')
  })
  document.querySelectorAll("[tabindex = '4']").forEach(el => {
    el.setAttribute('tabindex', '-4')
  })
  document.getElementById('lightbox-content').setAttribute('tabindex', '-2')
  document.getElementById('prev-button').setAttribute('tabindex', '1')
  document.getElementById('next-button').setAttribute('tabindex', '1')
  document.getElementById('close-button').setAttribute('tabindex', '1')
  document.getElementById('lightbox-container').style.display = 'block'
  document.body.style.overflowY = 'hidden'
}

const openLightboxHandler = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault()
    openLightbox()
  }
}

const closeLightbox = () => {
  document.querySelectorAll("[tabindex = '-10']").forEach(el => {
    el.setAttribute('tabindex', '0')
  })
  document.querySelectorAll("[tabindex = '-1']").forEach(el => {
    el.setAttribute('tabindex', '1')
  })
  document.querySelectorAll("[tabindex = '-4']").forEach(el => {
    el.setAttribute('tabindex', '4')
  })
  document.getElementById('prev-button').setAttribute('tabindex', '0')
  document.getElementById('next-button').setAttribute('tabindex', '0')
  document.getElementById('close-button').setAttribute('tabindex', '0')
  document.getElementById('lightbox-container').style.display = 'none'
  Array.from(document.getElementById('lightbox-content').children).forEach(child => {
    if (child.tagName !== 'A') {
      child.style.display = 'none'
    }
  })
  document.body.removeAttribute('style')
  document.getElementById('gallery').children[0].focus()
}

const closeLightboxHandler = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault()
    closeLightbox()
  }
}

let mediaIndex = 1

const currentMedia = (index) => {
  showMedia(mediaIndex = index - 1)
}

const changeSlide = (index) => {
  showMedia(mediaIndex += index)
}

const handleChangeSlide = (event, index) => {
  if (event.keyCode === 13) {
    event.preventDefault()
    changeSlide(index)
  }
}

const showMedia = (index) => {
  const medias = Array.from(document.getElementsByClassName('media-slide'))
  for (let i = 0; i < medias.length; i++) {
    medias[i].style.display = 'none'
  }
  if (index < 0) {
    mediaIndex = medias.length - 1
  }
  medias[mediaIndex % medias.length].style.display = 'block'
}
