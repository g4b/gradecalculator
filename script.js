var ROWCOUNT = 0;

function calculateCurrentGrade() {
    var gradeCol = document.getElementsByClassName("gradeData");
    var weightCol = document.getElementsByClassName("percents");
    var gradeArr = Array.from(gradeCol);
    console.log(gradeArr);
    var weightArr = Array.from(weightCol);
    console.log(weightArr);
    var total = 0;
    for (var i = 0; i < gradeArr.length; i++) {
        total += (gradeArr[i] * weightArr[i]) / 100;
        console.log(gradeArr[i] * weightArr[i] / 100);
    }
    document.getElementById("output").innerHTML = total.toString();
}

function reset(){
    var table = document.getElementById("container");
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
    document.getElementById("calcGrade").style.visibility = "none";
}

function addRow(){
    if (ROWCOUNT <= 6) {
        var table = document.getElementById("container");

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
        field1.className = "grades";
        field2.className = "percents";
        table.appendChild(inputRow);
        inputRow.appendChild(inputCell1);
        inputRow.appendChild(inputCell2);
        inputCell1.appendChild(field1);
        inputCell2.appendChild(field2);
        ROWCOUNT++;

    } else {
        document.getElementById("calcGrade").style.visibility = "visible";
    }
}

function convertArrayStringIntoNumber(string){
    var firstArray = string.split(",");
    var secondArray = [];
    for (var i = 0; i < firstArray.length; i++){
        secondArray += parseInt(firstArray[i]);
    }
    return secondArray;
}

function averageArray(array){
    var sum = 0;
    for (var i = 0; i < array.length; i++){
        sum += array[i];
    }
    return sum / array.length;
}