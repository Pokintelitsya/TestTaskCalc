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
    if(keyValue.charCodeAt(0) > 47 && keyValue.charCodeAt(0) < 58 || keyValue.charCodeAt(0) == 44 || keyValue.charCodeAt(0) == 46) {
      return true;
    } else {
      return false;
    }
  }


/*parser start*/
var myParser =  function () {

  if(expressionData.match(/\(/g) || expressionData.match(/\)/g)) {
    if(expressionData.match(/\(/g) && expressionData.match(/\)/g)) {
      if(expressionData.match(/\(/g).length != expressionData.match(/\)/g).length) {
        errorExpression = true;
      }
    } else {
      errorExpression = true;
    }
  }

  var expressionForParse = expressionData.split(' ');
  //string to array
  for(var i = 0; i < expressionForParse.length; i++) {
    if(expressionForParse[i] == "" && i != expressionForParse.length - 1) {
      if(expressionForParse[i + 1] != '(' && expressionForParse[i - 1] != ')') {
          errorExpression = true;
      } else {
        expressionForParse.splice(i, 1);
      }
    }
    if(expressionForParse[i] == "" && i == expressionForParse.length - 1) {
      expressionForParse.splice(i, 1);
    }
  }

  var withoutBrackets = function (expr) {
    if(expr.indexOf('*') != -1) {
      while (expr.indexOf('*') > -1) {
        var elemIndex = expr.indexOf('*');
        var results = parseFloat(expr[elemIndex - 1]) * parseFloat(expr[elemIndex + 1]);
        expr.splice(elemIndex-1, 3, results );
      }
    }
    if(expr.indexOf('/') != -1) {
      while (expr.indexOf('/') > -1) {
        var elemIndex = expr.indexOf('/');
        var results = parseFloat(expr[elemIndex - 1]) / parseFloat(expr[elemIndex + 1]);
        expr.splice(elemIndex-1, 3, results );
      }
    }
    if(expr.indexOf('+') != -1) {
      while (expr.indexOf('+') > -1) {
        var elemIndex = expr.indexOf('+');
        var results = parseFloat(expr[elemIndex - 1]) + parseFloat(expr[elemIndex + 1]);
        expr.splice(elemIndex-1, 3, results );
      }
    }
    if(expr.indexOf('-') != -1) {
      while (expr.indexOf('-') > -1) {
        var elemIndex = expr.indexOf('-');
        var results = parseFloat(expr[elemIndex - 1]) - parseFloat(expr[elemIndex + 1]);
        expr.splice(elemIndex-1, 3, results );
      }
    }
    return expr;
  }

  var withBrackets = function (expr) {
    if(expr.indexOf('(') != -1) {
      while (expr.indexOf('(') > -1) {
        var openPosition = expr.lastIndexOf('(');
        var closePosition = expr.indexOf(')');
        var exprInBrackets = expr.splice(openPosition + 1, closePosition - openPosition - 1);
        expr.splice(openPosition, exprInBrackets.length + 1, '' + withoutBrackets(exprInBrackets)[0])
      }
    }
    expr =  withoutBrackets(expr);
    return expr;
  };
  
  if(!errorExpression) {
    expressionData = withBrackets(expressionForParse)
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
          if(expressionData[expressionData.length - 1] != ' ') {
            expressionData = expressionData.slice(0, -1);
          } else {
            expressionData = expressionData.slice(0, -3);
          }

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
