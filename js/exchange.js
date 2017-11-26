function currencyconverter(){

var val1 = document.getElementById('val1').value;
// set endpoint and your access key
endpoint = 'live'
access_key = '36ed860ff64b5e9961d86f10bc053a6f';
source = "USD"; //it could be only usd for free plan api

e = document.getElementById("curr_1");
from = e.options[e.selectedIndex].value;

e1 = document.getElementById("curr_2");
to = e1.options[e1.selectedIndex].value;
combine = from+to;

// get the most recent exchange rates via the "live" endpoint:
$.ajax({
    url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&source='+ source,
    dataType: 'jsonp',
    success: function(json) {

        // exchange rata data is stored in json.quotes
        var rate = json.quotes[combine];
        document.getElementById('val2').value = val1*rate;



        // source currency is stored in json.source
        //alert(json.source);

        // timestamp can be accessed in json.timestamp
        //alert(json.timestamp);

    }
});
}
