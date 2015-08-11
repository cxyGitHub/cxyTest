var g_gpl = null;
var GamePlayLayer = cc.Layer.extend({
	_backgroundLayer : null,
	_playerSprite : null,
	_monster:null,
	_json:null,
	_railings:[],
	_action:null,
	_ismove:true,
	_drawNode:null,
	_effects:[],
	_hurtText:[],
	_timeSprite:null,
	_lbScore:null,
	ctor : function(){
		this._super();
		g_gpl = this;
		this._json = GC.levels.level_1;
		this.drawNode();
		this.addCache();
		this.addBackgroundLayer();
		this.addRailings();
		this.addMonsters();
		this.addPlayerSprite();
		this.addEffects();
		this.addHurtTexts();
		this.addTimeSprite();
		this.addScore();
		this.init();
		
	},
	init:function(){
		var fun = cc.callFunc(function () {
			this._ismove = true;
		}, this);
		var move1 = cc.moveBy(0.05, cc.p(2, 0));
		var move2 = cc.moveBy(0.05, cc.p(-4, 0));
		var move3 = cc.moveBy(0.05, cc.p(2, 0));
		
		var move4 = cc.moveBy(0.05, cc.p(0, 2));
		var move5 = cc.moveBy(0.05, cc.p(0, -4));
		var move6 = cc.moveBy(0.05, cc.p(0, 2));
		
		var sequence1 = cc.sequence(move1,move2,move3,fun);
		var sequence2 = cc.sequence(move4,move5,move6);
		this._action = cc.spawn(sequence1);
		
	},
	runMove:function(){
		if(this._ismove){
			this._ismove = false;
			this.stopAllActions();
			this.runAction(this._action);
		}
	},
	addScore:function(){
		this._lbScore = new cc.LabelBMFont("Time: 60", res.basiclb_0_fnt);
		this._lbScore.attr({
			x: 50,
			y: GC.h-40,
			scale:0.5
		});
		this._lbScore.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
		this.addChild(this._lbScore, 1000);
	},
	addTimeSprite:function(){
		var time = new TimeSprite("#time.png");
		time.attr({
			scale:0.3,
			visible:false
		});
		this.addChild(time);
	},
	moveRailing:function(){
		for(var i = 0;i<this._railings.length;i++){
			this._railings[i].moveUp();
		}
	},
	level:function(){
	
	},
	addCache : function(){
		cc.spriteFrameCache.addSpriteFrames(res.hcr_plist);
		cc.spriteFrameCache.addSpriteFrames(res.monsters_plist);
		cc.spriteFrameCache.addSpriteFrames(res.effects_plist);
		cc.spriteFrameCache.addSpriteFrames(res.deathEffects_plist);
	},
	addRailings:function(){//添加栏杆障碍
		var json = this._json.railings;
		for(var i = 0; i<json.length;i++){
			var railing = RailingSprite.create(json[i]);
			this._railings.push(railing);
			this.addChild(railing);
		}
	},
	addMonsters:function(){
		this._monster = MonsterSprite.getMonster();
		this.addChild(this._monster,1000);
	},
	addBackgroundLayer:function(){
		this._backgroundLayer = new cc.Sprite(res.bg_png);
		this._backgroundLayer.attr({
			x: GC.w_2,
			y: GC.h_2
		});
		this.addChild(this._backgroundLayer);
	},
	addPlayerSprite:function(){
		this._playerSprite = PlayerSprite.create();
		this.addChild(this._playerSprite,500);
	},
	addEffects:function(){
		var sprite = EffectsSprite.create();
		this._effects.push(sprite);
		this._effects.push(sprite);
		this._effects.push(sprite);
		this._effects.push(sprite);
		this.addChild(sprite,1500);
	},
	getHurtTexts:function(){
		for(var i = 0 ; i < this._hurtText.length;i++){
			var text = this._hurtText[i];
			if(text.visible==false){
				return text;
			}
		}
		return this._hurtText[0];
	},
	addHurtTexts:function(){
		for(var i = 0 ; i < 10;i++){
			var text = new TextLabelTTF("0", "Arial", 18);
			text.attr({
				x:GC.w_2,
				y: GC.h_2,
				color : cc.color(200, 7, 7)
			});
			text.textAlign = cc.TEXT_ALIGNMENT_CENTER;
			this._hurtText.push(text);
			this.addChild(text,2000);
		}
		
	},
	drawNode:function(){
		this._drawNode = new cc.DrawNode();                 //创建drawnode对象
		this._drawNode.attr({
			opacity:0.1
		});
		this.addChild(this._drawNode, 5000);
/*		var centerPos = cc.p(GC.w_2,GC.h_2);

		//drawSegment --- 绘制直线
		//用法：this._drawNode.drawSegment(from, to, lineWidth, color)
		//参数
		// from:起始点
		// to:终点
		// lineWidth：线条宽度
		// color：线条颜色
		this._drawNode.drawSegment(cc.p(0, 0), cc.p(GC.w,GC.h), 1, cc.color(255, 0, 255, 255));
		this._drawNode.drawSegment(cc.p(0, GC.h), cc.p(GC.w, 0), 5, cc.color(255, 0, 0, 255));

		//drawDot --- 绘制圆点
		//this._drawNode.drawDot(pos, radius, color)
		//this._drawNode.drawDots(points, radius, color)     //画点  points  点数组
		this._drawNode.drawDot(cc.p(GC.w / 2, GC.h / 2), 40, cc.color(0, 0, 255, 128));
		var points = [cc.p(60, 60), cc.p(70, 70), cc.p(60, 70), cc.p(70, 60)];
		this._drawNode.drawDots(points, 4, cc.color(0, 255, 255, 255));

		//drawCircle  --- 绘制圆形
		//this._drawNode.drawCircle(center, radius, angle, segments, drawLineToCenter, lineWidth, color)
		this._drawNode.drawCircle(cc.p(GC.w / 2, GC.h / 2), 100, 0, 10, false, 7, cc.color(0, 255, 0, 255));
		this._drawNode.drawCircle(cc.p(GC.w / 2, GC.h / 2), 50, cc.degreesToRadians(90), 100, true, 2, cc.color(0, 255, 255, 255));

		//this._drawNode poly --- 绘制多边形
		//this._drawNode.drawPoly(verts, fillColor, lineWidth, color)
		//not fill
		var vertices = [cc.p(0, 0), cc.p(50, 50), cc.p(100, 50), cc.p(100, 100), cc.p(50, 100) ];
		this._drawNode.drawPoly(vertices, null, 5, cc.color(255, 255, 0, 255));
		var vertices2 = [cc.p(30, 130), cc.p(30, 230), cc.p(50, 200)];
		this._drawNode.drawPoly(vertices2, null, 2, cc.color(255, 0, 255, 255));
		//fill
		var vertices3 = [cc.p(60, 130), cc.p(60, 230), cc.p(80, 200)];
		this._drawNode.drawPoly(vertices3, cc.color(0, 255, 255, 50), 2, cc.color(255, 0, 255, 255));

		//this._drawNode rect --- 绘制矩形
		//this._drawNode.drawRect(origin, destination, fillColor, lineWidth, lineColor)
		//not fill
		this._drawNode.drawRect(cc.p(120, 120), cc.p(200, 200), null, 2, cc.color(255, 0, 255, 255));
		//fill
		this._drawNode.drawRect(cc.p(120, 220), cc.p(200, 300), cc.color(0, 255, 255, 180), 2, cc.color(128, 128, 0, 255));

		// this._drawNode quad bezier path --- 绘制二次贝塞尔曲线
		// this._drawNode.drawQuadBezier(origin, control, destination, segments, lineWidth, color)
		this._drawNode.drawQuadBezier(cc.p(0, GC.h), cc.p(centerPos.x, centerPos.y), cc.p(GC.w, GC.h), 50, 2, cc.color(255, 0, 255, 255));

		// this._drawNode cubic bezier path --- 绘制三次贝塞尔曲线
		// this._drawNode.drawCubicBezier(origin, control1, control2, destination, segments, lineWidth, color)
		this._drawNode.drawCubicBezier(cc.p(GC.w / 2, GC.h / 2), cc.p(GC.w / 2 + 30, GC.h / 2 + 50),
				cc.p(GC.w / 2 + 60, GC.h / 2 - 50), cc.p(GC.w, GC.h / 2), 100, 2, cc.color(255, 0, 255, 255));

		// this._drawNode cardinal spline --- 绘制曲线
		// drawNode.drawCardinalSpline(config, tension, segments, lineWidth, color)
		var vertices4 = [
		                 cc.p(centerPos.x - 130, centerPos.y - 130),
		                 cc.p(centerPos.x - 130, centerPos.y + 130),
		                 cc.p(centerPos.x + 130, centerPos.y + 130),
		                 cc.p(centerPos.x + 130, centerPos.y - 130),
		                 cc.p(centerPos.x - 130, centerPos.y - 130)
		                 ];
		this._drawNode.drawCardinalSpline(vertices4, 0.5, 100, 2, cc.color(255, 255, 255, 255));
		*/
	}
	
});
