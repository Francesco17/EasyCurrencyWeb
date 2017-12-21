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
  var base_currency = "";

  for (var i = 0; i < x.length-1; i++) {
      username = x.elements[0].value;
      password = x.elements[1].value;
      base_currency = x.elements[2].value;
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
      user = new User(username, password, base_currency);
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
function User(username, password, base_currency){
  this.username = username;
  this.password = password;
  this.base_currency = base_currency;
  this.balance = [100];
  this.transaction = [];
}

// funzione per la transazione
function trans(username, value, currency, rate){

  _user = JSON.parse(sessionStorage.getItem(username));
  var dep = compute_deposit(_user);
  dep = Number(dep-value);

  // devo sapere qual è l'ultima transazione
  var last_el = _user.transaction[_user.transaction.length-1];
  var current_id_int;

  if (last_el === undefined) {
    current_id_int = 1;
  }
  else {
    var last_id = last_el.id;
    current_id_int = last_id+1;
  }
  // costruisco l'oggetto json da appendere
  var data_obj = { id: current_id_int, valore: value, valuta: currency, tasso: rate};

  _user.transaction.push(data_obj);
  sessionStorage.setItem(_user.username, JSON.stringify(_user));
  localStorage.setItem(_user.username, JSON.stringify(_user));

  $("#box_logged").append("<h4 style='padding-left:10px;'>Transazione "+current_id_int+" : hai cambiato "+value+" "+
  _user.base_currency+" in "+value*rate+" "+currency+" </h4>");
  $('#deposit').html("Deposito: "+dep+" "+_user.base_currency);

}

function delete_trans(_user, id){

  var obj = _user.transaction;
  var len = _user.transaction.length;
  var dep;

  if (id > len || id == 0) {
    alert(_user.username+", non puoi eliminare transazioni che non esistono!");
    return false;
  }
  else {

    if (len != 0) {
      if (len == 1) {
        obj.pop();
        $('h4').last().remove();
        sessionStorage.setItem(_user.username, JSON.stringify(_user));
        localStorage.setItem(_user.username, JSON.stringify(_user));
        // dep = _user.balance[_user.balance.length-1];
        dep = compute_deposit(_user);
      }
      else {
        obj.splice(id-1,1);
        len = _user.transaction.length;
        var i = id-1;

        while (i<len) {
          obj[i].id = i+1;
          i++;
        }

        $('h4').remove();
        sessionStorage.setItem(_user.username, JSON.stringify(_user));
        localStorage.setItem(_user.username, JSON.stringify(_user));
        show_transactions(_user);
        dep = compute_deposit(_user);
      }

      $('#deposit').html("Deposito: "+dep+" "+_user.base_currency);
      compute_balance(_user);
    }
    else {
      alert(_user.username+", non hai eseguito nessuna transazione.");
    }
  }



}

function show_transactions(_user){

  var len = _user.transaction.length;
  var obj = _user.transaction;
  // var divs = [];

  for(i=0; i<len; i++){
    $("#box_logged").append("<h4 style='padding-left:10px;'>Transazione "+obj[i].id+" : hai cambiato "+obj[i].valore+" "+
    _user.base_currency+" in "+obj[i].valore*obj[i].tasso+" "+obj[i].valuta+" </h4>");
    // divs[i] = "<h3 style='padding-left:10px;'>Transazione "+obj[i].id+" : hai cambiato "+obj[i].valore+" in "+obj[i].valuta+" </h3>";
  }

}

//*******function to validate the form of currency converter*******************
/*
function validateForm(){

    var z = document.table.["table"]["val1"].value;
    if(!(/)\D/.test(z))){
        alert("Inserire solo numeri.")
    }
}
*/
