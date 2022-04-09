var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];
//array of objects with hour and text properties
 
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

//function to create the array of objects
function initializeSchedule(){

//for each hourly time period during the day
  $timeBlocks.each(function(){
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

//format timeblock colors depending on time
function setUpTimeDisplay(){
    $timeBlocks.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

      //add style to time blocks to show where we are in the day
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

function displaySchedule(){
  
    toDoItems = localStorage.getItem("todos");
    toDoItems = JSON.parse(toDoItems);
  
    //assign text to each time section by looping through the arrays with data-hour equal to hour. 
    //make a variable where [data-hour={hour}] then plug it in to the selector $('[data-hour={hour}')
    for (var i = 0; i < toDoItems.length; i++){
      var itemHour = toDoItems[i].hour;
      var itemText = toDoItems[i].text; 
     
      $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
    }
  
    console.log(toDoItems);
  }


// upon document finishes loading
$(document).ready(function(){
    
    setUpTimeDisplay();

    if(!localStorage.getItem("todos")){
        initializeSchedule();
    }

});



