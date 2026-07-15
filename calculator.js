// Get the display element
const display = document.getElementById('display');

// Append number to display
function appendNumber(number) {
    // Prevent multiple decimal points
    if (number === '.' && display.value.includes('.')) {
        return;
    }
    
    // If display shows 0, replace it (except for decimal point)
    if (display.value === '0' && number !== '.') {
        display.value = number;
    } else {
        display.value += number;
    }
}

// Append operator to display
function appendOperator(operator) {
    const lastChar = display.value[display.value.length - 1];
    
    // Prevent operator at the start or multiple operators in a row
    if (display.value === '' || '+-*/.'.includes(lastChar)) {
        return;
    }
    
    display.value += operator;
}

// Clear the display
function clearDisplay() {
    display.value = '0';
}

// Delete the last character
function deleteLast() {
    if (display.value.length === 1) {
        display.value = '0';
    } else {
        display.value = display.value.slice(0, -1);
    }
}

// Calculate the result
function calculate() {
    try {
        const lastChar = display.value[display.value.length - 1];
        
        // Prevent calculation if expression ends with operator
        if ('+-*/.'.includes(lastChar)) {
            return;
        }
        
        // Evaluate the expression
        const result = eval(display.value);
        
        // Display result, limiting to reasonable decimal places
        if (Number.isFinite(result)) {
            display.value = Math.round(result * 100000000) / 100000000;
        } else {
            display.value = 'Error';
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (/[0-9.]/.test(key)) {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    }
});

// Initialize display
display.value = '0';
