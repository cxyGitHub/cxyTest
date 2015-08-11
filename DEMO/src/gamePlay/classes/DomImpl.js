var DomImpl = {
		blood:[document.getElementById("blood1"),document.getElementById("blood2")],
		bloodGhost:[document.getElementById("blood_ghost1"),document.getElementById("blood_ghost2")],
		bloodbox:[document.getElementById("bloodbox1"),document.getElementById("bloodbox2")],
		text:document.getElementById("text"),
		top:document.getElementById("top"),
		lastNum:1000,
		color:["#00FF00","#0000FF","#FFCC00","#0000FF"],
		colorNum:0,
		i:0,
		changeBlood:function(bloodVolume){
			if(g_ms._islive=true){
					var int = Math.ceil(bloodVolume/1000);
					var blood = DomImpl.blood[DomImpl.i];
					var bloodGhost = DomImpl.bloodGhost[DomImpl.i];
					var text = DomImpl.text;
					int>0&&(text.innerHTML = "X"+(int-1));
					var res = bloodVolume%1000;
					var num = res/1000;
					num = (num)*100;
					if(num>DomImpl.lastNum){
						DomImpl.blood[DomImpl.i].style.width = "0%";
						DomImpl.bloodGhost[DomImpl.i].style.width = "0%";
						DomImpl.bloodbox[DomImpl.i].style.zIndex = 900;
						DomImpl.blood[DomImpl.i].style.width = "100%";
						DomImpl.bloodGhost[DomImpl.i].style.width = "100%";
						
						DomImpl.blood[DomImpl.i].style.backgroundColor=DomImpl.color[DomImpl.colorNum];
						DomImpl.colorNum++;
						if(DomImpl.colorNum==DomImpl.color.length){
							DomImpl.colorNum = 0;	
						}
						if(int==2){DomImpl.blood[DomImpl.i].style.backgroundColor="#FF0000"}
						if(int==1){DomImpl.blood[DomImpl.i].style.backgroundColor="#000000"}
						DomImpl.i++;
						if(DomImpl.i==2){
							DomImpl.i=0;
						}
						DomImpl.bloodbox[DomImpl.i].style.zIndex = 1000;
						DomImpl.blood[DomImpl.i].style.width = num+"%";
						DomImpl.bloodGhost[DomImpl.i].style.width = num+"%";
						
						
					}else{
						blood.style.width = num+"%";
						bloodGhost.style.width = num+"%";
					}
					DomImpl.lastNum = num;	
			}
		},
		initBlood:function(bloodVolume){
			DomImpl.lastNum = 1000;
			var int = Math.ceil(bloodVolume/1000);
			int>0&&(DomImpl.text.innerHTML = "X"+(int-1));
			DomImpl.i = 0;
			DomImpl.blood[0].style.width = "100%";
			DomImpl.blood[0].style.backgroundColor=DomImpl.color[0];
			DomImpl.bloodbox[0].style.zIndex = 1000;
			
			DomImpl.blood[1].style.width = "100%";
			DomImpl.blood[1].style.backgroundColor="#ffa200";
			DomImpl.bloodbox[1].style.zIndex = 900;
	

		}
};