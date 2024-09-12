const display = document.getElementById('display');

window.appendToDisplay = (value) => {
  display.value += value;
};

window.appendOperator = (operator) => {
    if (display.value === '') {
        return;
    }

    if (display.value.slice(-1) === '+' || display.value.slice(-1) === '-' || display.value.slice(-1) === '*' || display.value.slice(-1) === '/') {
        display.value = display.value.slice(0, -1);
    }

    display.value += operator;
};

window.appendNumber = (number) => {
    display.value += number;
};

window.clearDisplay = () => {
    display.value = '';
};

window.backspace = () => {
    display.value = display.value.slice(0, -1);
};

window.calculatePercentage = () => {
    display.value = display.value / 100;
};

window.calculatePower = () => {
    display.value = display.value * display.value;
};

window.appendDecimal = () => {
    if (!display.value.includes('.')) {
        display.value += '.';
    }
};

window.calculate = () => {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
};

