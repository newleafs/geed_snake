function Map(parentBox,allTds){
	this.allTds = allTds;
	this.parentBox = parentBox;
}
Map.prototype = {
	trNum:14,
	tdNum:20,
	init:function(){
		var tr = [];
		for (var i = 0;i<this.trNum;i++){
			this.parentBox.appendChild(this.createTr());
			tr[i] = this.parentBox.getElementsByTagName('tr')[i];
			var trs = new Array();
			for(var j = 0;j<this.tdNum;j++){
				var td = this.createTd();
				td.id = i*this.tdNum+j;
				tr[i].appendChild(td);
				trs[j] = td;
			}
			this.allTds[i] = trs;
		}
	},
	createTr:function(){
		var tr = document.createElement('tr');
		return tr;
	},
	createTd:function(index){
		var td = document.createElement('td');
		return td;
	}
}