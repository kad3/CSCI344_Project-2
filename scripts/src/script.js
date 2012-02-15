/**
 * This is the entry point for our JavaScript program
 */
function main() {

  //1. Create a spotter and get it to insert tweets into the DOM
  var s = new Spotter("twitter.search",
                      {q:"wilkos", lang:"en", period:120},
                      {buffer:true,bufferTimeout:1000});
  var count = 0;
  var removeCount = 0;
  var color = 0;

  s.register(function(tweets) {
    var txt = tweets.text;
    //2. Add profile images (tweet.profile_image_url)
    var img = tweets.profile_image_url;
    //5. Alternate the colors or the background of the tweets
    if(color%2===0) {
      var style = "tweet0";
    } else {
      var style = "tweet1";
    }
    var tweet = $("<p id='"+count+"' class='"+style+"'><img src='"+img+"'/>"+txt+"</p>");
    //3. Make the tweets occur so the most recent are at the top
    tweet.hide();
    $("#tweets").prepend(tweet);
    //4. Make the tweets slide down
    tweet.fadeIn().slideDown();
    //6. Show a maximum of 10 tweets at a time (remove old tweets from the dom)
    if(count>=10){
      $("#"+removeCount).fadeOut();
      $("#"+removeCount).remove();
      removeCount++;
    }
    count++;
    color++;
  });

  s.start();
}

$(document).ready( function() {
  main();
});
