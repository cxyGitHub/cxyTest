var g_gps = null;
var GamePlayScene  = cc.Scene.extend({
	_gamePlayLayer : null,
	_touchLayer:null,
	_level:null,
    onEnter:function () {
        this._super();
        g_gps = this;
        this.scheduleUpdate();
        this._touchLayer = new TouchLayer();
        this._gamePlayLayer = new GamePlayLayer();
        this.addChild(this._gamePlayLayer);
        this._level = new Level();
        this.schedule(g_level.subTime,0.5);
    },
    update: function (dt) {
    	if(GC.start){
    		this._gamePlayLayer.moveRailing();
    	}
    	g_ms.update(); //血条
    },
    /**
     * 判断碰撞 1
     */
    check_collision:function(sprite1,sprite2){
    	try{
	    	var dollRect = sprite1.getBoundingBox();
	    	var dollHeadRect = sprite2.getBoundingBox();  
	    	if(cc.rectIntersectsRect(dollRect, dollHeadRect)){  
//	    		document.querySelector("#test").innerHTML = true;
	    		return true;
	    	}  
    	}catch(e){
//    		console.log(e);
    	}
    	return false;
    },
    check_collision2:function(dollRect,dollHeadRect){
    	try{
    		if(cc.rectIntersectsRect(dollRect, dollHeadRect)){  
//  			document.querySelector("#test").innerHTML = true;
    			return true;
    		}  
    	}catch(e){
//  		console.log(e);
    	}
    	return false;
    },
    /**
     * 判断碰撞 2
     * */
    check_collision1:function(box1,box2){
    	box1.x = box1.x+box1.width/2;
    	box2.x = box2.x+box2.width/2;
    	if(Math.abs(box1.x-box2.x)<Math.abs(box1.width/2)+box2.width/2){
    		var y = box1.y-box2.y;
    		if(y>-60&&y<0){
    			return true;
    		}
    	}
    	
    },
    gameover:function(){
    	if(GC.start){
    		this.log("游戏结束");
	    	GC.start = false;
	    	console.log(GC.PenguinSprite);
    	}
    },
    again:function(){
    	GC.start = true;
    	cc.director.runScene(cc.TransitionFade.create(1.2, new GamePlayScene));
    },
    nextLevel:function(){
    	console.log("下一关");
    	GC.level++;
    	g_gpl.addMonsters();
    	
    },
    log:function(msg){
    	try{
    		document.querySelector("#test").innerHTML = msg;
    		console.log(msg);
    	}catch(e){
    		document.querySelector("#test").innerHTML = e;
    		console.log(e);
    	}
    }
    
});