
// function hi(){
//     console.log('hello!')
// }

// hi()

var studentList={
    'joshua': 'male',
    'abby': 'female'
}

function checkStudent(studentName) {
    var p = document.getElementById('result')
    if (studentList[studentName]){
        if (studentList[studentName] == 'male') {
            // console.log('Boy')
            p.innerHTML = 'He is a brilliant boy'
        } else {
            // console.log('Girl')
            p.innerHTML = '<b>He is a brilliant girl<b>'
        }
    } else {
        console.log("Are you new?")
        p.innerHTML = '<hr>Are you new?'
    }
}

function fromBtn() {
    var inputStudentName = document.getElementById('stName').value
    checkStudent(inputStudentName)
}

function calculate() {
    var firstN = document.getElementById('num1').value
    var secondN = document.getElementById('num2').value
    var ac = document.getElementById('actions').value
    var p = document.getElementById('result')

    if (ac== 'add') {
        p.innerHTML = parseInt(firstN) + parseInt(secondN)
    }else if (ac == 'minus') {
        p.innerHTML = firstN - secondN
    } else if (ac == 'multply') {
        p.innerHTML = firstN * secondN
    } else if (ac == 'divide') {
        p.innerHTML = firstN / secondN
    }
}



