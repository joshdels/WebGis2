//loops

var cars = [60, 23, 45,32,56]

//for loops
// console.log("for loops")
// for(var i=0; i<cars.length; i++){
//     console.log('car number ' + cars[i])
//     var fuel = cars[i]
//     if (fuel > 50) {
//         console.log("Car cant get the fule")
//     } else {
//         console.log("cant take this car!")
//     }
// }


//while loop
// console.log('while loops')
// var j = 0
// while(j<cars.length) {
//     console.log('car number ' + cars[j])
//     var fuel = cars[j]
//     if (fuel > 50) {
//         console.log("This is my car :)")
//         break
//     } else {
//         console.log("cant take this car!")
//     }
//     j++
// }



console.log("for loops")
for(var i=0; i<cars.length; i++){
    console.log('car number ' + cars[i])
    var fuel = cars[i]
    if (fuel > 50) {
        continue
        console.log("text after continue")
    } else {
        console.log("cant take this car!")
    }
}