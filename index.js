let firstNumber = 0
let secondNumber = 0
let operator = "+"

function operate(firstNumber, secondNumber, operator) {
    switch (operator) {
        case "+":
            add(firstNumber, secondNumber);
            break;
        case "-":
            subtract(firstNumber, secondNumber);
            break;
        case "*":
            multiply(firstNumber, secondNumber);
            break;
        case "/":
            divide(firstNumber, secondNumber);
    }
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
    return a / b;
}

const displayElement = document.querySelector(".display-text")
const numpadContainer = document.querySelector(".numpad")
const backspaceBtn = document.querySelector(".backspace-btn")
let displayValue = ""

numpadContainer.addEventListener("click", (e) => {
    const target = e.target

    if (target.classList.contains("num-btn")) {
        const value = parseInt(e.target.textContent)

        addValueToTheDisplay(value)
    }
})

backspaceBtn.addEventListener("click", () => {
    removeValueFromTheDisplay()
})

function addValueToTheDisplay(num) {
    if (displayValue === "0") {
        displayValue = ""
    }

    displayValue += num

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

    updateDisplay()
}

function updateDisplay() {
    displayElement.textContent = displayValue
}