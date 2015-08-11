var g_es = null;
var EffectsSprite = cc.Sprite.extend({
	_action:null,
	_frames:[],
	_speed:0.05,
	ctor : function(aTexture){
		g_es = this;
		this._super(aTexture);
		this.initFrame();
		this.initAction();
	},
	initFrame:function(){
		this._frames.push(cc.spriteFrameCache.getSpriteFrame("x1.png"));
		this._frames.push(cc.spriteFrameCache.getSpriteFrame("x2.png"));
		this._frames.push(cc.spriteFrameCache.getSpriteFrame("x3.png"));
		this._frames.push(cc.spriteFrameCache.getSpriteFrame("x4.png"));
		this._frames.push(cc.spriteFrameCache.getSpriteFrame("x5.png"));
		this._frames.push(cc.spriteFrameCache.getSpriteFrame("x6.png"));
		this._frames.push(cc.spriteFrameCache.getSpriteFrame("x7.png"));
		this._frames.push(cc.spriteFrameCache.getSpriteFrame("x8.png"));
		this._frames.push(cc.spriteFrameCache.getSpriteFrame("x9.png"));
		this._frames.push(cc.spriteFrameCache.getSpriteFrame("x10.png"));
	},
	initAction:function(){
		var animation1 = new cc.Animation();
		animation1.addSpriteFrame(this._frames[0]);
		animation1.addSpriteFrame(this._frames[1]);
		animation1.addSpriteFrame(this._frames[2]);
		animation1.addSpriteFrame(this._frames[3]);
		animation1.addSpriteFrame(this._frames[4]);
		animation1.addSpriteFrame(this._frames[5]);
		animation1.addSpriteFrame(this._frames[6]);
		animation1.addSpriteFrame(this._frames[7]);
		animation1.addSpriteFrame(this._frames[8]);
		animation1.addSpriteFrame(this._frames[9]);
		animation1.setDelayPerUnit(this._speed);
		animation1.setRestoreOriginalFrame(true);
		var attack = cc.animate(animation1);
		
		var attackOver = cc.callFunc(function () {
			this.visible=false;
		}, this);
		var attackStart = cc.callFunc(function () {
			this.visible=true;
		}, this);
		
		this._action = cc.sequence(attackStart,attack, attackOver);
	},
	show:function(json){
		this.attr(json);
		this.stopAllActions();
		this.runAction(this._action);
	}
});

EffectsSprite.create = function(){
	var sprite = new EffectsSprite("#x10.png");
	sprite.attr({
		scale:1.2,
		visible:false
	});
	return sprite;
}