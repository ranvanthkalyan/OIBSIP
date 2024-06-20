document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    let currentInput = '';
    let currentEquation = '';
    let previousResult = null;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const number = button.getAttribute("data-number");
            const operator = button.getAttribute("data-operator");

            if (number !== null) {
                currentInput += number;
                currentEquation += number;
                display.textContent = currentEquation;
            } else if (operator !== null) {
                if (currentInput || previousResult !== null) {
                    if (!currentInput && previousResult !== null) {
                        currentEquation = previousResult;
                    }
                    currentEquation += ` ${operator} `;
                    currentInput = '';
                    display.textContent = currentEquation;
                }
            } else if (button.id === "equals") {
                if (currentInput) {
                    try {
                        const result = eval(currentEquation);
                        display.textContent = `${currentEquation} = ${result}`;
                        previousResult = result;
                        currentInput = '';
                        currentEquation = '';
                    } catch {
                        display.textContent = 'Error';
                        currentInput = '';
                        currentEquation = '';
                    }
                }
            } else if (button.id === "clear") {
                currentInput = '';
                currentEquation = '';
                previousResult = null;
                display.textContent = '';
            } else if (button.id === "delete") {
                currentEquation = currentEquation.slice(0, -1);
                currentInput = currentEquation;
                display.textContent = currentEquation;
            } else if (button.id === "toggle-sign") {
                if (currentInput) {
                    currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : `-${currentInput}`;
                    currentEquation = currentInput;
                    display.textContent = currentEquation;
                }
            } else if (button.id === "ans") {
                if (previousResult !== null) {
                    currentInput = previousResult.toString();
                    currentEquation = currentInput;
                    display.textContent = currentEquation;
                }
            } else if (button.id === "sqrt") {
                if (currentInput) {
                    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
                    currentEquation = currentInput;
                    display.textContent = currentEquation;
                }
            } else if (button.id === "percent") {
                if (currentInput) {
                    currentInput = (parseFloat(currentInput) / 100).toString();
                    currentEquation = currentInput;
                    display.textContent = currentEquation;
                }
            }
        });
    });
});
