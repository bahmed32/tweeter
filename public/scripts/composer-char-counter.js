$(document).ready(function() {
  console.log("hello from inside element");

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



// $(".new-tweet form textarea").on("blur", function() {
//   console.log("Textarea lost focus");
// });

