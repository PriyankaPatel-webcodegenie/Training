function sum(x = 5, y = 10) {
    return x + y;
}
console.log(sum(5, 15));
console.log(sum(10));
console.log(sum());

function sum2(x = 3, y = x, z = x + y) {
    console.log(x + y + z);
}
sum2(); 