var res = {
    bg_png : "res/bg.png",
    railing: "res/railing.png",
    railing1: "res/railing1.png",
    hcr_plist:"res/hcr.plist",
    hcr_png:"res/hcr.png",
    monsters_plist:"res/monsters.plist",
    monsters_png:"res/monsters.png",
    effects_png:"res/effects.png",
    effects_plist:"res/effects.plist",
    deathEffects_plist:"res/deathEffects.plist",
    deathEffects_png:"res/deathEffects.png",
    basiclb_0_fnt:"res/basiclb_0.fnt",
    basiclb_0_png:"res/basiclb_0.png"
    
    
};
var resJons = {
		levels:"res/levels.json"
}

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}