window.onload = function(){
	//定义选择器
	function quer(value){
		return document.querySelector(value);
	}
	function querAll(value){
		return document.querySelectorAll(value);
	}

	var switc = quer(".switch");
	var sett = quer(".sett");
	var ret_but = quer(".sett button");
	var container = quer('.container');
	var flag_switch = true;
	//设置开关按钮
	switc.onclick = function(){
		sett.style.display = "block";
		flag_switch = false;
		cancelAnimationFrame(reques);
	}
	ret_but.onclick = function(){
		sett.style.display = "none";
		var font_size = quer('.fontNub').value;
		console.log(font_size);
		quer(".star_num").style.fontSize = font_size + 'px';
		quer(".time").style.fontSize = font_size + 'px';
		flag_switch = true;
		reques = requestAnimationFrame(run);
	}



	var start_but = quer('.start_but button');
	var player = quer('#player');
	var start = quer('.start');
	var player_back = quer(".player");
	//开始进入游戏
	start_but.onclick = function(){
		start.style.display = 'none';
		player.style.display = 'block';
		quer('.player_box').style.display = 'block';
		run();
		time_fun();
	}


	//飞机的方向
	var timer = null;
	var iCode = {}; 
	document.onkeydown = function(ev){
        var ev = ev || window.event;
        iCode[ev.keyCode]= true;//获取键值。
        // console.log(iCode);//利用JSON存储
    }
	document.onkeyup = function(ev){
        var ev = ev || window.event;
        iCode[ev.keyCode] = false;
	}

	timer = setInterval(function(){

		if(iCode[37]){//左键
				player.style.left = player.offsetLeft - 5 + 'px'; 
				player.style.backgroundImage = "url(images/left.png)";
		}if(iCode[38]){ //上键
				player.style.top = player.offsetTop - 5 + 'px';
		}if(iCode[39]){//右键
				player.style.left = player.offsetLeft + 5 + 'px'; 
				player.style.backgroundImage = "url(images/right.png)";
		}if(iCode[40]){ //下键
				player.style.top = player.offsetTop+ 5 + 'px'; 
		}

		if(player.offsetLeft < 0){
				player.style.left = 0;
		}else if(player.offsetLeft > 924){
				player.style.left = 924 + 'px';
		}else if(player.offsetTop < 0){
				player.style.top = 0;
		}else if(player.offsetTop > 720){
				player.style.top = 720 + 'px';
		}
	   
	},20);
	




	

	var move_set;
	//创建星星

	var reques;
	var rota = 5;
	// 碰撞检测
	var star_nub = 0;
	function hitTestObject(item,hitObj,Arri){
	    if(item == null || hitObj == null){
	        return;
	    }
	    /*检测碰撞元素上下左右的位置*/
	    var itemTop = item.offsetTop,
	        itemFoot = item.offsetTop + item.offsetHeight,
	        itemLeft = item.offsetLeft,
	        itemRight = item.offsetLeft + item.offsetWidth;
	    /*被碰撞元素的上下左右的位置*/
	    var hitTop = hitObj.offsetTop,
	        hitFoot = hitObj.offsetTop + hitObj.offsetHeight,
	        hitLeft = hitObj.offsetLeft,
	        hitRight = hitObj.offsetLeft + hitObj.offsetWidth;
	    if(itemFoot > hitTop && itemRight > hitLeft && itemTop < hitFoot && itemLeft < hitRight){
	    	if(item.className == 'fuel'){
				rota += 10;
				if(rota >= 5){
					rota = 6;
				}
				container.removeChild(item);
				if(flag){
					quer(".star_audio").play();
				}
	    	}else if(item.className == 'bird'){
				if(flag){
					quer(".hit").play();
				}
				cancelAnimationFrame(reques);
				alert('game over!');
				flag_switch = false;
				clearInterval(timer);
				for(let i = 0;i<arr.length;i++){
					clearInterval(arr[i]);
				}
				quer(".bg_audio").pause();
				
				if(flag == false){
					quer('.finish').pause();
				}else{
					quer('.finish').play();
				}


				

				quer('.end').style.transform = "scale(1)";
				quer('.player_box').style.display = "none";
				quer('.end_star').innerHTML = "star : " + star_nub;
				quer('.end_time').innerHTML = time_inne.innerHTML;

			}else{
				star_nub++;
				quer('.star_num').innerHTML = 'star : '+ star_nub;
				clearInterval(Arri);
				container.removeChild(item);
				if(flag){
					quer(".star_audio").play();
				}
			}
	        
	    }
	}



	var arr = [];
	var starArr = [];
	var classArr = [];
	//移动
    function creat_move(num,j,type){
		classArr[num] = document.querySelector("#"+type.className+num);
        arr[num] = setInterval(function(){
			if(flag_switch){
				j++;
			}else{
				j+=0;
			}
            
			classArr[num].style.top = j + "px";
			hitTestObject(classArr[num],player,arr[num])
            if(classArr[num].offsetTop > 768 && classArr[num] != undefined){
                container.removeChild(classArr[num]);
                clearInterval(arr[num])
            }
        },10)
    }
	
	function bird_move(num,type){
		var mov = 1024;
		classArr[num] = document.querySelector("#"+type.className+num);
		arr[num] = setInterval(function(){
			if(flag_switch){
				mov--;
			}else{
				mov-=0;
			}
			
			classArr[num].style.left = mov + 'px';
			hitTestObject(classArr[num],player,arr[num]);
			if(classArr[num] != undefined && classArr[num].offsetLeft < -80){
				container.removeChild(classArr[num]);
			}
		},5)
	}



	var pointer = quer('.pointer');
	var run_time = 0;
	var crea = 0;
    var reques;
	function run(){
		run_time++;
		if(run_time % 60 == 0){

			crea++;
            var nub = Math.floor(Math.random()*924);
            var star = document.createElement("div");
            star.style.left = nub + "px";
            star.id = "star"+crea;
            star.className = "star";
			container.appendChild(star);
			creat_move(crea,j=0,star);

			
			rota--;
			pointer.style.cssText = "transform:rotate("+rota*18+"deg);transition:.3s linear;"
		}
		if(run_time % 300 == 0){
			crea++;
            var nub = Math.floor(Math.random()*924);
            var fuel = document.createElement("div");
            fuel.style.left = nub + "px";
            fuel.id = "fuel"+crea;
            fuel.className = "fuel";
			container.appendChild(fuel);
			creat_move(crea,j=0,fuel);
		}

		if(run_time % 500 == 0){
			crea++;
			var nub = Math.floor(Math.random()*500)+100;
				var bird = document.createElement("div");
				bird.style.top = nub + "px";
				bird.id = "bird"+crea;
				bird.className = "bird";
				container.appendChild(bird);
				bird_move(crea,bird);
		}
		
		reques = requestAnimationFrame(run);
		if(rota < -5){
			rota = -4;
			alert('Time out!');
			
			clearInterval(timer);
			for(let i = 0;i<arr.length;i++){
				clearInterval(arr[i]);
			}
			quer(".bg_audio").pause();
			
			flag_switch = false;
			if(flag == false){
				quer('.finish').pause();
			}else{
				quer('.finish').play();
			}
			quer('.end').style.transform = "scale(1)";
			quer('.player_box').style.display = "none";
			quer('.end_star').innerHTML = "star : " + star_nub;
			quer('.end_time').innerHTML = time_inne.innerHTML;
			
			cancelAnimationFrame(reques);
		}
	}
	


	//声音按钮
	var flag = true;
	var sub_switch = quer(".sub_")
	sub_switch.onclick = function(){
		if(flag == true){
			flag = false;
			sub_switch.value = "off";
			sub_switch.style.background = "red";
			quer(".bg_audio").pause();
		}else if(flag == false){
			flag = true;
			sub_switch.value = "on";
			sub_switch.style.background = "green";
			quer(".bg_audio").play();
		}
	}


	// 计时器
	var time_inne = quer('.set_time');
	function time_fun(){
		var sec = 0;
		setInterval(function(){
			sec++;
			var time = new Date(0,0);
			time.setSeconds(sec);
			var m = time.getMinutes(),
				s = time.getSeconds();
			time_inne.innerHTML =  time_char(m) +":"+time_char(s)
		},1000)
	}
	function time_char(n){
		return n >= 10 ? n : "0" + n;
	}

	var key_user = quer('#user')
	var flag_but = false;
	quer("#sub_user").style.cssText = "cursor:not-allowed;opacity:.7;";
	key_user.onkeyup = function(){
		if(key_user.value == ""){
			flag_but = false;
			quer("#sub_user").style.cssText = "cursor:not-allowed;opacity:.7;";
		}else{
			flag_but = true;
			quer("#sub_user").style.cssText = "cursor:allowed;opacity:1;";
		}
	}

	//ajax
	$("#sub_user").click(function(){

		if(flag_but){
			let user = $("#user").val();
			let star_num = star_nub;
			let time  = quer('.end_time').innerHTML;
			$.ajax({
				url:"php/sky.php",
				type:"POST",
				dataType:"json",
				data:{
					"user":user,
					"star":star_num,
					"time":time
				},
				success:function(data){
					var dataObj = data;
					var td = "";
					let i = 0;
					$.each(dataObj,function(index,item){
						i++;
						td += "<tr>";
						td += "<td>"+i+"</td>";
						td += "<td>"+item.user+"</td>";
						td += "<td>"+item.star+"</td>";
						td += "<td>"+item.time+"</td>";
						td += "</tr>";
					});
					$("#tbody").html(td);
				}
			})
			$('.list').css({
				'display':'block'
			})
			$('.end').css({
				'display':'none'
			})
		}

		//Restart
		
		

	})


	$('.restart').click(function(){
		window.location.href = 'index.html';
	})



}