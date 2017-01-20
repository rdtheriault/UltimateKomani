/* Compilation of many awesome JavaScript/jQuery animations that are now activated by the Konami Code.
Special thanks to everyone who wrote these amazing scripts (I tried to leave their notes in there).
All I did was modify them to activate after the Konami Code was entered. */


/*
INSTRUCTIONS

##Overall

You need the following three lines to run the code
```
    var easter_egg = new Konami();
	easter_egg.code = function() { functionGoesHere(); }
	easter_egg.load();
```
this will listen for the Komami Code

#Shooting Star
Change the function to whooosh();

#Hide everything
CHange the function to hideFun();

*/










////START HIDE FUNNY
function hideFun() {
	var divs = document.getElementsByTagName("body");
	for(var i = 0; i < divs.length; i++){
	   divs[i].style.visibility = "hidden";
	}
	window.alert("You erased the website");
	setTimeout(showFun, 5000);
}
function showFun() {
	window.alert("Just Kidding");
	var divs = document.getElementsByTagName("body");
	for(var i = 0; i < divs.length; i++){
	   divs[i].style.visibility = "visible";
	}
}
////END HIDE FUNNY

////START SHOOTING STAR
var speed=25; // how fast - smaller is faster
var how_often=2; // average time between re-appearances of a comet (in seconds)
var how_many=15; // maximum number of comets in flight
var colours=new Array("#ff0","#ff0", "#f93", "#f60","#f60", "#e93", "#e94","#e94", "#da5", "#da6","#da6", "#cb7", "#cb8", "#cc9", "#dcb", "#ddd");  
// above line lists colours for the comet and its tail (can be as long or short as you like)

/****************************
* Shooting Star/Comet Effect*
*(c)2008-13 mf2fm web-design*
*  http://www.mf2fm.com/rv  *
* DONT EDIT BELOW THIS BOX *
****************************/

var dx=new Array();
var dy=new Array();
var xpos=new Array();
var ypos=new Array();
var comets=new Array();
var swide=800;
var shigh=600;
var tail=colours.length;
var boddie=false;

//function addLoadEvent(funky) {
  //var oldonload=window.onload;
  //if (typeof(oldonload)!='function') window.onload=funky;
  //else window.onload=function() {
    //if (oldonload) oldonload();
    //funky();
  //}
//}

//addLoadEvent(whooosh);

function whooosh() { if (document.getElementById) {
  var i;
  boddie=document.createElement("div");
  boddie.style.position="fixed";
  boddie.style.top="0px";
  boddie.style.left="0px";
  boddie.style.overflow="visible";
  boddie.style.width="1px";
  boddie.style.height="1px";
  boddie.style.backgroundColor="transparent";
  document.body.appendChild(boddie);
  set_width();
  for (i=0; i<how_many; i++) {
    write_comet(i*tail);
	setTimeout('launch('+(i*tail)+')', Math.max(1000*i));
  }
}}

function write_comet(a) {
  var i, s;
  for (i=0; i<tail; i++) {
    s=2+(i<tail/4)+2*!i;
	comets[i+a]=div(s, s);
	comets[i+a].style.backgroundColor=colours[i];
	boddie.appendChild(comets[i+a]);
  }
}

function div(w, h) {
  var d=document.createElement("div");
  d.style.position="absolute";
  d.style.overflow="hidden";
  d.style.width=w+"px";
  d.style.height=h+"px";
  return (d);
}

function stepthrough(a) { 
  var i;
  if (Math.random()<0.008||ypos[a]+dy[a]<5||xpos[a]+dx[a]<5||xpos[a]+dx[a]>=swide-5||ypos[a]+dy[a]>=shigh-5) {
	for (i=0; i<tail; i++) setTimeout('comets['+(i+a)+'].style.visibility="hidden"', speed*(tail-i));
	setTimeout('launch('+a+')', Math.max(1000, 2000*Math.random()*how_often));
  }
  else setTimeout('stepthrough('+a+')', speed);
  for (i=tail-1; i>=0; i--) {
	if (i) {
      xpos[i+a]=xpos[i+a-1];
      ypos[i+a]=ypos[i+a-1];
	}
	else {
	  xpos[i+a]+=dx[a];
      ypos[i+a]+=dy[a];
	}
    comets[i+a].style.left=xpos[i+a]+"px";
    comets[i+a].style.top=ypos[i+a]+"px";
  }
} 

function launch(a) {
  var i;
  dx[a]=(Math.random()>0.5?1:-1)*(1+Math.random()*3);
  dy[a]=(Math.random()>0.5?1:-1)*((7-dx[a])/3+Math.random()*(dx[a]+5)/3);
  xpos[a]=2*tail*dx[a]+Math.round(Math.random()*(swide-4*tail*dx[a]));
  ypos[a]=2*tail*dy[a]+Math.round(Math.random()*(shigh-4*tail*dy[a]));
  for (i=0; i<tail; i++) {
    xpos[i+a]=xpos[a];
    ypos[i+a]=ypos[a];
	comets[i+a].style.visibility="visible";
  }
  stepthrough(a);
}

