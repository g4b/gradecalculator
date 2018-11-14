var ROWCOUNT = 0;

function calculateGradeNeeded(){
    var finalPercent = parseInt(document.getElementById("finalWeight").value) / 100;
    var nonFinalWeight = 1 - finalPercent;
    var currentWeighted = parseInt(document.getElementById("currentOutput").innerHTML) * nonFinalWeight;
    var gradeWanted = parseInt(document.getElementById("gradeWanted").value);
    var finalNeeded = (gradeWanted - currentWeighted) / finalPercent;
    if (finalNeeded < 0) {
        document.getElementById("finalOutput").innerHTML = "You could get a zero on the final and still have at least a " + gradeWanted + " in the class. Don't sweat it!";
    } else if (isNaN(finalNeeded) || isNaN(gradeWanted)){
        alert("The program has failed gracefully. Please enter NUMERIC values.");
    } else {
        document.getElementById("finalOutput").innerHTML = "You need a " + Math.floor(finalNeeded) + " on the final to get a " + gradeWanted + " in the class.";
    }
}

function calculateCurrentGrade() {
    var grades = document.getElementsByClassName("gradeData");
    var gradeValues = [];
    for (var i = 0; i < grades.length; i++){
        var gradeNumbers = convertArrayStringToNumber(grades[i].value.toString());
        gradeValues[i] = averageArray(gradeNumbers);
        if (gradeValues[i] > 120){
            alert("One of your grade values is too high. Please change it to be lower than 120.");
            return null;
        } else {
            var currentRow = document.getElementById(i.toString());
            if (gradeValues[i] >= 90 && gradeValues[i] <= 110){
                currentRow.style.backgroundColor = "#51b91d";
            } else if (gradeValues[i] < 90 && gradeValues[i] >= 80) {
                currentRow.style.backgroundColor = "#2dc2dc";
            } else if (gradeValues[i] < 80 && gradeValues[i] >= 70){
                currentRow.style.backgroundColor = "#e5e066";
            } else {
                currentRow.style.backgroundColor = "#ff0000";
            }
        }
    }
    var weights = document.getElementsByClassName("percents");
    var weightValues = [];
    for (var j = 0; j < weights.length; j++){
        if (weightValues[j] > 1){
            alert("One of your percents is greater than 100. Please change it.");
            return null;
        } else {
            weightValues[j] = (weights[j].value / 100);
        }
    }
    var sum = 0;
    console.log(weightValues);
    for (var k = 0; k < weightValues.length; k++){
        sum += weightValues[k];
    }
    if (sum != 1){
        alert("Your percents do not add up to 100. Please change them.");
        return null;
    }
    var total = 0;
    for (var l = 0; l < gradeValues.length; l++) {
        total += gradeValues[l]*weightValues[l];
    }
    if (isNaN(total)){
        alert("The program has failed gracefully. Please reload the page.");
    } else {
        document.getElementById("currentOutput").innerHTML = Math.floor(total).toString();
        document.getElementById("finalWeight").style.visibility = "visible";
        document.getElementById("calcNeeded").style.visibility = "visible";
        document.getElementById("gradeWanted").style.visibility = "visible";
    }
    disable("btn btn-secondary");
}

function reset(){
    document.getElementById("addRow").className = "btn btn-primary";
    document.getElementById("calcGrade").className = "btn btn-success";
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
    initRow.style.backgroundColor = "black";
    initRow.style.color = "white";
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
        titleCell1.style.color = "white";
        titleCell2.style.color = "white";
        table.appendChild(titleRow);
        titleRow.appendChild(titleCell1);
        titleRow.appendChild(titleCell2);
        titleRow.setAttribute("id", ROWCOUNT.toString());
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
        field1.value = "90,90,90";
        table.appendChild(inputRow);
        inputRow.appendChild(inputCell1);
        inputRow.appendChild(inputCell2);
        inputCell1.appendChild(field1);
        inputCell2.appendChild(field2);
        ROWCOUNT++;
        calcEvenWeight(ROWCOUNT);
    } else {
        document.getElementById("categoryName").style.visibility = "hidden";
        disable("btn btn-secondary");
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

function disable(selector){
    document.getElementById("addRow").isDisabled = true;
    document.getElementById("addRow").className = selector;
    document.getElementById("calcGrade").isDisabled = true;
    document.getElementById("calcGrade").className = selector;
}