/**
 * 成绩
 */
var g_level = null;
var Level = cc.Class.extend({
	_time:60,
	_timeMax:60,
	ctor:function(){
		g_level=this;
	},
	subTime:function(){
		g_level._time--;
		if(g_level._time<0){
			g_level.gameover();
			return ;
		}
		g_gpl._lbScore.setString("Time:"+g_level._time);
	},
	gameover:function(){
		console.log("gameover");
		g_gps.gameover();

	},
	addTime:function(time){
		this._time+=time;
		this._time = this._time>this._timeMax?this._timeMax:this._time;
		g_gps.log(this._time);
	}


});