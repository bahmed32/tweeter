/*
 * Client-side JS 
 */


$(document).ready(function() {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };



  const createTweetElement = function(tweet) {

    const tweetHtml = `
  <article class="tweet">
    <header>
      <div class="user">
        <img src="${tweet.user.avatars}" alt="User Avatar">
        <span>${tweet.user.name}</span>
      </div>
      <span class="handle">${tweet.user.handle}</span>
    </header>
    <div class="content">${escape(tweet.content.text)}</div>
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
        renderTweets(response);
      });
  };
  loadTweets();



  $(function() {
    const $submit = $('#tweet');
    const $errorContainer = $('.new-tweet .error-message');
    $errorContainer.hide();
    $submit.on('click', function(event) {
      event.preventDefault();

      const checkTweet = $('#tweet-text').val();
   
      if (!checkTweet || checkTweet.trim() === "") {
        $errorContainer.text('This Tweet Is Empty').show();
        return;
      }
      if (checkTweet.length > 140) {
        $errorContainer.text('This Tweet Is Too Long Please Keep It Under 140 Characters. Why? I Don\'t Know ＼( °□° )／ ').show();
        return;
      }

  

      $.ajax('/tweets', { method: 'POST', data: $('form').serialize() })
        .then(function(indexHtml) {
          $errorContainer.hide();
          $('#tweet-text').val('');
          loadTweets();
        });

    });

  });

  });

