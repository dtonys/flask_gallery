util.ready(function(){
  console.log('begin!');
  
  var guideData;
  var imgList = '';
  var smallUL = document.getElementById('small-img');
  var medUL = document.getElementById('medium-img');
  var largeUL =  document.getElementById('large-img');
  
  //get guide JSON
  util.ajaxGet('/getJSON',
    function success(data){
      //console.log(data);
      if(data.success){
        guideData = data.guide;
        next();
      }
      
    },
    function failure(data){
      conosle.log(data);
    }
  );
  //iterate and insert images
  function next(){
    var imgNodeArray = [];
    var frag = document.createDocumentFragment();
    //original size
    for(var i in guideData.media){
      if(guideData.media[i].type !== 'guide_image') continue;
      //var imgUrl = guideData.media[i].url.replace("original.jpg", "300x294_ac.jpg");
      var imgUrl = guideData.media[i].url.replace("original.jpg", "60x60_ac.jpg");
      
      //var imgUrl = guideData.media[i].url;
      console.log(imgUrl);
      var liNode = document.createElement('li');
      var imgNode = document.createElement('img');
      imgNode.setAttribute('src', imgUrl);
      liNode.appendChild(imgNode);
      frag.appendChild(liNode);
    }
    medUL.appendChild(frag.cloneNode(true));
    next2();
  }
  
  function next2(){
    
  }
});

