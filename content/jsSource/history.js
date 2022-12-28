var searchWord
var cookieThis = getCookie('thisUser')
console.log("cookie log " + cookieThis)
var userHistory = cookieThis.split(',')

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

userHistory.forEach(element => {
    $("#listHistory").append("<button type=\"button\" class=\"list-group-item list-group-item-action buttonHisClass\" id=\"buttonHis\">"+element+"</button>")
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
    
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    // document.getElementById(searchTabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
$(".buttonHisClass").click(function (e) { 
    searchWord = jQuery(this).text();

    e.preventDefault();
    var btnHis = document.getElementsByClassName("buttonHisClass");
    for (i = 0; i < btnHis.length; i++) {
        btnHis[i].className = btnHis[i].className + " disabled";
      }

    document.getElementById('tabSeach').style.display = 'block'
    document.getElementById('SearchContentIframe').src = "https://dictionary.cambridge.org/dictionary/english-vietnamese/" + searchWord
    document.getElementById('divIframeSeach').style.display = 'none'

    $.get("queryWordO="+searchWord, function(datahtml, statushtml){
        // alert("\nStatus: " + statushtml);
        // data.getElementById('ad_leftslot_container').remove
        if(statushtml == 'success'){
            document.getElementById('SearchContentO').innerHTML = datahtml
            document.getElementById('ad_leftslot_container').style.display = 'none'
            var btnHis = document.getElementsByClassName("buttonHisClass");
            for (i = 0; i < btnHis.length; i++) {
                btnHis[i].className = btnHis[i].className.replace(" disabled", "");
              }
        }
        
      })
    
});

