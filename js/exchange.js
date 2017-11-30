// funzione chiamata al click del bottone "converti"

function currencyconverter(){

// definisco risorsa, access key e sorgente
endpoint = 'live'
access_key = '36ed860ff64b5e9961d86f10bc053a6f';
source = "USD";

// valore da convertire
var val1 = document.getElementById('val1').value;

if (val1 == '') {
  return false;
}

// prendo la valuto di partenza
from = document.getElementById("curr_1").options[document.getElementById("curr_1").selectedIndex].value;
// prendo la valuta di arrivo
to = document.getElementById("curr_2").options[document.getElementById("curr_2").selectedIndex].value;

// eseguo la chiamata ajax alle api
// il piano gratuito delle api permette di selezionare come sorgente solo USD
$.ajax({
    url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&source='+ source,
    dataType: 'jsonp',
    success: function(json) {

        // exchange rata data is stored in json.quotes
        // se la valuta di partenza è uguale ad USD allora moltiplico il valore per il cambio
        if (from == source) {
          combine = from+to;
          document.getElementById('val2').value = val1*json.quotes[combine];
        }
        // se la valuta di arrivo è uguale ad USD allora divido il valore per il cambio
        else if (to == source) {
          combine = to+from;
          document.getElementById('val2').value = val1/json.quotes[combine];
        }
        else {
          // altrimenti effettue 2 cambi: partenza ad USD e da USD ad arrivo
          combine = source+from;
          var temp = val1/json.quotes[combine];
          combine = source+to;
          document.getElementById('val2').value = temp*json.quotes[combine];
        }

    }
});
}
//unzione che inverte le valute e ricalcola la conversione
function invert_curr(){

  // prendo la valuta di partenza
  from = document.getElementById("curr_1").options[document.getElementById("curr_1").selectedIndex].value;
  // prendo la valuta di arrivo
  to = document.getElementById("curr_2").options[document.getElementById("curr_2").selectedIndex].value;

  //scambio le valute
  $('#curr_2').val(from);
  $('#curr_1').val(to);

  //ricalcolo al conversione
  currencyconverter();

}
