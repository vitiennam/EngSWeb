
var engDataSearch
$.get("engDataSearch", function(data, status){
    // alert("Data: "  + "\nStatus: " + status);
    
    engDataSearch = JSON.parse(data)
  });




// var tags = [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ];
$( "#autocomplete" ).autocomplete({
    source: function( request, response ) {
            var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
            response( $.grep( engDataSearch, function( item ){
                return matcher.test( item );
            }) );
        },
    select: function( event, ui ) {
        console.log(ui)
        // $.get( "https://www.oxfordlearnersdictionaries.com/definition/american_english/"+ ui.item.value + "?q="+ ui.item.value, function( data ) {
        // console.log(data);     
        // })
        // window.open("https://www.oxfordlearnersdictionaries.com/definition/american_english/"+ ui.item.value + "?q="+ ui.item.value)
        $.get("queryWord="+ui.item.value, function(data, status){
            alert("\nStatus: " + status);
            
            document.getElementById('SearchContent').innerHTML = data
          });

    }
}
);
