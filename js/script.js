$(document).ready(function () {

  var expressionData = '0';
  var expressionDataView = $('#display');
  var fullExpression = $('#full');
  var setDisplay = function () {
    expressionDataView.html(expressionData);
    if(expressionData.length > 45) {
      fullExpression.html(expressionData);
    } else {
      fullExpression.html('');
    }
  };
  setDisplay();
/*parser start*/
var myParser =  function () {
  var expressionForParse = expressionData;
  for(var i = 0; i < expressionData.length; i++) {
    console.log(expressionForParse[i])
  }
  setDisplay();
}
/*parser end*/
/* key listener start*/
  $('.key').on('click', function () {
    var clickValue = $(this).attr('value');

    if(clickValue == 'backspace') {
      if(expressionData !== '0') {
        if(expressionData.length != 1) {
          expressionData = expressionData.slice(0, -1);
        } else {
          expressionData = '0';
        }
        setDisplay();
      }
    } else {
      if(clickValue == 'C') {
        expressionData = '0';
        setDisplay();
      }else {
        if(clickValue == '=') {
          myParser();
        } else {
          if(expressionData == '0') {
            expressionData = $(this).attr('value');
          } else {
            expressionData = expressionData + ' ' + $(this).attr('value');
          }
          setDisplay();
        }

      }
    }

  });
  /* key listener end*/
});
