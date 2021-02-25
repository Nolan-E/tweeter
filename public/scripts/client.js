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
};

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

// remove class to unhide error & slide element down
const generateError = (err) => {
  $('.new-tweet-error').removeClass('hidden-error');
  $('.new-tweet-error h3').html(err);
  $('.error-slide').slideDown(400);
};

// click "write a new tweet" button and slide compose
// tweet, then focus text area
const slideCompose = () => {
  $('.new-tweet').hide();
  $('.nav-bar-compose-textbox').on('click', () => {
    $('.new-tweet').slideToggle(400, () => {
      $('#tweet-text').focus();
    });
  });
};

// render tweet from database object into DOM elements
const renderTweets = function(tweetArr) {
  for (const tweet of tweetArr) {
    const $tweetToAppend = createTweetElement(tweet);
    $('#tweet-container').prepend($tweetToAppend);
  }
};

// doc ready check with function invocations & Ajax
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

  slideCompose();
  
  $("#tweet-submit").on("submit", function(event) {
    event.preventDefault();
    if (!$('#tweet-text').val()) {
      generateError('Cannot create an empty tweet!');
      return;
    }
    if ($('#tweet-text').val().length > 140) {
      generateError('Cannot create tweet. Character limit exceeded!');
      return;
    }
    $('.error-slide').slideUp(400, () => {
      $('.new-tweet-error').addClass('hidden-error');
    });
    const str = $('#tweet-submit').serialize();
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
