// set endpoint and your access key
endpoint = 'live'
access_key = '36ed860ff64b5e9961d86f10bc053a6f';
e = document.getElementById("curr_1");
source = e.options[e.selectedIndex].value;

// get the most recent exchange rates via the "live" endpoint:
$.ajax({
    url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&source='+ source,
    dataType: 'jsonp',
    success: function(json) {

        // exchange rata data is stored in json.quotes
        alert(json.quotes.USDGBP);

        // source currency is stored in json.source
        alert(json.source);

        // timestamp can be accessed in json.timestamp
        alert(json.timestamp);

    }
});
