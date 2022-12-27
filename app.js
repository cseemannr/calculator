const calculator = document.querySelector(".calculator");
const display = document.querySelector(".display");
const keys = document.querySelector(".keys");
const clearButton = calculator.querySelector('[data-type="clear"]');

function calculate(n1, operatorAction, n2) {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);

  if (operatorAction === "add") return firstNum + secondNum;
  if (operatorAction === "subtract") return firstNum - secondNum;
  if (operatorAction === "multiply") return firstNum * secondNum;
  if (operatorAction === "divide") return firstNum / secondNum;
  if (operatorAction === "x-pow-y") return Math.pow(firstNum, secondNum);
  if (operatorAction === "y-pow-x") return Math.pow(secondNum, firstNum);
  if (operatorAction === "logy")
    return Math.log(firstNum) / Math.log(secondNum);
  if (operatorAction === "y-root-x") return Math.pow(firstNum, 1 / secondNum);
  if (operatorAction === "ee") return Math.pow(10, secondNum) * firstNum;
}

function factorialNumb(num) {
  let result;
  if (num > 1) {
    result = num * factorialNumb(num - 1);
  } else {
    return 1;
  }
  return result;
}

keys.addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    const key = e.target;
    const keyContent = key.textContent;
    const keyType = key.dataset.type;
    const displayedNumb = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;
    const operatorAction = key.dataset.action;

    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );

    //if memory
    if (keyType === "memory") {
      if (operatorAction === "mclear") {
        calculator.dataset.memory = "";
      }
      if (operatorAction === "mplus") {
        calculator.dataset.memory += `+${displayedNumb}`;
      }
      if (operatorAction === "mminus") {
        calculator.dataset.memory += `-${displayedNumb}`;
      }
      if (operatorAction === "mrecall") {
        const recallNumber = calculator.dataset.memory;
        const result = Function("return" + recallNumber)();
        display.textContent = result;
      }
    }

    if (keyType === "number") {
      //if number
      if (
        displayedNumb === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "equal"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNumb + keyContent;
      }

      calculator.dataset.previousKeyType = "number";
    }

    //if decimal
    if (keyType === "decimal") {
      if (!displayedNumb.includes(".")) {
        display.textContent = `${displayedNumb}.`;
      }
      if (previousKeyType === "equal" || previousKeyType === "operator") {
        display.textContent = "0.";
      }

      calculator.dataset.previousKeyType = "decimal";
    }

    //if percentage
    if (keyType === "percentage") {
      display.textContent = displayedNumb / 100;
      key.classList.add("is-depressed");
    }

    //if operator
    if (keyType === "operator") {
      const firstValue = calculator.dataset.firstValue;
      const operatorAction = key.dataset.action;
      const secondValue = displayedNumb;
      const operator = calculator.dataset.operator;
      const calcUnit = calculator.dataset.unit;

      if (
        firstValue &&
        previousKeyType !== "equal" &&
        previousKeyType !== "operator"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNumb;
      }

      if (
        operatorAction !== "add" &&
        operatorAction !== "subtract" &&
        operatorAction !== "divide" &&
        operatorAction !== "multiply"
      ) {
        key.classList.add("is-depressed");
      }

      // ROW 1

      //(
      //)
      // mc
      // m+
      // m-
      // mr

      if (operatorAction === "plus-minus") {
        display.textContent = displayedNumb * -1;
      }

      // ROW 2

      if (operatorAction === "pow-2") {
        display.textContent = Math.pow(displayedNumb, 2);
      }
      if (operatorAction === "pow-3") {
        display.textContent = Math.pow(displayedNumb, 3);
      }
      if (operatorAction === "ex") {
        display.textContent = Math.exp(displayedNumb);
      }
      if (operatorAction === "10-pow-x") {
        display.textContent = Math.pow(10, displayedNumb);
      }
      if (operatorAction === "2-pow-x") {
        display.textContent = Math.pow(2, displayedNumb);
      }

      // ROW 3
      if (operatorAction === "1-x") {
        display.textContent = 1 / displayedNumb;
      }
      if (operatorAction === "sqrt-x") {
        display.textContent = Math.sqrt(displayedNumb);
      }
      if (operatorAction === "cbrt-x") {
        display.textContent = Math.cbrt(displayedNumb);
      }
      if (operatorAction === "in") {
        display.textContent = Math.log(displayedNumb);
      }
      if (operatorAction === "log10") {
        display.textContent = Math.log10(displayedNumb);
      }
      if (operatorAction === "log2") {
        display.textContent = Math.log2(displayedNumb);
      }

      // ROW 4
      if (operatorAction === "factorial") {
        display.textContent = factorialNumb(displayedNumb);
      }

      if (operatorAction === "sin") {
        if (calcUnit === "degrees") {
          display.textContent = Math.sin((displayedNumb * Math.PI) / 180);
        } else {
          display.textContent = Math.sin(displayedNumb); // radius
        }
      }
      if (operatorAction === "sin-1") {
        if (calcUnit === "degrees") {
          display.textContent = Math.asin((displayedNumb * Math.PI) / 180);
        } else {
          display.textContent = Math.asin(displayedNumb); // radius
        }
      }
      if (operatorAction === "cos") {
        if (calcUnit === "degrees") {
          display.textContent = Math.cos((displayedNumb * Math.PI) / 180);
        } else {
          display.textContent = Math.cos(displayedNumb); // radius
        }
      }
      if (operatorAction === "cos-1") {
        if (calcUnit === "degrees") {
          display.textContent = Math.acos((displayedNumb * Math.PI) / 180);
        } else {
          display.textContent = Math.acos(displayedNumb); // radius
        }
      }
      if (operatorAction === "tan") {
        if (calcUnit === "degrees") {
          display.textContent = Math.tan((displayedNumb * Math.PI) / 180);
        } else {
          display.textContent = Math.tan(displayedNumb); // radius
        }
      }
      if (operatorAction === "tan-1") {
        if (calcUnit === "degrees") {
          display.textContent = Math.atan((displayedNumb * Math.PI) / 180);
        } else {
          display.textContent = Math.atan(displayedNumb); // radius
        }
      }
      if (operatorAction === "e") {
        display.textContent = Math.E;
      }

      // ROW 5

      if (operatorAction === "sinh") {
        if (calcUnit === "degrees") {
          display.textContent = Math.sinh((displayedNumb * Math.PI) / 180);
        } else {
          display.textContent = Math.sinh(displayedNumb); // radius
        }
      }
      if (operatorAction === "sinh-1") {
        if (calcUnit === "degrees") {
          display.textContent = Math.asinh((displayedNumb * Math.PI) / 180);
        } else {
          display.textContent = Math.asinh(displayedNumb); // radius
        }
      }
      if (operatorAction === "cosh") {
        if (calcUnit === "degrees") {
          display.textContent = Math.cosh((displayedNumb * Math.PI) / 180);
        } else {
          display.textContent = Math.cosh(displayedNumb); // radius
        }
      }
      if (operatorAction === "cosh-1") {
        if (calcUnit === "degrees") {
          display.textContent = Math.acosh((displayedNumb * Math.PI) / 180);
        } else {
          display.textContent = Math.acosh(displayedNumb); // radius
        }
      }
      if (operatorAction === "tanh") {
        if (calcUnit === "degrees") {
          display.textContent = Math.tanh((displayedNumb * Math.PI) / 180);
        } else {
          display.textContent = Math.tanh(displayedNumb); // radius
        }
      }
      if (operatorAction === "tanh-1") {
        if (calcUnit === "degrees") {
          display.textContent = Math.atanh((displayedNumb * Math.PI) / 180);
        } else {
          display.textContent = Math.atanh(displayedNumb); // radius
        }
      }
      if (operatorAction === "pi") {
        display.textContent = Math.PI;
      }
      if (operatorAction === "random") {
        display.textContent = Math.random();
      }

      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = operatorAction;
    }

    // if 2nd
    if (keyType === "2nd") {
      const key2nd = document.querySelector('[data-action="2nd"]');
      const keyYPowX = document.querySelector('[data-action="y-pow-x"]');
      const keyEX = document.querySelector('[data-action="ex"]');
      const key10PowX = document.querySelector('[data-action="10-pow-x"]');
      const key2PowX = document.querySelector('[data-action="2-pow-x"]');
      const keyIn = document.querySelector('[data-action="in"]');
      const keyLogy = document.querySelector('[data-action="logy"]');
      const keyLog10 = document.querySelector('[data-action="log10"]');
      const keyLog2 = document.querySelector('[data-action="log2"]');
      const keySin = document.querySelector('[data-action="sin"]');
      const keySinInv = document.querySelector('[data-action="sin-1"]');
      const keyCos = document.querySelector('[data-action="cos"]');
      const keyCosInv = document.querySelector('[data-action="cos-1"]');
      const keyTan = document.querySelector('[data-action="tan"]');
      const keyTanInv = document.querySelector('[data-action="tan-1"]');
      const keySinh = document.querySelector('[data-action="sinh"]');
      const keySinhInv = document.querySelector('[data-action="sinh-1"]');
      const keyCosh = document.querySelector('[data-action="cosh"]');
      const keyCoshInv = document.querySelector('[data-action="cosh-1"]');
      const keyTanh = document.querySelector('[data-action="tanh"]');
      const keyTanhInv = document.querySelector('[data-action="tanh-1"]');

      key2nd.classList.toggle("second-depressed");
      keyYPowX.classList.toggle("secondBtn");
      keyEX.classList.toggle("secondBtn");
      key10PowX.classList.toggle("secondBtn");
      key2PowX.classList.toggle("secondBtn");
      keyIn.classList.toggle("secondBtn");
      keyLogy.classList.toggle("secondBtn");
      keyLog10.classList.toggle("secondBtn");
      keyLog2.classList.toggle("secondBtn");
      keySin.classList.toggle("secondBtn");
      keySinInv.classList.toggle("secondBtn");
      keyCos.classList.toggle("secondBtn");
      keyCosInv.classList.toggle("secondBtn");
      keyTan.classList.toggle("secondBtn");
      keyTanInv.classList.toggle("secondBtn");
      keySinh.classList.toggle("secondBtn");
      keySinhInv.classList.toggle("secondBtn");
      keyCosh.classList.toggle("secondBtn");
      keyCoshInv.classList.toggle("secondBtn");
      keyTanh.classList.toggle("secondBtn");
      keyTanhInv.classList.toggle("secondBtn");
    }

    // if rad
    if (keyType === "rad-deg") {
      const radDegBtn = document.querySelector("[data-type='rad-deg']");
      const radText = document.querySelector(".rad-text");
      if (radDegBtn.textContent === "Rad") {
        radDegBtn.textContent = "Deg";
        calculator.dataset.unit = "radius";
        radText.classList.add("degrees");
      } else {
        radDegBtn.textContent = "Rad";
        calculator.dataset.unit = "degrees";
        radText.classList.remove("degrees");
      }
    }

    //if equal
    if (keyType === "equal") {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNumb;

      if (previousKeyType === "equal") {
        firstValue = displayedNumb;
        secondValue = calculator.dataset.modifierValue;
      }

      display.textContent = calculate(firstValue, operator, secondValue);

      calculator.dataset.modifierValue = secondValue;
      calculator.dataset.previousKeyType = "equal";
    }

    //if clear
    if (keyType === "clear") {
      if ((clearButton.textContent = "AC")) {
        calculator.dataset.operator = "";
        calculator.dataset.firstValue = "";
        calculator.dataset.secondValue = "";
        calculator.dataset.modifierValue = "";
        calculator.dataset.previousKeyType = "";
      } else {
        clearButton.textContent = "AC";
      }

      display.textContent = 0;

      calculator.dataset.previousKeyType = "clear";
    }
    if (keyContent !== "clear") {
      clearButton.textContent = "C";
    }
  } //event close
});

// Light / Dark Mode:
const checkBox = document.querySelector('[type="checkbox"]');
const html = document.documentElement;

checkBox.addEventListener("click", function () {
  if (checkBox.checked) {
    html.dataset.mode = "dark-mode";
  } else {
    html.dataset.mode = "light-mode";
  }
});
