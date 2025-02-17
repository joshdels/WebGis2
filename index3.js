// if (window.innerWidth > 500) {
//     console.log('greater 500')
// } else {
//     console.log('lesser than 100')
// }

// console.log(document.getElementById("dom"))

// console.log(document.getElementsByClassName('heading'))

// console.log(document.getElementsByTagName('h1'))

//Access style element having Id as e
var dom = document.getElementsByClassName('header')
console.log(dom.style )

//assign colors

var MyArray = document.getElementsByClassName('header')

for (i=0; i<MyArray.length; i++) {
    MyArray[i].style.color = 'blue'
}