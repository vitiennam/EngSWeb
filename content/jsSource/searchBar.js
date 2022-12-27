
var engDataSearch

$.get("engDataSearch", function(data, status){
    // alert("Data: "  + "\nStatus: " + status);
    
    engDataSearch = JSON.parse(data)
  });



  function openSearchContent(evt, searchTabName) {
    var i, tabcontent, tablinks;
    console.log("searchTabName " + searchTabName)
    switch(searchTabName) {
        case 'SearchContentO':
            
            // document.getElementById('SearchContentIframe').style.height = '0px'
            // document.getElementById('SearchContentIframe').style.width = '0px'
            document.getElementById('SearchContentO').style.display = 'block'
            document.getElementById('divIframeSeach').style.display = 'none'
            console.log("SearchContentO display " + document.getElementById('SearchContentO').style.display)
            break
        case 'SearchContentC':
            // document.getElementById('SearchContentIframe').src = linkCam
            document.getElementById('SearchContentO').style.display = 'none'
            document.getElementById('divIframeSeach').style.display = 'block'
            document.getElementById('SearchContentIframe').style.width = '100%'
            document.getElementById('SearchContentIframe').style.height = '1000px'
            console.log("SearchContentO display " + document.getElementById('SearchContentO').style.display)
            break
            
            

    }
    
    // tabcontent = document.getElementsByClassName("iframe");
    // for (i = 0; i < tabcontent.length; i++) {
    //     tabcontent.style.display = "none";
    // }
    
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    // document.getElementById(searchTabName).style.display = "block";
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
        // console.log(ui)
        document.getElementById('tabSeach').style.display = 'block'
        // document.getElementById('SearchContentIframe').src = "https://dictionary.cambridge.org/dictionary/english-vietnamese/" + ui.item.value
        // document.getElementById('SearchContentIframe').style.width = '0%'
        // document.getElementById('SearchContentIframe').style.height = '0%'
        document.getElementById('SearchContentIframe').src = "https://dictionary.cambridge.org/dictionary/english-vietnamese/" + ui.item.value
        document.getElementById('divIframeSeach').style.display = 'none'
        // document.getElementById('SearchContentO').attributes.source = "https://www.oxfordlearnersdictionaries.com/definition/american_english/"+ ui.item.value+ "?q="+ ui.item.value
        // console.log("link source " +String( document.getElementById('SearchContentO').attributes))
        // document.getElementById('SearchContentC').attributes.source = "https://dictionary.cambridge.org/dictionary/english-vietnamese/" + ui.item.value

        $.get("queryWordO="+ui.item.value, function(data, status){
            // alert("\nStatus: " + status);
            // data.getElementById('ad_leftslot_container').remove
            document.getElementById('SearchContentO').innerHTML = data
            // document.getElementById('ad_leftslot_container').remove
          });
        //   $.get("queryWordC="+ui.item.value, function(data, status){
        //     // alert("\nStatus: " + status);
        //     // data.getElementById('ad_leftslot_container').remove
        //     document.getElementById('SearchContentC').innerHTML = data
        //     // document.getElementById('ad_leftslot_container').remove
        //   });
          



        //   $.get("queryWordGG="+ui.item.value, function(data, status){
        //     // alert("\nStatus: " + status);
        //     // data.getElementById('ad_leftslot_container').remove
        //     document.getElementById('SearchContentGG').innerHTML = data
        //     // document.getElementById('ad_leftslot_container').remove
        //   });

    }
}
);
