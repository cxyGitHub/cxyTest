/**
 * Chipmunk 物理引擎
 */
var FLUID_DENSITY = 0.00014;//流体密度
var FLUID_DRAG = 1.0;//流体阻尼
var Chipmunk = cc.Class.extend({
	space:null,  //物理世界
	scene:null,
	h:0,//地面高度
	ctor:function(scene){
		this.scene = scene;
		this.space = new cp.Space();//创建物理
		this.initPhysics();
		this.checkCollision();
	},
	/**
	 * 初始化物理世界
	 */
	initPhysics : function(){
		var space = this.space;
		var staticBody = space.staticBody;

		//开启物体形状测试
		this.initDebugMode();
		space.gravity = cp.v(0,-100);      //重力
		space.sleepTimeThreshold = 0.5;     //休眠临界时间   。不知道干嘛用的？？？
		space.collisionSlop = 0.5;          //？？？
		// Walls--物理世界的四个边界
		var walls = [ 
		             new cp.SegmentShape( staticBody, cp.v(0,this.h-30), cp.v(GC.w,this.h-30), 30 ),				// bottom
		             new cp.SegmentShape( staticBody, cp.v(0,GC.h-this.h+30), cp.v(GC.w,GC.h-this.h+30), 30),	// top
		              new cp.SegmentShape( staticBody, cp.v(-30,0), cp.v(-30,GC.h*2), 30),				// left
		              new cp.SegmentShape( staticBody, cp.v(GC.w+30,0), cp.v(GC.w+30,GC.h*2), 30)	// right
		];
		for( var i=0; i < walls.length; i++ ) {
			var shape = walls[i];
			shape.setElasticity(0.5);         //弹性
			shape.setFriction(1);           //摩擦
			shape.setCollisionType(i);   
			space.addShape(shape);
			shape.setLayers(1);		
		}
//		walls[0].setCollisionType(1);
//		walls[1].setCollisionType(1);

	},
	/**
	 * 检查碰撞
	 */
	checkCollision:function(){

		this.space.addCollisionHandler( 4, 5,
			function(arbiter, space){
				if(GC.start){
					var shapes = arbiter.getShapes();
					var shapesA = shapes[0]
					shapesA.sprite!=null&&shapesA.sprite.action0();
//					gpl.moveRailing();
				}
				return true;
			},//撞击开始
			function(arbiter, space){
				return true;
			},//撞击中
			function(arbiter, space){
				return true;
			},//撞击结束
			function(arbiter, space){
				setTimeout(function(){
					gpl.moveRailing();
				},100);
				return true;
			}//撞击后分离
		);
		
		this.space.addCollisionHandler( 4, 6,
			function(arbiter, space){
				if(GC.start){
					var shapes = arbiter.getShapes();
					var shapesA = shapes[0]
					shapesA.sprite!=null&&shapesA.sprite.action1(shapes[1]);
				}
			},//撞击开始
			function(arbiter, space){
			},//撞击中
			function(arbiter, space){
			},//撞击结束
			function(arbiter, space){
			}//撞击后分离
		);
		
		this.space.addCollisionHandler( 4, 8,
			function(arbiter, space){
				g_gps.gameover();
//				var shapes = arbiter.getShapes();
//				var shapesA = shapes[0];
//				var shapesB = shapes[1];
//				shapesA.sprite!=null&&shapesA.sprite.action2(shapes[1]);
//				shapesB.sprite.runAction(shapesB.sprite._action);
				return true;
	
			},//撞击开始
			function(arbiter, space){
				return true;
			},//撞击中
			function(arbiter, space){
				return true;
			},//撞击结束
			function(arbiter, space){
				return true;
			}//撞击后分离
		);
		
		this.space.addCollisionHandler( 5, 1,
			function(arbiter, space){
				return true;
			},//撞击开始
			function(arbiter, space){
				var shapes = arbiter.getShapes();
				var shapesA = shapes[0];
				var body = shapesA.getBody();
				var pos = body.getPos();
				pos.y=0;
				return true;
			},//撞击中
			function(arbiter, space){
				return true;
			},//撞击结束
			function(arbiter, space){
				return true;
			}//撞击后分离
		);

		this.space.addCollisionHandler( 5, 5,
				function(arbiter, space){
		},//撞击开始
		function(arbiter, space){
			return true;
		},//撞击中
		function(arbiter, space){
			return true;
		},//撞击结束
		function(arbiter, space){
			return true;
		}//撞击后分离
		);
	},
	/**
	 * 这个必须有，物理世界对刚体的处理 实时刷新物理世界内 钢体的状态。
	 * @param dt
	 */
	update: function (dt) {
		var steps = 3;
		dt /= steps;
		for (var i = 0; i < 3; i++){
			this.space.step(dt);
		}
	},
	/***
	 * 初始化企鹅
	 */
	initBoxWithBody : function(json){
		//物体的定义
		var radius = json.radius;
		var v = cp.v;
		var mass = 0.02;//质量

		var body = new cp.Body(mass, cp.momentForCircle(mass, 0, radius, v(0,0)));//质量为1，内径为1，外径为6 ，重心
		body.setPos(cc.p(json.x,json.y));//初始位置
		this.space.addBody( body );

		var shape = new cp.CircleShape(body, radius, v(0, 0));
		shape.setElasticity(0);
		shape.setFriction(1);
		shape.setCollisionType(4);
		shape.setLayers(3);
		this.space.addShape(shape);
		return shape;
	},
	/***
	 * 初始化障碍物
	 */
	initBoxWithBody1 : function(radius,x,y,CollisionType,elasticity){
		//物体的定义
		var v = cp.v;
		var mass = 0.02;//质量
		var space = this.space;
		var staticBody = space.staticBody;

		var body = new cp.Body(mass, cp.momentForCircle(mass, 0, radius, v(0,0)));//质量为1，内径为1，外径为6 ，重心
		body.setPos(cc.p(x,y));//初始位置
		this.space.addBody( body );

		var shape = new cp.CircleShape(body, radius, v(0, 0));
		elasticity!=null&&shape.setElasticity(elasticity);
		shape.setFriction( 0.3 );
		shape.setCollisionType(CollisionType);
//		shape.setLayers(3);
		
		space.addConstraint(new cp.PivotJoint(body, staticBody, cp.v.add( v(x, y), v(radius/2*0.9, 0))));
		space.addConstraint(new cp.PivotJoint(body, staticBody, cp.v.add( v(x, y), v(-radius/2*0.9, 0))));
		
		this.space.addShape(shape);
		return shape;
	},
	railing:function(width,height,x,y){
		var v = cp.v;
		var space = this.space;
		var mass = 1;
		var boxOffset = v(x, y);
		var staticBody = space.staticBody;
		
		var body = space.addBody(new cp.Body(mass, cp.momentForBox(mass, width, height)));
		body.setPos(cp.v.add(v(0, 0), cp.v.add(boxOffset, cp.v(0, 0))));
//		body.setAngVel(-20);// 向心力?
		body.rotation = 90;
		var shape = space.addShape(new cp.BoxShape(body, width, height));
		shape.setElasticity(0);
		shape.setFriction(1);
		shape.setCollisionType(5);
		shape.setLayers(1);
		return shape;
	},
	getVerts : function(n,r){//n必须大于3 r 大于0
		if(n<3)n=3;
		var verts = [];
		for(var i = n-1 ; i>=0;i--){
			var angle = 360/n;
			angle = angle*i;
			var radian = 2*Math.PI/360*angle;
			var sin = Math.sin(radian);
			var cos = Math.cos(radian);
			verts.push(Math.round(cos*r));
			verts.push(Math.round(sin*r));
		}
		return verts;
	},
	/**
	 * 测试用的物理模型
	 */
	initDebugMode: function () {
		this._debugNode = cc.PhysicsDebugNode.create(this.space);
		this.scene.addChild(this._debugNode);
	},
});
