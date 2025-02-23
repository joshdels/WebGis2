var answer = document.getElementById('answer')

function calculate() {
    var first_number = document.getElementById('number1').value
    var second_number = document.getElementById('number2').value
    var operation = document.getElementById('operation').value


    switch (operation) {
    case "+":
        answer.innerHTML = parseInt(first_number) + parseInt(second_number)
        break;
    case "-":
        answer.innerHTML = parseInt(first_number) - parseInt(second_number)
        break;
    case "*":
        answer.innerHTML = parseInt(first_number) * parseInt(second_number)
        break;
    case "/":
        answer.innerHTML = parseInt(first_number) / parseInt(second_number)
        break;    
    }
}

function solve1() {
    var sides = document.getElementById('sides').value

    answer.innerHTML = parseInt(sides)** 2 + ' m2'
}

function solve2() {
    var sides = document.getElementById('sides').value

    answer.innerHTML = parseInt(sides)** 3 + ' m2'
}