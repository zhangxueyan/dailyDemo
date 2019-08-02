var oCHCK1 = function() {
	var chphone1= false;
	var oCheck1 = document.getElementById('ocheck1'); //父级IDIdName  oChxm
	function getByClass(o, s){ //获取Class;
		var aEle = document.getElementsByTagName('*');
		var arr = [];
		for(var i = 0; i < aEle.length; i++) {
			if(aEle[i].className == s) {
				arr.push(aEle[i])
			}
		}
		return arr;
	}



	// 手机校验
	function oChphone1() {
		var oChphone1 = getByClass(oCheck1, 'new_checkphone')[0];
		var reQQ = /^1[34578]\d{9}$/;
		oChphone1.onkeyup = function() {
			if(this.value.length > 11) {
				this.value = this.value.substr(0, 11)
			}
			if(reQQ.test(this.value)) {
				this.style.borderBottom = '1px solid green';
				chphone1 = true;
				return;
			} else {
				this.style.borderBottom = '1px solid red';
				chphone1 = false;
				return;
			}
		}
	}
	oChphone1();



    // 提交按钮点击后的校验
	function oCheckSbumit2() {
		var chckevalue1 = false;
		if(chphone1 == true) {
			chckevalue1 = true;
		} else {
			alert('请输入正确的手机号');
			return false;
		}
		if(chckevalue1 == true) {
			alert('预约成功');
			//var name = document.getElementById("ceshixingming1").value.trim();
			var phone = document.getElementById("new_checkname").value.trim();
			var api = $53.createApi();
			api.push('cmd', 'lword');
			//if(name != "姓名：") api.push('name', name);
			if(phone != "电话：") api.push('phone', phone);
			api.push('msg', "留言");
			api.query();
		}

	}
	
	var oCheckSbumit1 = getByClass(window,'new_checkbtn')[0];
	oCheckSbumit1.onclick = function() {
		oCheckSbumit2();
	};
};
oCHCK1();