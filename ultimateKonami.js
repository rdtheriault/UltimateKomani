/* 
This is a compilation of many awesome JavaScript/jQuery animations that are now activated by the Konami Code.
Special thanks to everyone who wrote these amazing scripts (I tried to leave their notes/credits in there).
All I did was modify them to activate after the Konami Code was entered. 
Most of the $ for jQuery were turned to jQuery so these should work on WordPress sites (unless otherwise noted)
*/


/*
INSTRUCTIONS

###Overall

You need the following four lines to run the code (and jQuery for most of them)
We did our best to try to make sure this is all you need but there are a couple animations that need more that is annoted below.
```
	<script src="ultimateKonami.js" type="text/javascript"></script>
  var easter_egg = new Konami();
	easter_egg.code = function() { functionGoesHere(); }
	easter_egg.load();
```
this will listen for the Komami Code

-Many scripts have customizability if desired
-Some scripts require a couple extra files to be added, they are noted below.

##Shooting Star
Change the function to whooosh();

-Creates little shooting stars that spawn across the screen

##Hide everything
Change the function to hideFun();

-Hides the body of the page

##Make it "rain"
Change the function to rain("pictureName");

Makes the cooresponding picture "rain" down. Replace picturename with leaf, snow, jack, turkey, or ornamate.

##Clippy
Change the function to:

clippy.load('Clippy', function(agent) {agent.show();clippyCSS();}); (yes all of that, only loads when code is entered and creates the CSS after the elements are created)

Makes Clippy, you can scroll down to change the character from Clippy to others in the scripts settings (just change 'Clippy').

##Show Pic
Change the function to showPic("http://piclocation.com/pic.png");

Make sure to change the width to what you want it to be



*/





////---START "COLOR LOOP"---////
var colorz;
var counterLoop = 0;
var arrayLoop= [];

function colorLoop(){

	var time = 500;
	
    
	for (var i=0;i<100;i++)
	{
	    time += 100;
		var timer = setTimeout(changeColor,time);
	}
    time += 100;
	var timer2 = setTimeout(clearLoop,time);
}

function changeColor(){
    $( "div" ).each(function( i,e) {
			var holder = $(e).css('backgroundColor');
			arrayLoop.push(holder);//need to fix to not do this for every for loop
			getColor();
			$(e).css('backgroundColor',colorz);
	});
}

function clearLoop() {
    $( "div" ).each(function( i,e ) {
		$(e).css('backgroundColor',arrayLoop[i]);
	});
}

function getColor() {
	
	if (counterLoop == 0)
		{
			colorz = '#6699FF';
			counterLoop++;
		}
		else if (counterLoop == 1)
		{
			colorz = '#FF9933';
			counterLoop++;
		}
		else if (counterLoop == 2)
		{
			colorz = '#FFFF66';
			counterLoop++;
		}
		else if (counterLoop == 3)
		{
			colorz = '#99CC66';
			counterLoop++;
		}
		else if (counterLoop == 4)
		{
			colorz = '#66FF99';
			counterLoop = 0;
		}
		else if (counterLoop == 5)
		{
			counterLoop = 0;
		}
}

////---END "COLOR LOOP"---////



////---START "SHOW PIC"---////
var showPicCounter = 0;
function showPic(userPic){
    ///Settings///
    
        var widthz = "850px";//probably should change this
        var timez = 5000;//5 seconds
        var vert = "top"; //this and the next will put the pic in the top left you can change this to bottom and the next ot right if desired
        var horz = "left";
    
    ///End Settings///
    
    var picLoc = "";
    picLoc = userPic;
   
    if (showPicCounter == 0){
        jQuery("<div>").attr("id","showPicPic").css("width",widthz).css("position","fixed").css(vert,"50px").css(horz,"50px").css("z-index","999000").appendTo("body");
        jQuery("<img>").attr("src",picLoc).attr("width","100%").appendTo("#showPicPic");
        showPicCounter = 1;
        setTimeout(hidePic, timez);
    }
    else {
        jQuery("#showPicPic").show();
        setTimeout(hidePic, timez);
    }
}
function hidePic(){
    jQuery("#showPicPic").hide();
}
////---END "SHOW PIC"---////



////---START "FOLLOW MOUSE"---////
function followMouse(picLoc){
    //Start location
    var widthz = "50px";//probably should change this
    var vert = "top"; //this and the next will put the pic in the top left you can change this to bottom and the next ot right if desired
    var horz = "left";
    jQuery("<div>").attr("id","showMovePic").css("width",widthz).css("position","fixed").css(vert,"50px").css(horz,"50px").css("z-index","999000").appendTo("body");
    jQuery("<img>").attr("src",picLoc).attr("width","100%").appendTo("#showMovePic");
    //follow it move
	jQuery(document).mousemove(function(e){
    	jQuery("#showMovePic").css({left:e.pageX+10, top:e.pageY+10});
	});
 }
