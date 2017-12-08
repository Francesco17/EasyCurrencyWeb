//function for the login
function login() {
  var x = document.forms[0];
  var username = "";
  var password = "";
  for (var i = 0; i < x.length-1; i++) {
      username = x.elements[0].value;
      password = x.elements[1].value;
  }
  if (isInLocal(username)) {
    _user = JSON.parse(localStorage.getItem(username));

    if ( password == _user.password) {
      sessionStorage.setItem(_user.username, JSON.stringify(_user));
      document.getElementById("logged").innerHTML = "<h2>Benvenuto, "+_user.username+"!</h2>"+
      " <input type='submit' id='btn_logged' value='Logout' >";
      $("#btn_logged").click(function(){
        logout(_user.username);
        return false;
      });
      // console.log(JSON.parse(sessionStorage.getItem(username)));
      $('#content').submit(function(){
          $(this).hide();
          show_logged();
      });
    }
    else{
      alert("password errata.");
    }
  }
  else{
    alert("username errato.");
  }
}

// funzione per il logout
function logout(username){
  // assumo che solo un utente alla volta sia loggato sulla piattaforma
  sessionStorage.removeItem(username);
  alert(username+", hai eseguito correttamente il logout!");

  $("#logged").hide();
  $("#content").fadeIn();

}

// funzione che nasconde il box login e fa vedere il box di loggato
function show_logged(){
  $("#logged").fadeIn();
}

//function che nasconde il box di login e fa vedere quello di registrazione
function show_reg(){
  $("#box_log").hide();
  $("#box_reg").fadeIn();
}
//function che nasconde il box di registrazione e fa vedere quello di login
function hide_reg(){
  $("#box_reg").hide();
  $("#box_log").fadeIn();
}

//function per la registrazione degli utenti
function registration(){
  // valori inseriti dall'utente nel form
  var x = document.forms["form_reg"];
  var username = "";
  var password = "";
  for (var i = 0; i < x.length-1; i++) {
      username = x.elements[0].value;
      password = x.elements[1].value;
  }
  // verifico che il localStorage sia supportato dal browser
  if (localStorage) {
    // verifico che username non sia stato già scelto
    if (isInLocal(username)) {
      alert("Username già in uso. Riprova..");
      $("#uname").val('');
      $("#passw").val('');
    }
    else {
      // creo nuovo oggetto user e lo metto nel localStorage
      user = new User(username, password);
      localStorage.setItem(user.username, JSON.stringify(user));

      alert(username+", la registrazione è avvenuta con successo!");
      hide_reg();
    }

  }
  else{
    alert("registrazione fallita!");
  }
}

//function to check whether the user is registered on the platform.
function isInLocal(username){
  if(typeof(Storage)!=="undefined"){
    if (localStorage.getItem(username)) {
      return true;
    }
    else {
      return false;
    }
  }
  else{
    alert("Mi dispiace, ma il tuo browser non supporta il local storage..")
  }
}

//definizione oggetto user
function User(username, password){
  this.username = username;
  this.password = password;
  this.balance = ['100'];
  this.transaction = JSON.stringify({});

  // metodi:
  // seleziona l'ultimo elemento di balance, ossia l'ultimo saldo
  // function last(){
  //   return this.balance[this.balance.lenght -1];
  // }
}

// funzione per la transazione
// function trans(value, currency, rate){
//
//   // devo sapere qual è l'ultima transazione
//
//   // var last_id = user.transaction[ Object.keys(user.transaction).sort().pop() ];
//   if (last_id == "") {
//     current_id_int = 1;
//   }
//   else {
//     var current_id_int = parsInt(last_id)+1;
//   }
//   // costruisco l'oggetto json da appendere
//   var data_obj = { current_id_int.toString(): { valore : value, valuta: currency, tasso: rate}};
//
// // la sintassi è extend(target, objects,..) dove target è un oggetto già esistente
//   $.extend(user.transaction, data_obj);
// }

//inserire la funzione isInLocal come metodo dell'oggetto user

//*******function to validate the form of currency converter*******************
/*
function validateForm(){

    var z = document.table.["table"]["val1"].value;
    if(!(/)\D/.test(z))){
        alert("Inserire solo numeri.")
    }
}
*/
