var book3 = "Failing Forward";
let book1 = "Is it okay to pee in the ocean?";
const book2 = "Dragon Slayer Academy: The Complete Series";


console.log(book1);
console.log(book2);
console.log(book3);

book1 = "Fahrenheit 451";
// book2 = "1984"; 
// const can't be reassigned
book3 = "Catcher in the Rye";

console.log(book1);
console.log(book2);
console.log(book3);

console.log();

var triad =["confidentiality","integrity", "availability"];

// triad.forEach(function (item) {
//     console.log(item.toUpperCase());
// })
console.log("Using an arrow function:");
triad.forEach(item => console.log(item.toUpperCase()));
console.log();

let prices = {borger: 5.99, fries: 2.99, soda: 1.99};

function printPrices(prices) {
    for (let item in prices) {
        console.log(`${item}: $${prices[item].toFixed(2)}`);
    }
}
printPrices(prices);
console.log();
console.log("Calculating prices with tax:");
console.log();
function postTax(prices){
    for(let item in prices) {
        let total = prices[item] * 1.0878;
        console.log(`${item}: $${total.toFixed(2)}`);
    }
}
postTax(prices);

console.log();

function eOo(num) {
    return (num % 2 === 0)? num + " iz even": num + " iz odd";
}
console.log(eOo(-4)); // even
console.log(eOo(5)); // odd
console.log(eOo(-28)); // even

console.log();

function pOn(num) {
    if (num > 0) {
        return num + " iz positive";
    } else if (num < 0) {
        return num + " iz negative";
    } else {
        return num + " iz zero";
    }
}
console.log(pOn(4)); // positive
console.log(pOn(-5)); // negative
console.log(pOn(0)); // zero

console.log();

for(let i=5;i>0;i--){
    for(let e=0;e<i;e++){
        process.stdout.write("*");
    }
    console.log();
}

console.log();

for(let i=1;i<=5;i++){
    for(let e=0;e<i;e++){
        process.stdout.write("*");
    }
    console.log();
}

console.log();
console.log(Math.pow(64,.5)); // 8
console.log(Math.sqrt(64)); // 8

console.log();



