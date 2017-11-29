function currencyconverter(){

// set endpoint and your access key
endpoint = 'live'
access_key = '36ed860ff64b5e9961d86f10bc053a6f';
source = "USD";

var val1 = document.getElementById('val1').value;

if (val1 == '') {
  return false;
}

e = document.getElementById("curr_1");
from = e.options[e.selectedIndex].value;

e1 = document.getElementById("curr_2");
to = e1.options[e1.selectedIndex].value;

// get the most recent exchange rates via the "live" endpoint:
$.ajax({
    url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&source='+ source,
    dataType: 'jsonp',
    success: function(json) {

        // exchange rata data is stored in json.quotes
        if (from == source) {
          combine = from+to;
          document.getElementById('val2').value = val1*json.quotes[combine];
        }
        else if (to == source) {
          combine = to+from;
          document.getElementById('val2').value = val1/json.quotes[combine];
        }
        else {
          combine = source+from;
          var temp = val1/json.quotes[combine];
          combine = source+to;
          document.getElementById('val2').value = temp*json.quotes[combine];
        }

    }
});
}
//done..
function invert_curr(){

  //get the option selected on the left
  e = document.getElementById("curr_1");
  from = e.options[e.selectedIndex].value;

  //get the option selected on the right
  e1 = document.getElementById("curr_2");
  to = e1.options[e1.selectedIndex].value;

  //set from to to and viceversa in the select box
  $('#curr_2').val(from);
  $('#curr_1').val(to);

  //once the currencies are exchanged
  currencyconverter();

}
