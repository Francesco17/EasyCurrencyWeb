// funzione chiamata al click del bottone "converti"
function currencyconverter( from, to, val1, date, result){
// definisco risorsa, access key e sorgente
endpoint = 'historical';
access_key = '067f84ff7a41320d09e54dd3f766cfb3' ; //'cdaa48c0799e268d91b98681529912eb'
source = "USD";
currencies = from+","+to;

var conversione;
if (val1 == '') { return false; }

$.ajax({
    url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&date=' + date + '&source='+ source + '&currencies='+ currencies,
    dataType: 'jsonp',
    success: function(json) {
      // exchange rata data is stored in json.quotes
      conversione = conversion(from, to, val1, json);
      // console.log(conversione);
      result(conversione);
    }
  });
}

// funzione chiamata al click del bottone "converti"
function currency_graph(from, to, val1, date){

// definisco risorsa, access key e sorgente
endpoint = 'historical'
access_key = '067f84ff7a41320d09e54dd3f766cfb3';
source = "USD";
currencies = from+","+to;
url = 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&date=' + date + '&source='+ source + '&currencies='+ currencies;

var conversione;
if (val1 == '') { return false; }

//chiamata sincrona
var xhttp = new XMLHttpRequest();
xhttp.open("GET", url, false);
xhttp.send();
if (xhttp.status == 200) {

  var json = JSON.parse(xhttp.responseText);
  var risultato = conversion(from, to, 1, json);
  return risultato;
}

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
