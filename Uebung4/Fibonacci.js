// function fibonacci(n, tab = []) {
//   if (tab[n] !== undefined) return tab[n];
//   if (n === 0) return 0;
//   if (n === 1) return 1;
//   tab[n] = fibonacci(n - 1, tab) + fibonacci(n - 2, tab);
//   return tab[n];
// }
// for (i = 0; i < 2000; i++) {
//   if( fibonacci(i) <=  Number.MAX_VALUE) {
//     console.log( fibonacci(i))
//     console.log(i);
//   }
// }
// console.log(Number.MAX_VALUE)
function fibonacciBIgInt(n, tab = []) {
  if (tab[n] !== undefined) return tab[n];
  if (n === 0) return BigInt(0);
  if (n === 1) return BigInt(1);
  tab[n] = fibonacciBIgInt(n - 1, tab) + fibonacciBIgInt(n - 2, tab);
  return tab[n];
}
for (i = 0; i < 2000; i++) {
  if( fibonacciBIgInt(i) <=  Number.MAX_VALUE) {
    console.log( fibonacciBIgInt(i))
    console.log(i);
  }
}

