const allInput = document.querySelectorAll("input[type='text']");
const allButtons = document.querySelectorAll("button.btn");
const devDelAll = document.querySelector(".delAll");

allButtons[0].addEventListener('click', () => {
    allInput.forEach((e) => {
        e.classList.toggle('hide')
    })
})
allButtons[1].addEventListener('click', () => {
    allInput.forEach((e) => {
        e.classList.add('hide')
    })
    allInput[0].classList.remove("hide")
})
allButtons[3].addEventListener('click', () => {
    allInput.forEach((e) => {
        e.classList.toggle('hide')
    })
})
allButtons[4].addEventListener('click', () => {
    allInput.forEach((e) => {
        e.classList.add('hide')
    })
    allInput[0].classList.remove("hide")
})

allButtons[2].addEventListener('click', (e) => {
    allButtons[2].classList.toggle("color")
    
})
allButtons[5].addEventListener('click', (e) => {
    allButtons[5].classList.toggle("color")
    devDelAll.classList.toggle("hide")
})