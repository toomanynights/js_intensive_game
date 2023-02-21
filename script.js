// alert("You are about to visit Boss's page.")

// const charTitleInput = prompt("Input one characteristic of Boss:")
// const charValueInput = prompt("Input the value of that characteristic:")

// const charTitle = document.getElementById("charTitle")
// const charValue = document.getElementById("charValue")

// charTitle.innerText = charTitleInput
// charValue.innerText = charValueInput



// const isColor = (strColor) => {
//     const s = new Option().style;
//     s.color = strColor;
//     return s.color !== '';
//   }

// if (isColor(charValueInput)) {
//     charValue.style.color = charValueInput
//     charValue.style.textShadow = "1px 1px 2px #000"
// }



const gameElements = document.getElementById("problem").children
const title = gameElements[0]
const problem = gameElements[1]
const answer = gameElements[2]
const gameButton = gameElements[3]

const getRandomNumberInRange = (min, max) => {
    const randomNum = (Math.random() * (max - min) + min).toFixed(0)
    return randomNum
}

const gameState = {
    inProgress: false,
    rightAnswer: null,
}

const makeProblem = () => {
    const randomNum1 = getRandomNumberInRange(0, 100)
    const randomNum2 = getRandomNumberInRange(0, 100)
    const actions = ["+", "-"]
    const isPlus =  Number(Math.random() > 0.5)

    const problem = `${randomNum1} ${actions[isPlus]} ${randomNum2}` 
    const rightAnswer = eval(problem)

    gameState.rightAnswer = rightAnswer
    return problem
}

const toggleGameState = () => {
    gameState.inProgress = !gameState.inProgress
}




const gameStart = () => {
    if (!gameState.inProgress) {
        title.innerText = "Game is on"
        problem.hidden = false
        answer.hidden = false

        answer.value = null
        const task = makeProblem()
        problem.innerText = task
        gameButton.value = "Check"

    } else {
        let answerFinal
        if (answer.value != "") {
            answerFinal = Number(answer.value)
        } else {
            answerFinal = answer.value
        }

        const checkResult = gameState.rightAnswer === answerFinal
        problem.innerText = problem.innerText + " = " + gameState.rightAnswer
        title.innerText = (checkResult) ? "Good job!" : "Not good!"
        gameButton.value = "Try again"

    }
    toggleGameState()
}

// console.dir(document)

const cont = document.querySelector(".theBlock .container").children
const counter = document.querySelector(".theBlock p span")
const blockState = {
    elementQ : 0,
    setValue(value) {
        this.elementQ += value
        counter.innerText = this.elementQ
    }
}


for (let i = 0; i < cont.length; i++) {
    const element = cont[i];
    element.addEventListener("click", (e) => {
        
        if(e.target.className === "") {
            e.target.className = "picked"
            blockState.setValue(1)
        } else {
            e.target.className = ""
            blockState.setValue(-1)
        }
    })
}

gameButton.addEventListener("click", gameStart)
answer.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        gameStart()
    } else if (e.key === "Escape") {
        answer.blur()
    }
})