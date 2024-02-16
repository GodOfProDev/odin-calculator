
function operate(firstNumber, secondNumber, operator) {
    let result = 0;

    switch (operator) {
        case "+":
            result = add(firstNumber, secondNumber);
            break;
        case "-":
            result = subtract(firstNumber, secondNumber);
            break;
        case "*":
            result = multiply(firstNumber, secondNumber);
            break;
        case "/":
            result = divide(firstNumber, secondNumber);
    }

    return result
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return Math.round((a / b) * 10) / 10;
}

const displayElement = document.querySelector(".display-text")
const numpadContainer = document.querySelector(".numpad")
const backspaceBtn = document.querySelector(".backspace-btn")
const operationsContainer = document.querySelector(".operations")
const clearBtn = document.querySelector(".clear-btn")
const changeSignBtn = document.querySelector(".change-sign-btn")
const decimalBtn = document.querySelector(".decimal-btn")

let displayValue = ""

let firstNumber = 0
let secondNumber = 0
let operator = "+"

let isFirstNumberEntered = false;
let isSecondNumberEntered = false

let isEnteringSecondNumber = false;

decimalBtn.addEventListener("click", () => {
    if (!displayValue.includes(".")) {
        addValueToTheDisplay(".")
    }
})

clearBtn.addEventListener("click", () => {
    clearCalculator();
})

changeSignBtn.addEventListener("click", () => {
    if (displayValue.includes("-") || displayElement.textContent === "0") {
        return;
    }

    addValueToTheStartOfTheDisplay("-")

    if (!isFirstNumberEntered) {
        firstNumber = -firstNumber
    } else {
        secondNumber = -secondNumber
    }
})

numpadContainer.addEventListener("click", (e) => {
    const target = e.target

    if (target.classList.contains("num-btn")) {
        const value = parseFloat(e.target.textContent)

        if (isFirstNumberEntered && !isEnteringSecondNumber) {
            setDisplay(value)
            isEnteringSecondNumber = true;
        } else {
            addValueToTheDisplay(value)
        }

        if (!isFirstNumberEntered) {
            firstNumber = parseDisplayToNumber()
        } else {
            secondNumber = parseDisplayToNumber()
        }
    }
})

operationsContainer.addEventListener("click", (e) => {
    const targetClassList = e.target.classList

    if (targetClassList.contains("divide-btn")) {
        operator = "/"
    } else if (targetClassList.contains("multiply-btn")) {
        operator = "*"
    } else if (targetClassList.contains("subtract-btn")) {
        operator = "-"
    } else if (targetClassList.contains("addition-btn")) {
        operator = "+"
    } else if (targetClassList.contains("equals-btn")) {
       if (isFirstNumberEntered && isEnteringSecondNumber) {
           const result = operate(firstNumber, secondNumber, operator)

           setDisplay(result)

           firstNumber = result
           secondNumber = 0;

           isEnteringSecondNumber = false;
       }
    }

    isFirstNumberEntered = true;
})

backspaceBtn.addEventListener("click", () => {
    removeValueFromTheDisplay()
})

function parseDisplayToNumber() {
    return parseFloat(displayValue)
}

function setDisplay(num) {
    displayValue = num.toString()

    updateDisplay()
}

function addValueToTheDisplay(num) {
    if (displayValue === "0" && num !== ".") {
        displayValue = ""
    }

    displayValue += num.toString()

    updateDisplay()
}

function addValueToTheStartOfTheDisplay(value) {
    if (displayValue === "0") {
        return;
    }

    displayValue = displayValue.padStart(displayValue.length + 1, value)

    updateDisplay()
}

function removeValueFromTheDisplay() {
    if (displayValue.length === 0) {
        return
    }

    displayValue = displayValue.slice(0, displayValue.length - 1)

    if (displayValue.length === 0) {
        displayValue = "0"
    }

    if (!isFirstNumberEntered || !isEnteringSecondNumber) {
        firstNumber = parseDisplayToNumber()
    } else {
        secondNumber = parseDisplayToNumber()
    }

    updateDisplay()
}

function updateDisplay() {
    if (displayValue.length >= 14) {
        displayElement.textContent = parseFloat(displayValue).toExponential(5);

        return;
    }

    displayElement.textContent = displayValue
}

function clearCalculator() {
    firstNumber = 0;
    secondNumber = 0;

    resetStates();

    setDisplay(0)
}

function resetStates() {
    isFirstNumberEntered = false;
    isSecondNumberEntered = false;
    isEnteringSecondNumber = false;
}