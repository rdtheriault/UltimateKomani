//Compilation

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




*/






<script src="http://www.sagefirellc.com/images/konami.js" type="text/javascript"> </script>
<script src="http://www.sagefirellc.com/images/shootingstar.js" type="text/javascript"> </script>
	
	<script>
		var easter_egg = new Konami();
		easter_egg.code = function() { whooosh(); }
		easter_egg.load();
	</script>
	
	<script src="http://www.sagefirellc.com/images/konami.js" type="text/javascript"></script>
	<script>
		var easter_egg = new Konami();
		easter_egg.code = function() {hide(); }
		easter_egg.load();
		function hide() {
			var divs = document.getElementsByTagName("div");
			for(var i = 0; i < divs.length; i++){
			   divs[i].style.visibility = "hidden";
			}
			window.alert("You erased the website");
			setTimeout(show, 5000);
		}
		function show() {
			window.alert("Just Kidding");
			var divs = document.getElementsByTagName("div");
			for(var i = 0; i < divs.length; i++){
			   divs[i].style.visibility = "visible";
			}
		}
	</script>
	
	

<div id="bacon" style="display:none; position:fixed; top:0px; left:300px; width:747px; height:1328px; z-index:999000;"><img src="http://www.sagefirellc.com/images/bacon.jpg" style="witdh:100%;"></div>
<script src="http://www.sagefirellc.com/images/konami.js" type="text/javascript"></script>
<script src="http://www.sagefirellc.com/images/shootingstar.js" type="text/javascript"></script>
<script>
	var easter_egg = new Konami();
	easter_egg.code = function() { show(); }
	easter_egg.load();
function show(){
	document.getElementById("bacon").style.display = "block";
	setTimeout(hide, 5000);
}
function hide() {
	document.getElementById("bacon").style.display = "none";
}
</script>

<style>	
	#bulldog {
		position:fixed;
		top:0px;
		left:200px;
		visibility: hidden;
		height:100px;
		width:100px;
	}
	#move {
		height:100%;
		width:100%;
	}
</style>
<div id="bulldog"><img id="move" src="http://www.sagefirellc.com/images/newdawg.png"></div>
<script src="http://www.sagefirellc.com/images/konami.js" type="text/javascript"></script>
<script src="http://www.sagefirellc.com/images/bulldogRun2.js" type="text/javascript"></script>
<script>
	var easter_egg = new Konami();
	easter_egg.code = function() { start(); }
	easter_egg.load();
</script>


<link rel="stylesheet" media="all" href="http://sagefirellc.com/images/clippy/clippy.css" />
     <script type="text/javascript" src="http://sagefirellc.com/images/clippy/clippy.js"></script><script src="http://www.sagefirellc.com/images/konami.js" type="text/javascript"></script>
<script>
		var agentz;
		clippy.load('Clippy', function(agent) {
        			agentz = agent;
    			});
		var easter_egg = new Konami();
		easter_egg.code = function() {clippyz(); }
		easter_egg.load();
		function clippyz() {
        		agentz.show();
		}
	</script>


<link rel="stylesheet" media="screen" href="http://sagefirellc.com/images/lights/lights.css" />
<script type="text/javascript" src="http://yui.yahooapis.com/combo?2.6.0/build/yahoo-dom-event/yahoo-dom-event.js&2.6.0/build/animation/animation-min.js"></script>
	<script type="text/javascript" src="http://sagefirellc.com/images/lights/sound.js"></script>
	<script type="text/javascript" src="http://sagefirellc.com/images/lights/lights.js"></script>
<script src="http://www.sagefirellc.com/images/konami.js" type="text/javascript"></script>
	<script>
		var easter_egg = new Konami();
		easter_egg.code = function() { 
			soundManager.setup({
			  flashVersion: 9,
			  preferFlash: false,
			  url: 'lights/',
			  onready: function() {
			    smashInit();
			  },
			  ontimeout: function() {
			    smashInit();
			  }
			});
		}
		easter_egg.load();
	</script>
