(function() {
  "use strict";
//  document.head.innerHTML +='<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"/>';
  window.addEventListener('load', isRedmine);
  
  function isRedmine(){
    if (parent !== self) {return;}
    var pageDescription = $('meta[name=description]');
    if(pageDescription.length > 0){
      if(pageDescription[0].getAttribute('content').match(/(redmine)/i)[1] !== null){
        rewriteLink();        
      }
    }
  }
  
  function rewriteLink() {
    var wikiEditables = $('div.wiki.editable');
    for(var i = 0; i < wikiEditables.length; i++){
      var wikiEditable = wikiEditables[i];
      var ps = wikiEditable.getElementsByTagName('p');
      for(var j = 0; j < ps.length; j++){
        var content = ps[j].innerText;
        var commitPosition = content.indexOf('|commit:');
        if(commitPosition < 0){continue;}
        var contentSplit = content.match(/ (.*):(.*)\|commit:(.*?) /);
        var repositoryUrl = '';
        if(contentSplit[1] !== null){
          repositoryUrl = '/projects/'+contentSplit[1]+'/repository/'+contentSplit[2]+'/revisions/'+contentSplit[3];
          var changeSet = content.match(/ (.*:.*\|commit:.*?) /)[1];
          ps[j].innerHTML = ps[j].innerHTML.replace(changeSet, '<'+'a href='+repositoryUrl+' class="changeset">'+changeSet+'</a'+'>');
//        } else {
//          contentSplit = content.match(/(.*)|commit:(.*)/);
//          repositoryUrl = document.location.origin+'/repository/'+contentSplit[1]+'/revisions/'+contentSplit[2];
        }
      }
    }
  }

  isRedmine();
})();