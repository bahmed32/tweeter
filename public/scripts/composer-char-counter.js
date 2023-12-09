/*
Implemented a function to count characters 
*/


$(document).ready(function() {
  

  $(".new-tweet form textarea").on("input", function() {
    let tweetText = $(this).val();
    const counter = $(this).parent().find("output[name=counter]");
    let remainingChars = 140 - tweetText.length;

    counter.text(remainingChars);

    if (remainingChars < 0) {
     counter.css("color", "red");
     return;
    }

    counter.css("color", "");

  });


});
