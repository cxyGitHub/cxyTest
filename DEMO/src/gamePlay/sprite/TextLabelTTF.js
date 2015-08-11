var g_text = null;
var TextLabelTTF = cc.LabelTTF.extend({
	_action:null,
	visible:false,
	ctor : function(text, fontName, fontSize){
		this._super(text, fontName, fontSize);
		g_text = this;
		this.initAction();
	},
	initAction:function(){
		var opacityAnim = cc.fadeIn(0.2, 255);//透明效果没用 。。不知为何。。。。
		var easeMove = cc.moveBy(0.5, cc.p(0, 50)).easing(cc.easeSineOut());
		var bigger = cc.scaleTo(0.2, 1);
		var over = cc.callFunc(function () {
			this.visible = false;
			this.setColor(cc.color(200, 7, 7));
		}, this);
		var action = cc.spawn(easeMove, bigger,opacityAnim);
		this._action = cc.sequence(action, over);
	},
	show:function(hurt){
		this.stopAllActions();
		this.attr({
			visible:true,
			scale:0.3,
			x:(g_ms.x-50)+Math.random()*100,
			y:g_ms.y+Math.random()*50
		});
		if(hurt>=g_player._power*2){
			this.setColor(cc.color(255, 156, 1));
			this.setString("暴击  "+parseInt(hurt));
		}else{
			this.setString(parseInt(hurt));
		}
		this.rotation =g_ms.x>this.x ? (-10+Math.random()*10):(10+Math.random()*10);
		this.runAction(this._action);
	}
});
