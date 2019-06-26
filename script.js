$(document).ready(function(){
  $("#clear-button").on("click", function(){
    $("#search-input").val("");
    $("#resultsRow").toggle(false);
    $("#resultsRow").empty();
  });
  
  $("#go-button").on("click", function(){
    var searchText = $("#search-input").val();
    if (searchText != "") {
      $("#resultsRow").toggle(true);
      $("#resultsRow").empty();
      wikiSearch(searchText);
    }    
  });  
  
  function wikiSearch(searchStr) {
    var queryURL = "https://en.wikipedia.org/w/api.php" + 
    "?action=query&format=json&generator=search&redirects=1&" + "callback=?" + "&gsrsearch=" +
       searchStr + "&gsrlimit=10";
    $.getJSON(queryURL, function(results){      
      var secQueryArr = [];      
      for (var i in results.query.pages) {
        secQueryArr.push(results.query.pages[i].pageid);
      }
      var secQuerySrt = secQueryArr.join("|");      
      
      var secQueryURL = "https://en.wikipedia.org/w/api.php" + 
      "?action=query&format=json&prop=extracts&pageids="+ secQuerySrt + 
           "&callback=?" +"&exsentences=1&exlimit=10&exintro=1&explaintext=1";      
      console.log(secQueryURL);
      $.getJSON(secQueryURL, function(results2){
        
        for (var i in results2.query.pages) {
           $("#resultsRow").append( $("<a>").
                  attr("href", "https://en.wikipedia.org/?curid=" 
                 + results2.query.pages[i].pageid).attr("target","_blank").
              append( $("<div>").
              append( $("<h3>").text(results2.query.pages[i].title) ).
              append( $("<p>").text(results2.query.pages[i].extract) )
            ));         
        } 
      });
    });
   }
});