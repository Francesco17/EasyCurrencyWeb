function trans_plot(_user, flag){

  var domain = [];
  var codomain = [];
  var data;
  var bar_width = [];
  var base_currency = _user.base_currency;

  for (var i = 0; i < _user.transaction.length; i++) {
    domain[i] = _user.transaction[i].valuta;
    codomain[i] = _user.transaction[i].valore;
    bar_width[i] = 0.5;
  }

  if (flag) {

    data = [{
            x: domain,
            y: codomain,
            type: 'bar',
            width: bar_width
          }];

          var layout = {
          title: 'Transazioni effettuate',
          xaxis: {},
          yaxis: {
        title: base_currency,
        }
      };

      $('#plot-div').fadeIn();
      Plotly.newPlot('plot-div', data, layout);
  }
  else {
    var data = [{
      values: codomain,
      labels: domain,
      type: 'pie'
    }];

    var layout = {
      title: 'Transazioni effettuate'
    };

    $('#plot-div').fadeIn();
    Plotly.newPlot('plot-div', data, layout);
  }

}


function balance_plot(_user){

  var domain = [];
  var codomain = [];

  for (var i = 0; i < _user.balance.length; i++) {
    codomain[i] = _user.balance[i];
    domain[i] = i;
  }

  var data = [{
  x: domain,
  y: codomain,
  type: 'scatter'
}];

  var layout = {
    title: 'Andamento saldo'
  };

  $('#plot-div').fadeIn();
  Plotly.newPlot('plot-div', data, layout);

}
