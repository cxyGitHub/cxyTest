
var g_ms = null;
var MonsterSprite = cc.Sprite.extend({
	_action:null,
	_deathAction:null,
	_bloodVolume:3000,
	_blood:2000,
	_islive:true,
	_actionInstance:null,
	_pic:null,
    ctor : function(aTexture){
        this._super(aTexture);
        this._pic = aTexture;
        g_ms = this;
        
    },
    moveAction:function(){
    	var y = Math.random()*70;
    	y = y>20?y:20;
    	var x = Math.random()*100;
    	x = x>50?x:50;
    	var speed1 = Math.random();
    	speed1 = speed1<0.3?0.3:speed1;
    	var upMove = cc.moveBy(speed1, cc.p(0, -y)).easing(cc.easeSineOut());
    	var downMove = cc.moveBy(speed1, cc.p(0, y)).easing(cc.easeSineOut());
    	var leftMove = cc.moveBy(speed1, cc.p(-x, 0)).easing(cc.easeSineOut());
    	var conterMove = cc.moveBy(speed1, cc.p(-x,  0)).easing(cc.easeSineOut());
    	var rightMove = cc.moveBy(2*speed1, cc.p(2*x, 0)).easing(cc.easeSineOut());
    	var seqAction = cc.sequence(upMove,downMove,leftMove,rightMove,conterMove);
    	seqAction.repeatForever();
    	this.runAction(seqAction);
    },
    initAction:function(monsterPng){
    	var frames = [];
    	for(var i = 0 ; i < monsterPng.length ;i++){
    		frames.push(cc.spriteFrameCache.getSpriteFrame(monsterPng[i]));
    	}
    	var animation = new cc.Animation();
    	for(var i = 0 ; i < frames.length ;i++){
    		animation.addSpriteFrame(frames[i]);
    	}
    	animation.setDelayPerUnit(0.1);
    	animation.setRestoreOriginalFrame(true);
    	this._action = cc.animate(animation);
    },
    deathAction:function(monsterPng){
    	var frames = [];
    	for(var i = 0 ; i < monsterPng.length ;i++){
    		frames.push(cc.spriteFrameCache.getSpriteFrame(monsterPng[i]));
    	}
    	var animation = new cc.Animation();
    	for(var i = 0 ; i < frames.length ;i++){
    		animation.addSpriteFrame(frames[i]);
    	}
    	animation.setDelayPerUnit(0.1);
    	animation.setRestoreOriginalFrame(true);
    	var animate = cc.animate(animation);
    	var attackStart = cc.callFunc(function () {
    		this.visible=true;
    		this.scale = 1;
    	}, this);
    	var attackOver = cc.callFunc(function () {
    		this.visible=false;
    		g_gps.nextLevel();
    	}, this);
    	this._deathAction = cc.sequence(attackStart,animate, attackOver);
    },
    hurt:function(hurt){
    	this._blood = this._blood-hurt<0?0:this._blood-hurt;
    	DomImpl.changeBlood(this._blood);
    	if(this._blood>0){
    		this.stopAction(this._actionInstance);
    		this._actionInstance = this.runAction(this._action);
	    	var effects = g_gpl._effects[GC.level-1];
	    	if(g_player._direction==1){
	    		effects.show({
	    			scale:1.2,
	    			x:g_ms.x+40,
	    			y:g_player.y+40
	    		});
	    	}else{
	    		effects.show({
	    			scale:-1.2,
	    			x:g_ms.x-40,
	    			y:g_player.y+40
	    		});
	    	}
    	}else{
    		if(this._islive){
	    		console.log("死亡");
	    		this._islive = false;
	    		this.visible = false;
	    		setTimeout(function(){
	    			g_ms.runAction(g_ms._deathAction);
	    		},100);
	    		
    		}
    	}
    },
    update:function(){
    	this._blood>=0&&this.bloodColumn();
    },
    bloodColumn :function(){
    	g_gpl._drawNode.clear();
    	var ratio = this._blood/this._bloodVolume;
    	
    	g_gpl._drawNode.drawRect(cc.p(this.x-30*ratio,this.y+50 )
    			, cc.p(this.x+30*ratio, this.y+50), cc.color(200, 7, 7, 100), 4, cc.color(200, 7, 7, 255));
    },
    getBoundingBox:function(){
    	return  cc.rect(this.x-this._getWidth()/2-5, this.y+this._getHeight()/2+15,this._getWidth()+10,this._getHeight()+30);
    },
    showBox:function(drawNode){
    	var rect = this.getBoundingBox();
    	drawNode.drawRect(cc.p(rect.x,rect.y )
    			, cc.p(rect.x+rect.width, rect.y-rect.height), cc.color(255, 0, 255, 100), 1, cc.color(255, 0, 255, 255));
    }
    
});

MonsterSprite.getMonster = function(){
	var i = GC.level;
	var sprite = new MonsterSprite("#monster"+GC.level+"_1.png");
		sprite.attr({
			scale:0.5,
			x:GC.w_2,
			y:GC.h_2,
			visible:true
		});
		sprite._bloodVolume *= GC.level;
		sprite._blood = sprite._bloodVolume;
		sprite._islive = true;
//		sprite.bloodColumn();
		sprite.initAction(["monster"+GC.level+"_2.png","monster"+GC.level+"_1.png"]);
		sprite.deathAction(["m"+GC.level+"_death_1.png"
		                    ,"m"+GC.level+"_death_2.png"
		                    ,"m_death_3.png"
		                    ,"m_death_4.png"
		                    ,"m_death_5.png"]);
		sprite.moveAction();
		DomImpl.initBlood(sprite._bloodVolume);
	return sprite;
}
