var isPerfectSquare = function(num) {
    return (Math.pow(num,0.5)%1==0)
};

console.log(isPerfectSquare(16)); // true
console.log(isPerfectSquare(14)); // false
console.log(isPerfectSquare(25)); // true