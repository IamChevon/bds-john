(function(){
  'use strict';

  var playCount = 0;

  var cta = iD('cta');
  var logo = iD('logo');
  var exitButton = iD('ban');
  var endHolder = iD('endHolder');
  var textSet1 = getClass('text-set-one');
  var textSet2 = getClass('text-set-two');
  var textSet3 = getClass('text-set-three');
  var textSet4 = getClass('text-set-four');
  var textContainer1 = iD('text-container-1');
  var textContainer2 = iD('text-container-2');
  var textContainer3 = iD('text-container-3');
  var textContainer4 = iD('text-container-4');
  var logoRays = getClass('ray');
  var banWipes = iD('ban-wipes');
  var shield1 = iD('shield1');
  var shield1Container = iD('shield1-container');
  var shield2 = iD('shield2');
  var shield2Container = iD('shield2-container');
  var shield3 = iD('shield3');


  function iD (id) {
    return document.getElementById(id);
  };

  function getClass(classname) {
    return document.getElementsByClassName(classname);
  }

  function rM(a) {

    if(typeof a.length != 'undefined' && a.length > 0){
      for(var i = 0; i < a.length; i++){
        a[i].removeAttribute("style");
      }
    } else {
      a.removeAttribute("style");
    }
    return false;

  };

  function playBan(){

    playCount++;

    Velocity(endHolder, {opacity: [1, 0]}, {duration: 12600, delay: 4, complete: closeAnim});
    textContainer1.style.display = "block";
    Velocity(textSet1, {translateY: ['0px', '28px']}, {duration: 700, delay: 0});
    Velocity(shield1Container, {opacity: [1, 0]}, {duration: 700, delay: 0});
    Velocity(shield1, {scale: [.9, 1]}, {duration: 3400, delay: 0, complete: scene1});

  }

  function scene1(){
    Velocity(shield1Container, {opacity: [0, 1]}, {duration: 300, delay: 0});
    Velocity(textContainer1, {opacity: [0, 1], translateY: ['-10px', '0px']}, {duration: 300, delay: 0, complete: scene2});

  }


  function scene2(){
    textContainer2.style.display = "block";
    Velocity(textSet2, {translateY: ['0px', '28px']}, {duration: 700, delay: 0});
    Velocity(shield2Container, {opacity: [1, 0]}, {duration: 700, delay: 0});
    Velocity(shield2, {scale: [1, 1.2]}, {duration: 3400, delay: 0, complete: scene3});
    console.log("scene 2");

  }

  function scene3(){
    Velocity(shield2Container, {opacity: [0, 1]}, {duration: 300, delay: 0});
    Velocity(textContainer2, {opacity: [0, 1], translateY: ['-10px', '0px']}, {duration: 300, delay: 0, complete: scene4});
  }

  function scene4() {
    textContainer3.style.display = "block";
    Velocity(shield3, {opacity: [1, 0]}, {duration: 700, delay: 0});
    Velocity(textSet3, {translateY: ['0px', '28px']}, {duration: 700, delay: 0});
    Velocity(cta, {opacity: [1, 0]}, {duration: 1000, delay: 0})
    Velocity(logo, {opacity: [1, 0]}, {duration: 1000, delay: 0})
    for(var i = 0; i < logoRays.length; i++){
      Velocity(logoRays[i], {rotateZ: ['0deg', '90deg'], scale: [1, 2]}, {duration: 1000, delay: 400+(i * 50)});
    }
  }

  function resetEls(){
    // rM(cakeContainer);
    rM(logo);
    rM(cta);
    rM(shield3);
    rM(logoRays);
    rM(textSet1);
    rM(textSet2);
    rM(textSet3);
    rM(textContainer1);
    rM(textContainer2);
    rM(textContainer3);
    rM(logoRays);
  }

  function closeAnim()
  {
    console.log("close anni");

    if(playCount>1) {
      return false;
    }
    setTimeout(function()
    {

      setTimeout(function()
      {
        resetEls();
      }, 600);

        Velocity(banWipes, {translateY: ['-86%', '100%']}, {duration: 1500, delay: 0, complete: playBan});
        //Velocity(shield3, {opacity: [0, 1]}, {duration: 300, delay: 28});
    }, 2000)
  }


exitButton.addEventListener("click", addExit);

  function addExit(){
      Enabler.exit('Main Exit');
  }

  window.playBan = function(){
    playBan();
  };

  //Reload on focus cross browser

  var hidden = "hidden";
  var count = 0;

  if (hidden in document)
    document.addEventListener("visibilitychange", onchange);
  else if ((hidden = "mozHidden") in document)
    document.addEventListener("mozvisibilitychange", onchange);
  else if ((hidden = "webkitHidden") in document)
    document.addEventListener("webkitvisibilitychange", onchange);
  else if ((hidden = "msHidden") in document)
    document.addEventListener("msvisibilitychange", onchange);
  else if ("onfocusin" in document)
    document.onfocusin = document.onfocusout = onchange;
  else
    window.onpageshow = window.onpagehide
    = window.onfocus = window.onblur = onchange;

  function onchange (evt) {
    if(count===1) {
      window.location.reload();
    }
    count++;
    var v = "visible", h = "hidden",
        evtMap = {
          focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
        };

    evt = evt || window.event;
    if (evt.type in evtMap)
      document.body.className = evtMap[evt.type];
    else
      document.body.className = this[hidden] ? "hidden" : "visible";
  }

  if( document[hidden] !== undefined )
    onchange({type: document[hidden] ? "blur" : "focus"});

})();
