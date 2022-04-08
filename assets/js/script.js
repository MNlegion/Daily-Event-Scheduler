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

