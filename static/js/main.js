util.ready(function(){
  console.log('begin!');
  
  var guideData;
  
  util.ajaxGet('/getJSON',
    function success(data){
      console.log(data);
      
    },
    function failure(response){
      conosle.log(response);
    }
  );
});

