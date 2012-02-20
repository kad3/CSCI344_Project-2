function main() {

  $("#searchbtn").click(function(){
    term = $("#term").val();

    var s = new Spotter("twitter.search",
                        {q:term, lang:"en", period:120},
                        {buffer:true,bufferTimeout:1000});

    var count = 0;
    var removeCount = 0;
    var color = 0;
    var termcount = 0;

    s.register(function(tweets) {

      $("#results").replaceWith("<div id='results' class='span16'>"+termcount+" tweets about "+term+" mention UNCA.</div>");

      var txt = tweets.text;
      var img = tweets.profile_image_url;

      if(color%2===0) {
        var style = "tweet0";
      } else {
        var style = "tweet1";
      }
      var tweet = $("<p id='"+count+"' class='"+style+"'><img src='"+img+"'/>"+txt+"</p>");
      tweet.hide();
      $("#tweets").prepend(tweet);
      tweet.fadeIn().slideDown();
      if(count>=10){
        $("#"+removeCount).fadeOut();
        $("#"+removeCount).remove();
        removeCount++;
      }

      if(txt.match(/unca/i)){
        termcount++;
      };

      count++;
      color++;
    });
  s.start();
  });
}

$(document).ready( function() {
  main();
});

