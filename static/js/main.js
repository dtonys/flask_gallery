util.ready(function(){
  console.log('begin!');
  
  var guideCount = 0;
  var imgList = '';
  var viewCont = document.getElementById('view-img');
  var viewImg;
  var largeImages = [];
  var imageCacheObj = new Image();
  var parser = new DOMParser();
  var guideList = document.querySelector('.slide-list');
  var topList = document.querySelector('.small-img-wrap');
  
  var getGuideBtn = document.querySelector('.get-guide');
  var removeGuideBtn = document.querySelector('.remove-guide');
  var prevImg = document.querySelector('.prev-img');
  var nextImg = document.querySelector('.next-img');
  nextImg.addEventListener('click', nextSlide, false);
  prevImg.addEventListener('click', prevSlide, false);
  getGuideBtn.addEventListener('click', getGuide, false);
  removeGuideBtn.addEventListener('click', removeGuide, false);
  
  init();
  
  function getJSON(callback){
    util.ajaxGet('/getJSON',
      function success(data){
        data = JSON.parse(data);
        if(data.success) return callback(data.guide);
      },
      function failure(data){
        data = JSON.parse(data);
        console.log(data);
        throw 'AJAX error';
      }
    );
  }
  function getJSON_2(callback){
    util.ajaxGet('/getJSON_2',
      function success(data){
        data = JSON.parse(data);
        if(data.success) return callback(data.guide);
      },
      function failure(data){
        data = JSON.parse(data);
        console.log(data);
        throw 'AJAX error';
      }
    );
  }
  
  //Executes AJAX request to populate page with initial guide
  function init(){
    getJSON(function(guideData){
      var medUL = document.querySelector('.small-img');
      //set title text above slidebar
      var titleNode = document.querySelector('.guide-title');
      titleNode.textContent = guideData.publish_title;
      //set first image as view image
      for(var first in guideData.media){
        viewImg = document.createElement('img');
        viewImg.setAttribute('src', guideData.media[first].url.replace("original.jpg", "516x387_ac.jpg"));
        break;
      }
      //load all images into slidebar
      var imgCount = 0;
      var frag = document.createDocumentFragment();
      for(var i in guideData.media){ 
        if(guideData.media[i].type !== 'guide_image') continue;
        //cache all large images so there is no delay / flicker when displaying them
        imageCacheObj.src = guideData.media[i].url.replace("original.jpg", "516x387_ac.jpg");
        
        //var url_300x294 = guideData.media[i].url.replace("original.jpg", "300x294_ac.jpg");
        var url_60x60 = guideData.media[i].url.replace("original.jpg", "60x60_ac.jpg");
        var liNode = document.createElement('li');
        var imgNode = document.createElement('img');
        
        //set index of img so we don't have to compute it later
        imgNode.setAttribute('slide-index', imgCount);
        imgNode.setAttribute('src', url_60x60);
        liNode.appendChild(imgNode);
        frag.appendChild(liNode);
        imgCount++;
      }
      medUL.style.width = (imgCount*64) + 'px';  
      medUL.appendChild(frag);
      medUL.addEventListener('click', function(event){
        clickImage(event, medUL, imgCount);
      }, false);
      viewCont.appendChild(viewImg);
      guideCount++;
      
      //select first image
      medUL.children[0].children[0].classList.add('selected');
      
      //setup event listeners for next and prev buttons
      //show body
      document.body.classList.remove('hidden');
    });
  }
  
  function clickImage(event, list, imgCount){
    console.log(imgCount);
    var index = parseInt(event.target.getAttribute('slide-index'));
    var imgUrl = event.target.getAttribute('src');
    
    imgUrl = imgUrl.replace("60x60_ac.jpg", "516x387_ac.jpg");
    viewImg.setAttribute('src', imgUrl);
    if(document.querySelector('.selected'))
      document.querySelector('.selected').classList.remove('selected');
    list.children[index].children[0].classList.add('selected');
    if(index < 9)
      list.style.left = "0px";
    else if(index > imgCount - 8)
      list.style.left = (-1)*(imgCount-16)*64 + "px";
    else
      list.style.left = (-1)*(index - 8)*64 + "px";
  }
  
  //append a new guide, max of 3 guides
  function getGuide(){
    if(guideCount >= 3) return;
    getJSON_2(function(guideData){
      newGuide = document.getElementById('guide-template').cloneNode(true);
      newGuide.classList.remove('hidden');
      newGuide.removeAttribute('id');
      populateGuide(guideData, newGuide);
    });
  }
  //populates guideList DOM element given JSON data
  function populateGuide(guideData, guideElement){
    //guideElement.querySelector();
    var imgCount = 0;
    var frag = document.createDocumentFragment();
    var medUL = guideElement.querySelector('.small-img');
    guideElement.querySelector('.guide-title').textContent = guideData.publish_title;
    var imgNodeArray = [];
    for(var i in guideData.media){
      if(guideData.media[i].type !== 'guide_image') continue;
      //cache all large images so there is no delay / flicker when displaying them
      imageCacheObj.src = guideData.media[i].url.replace("original.jpg", "516x387_ac.jpg");
      var url_60x60 = guideData.media[i].url.replace("original.jpg", "60x60_ac.jpg");
      var liNode = document.createElement('li');
      var imgNode = document.createElement('img');
      
      //set index of img so we don't have to compute it later
      imgNode.setAttribute('slide-index', imgCount);
      imgNode.setAttribute('src', url_60x60);
      liNode.appendChild(imgNode);
      frag.appendChild(liNode);
      imgCount++;
    }
    medUL.style.width = (imgCount*64) + 'px';  
    medUL.appendChild(frag);
    medUL.addEventListener('click', function(event){
      clickImage(event, medUL, imgCount);
    }, false);
    guideList.insertBefore(guideElement, guideList.firstChild);
    guideCount++;
    
    removeGuideBtn.classList.remove('hidden');
    if(guideCount === 3)
      getGuideBtn.classList.add('hidden');
  }
  
  //remove the last guide, min of 1 guide
  function removeGuide(){
    guideList.removeChild(guideList.firstChild);
    guideCount--;
    getGuideBtn.classList.remove('hidden');
    if(guideCount === 1)
      removeGuideBtn.classList.add('hidden');
  }
  function nextSlide(){
    alert('nextSlide');
  }
  function prevSlide(){
    alert('prevSlide');
  }
});

