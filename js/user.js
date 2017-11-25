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
    if ( password == localStorage.getItem(username)) {
      sessionStorage.setItem(username,password);
      document.getElementById("logged").innerHTML = "<h2>Benvenuto, "+username+"!</h2>";
      $('#content').submit(function(){
          $(this).hide();
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

//function for showing the registration box
function show_reg(){
  $('#box_reg').show();
}

function registration(){
  var x = document.forms["form_reg"];
  var username = "";
  var password = "";
  for (var i = 0; i < x.length-1; i++) {
      username = x.elements[0].value;
      password = x.elements[1].value;
  }
  //setting localStorage
  if (localStorage) {
    localStorage.setItem(username, password);
    console.log(localStorage.getItem(username));
  }
  else{
    alert("registrazione fallita!");
  }

  alert(username+", la registrazione è avvenuta con successo!");
  $('#box_reg').hide();
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

//*******function to validate the form of currency converter*******************
/*
function validateForm(){

    var z = document.table.["table"]["val1"].value;
    if(!(/)\D/.test(z))){
        alert("Inserire solo numeri.")
    }
}
*/
