// funzione chiamata al click del bottone "converti"

function currencyconverter(){

// definisco risorsa, access key e sorgente
// esempi
// http://apilayer.net/api/live?access_key=36ed860ff64b5e9961d86f10bc053a6f&currencies=BTC
// http://apilayer.net/api/historical?date=2017-01-01&access_key=36ed860ff64b5e9961d86f10bc053a6f&currencies=BTC


endpoint = 'historical';
access_key = '36ed860ff64b5e9961d86f10bc053a6f';
source = "USD";


// data storica del cambio date = '2017-01-01';

date = document.getElementById("giorno").value;

// valore da convertire
var val1 = document.getElementById('val1').value;
var conversione
if (val1 == '') { return false; }

// prendo la valuto di partenza
from = document.getElementById("curr_1").options[document.getElementById("curr_1").selectedIndex].value;
// prendo la valuta di arrivo
to = document.getElementById("curr_2").options[document.getElementById("curr_2").selectedIndex].value;

// eseguo la chiamata ajax alle api
// il piano gratuito delle api permette di selezionare come sorgente solo USD
$.ajax({
    url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&date=' + date + '&source='+ source,
    dataType: 'jsonp',
    success: function(json) {
        // exchange rata data is stored in json.quotes
        // se la valuta di partenza è uguale ad USD allora moltiplico il valore per il cambio
        if (from == source) {
          combine = from+to;
	         document.getElementById('val2').value = val1*json.quotes[combine];
          conversione = val1*json.quotes[combine];
        }
        // se la valuta di arrivo è uguale ad USD allora divido il valore per il cambio
        else if (to == source) {
          combine = to+from;
	         document.getElementById('val2').value = val1/json.quotes[combine];
          conversione = val1/json.quotes[combine];
        }
        else {
          // altrimenti effettue 2 cambi: partenza ad USD e da USD ad arrivo
          combine = source+from;
          var temp = val1/json.quotes[combine];
          combine = source+to;
	         document.getElementById('val2').value = temp*json.quotes[combine];
          conversione = temp*json.quotes[combine];
        }
//   document.getElementById('val2').value = temp*json.quotes[combine];

	console.log(conversione);
	return conversione;
    }
});
}

// funzione chiamata al click del bottone "converti"
function currency_graph(from, to, val1, date, result){

// definisco risorsa, access key e sorgente
endpoint = 'historical'
access_key = '36ed860ff64b5e9961d86f10bc053a6f';
source = "USD";

var conversione;
if (val1 == '') { return false; }

// valore da convertire

console.log(from+to+val1+date);
// eseguo la chiamata ajax alle api
$.ajax({
    url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&date=' + date + '&source='+ source + '&currencies='+ to,
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

// function compute_rate(from, to, val1, val2){
//
//   source = "USD";
//   var rate;
//
//   if (from == source) {
//     rate = val2/val1;
//   }
//   else if (to == source) {
//     rate = val1/val2;
//   }
//   else {
//     // devo approfondire la fattibilità della triangolazione
//     rate = 1;
//   }
//
//   return rate;
//
// }

// function compute_deposit(_user){
//
//   var len = _user.transaction.length;
//   var deposit = 0;
//
//   for(i = 0; i<len; i++){
//     deposit += Number(_user.transaction[i].valore);
//   }
//
//   return 100-deposit;
// }

// function compute_balance(_user){
//
//   var len = _user.transaction.length;
//   var obj = _user.transaction;
//   var source = "USD";
//   var combine;
//   var balance = compute_deposit(_user);
//   var old_conversion;
//
//   if (len != 0) {
//
//     rates_call_for_transactions().done(function(rates){
//
//       for(i=0; i<len; i++){
//         old_conversion = Number(obj[i].valore * obj[i].tasso);
//         combine = source+obj[i].valuta;
//         balance += Number(old_conversion/rates.quotes[combine]);
//
//       }
//
//       $('#balance').html('Saldo: '+balance+" "+_user.base_currency);
//       return false;
//
//     });
//
//   }
//   else {
//     return balance;
//   }
//
// }
//
// function rates_call_for_transactions(){
//
//   endpoint = 'live'
//   access_key = '36ed860ff64b5e9961d86f10bc053a6f';
//   source = "USD";
//
//   return $.ajax({
//           url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&source='+ source,
//           dataType: 'jsonp',
//           });
//
// }
