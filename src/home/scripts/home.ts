const mainScreen = document.querySelector('.main-screen') as HTMLDivElement
const buttonStartHandle = document.querySelector('.button-start') as HTMLButtonElement
const navigationButtons = Array.from<HTMLDivElement>(document.querySelectorAll('.nav-btn div'))

const elTitle = document.querySelector('.title') as HTMLDivElement
const elSubtitle = document.querySelector('.subtitle') as HTMLDivElement

const lettersOfTitle = Array.from("Привет! Я Алготрон")
const lettersOfSubtitle = Array.from("Твой гид в мире алгоритмов.")

const showModeName = 'anim-letter'

interface ITitle {
    readonly wrapper: HTMLDivElement,
    readonly letterArray: string[],
    readonly lineBreakIndex?: number,
    readonly showModeName?: string,
    readonly displaySpeed: number,
    readonly isLast: boolean
}

const titleInfo: ITitle = {
    wrapper: elTitle,
    letterArray: lettersOfTitle,
    lineBreakIndex: 6,
    showModeName: showModeName,
    displaySpeed: 80,
    isLast: false
}

const subtitleInfo: ITitle = {
    wrapper: elSubtitle,
    letterArray: lettersOfSubtitle,
    displaySpeed: 15,
    isLast: true
}

function makeSpanWith(letter: string, className: string): HTMLSpanElement {
    let span = document.createElement('span')
    span.textContent = letter
    span.classList.add(className)
    return span
}

function animateText(title: ITitle): void {
    let curIndex = 0

    let currentSpan: HTMLSpanElement
    let animationInterval = setInterval(() => {
        if (currentSpan != undefined) currentSpan.classList.remove(title.showModeName)

        currentSpan = makeSpanWith(title.letterArray[curIndex], title.showModeName)
        title.wrapper.appendChild(currentSpan)

        if (curIndex == title.lineBreakIndex) title.wrapper.appendChild(document.createElement('br'))
        if (curIndex == title.letterArray.length - 1)  {
            stopAnimationInterval()
            if (!title.isLast) animateText(subtitleInfo)
            else currentSpan.classList.remove(title.showModeName)
        }

        curIndex += 1
    }, title.displaySpeed)

    function stopAnimationInterval(): void {
        clearInterval(animationInterval)
    }
}

animateText(titleInfo)

buttonStartHandle.addEventListener('click', () => {
    mainScreen.style.transform = 'translateX(-100vw)'
})

function toggleDisplayName(event: MouseEvent): void {
    let target = event.target as HTMLDivElement
    let elContentName = target.nextElementSibling as HTMLDivElement
    let curMode = elContentName.style.display

    if (event.type == 'mouseover') {
        elContentName.style.display = 'block'
    } else {
        elContentName.style.display = 'none'
    }
}

navigationButtons.forEach(element => { element.addEventListener('mouseover', toggleDisplayName) })
navigationButtons.forEach(element => { element.addEventListener('mouseleave', toggleDisplayName) })