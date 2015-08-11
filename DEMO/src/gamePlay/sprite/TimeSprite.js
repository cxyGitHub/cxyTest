var g_ts = null;
var TimeSprite = cc.Sprite.extend({
	_time:10,
	ctor : function(aTexture){
		g_ts = this;
		this._super(aTexture);
		this.initAction();
	},
	initAction:function(){
		var biggerEase1 = cc.ScaleTo.create(0.5,0.25,0.3);
		var biggerEase2 = cc.ScaleTo.create(0.5,0.3,0.25);
		var seqAction = cc.sequence(biggerEase1,biggerEase2);
		
		seqAction.repeatForever();
		this.runAction(seqAction);
	},
	getTimeSprite:function(){
		if(Math.random()>0.5&&!this.y>=GC.h){
			this.visible = true;
			return this;
		}
	},
	moveUp:function(y){
		this.y = y+18;
	},
	check_collision:function(){
		if(g_gps.check_collision(g_player,g_ts)){//碰到时间
			g_level.addTime(this._time);
			this.visible = false;
		}
	}
	
});