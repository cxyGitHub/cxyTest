
var RailingSprite = cc.Sprite.extend({
	_speed:2,
	_tool:null,
	ctor : function(aTexture){
        this._super(aTexture);
    },
    moveUp:function(){
		if(this.y>GC.h){
			this.y=0;
			this.x = Math.random()>0.5?GC.w_2+Math.random()*150:GC.w_2-Math.random()*150;
			if(this._tool==null){
				this._tool = g_ts.getTimeSprite();
				if(this._tool!=null){
					var r = Math.random();
					this._tool.x = r>0.5?this.x+r*50:this.x-r*50;
					this._tool.y = this.y+20;
				}
			}else{
				this._tool.visible = false;
				this._tool=null;
			}
		}else{
			this.y+=this._speed;
			if(this._tool!=null)this._tool.moveUp(this.y);
		}
    },
    setMonster:function(){
    	
    }
});
RailingSprite.create = function(json){
	var sprite = null;
		sprite = new RailingSprite(res.railing);
		sprite.attr({
			scaleX:150/sprite.width+0.05,
			y:json.y,
			x:json.x
		});
	return sprite;
}