// Schreiben Sie die Prototypen Person und Auto in JavaScript, sodass jede Person weiß, welche Autos sie besitzt.
// Schreiben Sie eine Funktion conflict(), die feststellt, ob ein Auto von mehr als einer Person besessen wird.

  function makePerson(name, alter){
    var new_person = { name: name , alter : alter, Autos: [] };
    new_person.addAuto = function (Auto){
      if(!this.Autos.includes(Auto.model)) {
        Auto.addBesitzer(this);
        return this.Autos.push(Auto.model);
      }
    };
    return new_person;
  }

  function makeAuto(model, Kennenzeichen) {
    var Auto = {model: model, besitzer: []};
    Auto.addBesitzer = function (Person) {
      if(!this.besitzer.includes(Person.name)) {
        return this.besitzer.push(Person.name);
      }
    };
    return Auto;
  }
  function conflict(Auto){
    if (Auto.besitzer.length > 1 ){
      return "conflict " + true;
    }
    else{
      return "conflict " + false;
    }
  }
var y1 = new makeAuto("bmw");
var y = new makeAuto("bmw");
var z = new makeAuto("mercides");
var m = new makeAuto("Audi");
var x = new makePerson("rami", 25);
var t = new makePerson("radi", 23);
x.addAuto(y);
x.addAuto(y);
x.addAuto(m);
t.addAuto(y1);
x.addAuto(z);
console.log(x.Autos);

console.log(conflict(y))
