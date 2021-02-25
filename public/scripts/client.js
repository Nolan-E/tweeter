/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// IMPLEMENT FUNCTIONS
// Calculate days ago
const daysAgo = function(createdTimestamp) {
  let output;
  const timeAgo = Math.floor(((Date.parse(new Date) - createdTimestamp) / 1000) / (3600 * 24));
  if (timeAgo === 1) {
    return output = `${timeAgo} day ago`;
  } else if (timeAgo < 1) {
    return output = `today`;
  }
  return output = `${timeAgo} days ago`;
};

// create DOM elements
 const createTweetElement = function(tweetObj) {
  const $tweet = $(`<article class="tweets-feed">
  <header class="tweets-feed-header">
    <div class="tweets-feed-name">
      <img class="tweets-feed-user" src="${tweetObj.user.avatars}"> ${tweetObj.user.name}
    </div>
    <span class="tweets-feed-handle">${tweetObj.user.handle}</span>
  </header>
  <div class="tweets-feed-body">
    <p class="tweets-feed-text">${tweetObj.content.text}</p>
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
    const tweetToAppend = createTweetElement(tweet);
    $('#tweet-container').append(tweetToAppend);
  }
};

// doc ready check with function invocation
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
    const str = $('#tweet-submit').serialize();
    $.ajax({
      data: str,
      url: '/tweets/',
      method: 'POST'
    })
  });
});