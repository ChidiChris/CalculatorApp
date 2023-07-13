const keys = document.querySelectorAll(".key"); //This simply gets all our keys inside our javascript.
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");

let input = ""; //String input.

for (let key of keys) {
    const value = key.dataset.key; //The dataset is obviously the data-key(html). It targets the key element and gives us it's value. 

    key.addEventListener("click", () => {
        if (value == "clear") {
            input = "";
            display_input.innerHTML = ""; //If the value is = clear, the input will be empty.
            display_output.innerHTML = ""; //If the value is = clear, the output will be empty.
        } else if (value == "backspace") {
            input = input.slice(0, -1); // This basically removes the last element on the string.
            display_input.innerHTML = CleanInput(input);
        } else if (value == "=") {
            let result = eval (PrepareInput(input));

            display_output.innerHTML = CleanOutput(result);
        } else if (value == "brackets") {
            // The following codes helps in determining if it's an open bracket or a close bracket. this basically makes the brackets smart.
            if (
                input.indexOf("(") == -1 || //This section tells us that if there is no start bracket("("), then we have to add a start bracket.
                input.indexOf("(") != -1 &&
                input.indexOf(")") != -1 &&
                input.lastIndexOf("(") < input.lastIndexOf(")")
            ) {
                input += "(";
                /* Basically, all these checks if there's no bracket, then it adds a starting bracket or it checks if the last
                bracket were closed off with the closing bracket then it adds a new starting bracket.*/
            } else if (
                input.indexOf("(") != -1 /*"(" not equal to -1(!=-1) meaning it does exist*/ && 
                input.indexOf(")") == -1 ||
                input.indexOf("(") != -1 /*If the opening bracket does exist*/&&
                input.indexOf(")") != -1 &&
                input.lastIndexOf("(") > input.lastIndexOf(")")
            ) {
                input += ")";
            }

            display_input.innerHTML = CleanInput(input);
        } else {
            if (validateInput(value)) {
                input += value;
            display_input.innerHTML = CleanInput(input);
            }
        }
    })
}

//To reduce the number of times an operator can repeat itself
function CleanInput(input) {
    let input_array = input.split("");
    let input_array_length = input_array.length;
    //Targeting every single character so that it will look nice on our input.
    for (let i = 0; i < input_array_length; i++) {
        if (input_array[i] == "*") {
            input_array[i] = ` <span class="operator">x</span> ` ;
        } else if (input_array[i] == "/") {
            input_array[i] = ` <span class="operator">÷</span> `;
        } else if (input_array[i] == "+") {
            input_array[i] = ` <span class="operator">+</span> `;
        } else if (input_array[i] == "-") {
            input_array[i] = ` <span class="operator">-</span> `;
        } else if (input_array[i] == "(") {
            input_array[i] = ` <span class="brackets">(</span> `;
        } else if (input_array[i] == ")") {
            input_array[i] = ` <span class="brackets">)</span> `;
        } else if (input_array[i] == "%") {
            input_array[i] = ` <span class="percent">%</span> `;
        }
    }

    return input_array.join("")
}

function CleanOutput (output) {
    let output_string = output.toString();
    let decimal = output_string.split(".")[1];
    output_string = output_string.split(".")[0];

    let output_array = output_string.split("");

    if (output_array.length > 3) {
        for (let i = output_array.length -3; i > 0; i -= 3) {
            output_array.splice(i, 0, ",");
        }
    }

    if (decimal) {
        output_array.push(".");
        output_array.push("decimal")
    }

    return output_array.join("");
}

function validateInput (value) {
    let last_input = input.slice(-1); //To get the last element to know whhat we last entered
    let operators = ["+", "-", "*", "/"];

    if (value == "." && last_input == ".") {
        return false; //If the value we last entered is ".", then we can't add another "."
    }

    if (operators.includes(value)) {
        if (operators.includes(last_input)){
            return false; //If the value we last entered is an operator, then we can't add another operator.
        } else {
            return true;
        }
    }

    return true;
}

function PrepareInput (input) {
    let input_array = input.split("");

    for (let i = 0; i < input_array.length; i++) {
        if (input_array[i] == "%") {
            input_array[i] = "/100"; //we can convert a number to % by simply dividing it by 100.
        }
    }

    return input_array.join("");
}