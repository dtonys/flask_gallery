var util = (function(){
  return {
    // check if DOM is loaded
    ready: function(callback){
      if(document.addEventListener){
        document.addEventListener('DOMContentLoaded', function(){
          console.log('DOM is loaded');
          document.removeEventListener('DOMContentLoaded', arguments.callee, false);
          return callback();
        }, false);
      }
    },
    error: function(text){
      throw text; 
    },
    
  /**
   * Executes ajax GET request
   * accepts: @url string
   * return: @success or @failure callback
   */
    ajaxGet: function(url, success, failure){
      var req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.onreadystatechange = function(){
        if(req.readyState === 4){
          if(req.status >= 200 && req.status < 300 || req.status === 304){
            return success(JSON.parse(req.response));
          }
          else{
            return failure(JSON.parse(req.response));
          }
        }
        return;
      }
      req.send();
    }
  }
})();