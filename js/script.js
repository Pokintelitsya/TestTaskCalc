$(document).ready(function () {

  var expressionData = '0';
  var expressionDataView = $('#display');
  var fullExpression = $('#full');
  var errorExpression = false;
  var setDisplay = function () {
    expressionDataView.html(expressionData);
    if(expressionData.length > 25) {
      fullExpression.html(expressionData);
    } else {
      fullExpression.html('');
    }
  };
  setDisplay();
  var isNumber = function(keyValue) {
    if(keyValue.charCodeAt(0) > 47 && keyValue.charCodeAt(0) < 58 || keyValue.charCodeAt(0) == 44) {
      return true;
    } else {
      return false;
    }
  }
/*parser start*/
var myParser =  function () {
  var expressionForParse = expressionData.split(' ');
  //string to array

  console.log(expressionForParse)
  for(var i = 0; i < expressionForParse.length; i++) {
    if(expressionForParse[i] == "" && i != expressionForParse.length - 1) {
      if(expressionForParse[i + 1] != '(') {
          errorExpression = true;
      } else {
        expressionForParse.splice(i, 1);
      }
    }
    console.log(expressionForParse[i])

  }
  setDisplay();
  if(errorExpression) {
    $('.error').show();
  }
}
/*parser end*/
/* key listener start*/
  $('.key').on('click', function () {
    var clickValue = $(this).attr('value');

    if(clickValue == 'backspace') {
      $('.error').hide();
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
        $('.error').hide();
        expressionData = '0';
        setDisplay();
      }else {
        if(clickValue == '=') {
          myParser();
        } else {
          if(expressionData == '0') {
            if(isNumber(clickValue))
            expressionData = clickValue;
          } else {
            if(isNumber(clickValue)) {
              expressionData = expressionData + clickValue;
            } else {
              expressionData = expressionData + ' ' + clickValue + ' ';
            }
          }
          setDisplay();
        }
      }
    }
  });
  /* key listener end*/
});
