function main() {

  $("#searchbtn").click(function(){
    $("#searchbtn").fadeOut();
    term = $("#term").val();

    var s = new Spotter("twitter.search",
                        {q:term, lang:"en", period:120},
                        {buffer:true,bufferTimeout:1000});

    var count = 0;
    var removeCount = 0;
    var color = 0;
    var termcount = 0;

    s.register(function(tweets) {


      var txt = tweets.text;
      var img = tweets.profile_image_url;

      if(txt.match(/unca/i)){
        var style = "match";
        termcount++;
      } else if (color%2===0) {
        var style = "tweet0";
      } else {
        var style = "tweet1";
      }
      count++;
      $("#results").replaceWith("<div id='results' class='span5 offset3'>"+termcount+" tweets out of "+count+" about "+term+" mention UNCA.</div>");
      var tweet = $("<p id='"+count+"' class='tweet "+style+"'><img src='"+img+"'/>"+txt+"</p>");
      tweet.hide();
      $("#tweets").prepend(tweet);
      tweet.fadeIn().slideDown();
      if(count>10){
        $("#"+removeCount).fadeOut();
        $("#"+removeCount).remove();
        removeCount++;
      }
      color++;

    });
  s.start();
  });
}

$(document).ready( function() {
  main();
});

