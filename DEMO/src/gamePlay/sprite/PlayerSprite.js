/**
 * 
 */
var g_player = null;
var PlayerSprite = cc.Sprite.extend({
	_down:true,
	_frames:[],
	_actionL:null,
	_actionR:null,
	_attackR:null,
	_attackL:null,
	_attackOn:false,
	_direction:1,
	_speed:0.08,
	_runSpeed:4,
	_power:95,//攻击伤害
	_crit : 0.1,//暴击率
	_runAction:false,
	_run:true,
    ctor : function(aTexture){
    	g_player = this;
        this._super(aTexture);
        this.schedule(this.moveDown, 0.01);
        this.initFrame();
        this.initAction();
    },
    initFrame:function(){
    	for(var i = 1 ; i <= 30;i++){
    		this._frames.push(cc.spriteFrameCache.getSpriteFrame("hcr"+i+".png"));
    	}
    },
    initAction:function(){
    	var levelFrame = GC.PlayerFrame[GC.PlayerAction];
    	var animation1 = new cc.Animation();
    	for(var i = 0 ; i < levelFrame.runR.length ; i++){
    		animation1.addSpriteFrame(this._frames[levelFrame.runR[i]-1]);
    	}
    	animation1.setDelayPerUnit(this._speed);
    	animation1.setRestoreOriginalFrame(true);
    	this._actionR = cc.animate(animation1);
    	this._actionR.repeatForever();
    	
    	var animation2 = new cc.Animation();
    	for(var i = 0 ; i < levelFrame.runL.length ; i++){
    		animation2.addSpriteFrame(this._frames[levelFrame.runL[i]-1]);
    	}
    	animation2.setDelayPerUnit(this._speed);
    	animation2.setRestoreOriginalFrame(true);
    	this._actionL = cc.animate(animation2);
    	this._actionL.repeatForever();
    	
    	
    	var attackOver = cc.callFunc(function () {
    		this._run = true;
    		this._attackOn = false;
    		if(this._direction==1){
    			this.runAction(this._actionR);
    		}else{
    			this.runAction(this._actionL);
    		}
    	}, this);
    	var animation3 = new cc.Animation();
    	for(var i = 0 ; i < levelFrame.attackR.length ; i++){
    		animation3.addSpriteFrame(this._frames[levelFrame.attackR[i]-1]);
    	}
    	animation3.setDelayPerUnit(0.05);
    	animation3.setRestoreOriginalFrame(true);
    	var attackR = cc.animate(animation3);
    	this._attackR = cc.sequence(attackR, attackOver);
    	
    	var animation4 = new cc.Animation();
    	for(var i = 0 ; i < levelFrame.attackL.length ; i++){
    		animation4.addSpriteFrame(this._frames[levelFrame.attackL[i]-1]);
    	}
    	animation4.setDelayPerUnit(0.05);
    	animation4.setRestoreOriginalFrame(true);
    	var actionL = cc.animate(animation4);
    	this._attackL = cc.sequence(actionL, attackOver);
    
    	
    	
    	this.runAction(this._actionL);
    	this._direction = 0;
    },
    attack:function(){
    	if(!this._down&&!this._attackOn){
    		this._run = false;
    		g_gpl.runMove();
    		this.stopAllActions();
    		var boxingBox = null;
    		this._attackOn = true;
    		if(this._direction==1){
    			this.runAction(this._attackR);
    			boxingBox = this.getBoxingBox();
    		}else{
    			this.runAction(this._attackL);
    			boxingBox = this.getBoxingBox();
    		}
    		/***
    		g_gpl._drawNode.clear(); 
    		this.showBox(g_gpl._drawNode);
    		g_ms.showBox(g_gpl._drawNode);
    		/***/
    		if(g_gps.check_collision1(boxingBox,g_ms.getBoundingBox())){
    			var hurt = this._power;
    			Math.random()<this._crit&&(hurt = hurt*2);
    			hurt = hurt+Math.random()*20;
    			g_ms.hurt(hurt);
    			var text = g_gpl.getHurtTexts();
    			text.show(hurt);
    		}
    	}
    },
    run:function(gamma){
    	if(this._run){
	    	var speed = this._runSpeed;
	    	if(this._down){//自由下落
	    		speed = this._runSpeed/2;
	    		this.stopAllActions();
	    		this._runAction = true;
	    	}else{
	    		speed=this._runSpeed;
	    		if(this._runAction){
		    		this._runAction = false;
		    		if(this._direction==1){
		    			this.runAction(this._actionR);
		    		}else{
		    			this.runAction(this._actionL);
		    		}
	    		}
	    		g_ts.check_collision();//检查是否碰到时间
	    	}
	    	if(gamma>0){
	    		this.x +=speed;
	    		if(this._direction != 1){
	    			this.stopAllActions();
	    			this.runAction(this._actionR);
	    			this._direction = 1;
	    		}
	    	}else{
	    		this.x -=speed;
	    		if(this._direction != 0){
	    			this.stopAllActions();
	    			this.runAction(this._actionL);
	    			this._direction = 0;
	    		}
	    	}
	    	if(this.x <0){
	    		this.x = GC.w;
	    	}else if(this.x>GC.w){
	    		this.x = 0;
	    	}		
    	}
    	
    },
    getBoxingBox:function(){
    	if(this._direction == 1)
    		return cc.rect(this.x-10, this.y+50, 35,5);
    	else
    		return cc.rect(this.x+10, this.y+50, -35,5);
    },
    getBoundingBox1:function(){
    	return cc.rect(this.x, this.y, 5,1);
    },
    moveDown:function(){
    	for(var i = 0 ;i<g_gpl._railings.length;i++){
    		if(g_gps.check_collision2(this.getBoundingBox1(),g_gpl._railings[i].getBoundingBox())){
    			g_player._down = false;
    			this.y = g_gpl._railings[i].y;
    			return ;
    		}else{
    			g_player._down = true;
    		}
    	}
    	
    	if(this._down){
	    	if(this.y>0){
	    		this.y-=5;
	    	}else{
	    		this.y=GC.h-50
	    	}
    	}
    },
    showBox:function(drawNode){
    	var rect = this.getBoxingBox();
    	drawNode.drawRect(cc.p(rect.x,rect.y )
    			, cc.p(rect.x+rect.width, rect.y-rect.height), cc.color(255, 0, 255, 100), 1, cc.color(255, 0, 255, 255));
    }

});

PlayerSprite.create = function(){
	var sprite = new PlayerSprite("#hcr1.png");
	sprite.attr({
		scale:0.3,
		x:GC.w_2+50,
		y:GC.h-100,
		anchorY:0
	});
	return sprite;
}