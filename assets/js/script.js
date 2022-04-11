var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];
//array of objects with hour and text properties

var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

//function to create the array of objects
function initializeSchedule() {

    //for each hourly time period during the day
    $timeBlocks.each(function() {
        var $thisBlock = $(this);
        var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

        var toDoObj = {
            //hour set as data-hour
            hour: thisBlockHr,
            //string input text field
            text: "",
        }
        //adding toDoObj to toDoItems array field
        toDoItems.push(toDoObj);
    });

    //stringifying array of finished objects to local storage
    localStorage.setItem("todos", JSON.stringify(toDoItems));
}

//schedule colors based on time in day
function setUpTimeBlocks() {
    $timeBlocks.each(function() {
        var $thisBlock = $(this);
        var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

        //determining time state in day for color coding purposes
        if (thisBlockHr == currentHour) {
            $thisBlock.addClass("present").removeClass("past future");
        }
        if (thisBlockHr < currentHour) {
            $thisBlock.addClass("past").removeClass("present future");
        }
        if (thisBlockHr > currentHour) {
            $thisBlock.addClass("future").removeClass("past present");
        }
    });
}

function displaySchedule() {

    toDoItems = localStorage.getItem("todos");
    toDoItems = JSON.parse(toDoItems);

    //assign text to each time section by looping through the arrays with data-hour equal to hour. 
    //create variable where [data-hour={hour}] then use it with selector $('[data-hour={hour}')
    for (var i = 0; i < toDoItems.length; i++) {
        var itemHour = toDoItems[i].hour;
        var itemText = toDoItems[i].text;

        $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
    }
}

function saveHandler() {
    var $thisBlock = $(this).parent();

    var hourToUpdate = $(this).parent().attr("data-hour");
    var itemToAdd = (($(this).parent()).children("textarea")).val();

    //this saves text information to the text schedule block adjacent to which save button was clicked
    for (var j = 0; j < toDoItems.length; j++) {
        if (toDoItems[j].hour == hourToUpdate) {
            //text value set to what was entered in textarea within displaySchedule function
            toDoItems[j].text = itemToAdd;
        }
    }
    localStorage.setItem("todos", JSON.stringify(toDoItems));
    displaySchedule();
}


// upon document finishes loading
$(document).ready(function() {

    setUpTimeBlocks();

    if(!localStorage.getItem("todos")) {
        initializeSchedule();
    }

    $currentDay.text(currentDate);

    displaySchedule();

    $scheduleArea.on("click", "button", saveHandler);

});



