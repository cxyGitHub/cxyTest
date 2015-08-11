


var GC = GC || {};

GC.winSize = cc.size(320, 480);

GC.h = GC.winSize.height;

GC.w = GC.winSize.width;

GC.w_2 = GC.winSize.width / 2 ;

GC.h_2 = GC.winSize.height / 2;

GC.SOUND_ON = true;

GC.update_balloon_speed = 1/100;

GC.init_balloon_speed = 1/10;

GC.start = true;

GC.debug = false;

/**
 * 加载栏杆
 */
try{
	GC.levels = JSON.parse(cc.loader._loadTxtSync(resJons.levels));
}catch(e){ console.log(e);}

GC.level = 1;
GC.PlayerAction = 1;
GC.PlayerFrame = [
		{runR:[1,2,3,4],runL:[5,6,7,8],attackR:[10,9,11],attackL:[13,12,14]},
		{runR:[15,16,17,18],runL:[27,26,25,24],attackR:[22,20,19,21],attackL:[28,30,23,29]}
]




