// funzione chiamata al click del bottone "converti"
function currencyconverter(from, to, val1, result){

// definisco risorsa, access key e sorgente
endpoint = 'live'
access_key = 'cdaa48c0799e268d91b98681529912eb'; //36ed860ff64b5e9961d86f10bc053a6f finito il piano
source = "USD";
currencies = from+","+to;

// valore da convertire
var conversione;

if (val1 == '') {
  return false;
}

// eseguo la chiamata ajax alle api
$.ajax({
    url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&source='+ source + '&currencies='+ currencies,
    dataType: 'jsonp',
    success: function(json) {

      conversione = conversion(from, to, val1, json);

      result(conversione);
    }

  });
}

function conversion(from, to, value, json){

  source = "USD";
  var combine;
  var conversione;

  // se la valuta di partenza è uguale ad USD allora moltiplico il valore per il cambio
  if (from == source) {
    combine = from+to;
    conversione = value*json.quotes[combine];
  }
  // se la valuta di arrivo è uguale ad USD allora divido il valore per il cambio
  else if (to == source) {
    combine = to+from;
    conversione = value/json.quotes[combine];
  }
  else {
    // altrimenti effettue 2 cambi: partenza ad USD e da USD ad arrivo
    combine = source+from;
    var temp = value/json.quotes[combine];
    combine = source+to;
    conversione = temp*json.quotes[combine];
  }

  return conversione;

}

//unzione che inverte le valute e ricalcola la conversione
function invert_curr(){

  // prendo la valuta di partenza
  from = document.getElementById("curr_1").options[document.getElementById("curr_1").selectedIndex].value;
  // prendo la valuta di arrivo
  to = document.getElementById("curr_2").options[document.getElementById("curr_2").selectedIndex].value;

  //prendo il valore
  value = document.getElementById("val1").value;

  //scambio le valute
  $('#curr_2').val(from);
  $('#curr_1').val(to);

  //ricalcolo al conversione
  currencyconverter(from, to, value, function(output){
    document.getElementById('val2').value = output;
  });

}

function compute_rate(from, to, val1, val2){

  source = "USD";
  var rate;

  if (from == source) {
    rate = val2/val1;
  }
  else if (to == source) {
    rate = val1/val2;
  }
  else {
    // devo approfondire la fattibilità della triangolazione
    rate = 1;
  }

  return rate;

}

function compute_deposit(_user){

  var len = _user.transaction.length;
  var deposit = 0;

  for(i = 0; i<len; i++){
    deposit += Number(_user.transaction[i].valore);
  }

  return 100-deposit;
}

function compute_balance(_user){

  var len = _user.transaction.length;
  var obj = _user.transaction;
  var old_balance = _user.balance[_user.balance.length-1];
  var source = "USD";
  var combine;
  var balance = compute_deposit(_user);
  var old_conversion;

  if (len != 0) {

    rates_call_for_transactions().done(function(rates){

      for(i=0; i<len; i++){
        old_conversion = Number(obj[i].valore * obj[i].tasso);
        combine = source+obj[i].valuta;
        balance += Number(old_conversion/rates.quotes[combine]);

      }

      $('#balance').html('Saldo: '+balance+" "+_user.base_currency);

      if (old_balance != balance) {
        _user.balance.push(balance);
        sessionStorage.setItem(_user.username, JSON.stringify(_user));
        localStorage.setItem(_user.username, JSON.stringify(_user));
      }
      else {
        alert(_user.username+", il saldo è rimasto invariato rispetto all'ultimo aggiornamento.");
      }

      return false;

    });

  }
  else {
    return balance;
  }

}

function rates_call_for_transactions(){

  endpoint = 'live'
  access_key = 'cdaa48c0799e268d91b98681529912eb';
  source = "USD";

  return $.ajax({
          url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&source='+ source,
          dataType: 'jsonp',
          });

}
