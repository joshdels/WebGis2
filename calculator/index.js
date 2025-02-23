function calculate() {
    var first_number = document.getElementById('number1').value
    var second_number = document.getElementById('number2').value
    var operation = document.getElementById('operation').value
    var answer = document.getElementById('answer')

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