/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//In this exercise we will create a JavaScript function that will generate the DOM structure for a tweet, 
// given a tweet object. This will give you some experience in creating markup dynamically with libraries like jQuery.

// Within the client.js file, we're going to define a function createTweetElement that takes in a tweet object and is
// responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.

//input: obj
//output: html article;

// import { format} from 'timeago.js'


$(document).ready(function() {
  let maytime = timeago.format('2016-06-12', 'en_US');
  console.log(maytime);
  

  const createTweetElement = function(tweet) {
    //selct artucle element

    const tweetHtml = `
  <article class="tweet">
    <header>
      <div class="user">
        <img src="${tweet.user.avatars}" alt="User Avatar">
        <span>${tweet.user.name}</span>
      </div>
      <span class="handle">${tweet.user.handle}</span>
    </header>
    <div class="content">${tweet.content.text}</div>
    <footer>
      <span class="timestamp">${timeago.format(tweet.created_at)}</span>
      <div class="icons">
      <i class="fas fa-heart"></i>
      <i class="fas fa-comment"></i>
      <i class="fas fa-share"></i>
    </div>
    </footer>
  </article>
  `;
 
    return tweetHtml;

  };





  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (const tweet of tweets) {



      // calls createTweetElement for each tweet
      const tweetMarkup = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').prepend(tweetMarkup);
      }
    };



  const loadTweets = function() {
    $.ajax('/tweets', { method: "GET" })
      .then(function(response) {
        console.log(response);
        renderTweets(response);
      });
  };
  loadTweets();

  $(function() {
    const $submit = $('#tweet');
    $submit.on('click', function(event) {
      event.preventDefault();
      const checkTweet = $('#tweet-text').val();
      console.log("check tweet", checkTweet);
      if (!checkTweet || checkTweet.trim() === "") {
        alert("Tweet is empty");
        return;
      } 
       if (checkTweet.length > 140) {
        alert("Tweet is too long");
        return;
      }

      $.ajax('/tweets', { method: 'POST', data: $('form').serialize() })
        .then(function(indexHtml) {
          console.log("success");

          loadTweets();
        });
    });

  });


});