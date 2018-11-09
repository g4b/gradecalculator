var ROWCOUNT = 0;

function calculateGradeNeeded(){
    var finalPercent = document.getElementById("finalWeight").value / 100;
    var nonFinalWeight = 1 - finalPercent;
    var currentWeighted = document.getElementById("output").value * nonFinalWeight;
    return (document.getElementById("gradeWanted").value - currentWeighted) / finalPercent;
}

function calculateCurrentGrade() {
    var grades = document.getElementsByClassName("gradeData");
    var gradeValues = [];
    for (var i = 0; i < grades.length; i++){
        var gradeNumbers = convertArrayStringToNumber(grades[i].value.toString());
        gradeValues[i] = averageArray(gradeNumbers);
    }
    var weights = document.getElementsByClassName("percents");
    var weightValues = [];
    for (var j = 0; j < weights.length; j++){
        weightValues[j] = (weights[j].value / 100);
    }
    var total = 0;
    for (var k = 0; k < gradeValues.length; k++) {
        total += gradeValues[k]*weightValues[k];
    }
    if (isNaN(total)){
        alert("The program has failed gracefully. Please reload the page.");
    } else {
        document.getElementById("output").innerHTML = total;
        document.getElementById("finalWeight").style.visibility = "visible";
        document.getElementById("calcNeeded").style.visibility = "visible";
        document.getElementById("gradeWanted").style.visibility = "visible";
    }
}

function reset(){
    var table = document.getElementById("gradeWrapper");
    var initRow = document.createElement("tr");
    var initCell1 = document.createElement("td");
    var initCell2 = document.createElement("td");
    initCell1.innerHTML = "Grade";
    initCell2.innerHTML = "Percentage Weight";
    initCell1.style.margin = "auto";
    initCell1.style.fontWeight = "bold";
    initCell2.style.margin = "auto";
    initCell2.style.fontWeight = "bold";
    table.appendChild(initRow);
    initRow.appendChild(initCell1);
    initRow.appendChild(initCell2);
    document.getElementById("finalWeight").style.visibility = "hidden";
    document.getElementById("calcNeeded").style.visibility = "hidden";
    document.getElementById("gradeWanted").style.visibility = "hidden";
    addRow();
}

function addRow(){
    if (ROWCOUNT <= 4) {
        var table = document.getElementById("gradeWrapper");

        // title row
        var title = document.getElementById("categoryName").value;
        var titleRow = document.createElement("tr");
        var titleCell1 = document.createElement("td");
        var titleCell2 = document.createElement("td");
        titleCell1.innerHTML = title + " Points";
        titleCell2.innerHTML = title + " Weight";
        table.appendChild(titleRow);
        titleRow.appendChild(titleCell1);
        titleRow.appendChild(titleCell2);
        document.getElementById("categoryName").value = "";

        //input row
        var inputRow = document.createElement("tr");
        var inputCell1 = document.createElement("td");
        var inputCell2 = document.createElement("td");
        var field1 = document.createElement("input");
        var field2 = document.createElement("input");
        field1.setAttribute("type", "text");
        field2.setAttribute("type", "text");
        field1.className = "gradeData";
        field2.className = "percents";
        table.appendChild(inputRow);
        inputRow.appendChild(inputCell1);
        inputRow.appendChild(inputCell2);
        inputCell1.appendChild(field1);
        inputCell2.appendChild(field2);
        ROWCOUNT++;
        calcEvenWeight(ROWCOUNT);
    } else {
        document.getElementById("categoryName").style.visibility = "hidden";
        document.getElementById("addRow").isDisabled = true;
        document.getElementById("addRow").className("btn btn-secondary");
    }
}

function convertArrayStringToNumber(str){
    var firstArray = str.split(",");
    var secondArray = [];
    for (var i = 0; i < firstArray.length; i++){
        secondArray[i] = parseInt(firstArray[i]);
    }
    return secondArray;
}

function averageArray(arr){
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}

function calcEvenWeight(rowCount){
    var weights = document.getElementsByClassName("percents");
    var evenWeight = 100 / rowCount;
    for (var i = 0; i < weights.length; i++){
        document.getElementsByClassName("percents")[i].value = evenWeight;
    }
}