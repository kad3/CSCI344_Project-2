function main() {
  var term="unca";

  $("#searchbtn").click(function(){
    term = $("#term").val();
  });

  var s = new Spotter("twitter.search",
                      {q:term, lang:"en", period:120},
                      {buffer:true,bufferTimeout:1000});
  var count = 0;
  var removeCount = 0;
  var color = 0;

  s.register(function(tweets) {
    //$("#results").replaceWith("<div id='results' class='span2'></div>");
    //$("#results").replaceWith("<div id='results'>Maury: "+maury+"</div>");
    $("#results").replaceWith("<div id='results' class='span16'>"+term+"</div>");

    var txt = tweets.text;
    var img = tweets.profile_image_url;

    //searchTerms.each(function(){
    //});

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
    count++;
    color++;

      //if (txt.match(/value/i)){
      //}
  });

  s.start();
}

$(document).ready( function() {
  main();
});

