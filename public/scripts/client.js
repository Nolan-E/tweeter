/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

 const createTweetElement = function(tweetObj) {
  const $tweet = $(`<article class="tweets-feed">
  <header class="tweets-feed-header">
    <div class="tweets-feed-name">
      <img src="${tweetObj.user.avatars}"> ${tweetObj.user.name}
    </div>
    <span class="tweets-feed-handle">${tweetObj.user.handle}</span>
  </header>
  <div class="tweets-feed-body">
    <p class="tweets-feed-text">${tweetObj.content.text}</p>
  </div>
  <footer class="tweets-feed-data">${tweetObj.created_at}
    <div>
      <span class="tweets-feed-flag"><i class="fas fa-flag"></i></span> <span class="tweets-feed-retweet"><i class="fas fa-retweet"></i></span><span class="tweets-feed-heart"><i class="fas fa-heart"></i></span>
    </div>
  </footer>
</article>`);
  return $tweet;
};

// const $tweet = createTweetElement();
// console.log($tweet)
$(document).ready(function() {
  const $tweet = createTweetElement(tweetData);
  $('#tweet-container').append($tweet);

});

// $(document).ready(function() {
//   $(".compose-tweet-button").on("submit", function(event) {
//     event.preventDefault();
//     $.ajax({
//       url: '/',
//       method: 'GET'
//     }).then((result) => {

//     })
//     $('#tweet-container').append($tweet);
//   });
// });