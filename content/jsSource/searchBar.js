
var engDataSearch
$.get("engDataSearch", function(data, status){
    // alert("Data: "  + "\nStatus: " + status);
    
    engDataSearch = JSON.parse(data)
  });



  function openSearchContent(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

$( "#autocomplete" ).autocomplete({
    source: function( request, response ) {
            var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
            response( $.grep( engDataSearch, function( item ){
                return matcher.test( item );
            }) );
        },
    select: function( event, ui ) {
        console.log(ui)
        document.getElementById('tabSeach').style.display = 'block'
        $.get("queryWordO="+ui.item.value, function(data, status){
            // alert("\nStatus: " + status);
            // data.getElementById('ad_leftslot_container').remove
            document.getElementById('SearchContentO').innerHTML = data
            // document.getElementById('ad_leftslot_container').remove
          });
          $.get("queryWordC="+ui.item.value, function(data, status){
            // alert("\nStatus: " + status);
            // data.getElementById('ad_leftslot_container').remove
            document.getElementById('SearchContentC').innerHTML = data
            // document.getElementById('ad_leftslot_container').remove
          });
          
        //   $.get("queryWordGG="+ui.item.value, function(data, status){
        //     // alert("\nStatus: " + status);
        //     // data.getElementById('ad_leftslot_container').remove
        //     document.getElementById('SearchContentGG').innerHTML = data
        //     // document.getElementById('ad_leftslot_container').remove
        //   });

    }
}
);
