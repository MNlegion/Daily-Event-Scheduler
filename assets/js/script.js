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
function setUpTimeBlocks(){
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

$(document).ready(function(){
    
    setUpTimeBlocks();

    if(!localStorage.getItem("todos")){
        initializeSchedule();
    }

});



