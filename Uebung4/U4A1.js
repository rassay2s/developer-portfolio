//   Eine Funktion identity_function(), die ein Argument als Parameter entgegennimmt und eine Funktion zurückgibt, die dieses Argument zurückgibt.
function identity(arg){
  console.log(arg);
}
// Eine Funktion identity(), die ein Argument als Parameter entgegennimmt und dieses als Ergebnis zurückgibt.
function identity_function(arg){
  return function (){return arg;
  };
}
//   Zwei binäre Funktionen add und mul, die Summe und Produkt berechnen.
function add(a,b){
  return a +  b;
}
function mul(a,b){
  return a * b;
}
//   Eine Addierer-Funktion addf(), so dass addf(x)(y) genau x + y zurückgibt. (Es haben also zwei Funktionsaufrufe zu erfolgen. addf(x) liefert eine Funktion, die auf y angewandt wird.)
function addf(x){
  return function(y){ return x+y;}
}
// Eine Funktion applyf(), die aus einer binären Funktion wie add(x,y) eine Funktion addf berechnet, die mit zwei Aufrufen das gleiche Ergebnis liefert, z.B. addf = applyf(add); addf(x)(y) soll add(x,y) liefern. Entsprechend applyf(mul)(5)(6) soll 30 liefern, wenn mul die binäre Multiplikation ist.
function applyf(func){
  return function(x){
    return function(y){
      return func(x,y);
    };
  };
}
//TEST
const b = identity("aasd");
const a = identity_function("hey there");
const adf = applyf(mul);
console.log(addf(5)(2))
console.log(a());
console.log(typeof a);
console.log(typeof b);
console.log(adf(2)(45))
