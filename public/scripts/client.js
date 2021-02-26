// IMPLEMENT FUNCTIONS
// Calculate days ago
const daysAgo = (createdTimestamp) => {
  const timeAgo = Math.floor(((Date.parse(new Date) - createdTimestamp) / 1000) / (3600 * 24));
  if (timeAgo === 1) {
    return `${timeAgo} day ago`;
  } else if (timeAgo < 1) {
    return `today`;
  }
  return `${timeAgo} days ago`;
};

// Escape unsafe characters
const escape = (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// remove class to unhide error & slide element down
const generateError = (err) => {
  $('.new-tweet-error h3').html(err);
  $('.error-slide').slideDown(400);
};

// click "write a new tweet" button and slide compose tweet, then focus text area
const slideCompose = () => {
  $('.new-tweet').hide();
  $('.nav-bar-compose-textbox').on('click', () => {
    $('.new-tweet').slideToggle(400, () => {
      $('#tweet-text').focus();
    });
  });
};

// Create DOM elements
const createTweetElement = (tweetObj) => {
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
const renderTweets = (tweetArr) => {
  for (const tweet of tweetArr) {
    const $tweetToAppend = createTweetElement(tweet);
    $('#tweet-container').prepend($tweetToAppend);
  }
};

// doc ready check with function invocations & Ajax
$(document).ready(() => {
  const loadTweets = () => {
    $.ajax({
      url: '/tweets/',
      method: 'GET'
    }).then((data) => {
      renderTweets(data);
    });
  };

  loadTweets();
  slideCompose();
  
  $("#tweet-submit").on("submit", (event) => {
    event.preventDefault();

    if (!$('#tweet-text').val()) {
      generateError('Cannot create an empty tweet!');
      return;
    }
    if ($('#tweet-text').val().length > 140) {
      generateError('Cannot create tweet. Character limit exceeded!');
      return;
    }
    // Ajax POST request & promise chain on resolution of tweet submission
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
        // Clears error message after valid tweet is posted
        $('.error-slide').slideUp(400);
        // Refreshes tweet feed without page reload
        $('#tweet-container').prepend($newTweet);
        $('#tweet-text').val('');
        $('.new-tweet .compose-tweet-div .counter').val(140);
      }).catch(err => console.log(err));
    });
  });
});
