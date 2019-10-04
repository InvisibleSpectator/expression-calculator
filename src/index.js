function eval() {
    // Do not use eval!!!
    return;
}

function count(str, ch) {
    let counter=0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] == ch) counter++;
    }
  return counter;
  }

  function calc_expression(operations, numbers) {
    let cur_oper = operations.pop();
    let operation2 = numbers.pop();
    let operation1 = numbers.pop();
    switch (cur_oper) {
        case ("+"):
            numbers.push(operation1 + operation2);
            break;
        case ("-"):
            numbers.push(operation1 - operation2);
            break;
        case ("*"):
            numbers.push(operation1 * operation2);
            break;
        case ("/"):
            if (operation2 == 0)
                throw ("TypeError: Division by zero.");
            else
                numbers.push(operation1 / operation2);
            break;
    }
}
  
  function expressionCalculator(expr) {
      let arr = [];
      let oper_codes = {
          "-": 1,
          "+": 1,
          "*": 2,
          "/": 2,
          "(": 0,
          ")": 0
      }
      let numbers = [];
      let operations = [];
      let str = expr.replace(/\s+/g, "");
      if (count(str,"(") != count(str,")")){
          throw ("ExpressionError: Brackets must be paired");
      }
      else {
          let i = 0;
          while (str.length > 0) {
              i = 0;
              if (str.search(/\-\d+(\.\d+)?|\d+(\.\d+)?/) == 0 && (arr.length == 0 || (oper_codes[arr[arr.length - 1]] != undefined && arr[arr.length - 1] != ")"))) {
                  if (str[0] == "-")
                      i++;
                  while (oper_codes[str[i + 1]] == undefined && i <= str.length) {
                      i++;
                  }
              }
              arr.push(str.slice(0, i + 1));
              str = str.slice(i + 1);
          }
          while (arr.length > 0) {
  
              let el = arr.shift();
              if (oper_codes[el] == undefined) {
                  numbers.push(Number(el));
              }
              else {
                  if (el == "(" || el == ")") {
                      if (el == "(")
                          operations.push(el);
                      else {
                          while (oper_codes[el] < oper_codes[operations[operations.length - 1]]) {
                            calc_expression(operations, numbers);
                          }
                          operations.pop();
                      }
                  }
                  else {
                      if (operations.length == 0 || oper_codes[el] > oper_codes[operations[operations.length - 1]])
                          operations.push(el);
                      else {
                          while (oper_codes[el] <= oper_codes[operations[operations.length - 1]]) {
                            calc_expression(operations, numbers);
                          }
                          operations.push(el);
                      }  
                  }
              }  
          }  
          while (operations.length > 0) {
              calc_expression(operations, numbers);
          }  
          return numbers[0];
      }
  }


module.exports = {
    expressionCalculator
}


