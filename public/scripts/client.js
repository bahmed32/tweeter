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




const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088

  }
];

const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {

    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweets-container').append($tweet);
  }
};


const createTweetElement = function(tweet) {

  //selct artucle element

  const $tweet = $(`
  <article class="tweet">
  <header>
  <div class="user">
  <img src="${tweet.user.avatars}" alt="User Avatar">
  <span>${tweet.user.name}</span>
  </div>
  <span class="handle">${tweet.user.handle}</span>
  </header>
  <div class="content">
  ${tweet.content.text}
  </div>
  <footer>
  <span class="timestamp">${timeAgo(tweet.created_at)}</span>
  </footer>
  </article>
  `);

  return $tweet;
};


const timeAgo = function(timestamp) {
  return '4 days ago';
};

renderTweets(data);
