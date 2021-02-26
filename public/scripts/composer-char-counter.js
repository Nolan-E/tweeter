// Compose tweet character counter
$(document).ready(function() {
  $("#tweet-text").on("keyup", counterUpdater);
});

const counterUpdater = function() {
  const tweetLength = $(this).val().length;
  const charCounter = $(this).closest("form").find(".counter");
  const currCount = 140 - tweetLength;
  if (currCount < 0) {
    charCounter.attr('id', 'limit-exceed');
  } else {
    charCounter.removeAttr('id');
  }
  charCounter.html(currCount);
};