window.onresize=set_width;
function set_width() {
  var sw_min=999999;
  var sh_min=999999;
  if (document.documentElement && document.documentElement.clientWidth) {
    if (document.documentElement.clientWidth>0) sw_min=document.documentElement.clientWidth;
    if (document.documentElement.clientHeight>0) sh_min=document.documentElement.clientHeight;
  }
  if (typeof(self.innerWidth)!="undefined" && self.innerWidth) {
    if (self.innerWidth>0 && self.innerWidth<sw_min) sw_min=self.innerWidth;
    if (self.innerHeight>0 && self.innerHeight<sh_min) sh_min=self.innerHeight;
  }
  if (document.body.clientWidth) {
    if (document.body.clientWidth>0 && document.body.clientWidth<sw_min) sw_min=document.body.clientWidth;
    if (document.body.clientHeight>0 && document.body.clientHeight<sh_min) sh_min=document.body.clientHeight;
  }
  if (sw_min==999999 || sh_min==999999) {
    sw_min=800;
    sh_min=600;
  }
  swide=sw_min;
  shigh=sh_min;
}
////END SHOOTING STAR

////START KONAMI CODE
/*
 * Konami-JS ~ 
 * :: Now with support for touch events and multiple instances for 
 * :: those situations that call for multiple easter eggs!
 * Code: http://konami-js.googlecode.com/
 * Examples: http://www.snaptortoise.com/konami-js
 * Copyright (c) 2009 George Mandis (georgemandis.com, snaptortoise.com)
 * Version: 1.4.2 (9/2/2013)
 * Licensed under the MIT License (http://opensource.org/licenses/MIT)
 * Tested in: Safari 4+, Google Chrome 4+, Firefox 3+, IE7+, Mobile Safari 2.2.1 and Dolphin Browser
 */

var Konami = function (callback) {
	var konami = {
		addEvent: function (obj, type, fn, ref_obj) {
			if (obj.addEventListener)
				obj.addEventListener(type, fn, false);
			else if (obj.attachEvent) {
				// IE
				obj["e" + type + fn] = fn;
				obj[type + fn] = function () {
					obj["e" + type + fn](window.event, ref_obj);
				}
				obj.attachEvent("on" + type, obj[type + fn]);
			}
		},
		input: "",
		pattern: "38384040373937396665",
		load: function (link) {
			this.addEvent(document, "keydown", function (e, ref_obj) {
				if (ref_obj) konami = ref_obj; // IE
				konami.input += e ? e.keyCode : event.keyCode;
				if (konami.input.length > konami.pattern.length)
					konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
				if (konami.input == konami.pattern) {
					konami.code(link);
					konami.input = "";
					e.preventDefault();
					return false;
				}
			}, this);
			this.iphone.load(link);
		},
		code: function (link) {
			window.location = link
		},
		iphone: {
			start_x: 0,
			start_y: 0,
			stop_x: 0,
			stop_y: 0,
			tap: false,
			capture: false,
			orig_keys: "",
			keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
			code: function (link) {
				konami.code(link);
			},
			load: function (link) {
				this.orig_keys = this.keys;
				konami.addEvent(document, "touchmove", function (e) {
					if (e.touches.length == 1 && konami.iphone.capture == true) {
						var touch = e.touches[0];
						konami.iphone.stop_x = touch.pageX;
						konami.iphone.stop_y = touch.pageY;
						konami.iphone.tap = false;
						konami.iphone.capture = false;
						konami.iphone.check_direction();
					}
				});
				konami.addEvent(document, "touchend", function (evt) {
					if (konami.iphone.tap == true) konami.iphone.check_direction(link);
				}, false);
				konami.addEvent(document, "touchstart", function (evt) {
					konami.iphone.start_x = evt.changedTouches[0].pageX;
					konami.iphone.start_y = evt.changedTouches[0].pageY;
					konami.iphone.tap = true;
					konami.iphone.capture = true;
				});
			},
			check_direction: function (link) {
				x_magnitude = Math.abs(this.start_x - this.stop_x);
				y_magnitude = Math.abs(this.start_y - this.stop_y);
				x = ((this.start_x - this.stop_x) < 0) ? "RIGHT" : "LEFT";
				y = ((this.start_y - this.stop_y) < 0) ? "DOWN" : "UP";
				result = (x_magnitude > y_magnitude) ? x : y;
				result = (this.tap == true) ? "TAP" : result;

				if (result == this.keys[0]) this.keys = this.keys.slice(1, this.keys.length);
				if (this.keys.length == 0) {
					this.keys = this.orig_keys;
					this.code(link);
				}
			}
		}
	}

	typeof callback === "string" && konami.load(callback);
	if (typeof callback === "function") {
		konami.code = callback;
		konami.load();
	}

	return konami;
};
////END KONAMI CODE
