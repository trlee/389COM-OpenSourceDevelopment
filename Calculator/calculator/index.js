/*
TODO:
    Add calculations process
    Do not allow multiple decimal point inputs
    Do not allow values to be divided by zero, show error msg
    Add an answer storing variable
    Add formula list
*/

(function () {
    "use strict";
    // Shortcut to get elements
    var el = function (element) {
        if (element.charAt(0) === "#") { // If passed an ID...
            return document.querySelector(element); // ... returns single element
        }
        return document.querySelectorAll(element); // Otherwise, returns a nodelist
    };

    // Variables
    var viewer = el("#viewer"), // Calculator screen where result is displayed
      equals = el("#equals"), // Equal button
      nums = el(".num"), // List of numbers
      ops = el(".ops"), // List of operators
      currentNum = "", // Current number
      oldNum = "", // First number
      resultNum, // Result
      operator; // Operand
    // When: Number is clicked. Get the current number selected
    var setNum = function ()
    {
        if (resultNum)
        { // If a result was displayed, reset number
            currentNum = this.getAttribute("data-num");
            resultNum = "";
        }
        else
        { // Otherwise, add digit to previous number (this is a string!)
            currentNum += this.getAttribute("data-num");
        }
        viewer.innerHTML = currentNum; // Display current number
    };

    // When: Operator is clicked. Pass number to oldNum and save operator
    var moveNum = function ()
    {
        oldNum = currentNum;
        currentNum = "";
        operator = this.getAttribute("data-ops");
        equals.setAttribute("data-result", ""); // Reset result in attr
    };

    // When: Equals is clicked. Calculate result
    var displayResults = function ()
    {
    };

    // When: Clear button is pressed. Clear everything
    var clearAll = function ()
    {
        oldNum = "";
        currentNum = "";
        viewer.innerHTML = "0";
        equals.setAttribute("data-result", resultNum);
    };

    /* The click events */
    // Add click event to numbers
    for (var i = 0, l = nums.length; i < l; i++) {
        nums[i].onclick = setNum;
    }

    // Add click event to equal sign
    equals.onclick = displayResults;

    // Add click event to clear button
    el("#clear").onclick = clearAll;

}());