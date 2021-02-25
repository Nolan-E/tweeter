/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// IMPLEMENT FUNCTIONS
// Calculate days ago
const daysAgo = function(createdTimestamp) {
  const timeAgo = Math.floor(((Date.parse(new Date) - createdTimestamp) / 1000) / (3600 * 24));
  if (timeAgo === 1) {
    return `${timeAgo} day ago`;
  } else if (timeAgo < 1) {
    return `today`;
  }
  return `${timeAgo} days ago`;
};

// Escape unsafe characters
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Create DOM elements
const createTweetElement = function(tweetObj) {
  const $tweet = $(
    `<article class="tweets-feed">
      <header class="tweets-feed-header">
        <div class="tweets-feed-name">
          <img class="tweets-feed-user" src="${tweetObj.user.avatars}"> ${tweetObj.user.name}
        </div>
        <span class="tweets-feed-handle">${tweetObj.user.handle}</span>
      </header>
      <div class="tweets-feed-body">
        <p class="tweets-feed-text">${escape(tweetObj.content.text)}</p>
      </div>
      <footer class="tweets-feed-data">${daysAgo(tweetObj.created_at)}
        <div>
          <span class="tweets-feed-flag"><i class="fas fa-flag"></i></span> <span class="tweets-feed-retweet"><i class="fas fa-retweet"></i></span><span class="tweets-feed-heart"><i class="fas fa-heart"></i></span>
        </div>
      </footer>
    </article>`);
  return $tweet;
};

// render tweet from database object into DOM elements
const renderTweets = function(tweetArr) {
  for (const tweet of tweetArr) {
    const $tweetToAppend = createTweetElement(tweet);
    $('#tweet-container').prepend($tweetToAppend);
  }
};

// doc ready check with function invocation:
// 1st: Load tweets from database
// 2nd: Post new tweet to database on form submit
$(document).ready(function() {
  const loadTweets = function() {
    $.ajax({
      url: '/tweets/',
      method: 'GET'
    }).then((data) => {
      renderTweets(data);
    });
  };
  loadTweets();

  $("#tweet-submit").on("submit", function(event) {
    event.preventDefault();
    if (!$('#tweet-text').val()) {
      alert('Cannot create an empty tweet!');
      return;
    }
    if ($('#tweet-text').val().length > 140) {
      alert('Cannot create tweet. Character limit exceeded!');
      return;
    }
    const str = $('#tweet-submit').serialize();
    console.log(str)
    $.ajax({
      data: str,
      url: '/tweets/',
      method: 'POST'
    }).then(() => {
      $.ajax({
        url: '/tweets/',
        method: 'GET'
      }).then((data) => {
        const $newTweet = createTweetElement(data[data.length - 1]);
        $('#tweet-container').prepend($newTweet);
        $('#tweet-text').val('');
        $('.new-tweet .compose-tweet-div .counter').val(140);
      });
    });
  });
});