////---END "FOLLOW MOUSE"---////



////---START "CLIPPY"---////
//Settings are at the end
//Brought to you by https://www.smore.com/clippy-js

var clippy = {};

/******
 *
 *
 * @constructor
 */
clippy.Agent = function (path, data, sounds) {
    this.path = path;

    this._queue = new clippy.Queue(jQuery.proxy(this._onQueueEmpty, this));

    this._el = jQuery('<div class="clippy"></div>').hide();

    jQuery(document.body).append(this._el);

    this._animator = new clippy.Animator(this._el, path, data, sounds);

    this._balloon = new clippy.Balloon(this._el);

    this._setupEvents();
};

clippy.Agent.prototype = {

    /**************************** API ************************************/

    /***
     *
     * @param {Number} x
     * @param {Number} y
     */
    gestureAt:function (x, y) {
        var d = this._getDirection(x, y);
        var gAnim = 'Gesture' + d;
        var lookAnim = 'Look' + d;

        var animation = this.hasAnimation(gAnim) ? gAnim : lookAnim;
        return this.play(animation);
    },

    /***
     *
     * @param {Boolean=} fast
     *
     */
    hide:function (fast, callback) {
        this._hidden = true;
        var el = this._el;
        this.stop();
        if (fast) {
            this._el.hide();
            this.stop();
            this.pause();
            if (callback) callback();
            return;
        }

        return this._playInternal('Hide', function () {
            el.hide();
            this.pause();
            if (callback) callback();
        })
    },


    moveTo:function (x, y, duration) {
        var dir = this._getDirection(x, y);
        var anim = 'Move' + dir;
        if (duration === undefined) duration = 1000;

        this._addToQueue(function (complete) {
            // the simple case
            if (duration === 0) {
                this._el.css({top:y, left:x});
                this.reposition();
                complete();
                return;
            }

            // no animations
            if (!this.hasAnimation(anim)) {
                this._el.animate({top:y, left:x}, duration, complete);
                return;
            }

            var callback = jQuery.proxy(function (name, state) {
                // when exited, complete
                if (state === clippy.Animator.States.EXITED) {
                    complete();
                }
                // if waiting,
                if (state === clippy.Animator.States.WAITING) {
                    this._el.animate({top:y, left:x}, duration, jQuery.proxy(function () {
                        // after we're done with the movement, do the exit animation
                        this._animator.exitAnimation();
                    }, this));
                }

            }, this);

            this._playInternal(anim, callback);
        }, this);
    },

    _playInternal:function (animation, callback) {

        // if we're inside an idle animation,
        if (this._isIdleAnimation() && this._idleDfd && this._idleDfd.state() === 'pending') {
            this._idleDfd.done(jQuery.proxy(function () {
                this._playInternal(animation, callback);
            }, this))
        }

        this._animator.showAnimation(animation, callback);
    },

    play:function (animation, timeout, cb) {
        if (!this.hasAnimation(animation)) return false;

        if (timeout === undefined) timeout = 5000;


        this._addToQueue(function (complete) {
            var completed = false;
            // handle callback
            var callback = function (name, state) {
                if (state === clippy.Animator.States.EXITED) {
                    completed = true;
                    if (cb) cb();
                    complete();
                }
            };

            // if has timeout, register a timeout function
            if (timeout) {
                window.setTimeout(jQuery.proxy(function () {
                    if (completed) return;
                    // exit after timeout
                    this._animator.exitAnimation();
                }, this), timeout)
            }

            this._playInternal(animation, callback);
        }, this);

        return true;
    },

    /***
     *
     * @param {Boolean=} fast
     */
    show:function (fast) {

        this._hidden = false;
        if (fast) {
            this._el.show();
            this.resume();
            this._onQueueEmpty();
            return;
        }

        if (this._el.css('top') === 'auto' || !this._el.css('left') === 'auto') {
            var left = jQuery(window).width() * 0.8;
            var top = (jQuery(window).height() + jQuery(document).scrollTop()) * 0.8;
            
            
            //added to work with IE
            var ua = window.navigator.userAgent;
	    var msie = ua.indexOf("MSIE ");
	
	    if (msie > 0  || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer
	    {
	        var top = (jQuery(window).height() + jQuery(document).scrollTop()) * 0.6;
	    }
	    
	    
	    
	    
            this._el.css({top:top, left:left});
        }

        this.resume();
        return this.play('Show');
    },

    /***
     *
     * @param {String} text
     */
    speak:function (text, hold) {
        this._addToQueue(function (complete) {
            this._balloon.speak(complete, text, hold);
        }, this);
    },


    /***
     * Close the current balloon
     */
    closeBalloon:function () {
        this._balloon.hide();
    },

    delay:function (time) {
        time = time || 250;

        this._addToQueue(function (complete) {
            this._onQueueEmpty();
            window.setTimeout(complete, time);
        });
    },

    /***
     * Skips the current animation
     */
    stopCurrent:function () {
        this._animator.exitAnimation();
        this._balloon.close();
    },


    stop:function () {
        // clear the queue
        this._queue.clear();
        this._animator.exitAnimation();
        this._balloon.hide();
    },

    /***
     *
     * @param {String} name
     * @returns {Boolean}
     */
    hasAnimation:function (name) {
        return this._animator.hasAnimation(name);
    },

    /***
     * Gets a list of animation names
     *
     * @return {Array.<string>}
     */
    animations:function () {
        return this._animator.animations();
    },

    /***
     * Play a random animation
     * @return {jQuery.Deferred}
     */
    animate:function () {
        var animations = this.animations();
        var anim = animations[Math.floor(Math.random() * animations.length)];
        // skip idle animations
        if (anim.indexOf('Idle') === 0) {
            return this.animate();
        }
        return this.play(anim);
    },

    /**************************** Utils ************************************/

    /***
     *
     * @param {Number} x
     * @param {Number} y
     * @return {String}
     * @private
     */
    _getDirection:function (x, y) {
        var offset = this._el.offset();
        var h = this._el.height();
        var w = this._el.width();

        var centerX = (offset.left + w / 2);
        var centerY = (offset.top + h / 2);


        var a = centerY - y;
        var b = centerX - x;

        var r = Math.round((180 * Math.atan2(a, b)) / Math.PI);

        // Left and Right are for the character, not the screen :-/
        if (-45 <= r && r < 45) return 'Right';
        if (45 <= r && r < 135) return 'Up';
        if (135 <= r && r <= 180 || -180 <= r && r < -135) return 'Left';
        if (-135 <= r && r < -45) return 'Down';

        // sanity check
        return 'Top';
    },

    /**************************** Queue and Idle handling ************************************/

    /***
     * Handle empty queue.
     * We need to transition the animation to an idle state
     * @private
     */
    _onQueueEmpty:function () {
        if (this._hidden || this._isIdleAnimation()) return;
        var idleAnim = this._getIdleAnimation();
        this._idleDfd = jQuery.Deferred();

        this._animator.showAnimation(idleAnim, jQuery.proxy(this._onIdleComplete, this));
    },

    _onIdleComplete:function (name, state) {
        if (state === clippy.Animator.States.EXITED) {
            this._idleDfd.resolve();
        }
    },


    /***
     * Is the current animation is Idle?
     * @return {Boolean}
     * @private
     */
    _isIdleAnimation:function () {
        var c = this._animator.currentAnimationName;
        return c && c.indexOf('Idle') === 0;
    },


    /**
     * Gets a random Idle animation
     * @return {String}
     * @private
     */
    _getIdleAnimation:function () {
        var animations = this.animations();
        var r = [];
        for (var i = 0; i < animations.length; i++) {
            var a = animations[i];
            if (a.indexOf('Idle') === 0) {
                r.push(a);
            }
        }

        // pick one
        var idx = Math.floor(Math.random() * r.length);
        return r[idx];
    },

    /**************************** Events ************************************/

    _setupEvents:function () {
        jQuery(window).on('resize', jQuery.proxy(this.reposition, this));

        this._el.on('mousedown', jQuery.proxy(this._onMouseDown, this));

        this._el.on('dblclick', jQuery.proxy(this._onDoubleClick, this));
    },

    _onDoubleClick:function () {
        if (!this.play('ClickedOn')) {
            this.animate();
        }
    },

    reposition:function () {
        if (!this._el.is(':visible')) return;
        var o = this._el.offset();
        var bH = this._el.outerHeight();
        var bW = this._el.outerWidth();

        var wW = jQuery(window).width();
        var wH = jQuery(window).height();
        var sT = jQuery(window).scrollTop();
        var sL = jQuery(window).scrollLeft();

        var top = o.top - sT;
        var left = o.left - sL;
        var m = 5;
        if (top - m < 0) {
            top = m;
        } else if ((top + bH + m) > wH) {
            top = wH - bH - m;
        }

        if (left - m < 0) {
            left = m;
        } else if (left + bW + m > wW) {
            left = wW - bW - m;
        }

        this._el.css({left:left, top:top});
        // reposition balloon
        this._balloon.reposition();
    },

    _onMouseDown:function (e) {
        e.preventDefault();
        this._startDrag(e);
    },


    /**************************** Drag ************************************/

    _startDrag:function (e) {
        // pause animations
        this.pause();
        this._balloon.hide(true);
        this._offset = this._calculateClickOffset(e);

        this._moveHandle = jQuery.proxy(this._dragMove, this);
        this._upHandle = jQuery.proxy(this._finishDrag, this);

        jQuery(window).on('mousemove', this._moveHandle);
        jQuery(window).on('mouseup', this._upHandle);

        this._dragUpdateLoop = window.setTimeout(jQuery.proxy(this._updateLocation, this), 10);
    },

    _calculateClickOffset:function (e) {
        var mouseX = e.pageX;
        var mouseY = e.pageY;
        var o = this._el.offset();
        return {
            top:mouseY - o.top,
            left:mouseX - o.left
        }

    },

    _updateLocation:function () {
        this._el.css({top:this._targetY, left:this._taregtX});
        this._dragUpdateLoop = window.setTimeout(jQuery.proxy(this._updateLocation, this), 10);
    },

    _dragMove:function (e) {
        e.preventDefault();
        var x = e.clientX - this._offset.left;
        var y = e.clientY - this._offset.top;
        this._taregtX = x;
        this._targetY = y;
    },

    _finishDrag:function () {
        window.clearTimeout(this._dragUpdateLoop);
        // remove handles
        jQuery(window).off('mousemove', this._moveHandle);
        jQuery(window).off('mouseup', this._upHandle);
        // resume animations
        this._balloon.show();
        this.reposition();
        this.resume();

    },

    _addToQueue:function (func, scope) {
        if (scope) func = jQuery.proxy(func, scope);
        this._queue.queue(func);
    },

    /**************************** Pause and Resume ************************************/

    pause:function () {
        this._animator.pause();
        this._balloon.pause();

    },

    resume:function () {
        this._animator.resume();
        this._balloon.resume();
    }

};

/******
 *
 *
 * @constructor
 */
clippy.Animator = function (el, path, data, sounds) {
    this._el = el;
    this._data = data;
    this._path = path;
    this._currentFrameIndex = 0;
    this._currentFrame = undefined;
    this._exiting = false;
    this._currentAnimation = undefined;
    this._endCallback = undefined;
    this._started = false;
    this._sounds = {};
    this.currentAnimationName = undefined;
    this.preloadSounds(sounds);
    this._overlays = [this._el];
    var curr = this._el;

    this._setupElement(this._el);
    for (var i = 1; i < this._data.overlayCount; i++) {
        var inner = this._setupElement(jQuery('<div></div>'));

        curr.append(inner);
        this._overlays.push(inner);
        curr = inner;
    }
};

clippy.Animator.prototype = {
    _setupElement:function (el) {
        var frameSize = this._data.framesize;
        el.css('display', "none");
        el.css({width:frameSize[0], height:frameSize[1]});
        el.css('background', "url('" + this._path + "/map.png') no-repeat");

        return el;
    },

    animations:function () {
        var r = [];
        var d = this._data.animations;
        for (var n in d) {
            r.push(n);
        }
        return r;
    },

    preloadSounds:function (sounds) {

        for (var i = 0; i < this._data.sounds.length; i++) {
            var snd = this._data.sounds[i];
            var uri = sounds[snd];
            if (!uri) continue;
            this._sounds[snd] = new Audio(uri);

        }
    },
    hasAnimation:function (name) {
        return !!this._data.animations[name];
    },

    exitAnimation:function () {
        this._exiting = true;
    },


    showAnimation:function (animationName, stateChangeCallback) {
        this._exiting = false;

        if (!this.hasAnimation(animationName)) {
            return false;
        }

        this._currentAnimation = this._data.animations[animationName];
        this.currentAnimationName = animationName;


        if (!this._started) {
            this._step();
            this._started = true;
        }

        this._currentFrameIndex = 0;
        this._currentFrame = undefined;
        this._endCallback = stateChangeCallback;

        return true;
    },


    _draw:function () {
        var images = [];
        if (this._currentFrame) images = this._currentFrame.images || [];

        for (var i = 0; i < this._overlays.length; i++) {
            if (i < images.length) {
                var xy = images[i];
                var bg = -xy[0] + 'px ' + -xy[1] + 'px';
                this._overlays[i].css({'background-position':bg, 'display':'block'});
            }
            else {
                this._overlays[i].css('display', 'none');
            }

        }
    },

    _getNextAnimationFrame:function () {
        if (!this._currentAnimation) return undefined;
        // No current frame. start animation.
        if (!this._currentFrame) return 0;
        var currentFrame = this._currentFrame;
        var branching = this._currentFrame.branching;


        if (this._exiting && currentFrame.exitBranch !== undefined) {
            return currentFrame.exitBranch;
        }
        else if (branching) {
            var rnd = Math.random() * 100;
            for (var i = 0; i < branching.branches.length; i++) {
                var branch = branching.branches[i];
                if (rnd <= branch.weight) {
                    return branch.frameIndex;
                }

                rnd -= branch.weight;
            }
        }

        return this._currentFrameIndex + 1;
    },

    _playSound:function () {
        var s = this._currentFrame.sound;
        if (!s) return;
        var audio = this._sounds[s];
        if (audio) audio.play();
    },

    _atLastFrame:function () {
        return this._currentFrameIndex >= this._currentAnimation.frames.length - 1;
    },

    _step:function () {
        if (!this._currentAnimation) return;
        var newFrameIndex = Math.min(this._getNextAnimationFrame(), this._currentAnimation.frames.length - 1);
        var frameChanged = !this._currentFrame || this._currentFrameIndex !== newFrameIndex;
        this._currentFrameIndex = newFrameIndex;

        // always switch frame data, unless we're at the last frame of an animation with a useExitBranching flag.
        if (!(this._atLastFrame() && this._currentAnimation.useExitBranching)) {
            this._currentFrame = this._currentAnimation.frames[this._currentFrameIndex];
        }

        this._draw();
        this._playSound();

        this._loop = window.setTimeout(jQuery.proxy(this._step, this), this._currentFrame.duration);


        // fire events if the frames changed and we reached an end
        if (this._endCallback && frameChanged && this._atLastFrame()) {
            if (this._currentAnimation.useExitBranching && !this._exiting) {
                this._endCallback(this.currentAnimationName, clippy.Animator.States.WAITING);
            }
            else {
                this._endCallback(this.currentAnimationName, clippy.Animator.States.EXITED);
            }
        }
    },

    /***
     * Pause animation execution
     */
    pause:function () {
        window.clearTimeout(this._loop);
    },

    /***
     * Resume animation
     */
    resume:function () {
        this._step();
    }
};

clippy.Animator.States = { WAITING:1, EXITED:0 };

/******
 *
 *
 * @constructor
 */
clippy.Balloon = function (targetEl) {
    this._targetEl = targetEl;

    this._hidden = true;
    this._setup();
};

clippy.Balloon.prototype = {

    WORD_SPEAK_TIME:320,
    CLOSE_BALLOON_DELAY:2000,

    _setup:function () {

        this._balloon = jQuery('<div class="clippy-balloon"><div class="clippy-tip"></div><div class="clippy-content"></div></div> ').hide();
        this._content = this._balloon.find('.clippy-content');

        jQuery(document.body).append(this._balloon);
    },

    reposition:function () {
        var sides = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

        for (var i = 0; i < sides.length; i++) {
            var s = sides[i];
            this._position(s);
            if (!this._isOut()) break;
        }
    },

    _BALLOON_MARGIN:15,

    /***
     *
     * @param side
     * @private
     */
    _position:function (side) {
        var o = this._targetEl.offset();
        var h = this._targetEl.height();
        var w = this._targetEl.width();

        var bH = this._balloon.outerHeight();
        var bW = this._balloon.outerWidth();

        this._balloon.removeClass('clippy-top-left');
        this._balloon.removeClass('clippy-top-right');
        this._balloon.removeClass('clippy-bottom-right');
        this._balloon.removeClass('clippy-bottom-left');

        var left, top;
        switch (side) {
            case 'top-left':
                // right side of the balloon next to the right side of the agent
                left = o.left + w - bW;
                top = o.top - bH - this._BALLOON_MARGIN;
                break;
            case 'top-right':
                // left side of the balloon next to the left side of the agent
                left = o.left;
                top = o.top - bH - this._BALLOON_MARGIN;
                break;
            case 'bottom-right':
                // right side of the balloon next to the right side of the agent
                left = o.left;
                top = o.top + h + this._BALLOON_MARGIN;
                break;
            case 'bottom-left':
                // left side of the balloon next to the left side of the agent
                left = o.left + w - bW;
                top = o.top + h + this._BALLOON_MARGIN;
                break;
        }

        this._balloon.css({top:top, left:left});
        this._balloon.addClass('clippy-' + side);
    },

    _isOut:function () {
        var o = this._balloon.offset();
        var bH = this._balloon.outerHeight();
        var bW = this._balloon.outerWidth();

        var wW = jQuery(window).width();
        var wH = jQuery(window).height();
        var sT = jQuery(document).scrollTop();
        var sL = jQuery(document).scrollLeft();

        var top = o.top - sT;
        var left = o.left - sL;
        var m = 5;
        if (top - m < 0 || left - m < 0) return true;
        if ((top + bH + m) > wH || (left + bW + m) > wW) return true;

        return false;
    },

    speak:function (complete, text, hold) {
        this._hidden = false;
        this.show();
        var c = this._content;
        // set height to auto
        c.height('auto');
        c.width('auto');
        // add the text
        c.text(text);
        // set height
        c.height(c.height());
        c.width(c.width());
        c.text('');
        this.reposition();

        this._complete = complete;
        this._sayWords(text, hold, complete);
    },

    show:function () {
        if (this._hidden) return;
        this._balloon.show();
    },

    hide:function (fast) {
        if (fast) {
            this._balloon.hide();
            return;
        }

        this._hiding = window.setTimeout(jQuery.proxy(this._finishHideBalloon, this), this.CLOSE_BALLOON_DELAY);
    },

    _finishHideBalloon:function () {
        if (this._active) return;
        this._balloon.hide();
        this._hidden = true;
        this._hiding = null;
    },

    _sayWords:function (text, hold, complete) {
        this._active = true;
        this._hold = hold;
        var words = text.split(/[^\S-]/);
        var time = this.WORD_SPEAK_TIME;
        var el = this._content;
        var idx = 1;


        this._addWord = jQuery.proxy(function () {
            if (!this._active) return;
            if (idx > words.length) {
                this._active = false;
                if (!this._hold) {
                    complete();
                    this.hide();
                }
            } else {
                el.text(words.slice(0, idx).join(' '));
                idx++;
                this._loop = window.setTimeout(jQuery.proxy(this._addWord, this), time);
            }
        }, this);

        this._addWord();

    },

    close:function () {
        if (this._active) {
            this._hold = false;
        } else if (this._hold) {
            this._complete();
        }
    },

    pause:function () {
        window.clearTimeout(this._loop);
        if (this._hiding) {
            window.clearTimeout(this._hiding);
            this._hiding = null;
        }
    },

    resume:function () {
        if (this._addWord)  this._addWord();
        this._hiding = window.setTimeout(jQuery.proxy(this._finishHideBalloon, this), this.CLOSE_BALLOON_DELAY);
    }


};

clippy.BASE_PATH = '//s3.amazonaws.com/clippy.js/Agents/';

clippy.load = function (name, successCb, failCb) {
    var path = clippy.BASE_PATH + name;

    var mapDfd = clippy.load._loadMap(path);
    var agentDfd = clippy.load._loadAgent(name, path);
    var soundsDfd = clippy.load._loadSounds(name, path);

    var data;
    agentDfd.done(function (d) {
        data = d;
    });

    var sounds;

    soundsDfd.done(function (d) {
        sounds = d;
    });

    // wrapper to the success callback
    var cb = function () {
        var a = new clippy.Agent(path, data,sounds);
        successCb(a);
    };

    jQuery.when(mapDfd, agentDfd, soundsDfd).done(cb).fail(failCb);
};

clippy.load._maps = {};
clippy.load._loadMap = function (path) {
    var dfd = clippy.load._maps[path];
    if (dfd) return dfd;

    // set dfd if not defined
    dfd = clippy.load._maps[path] = jQuery.Deferred();

    var src = path + '/map.png';
    var img = new Image();

    img.onload = dfd.resolve;
    img.onerror = dfd.reject;

    // start loading the map;
    img.setAttribute('src', src);

    return dfd.promise();
};

clippy.load._sounds = {};

clippy.load._loadSounds = function (name, path) {
    var dfd = clippy.load._sounds[name];
    if (dfd) return dfd;

    // set dfd if not defined
    dfd = clippy.load._sounds[name] = jQuery.Deferred();

    var audio = document.createElement('audio');
    var canPlayMp3 = !!audio.canPlayType && "" != audio.canPlayType('audio/mpeg');
    var canPlayOgg = !!audio.canPlayType && "" != audio.canPlayType('audio/ogg; codecs="vorbis"');

    if (!canPlayMp3 && !canPlayOgg) {
        dfd.resolve({});
    } else {
        var src = path + (canPlayMp3 ? '/sounds-mp3.js' : '/sounds-ogg.js');
        // load
        clippy.load._loadScript(src);
    }

    return dfd.promise()
};


clippy.load._data = {};
clippy.load._loadAgent = function (name, path) {
    var dfd = clippy.load._data[name];
    if (dfd) return dfd;

    dfd = clippy.load._getAgentDfd(name);

    var src = path + '/agent.js';

    clippy.load._loadScript(src);

    return dfd.promise();
};

clippy.load._loadScript = function (src) {
    var script = document.createElement('script');
    script.setAttribute('src', src);
    script.setAttribute('async', 'async');
    script.setAttribute('type', 'text/javascript');

    document.head.appendChild(script);
};

clippy.load._getAgentDfd = function (name) {
    var dfd = clippy.load._data[name];
    if (!dfd) {
        dfd = clippy.load._data[name] = jQuery.Deferred();
    }
    return dfd;
};

clippy.ready = function (name, data) {
    var dfd = clippy.load._getAgentDfd(name);
    dfd.resolve(data);
};

clippy.soundsReady = function (name, data) {
    var dfd = clippy.load._sounds[name];
    if (!dfd) {
        dfd = clippy.load._sounds[name] = jQuery.Deferred();
    }

    dfd.resolve(data);
};

/******
 * Tiny Queue
 *
 * @constructor
 */
clippy.Queue = function (onEmptyCallback) {
    this._queue = [];
    this._onEmptyCallback = onEmptyCallback;
};

clippy.Queue.prototype = {
    /***
     *
     * @param {function(Function)} func
     * @returns {jQuery.Deferred}
     */
    queue:function (func) {
        this._queue.push(func);

        if (this._queue.length === 1 && !this._active) {
            this._progressQueue();
        }
    },

    _progressQueue:function () {

        // stop if nothing left in queue
        if (!this._queue.length) {
            this._onEmptyCallback();
            return;
        }

        var f = this._queue.shift();
        this._active = true;

        // execute function
        var completeFunction = jQuery.proxy(this.next, this);
        f(completeFunction);
    },

    clear:function () {
        this._queue = [];
    },

    next:function () {
        this._active = false;
        this._progressQueue();
    }
};

//gets it started without activating the script before Konami
var agentz;
//change 'Clippy' to get a different character 'Merlin' 'Rover' 'Links'
//clippy.load('Clippy', function(agent) {
    			//agentz = agent;
//});

function clippyCSS() {
  //trying to not need the css file
    jQuery(".clippy, .clippy-balloon").css( {
  		    'position': 'fixed',
  		    'z-index': '1000',
  		    'cursor': 'pointer'
  	});
		
		jQuery(".clippy-balloon").css( {
		    'background': '#FFC',
		    'color': 'black',
		    'padding': '8px',
		    'border': '1px solid black',
		    'border-radius': '5px'
		});
		
		jQuery(".clippy-content").css( {
		    'max-width': '200px',
		    'min-width': '120px',
		    'font-family': '"Microsoft Sans", sans-serif',
		    'font-size': '10pt'
		});
		
		jQuery(".clippy-tip").css( {
		    'width': '10px',
		    'height': '16px',
		    'background': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAgCAMAAAAlvKiEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRF///MAAAA////52QwgAAAAAN0Uk5T//8A18oNQQAAAGxJREFUeNqs0kEOwCAIRFHn3//QTUU6xMyyxii+jQosrTPkyPEM6IN3FtzIRk1U4dFeKWQiH6pRRowMVKEmvronEynkwj0uZJgR22+YLopPSo9P34wJSamLSU7lSIWLJU7NkNomNlhqxUeAAQC+TQLZyEuJBwAAAABJRU5ErkJggg==) no-repeat',
		    'position': 'absolute'
		});
		
		jQuery(".clippy-top-left .clippy-tip").css( {
		    'top': '100%',
		    'margin-top': '0px',
		    'left': '100%',
		    'margin-left': '-50px'
		});
		
		jQuery(".clippy-top-right .clippy-tip").css( {
		    'top': '100%',
		    'margin-top': '0px',
		    'left': '0',
		    'margin-left': '50px',
		    'background-position': '-10px 0'
		});
		
		jQuery(".clippy-bottom-right .clippy-tip").css( {
		    'top': '0',
		    'margin-top': '-16px',
		    'left': '0',
		    'margin-left': '50px',
		    'background-position': '-10px -16px'
		});
		
		jQuery(".clippy-bottom-left .clippy-tip").css( {
		    'top': '0',
		    'margin-top': '-16px',
		    'left': '100%',
		    'margin-left': '-50px',
		    'background-position': '0px -16px'
		});
		
}

////---END "CLIPPY"---////


////---START "MAKE IT RAIN"---////

//I forgot where I got the original script for this, I had to modify a bit to get it to take pictures instead of divs

function rain(item) {

	var picture = "http://www.sagefirellc.com/images/Leaf.png";


	if (item === "leaf") {picture = "http://www.sagefirellc.com/images/leaf.png";}
	else if (item === "snow") {picture = "http://www.sagefirellc.com/images/flake.png";}
	else if (item === "jack") {picture = "http://www.sagefirellc.com/images/jack.png";}
	else if (item === "turkey") {picture = "http://www.sagefirellc.com/images/turkey.png";}
	else if (item === "ornamate") {picture = "http://www.sagefirellc.com/images/ornamate.png";}
	else if (item === "rain") {picture = "http://www.sagefirellc.com/images/flake.png";}//{picture = "http://www.sagefirellc.com/images/rain.png";}
	else {picture = "http://www.sagefirellc.com/images/flake.png";}

    // How many frames per second?  More => smoother but more processor intensive
    var fps = 30;

    // How often should flakes be added?  Every 10 frames by default.  Greater => fewer flakes
    var addNewFlakesEveryNFrames = 10;

    // How many flakes should be added each time?  Greater => more flakes, more processor intensive
    var newFlakesToAdd = 3;

    // Controls the speed; 0.7 provides a nice speed
    var speedControl = 0.7;

    // -------------------------------
    // -------------------------------
    // -------------------------------
    
    // Holder variables
    var flakes = [];
    var additionCounter = 0;

    // The flake creator function
    function createFlake(curX, curY) {

        // How unique should each flake be?  These values specify max unique speed and wiggle/drift
        var maxSpeedOffset = 2;
        var maxWiggleOffset = 10;

        // How big should the flakes be?
        var minSize = 25;
        var maxSize = 55;

        // How much drifting/wiggling should be allowed in the downward path?
        var minWiggle = 10;
        var maxWiggle = 40;

        var sizePercent = Math.random();
        var size = Math.floor(sizePercent * (maxSize - minSize) + minSize);
        var opacity = 0.3 + Math.random() * 0.7;
        var color = '#9CF';

        // Create a unique speed offset, so each flake falls at a unique rate
        var speedOffset = Math.floor(Math.random() * maxSpeedOffset);

        // Create a unique wiggle amount based on size (bigger = more wiggle/drift)
        var wiggle = minWiggle + (maxWiggleOffset * Math.random()) + (maxWiggle - minWiggle) * sizePercent;

        var flake = jQuery('<div>').text(' ').css({
            position: 'fixed',
            left: curX,
            top: curY,
            zIndex: 1000000,
            //opacity: opacity,
            width: size,
            height: size,
            backgroundImage: "url('"+picture+"')",
            backgroundSize: 'contain'
        }).appendTo('body');
        

        var flakeObj = {
            size: size,
            sizePercent: sizePercent,
            homeX: curX,
            curX: curX,
            curY: curY,
            flake: flake,
            uniqueSpeedOffset: speedOffset,
            wiggle: wiggle,
            wiggleCounter: Math.floor(100 * Math.random())
        };
        flakes.push(flakeObj);

        return flakeObj;
    }

    // Create the sin table to save processing power later
    var sinTable = [];
    for (var i = 0; i < 100; i++) {
        var sin = Math.sin((i / 100) * Math.PI * 2);
        sinTable.push(sin);
    }

    // Track where the mouse is, so we can move flakes away from it
    var mouseX = -200;
    var mouseY = -200;
    var $w = jQuery(window);
    jQuery(document).mousemove(function(e) {
        mouseX = e.pageX - $w.scrollLeft();
        mouseY = e.pageY - $w.scrollTop();
    });


    function onEnterFrame() {
        // Update existing flakes
        var winH = $w.height();
        for (var i = flakes.length - 1; i > -1; i--) {
            var flakeObj = flakes[i];
            var flake = flakeObj.flake;
            var speed = 2 + (1 - flakeObj.sizePercent) * 5 + flakeObj.uniqueSpeedOffset; // bigger = slower to fall
            speed *= speedControl; // apply the speed control
            var curY = flakeObj.curY;
            var newY = curY + speed;

            var wiggleCounter = flakeObj.wiggleCounter = (++flakeObj.wiggleCounter % 100);
            var sin = sinTable[wiggleCounter];
            var wiggle = flakeObj.wiggle * sin;
            var newX = flakeObj.homeX + wiggle;

            // If we are close to the mouse, force out of the way
            var mouseXDist = Math.abs(mouseX - newX);
            var mouseYDist = Math.abs(mouseY - newY);
            var influenceArea = 150;
            if (mouseXDist < influenceArea && mouseYDist < influenceArea) {
                var maxForce = 10;
                var dist = Math.sqrt(mouseXDist * mouseXDist + mouseYDist * mouseYDist);
                if (dist < influenceArea) {
                    var influence = maxForce * (1 - (dist / influenceArea));
                    if (mouseY > newY) {
                        newY -= influence;
                        if (mouseX < newX) flakeObj.homeX += influence;
                        else flakeObj.homeX -= influence;
                    }
                    else newY += influence;
                }
            }

            flakeObj.curY = newY;
            flakeObj.curX = newX;
            flake.css({
                top: newY,
                left: newX
            });

            // Destroy flake if it has gone out of view by 100
            if (newY > winH + 100) {
                flake.remove();
                flakeObj.flake = null;
                flakes.splice(i, 1);
            }
        }

        // Add any new flakes
        if (++additionCounter % addNewFlakesEveryNFrames == 0) {
            additionCounter = 0;

            var minX = -100;
            var maxX = jQuery(window).width() + 100;
            var homeY = -100;
            for (var i = 0; i < newFlakesToAdd; i++) {
                var curX = minX + Math.floor(Math.random() * (maxX - minX));
                var curY = homeY + Math.floor(100 * Math.random());
                createFlake(curX, curY);
            }
        }
    }

    // Start the animation based on the requested frames per second
    setInterval(onEnterFrame, 1000 / fps);

}
////---END "MAKE IT RAIN"---////



////---START "HIDE FUNNY"---////
//SageFire LLC code
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
////---END "HIDE FUNNY"---////



////---START "SHOOTING STAR"---////
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
////---END "SHOOTING STAR"---////



////---START "KONAMI CODE"---////
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
////---END "KONAMI CODE"---////
