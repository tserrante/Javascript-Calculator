

/*
    Functions
*/

/**
 * Resets display to 0
 */
function resetDisplay()
{
    displayField.innerText = '0';
}

/**
 * Clears display for input
 */
function clearDisplay()
{
    displayField.innerText = '';
}


/**
 * Clears the expression array
 */
function resetExpression()
{
    while(expression.length > 0)
        expression.pop();
}

function updateExpressionDisplay()
{
    displayExpression.innerText ='';
    for(let sym of expression)
        displayExpression.innerText += `${sym}`
}
/**
 * Converts string in displayField to a number and pushes
 * it onto expression
 * @param {*} op 
 */
function pushCurrentNumber()
{
    displayNumber = Number.parseInt(displayField.innerText);
    expression.push(displayNumber);
    updateExpressionDisplay();
}

/**
 * Calls push number and then pushes the operation onto expression.
 * Updates expression field on calculator
 * @param {*} op operation chosen
 */
 function pushExpression(op)
 {
    pushCurrentNumber();
    expression.push(op.innerText);
    updateExpressionDisplay();
 }

 /**
  * Converts the current number in displayField to an integer
  * and perform arithmetic stored in expressions
  * ~~!! Ignores order of operations !!~~
  */
function solveExpression()
{
    // store the last number 
    pushCurrentNumber();

    if(expression.length === 1)
        return expression[0];

    // To store the running answer
    let currentResult = 0;

    // Start at the first element of the array, 
    // and sequentially process 
    for(let i = 0; i < expression.length; i++)
    {   
        let tempSymbol = expression[i];
    
        if(typeof tempSymbol === 'number')
        {
            currentResult = tempSymbol;
        }
        if(typeof tempSymbol === 'string')
        {
            // an operation is encountered
            // Grab the next number in the array
            let tempNumber = expression[i + 1];
            
            if(tempSymbol === '+')
                currentResult += tempNumber;
            else if(tempSymbol === '-')
                currentResult -= tempNumber;
            else if(tempSymbol === '*')
                currentResult *= tempNumber;
            else
                currentResult /= tempNumber;
            
            if(i + 2 < expression.length)
                i += 1; // Skip ahead since the next symbol was grabbed 
            else
                return currentResult;
        }
    }
}

/*
    Variables
*/

let expression = [];   // Array to store expression for processing 

let inputNodeList = document.querySelectorAll(".input");
let inputArray = Array.from(inputNodeList);

let opNodeList = document.querySelectorAll(".operation");
let operationArray = Array.from(opNodeList);

let equalsOperation = document.querySelector('.result');

let displayExpression = document.querySelector('.equation');

let displayField = document.querySelector('.display');
let displayNumber;  // For storing the current number in displayField

let clearButton = document.querySelector('.clear');

/*
    Event Listeners
*/
inputArray.forEach(function(btn){
        btn.addEventListener("click", function() 
        {
            if(displayField.innerText === '0')
                clearDisplay();
            displayField.innerText += btn.innerText
        });
    });

operationArray.forEach(function(btn){
        btn.addEventListener("click", () => 
        {
            pushExpression(btn); 
            resetDisplay();
        })
    });

equalsOperation.addEventListener('click', () => {
        displayField.innerText = solveExpression();
        resetExpression();
    });

clearButton.addEventListener('click', () => resetDisplay());

