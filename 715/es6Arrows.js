//before es6
function add(a,b){
    return a+b;
}
console.log(add(2,3));//5 

console.log();

// es6 arrow function 
const addArrow = (a,b) => a + b;
console.log(addArrow(2,3));//5

console.log();

function posttax(price) {
    return (price * 1.0878).toFixed(2);
}
console.log(posttax(100)); // 108.78

const posttaxArrow = price=> (price * 1.0878).toFixed(2);
console.log(posttaxArrow(1000)); // 1087.80


console.log();

function myName(name, language){
    if(language === "en"){
        return `hi, my name is ${name}`;
    }
    else if(language === "es"){
        return `hola, me llamo es ${name}`;
    }
    else if(language === "ba"){
        return `amar naam ${name}`;
    }
    else {
        return `language not supported`;
    }
}
console.log(myName("bartholomew", "en")); // hi, my name is bartholomew
console.log(myName("dora","es")); // hola, me llamo es dora
console.log(myName("titu","ba")); // amar naam titu

console.log();

