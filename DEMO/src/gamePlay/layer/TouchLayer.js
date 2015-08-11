var g_tl = null;
var TouchLayer = cc.Layer.extend({
	_rightButton:null,
	_leftButton:null,
	ctor : function(){
		this._super();
		g_tl = this;
		this.init();
	},
	init:function(){
		window.addEventListener('deviceorientation', this.orientationListener, false);
		window.addEventListener('MozOrientation', this.orientationListener, false);
		window.addEventListener('devicemotion', this.orientationListener, false);
		
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,//		事件吞噬
			onTouchBegan: this.onTouchBegan,
			onTouchMoved: null,
			onTouchEnded: null,
			onTouchCancelled : null
		}, this);
	},
	onTouchBegan:function(touch, event){
		g_player.attack();
	},
	orientationListener:function(evt){
		if (GC.start&&evt.gamma!=undefined && evt.beta!=undefined) {
			try{
				evt.gamma = (evt.x * (180 / Math.PI)); //转换成角度值,
				evt.beta = (evt.y * (180 / Math.PI)); //转换成角度值

				var gamma = evt.gamma*3;
				var beta = evt.beta;
				g_player.run(gamma);
					
//				document.querySelector("#test").innerHTML = evt.gamma +"  "+evt.beta;
			}catch(e){
//				document.querySelector("#test").innerHTML += e;
			}
		}
	}
});