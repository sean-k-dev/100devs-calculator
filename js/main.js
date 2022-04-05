// -----------------------
// Variable Assignment
// -----------------------
const acButton = document.querySelector('.calc-ac')
const numberButtons = document.querySelectorAll('.calc-number')
const operationButtons = document.querySelectorAll('.calc-operation')
const equalsButton = document.querySelector('.calc-equals')
const previousOperandDisplay = document.querySelector('#previous-operand')
const currentOperandDisplay = document.querySelector('#current-operand')

// -----------------------
// Calculator Object
// -----------------------

class Calculator {
    constructor (previousOperandDisplay, currentOperandDisplay) {
        this.previousOperandDisplay = previousOperandDisplay
        this.currentOperandDisplay = currentOperandDisplay
        this.clear()
    }

clear() {
    this.previousOperand = ""
    this.currentOperand = ""
    this.operation = undefined
}

appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
}

chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
        this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
}

compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
        case '+':
        computation = prev + current
        break
        case '-':
        computation = prev - current
        break
        case '*':
        computation = prev * current
        break
        case '/':
        computation = prev / current
        break
        default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
}

updateDisplay() {
    this.currentOperandDisplay.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandDisplay.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandDisplay.innerText = ''
    }
}
 
getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
}

// -----------------------
// New Calculator Object and Event Handlers
// -----------------------

const calculator = new Calculator (previousOperandDisplay, currentOperandDisplay)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })

 acButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })

  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })



