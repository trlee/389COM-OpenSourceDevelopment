var passingDate;
var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour12:true, hour: '2-digit', minute:'2-digit' };
var options2 = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour12:false, hour: '2-digit', minute:'2-digit' };

function timeConvert(){

	//test date
	//var year = new Date().getFullYear();
	//var month = new Date().getMonth();
	//var day = new Date().getDate();
	
	//get input
	var dateselected = document.getElementById("input-time").value;
	var zoneselected = document.getElementById("zone-time").value.toString();
	var selected = document.getElementById("input-date").value;

	//split input value to date format
	var d = new Date(selected.split("-")[0], selected.split("-")[1], selected.split("-")[2], dateselected.split(":")[0], dateselected.split(":")[1], 0, 0);	
	

	//PST
	if (zoneselected == "PST"){
		d.setHours(d.getHours() + 16);
		d.setMonth(d.getMonth() - 1);
	}
	
	//UTC GMT
	if (zoneselected == "UTC"){
		d.setHours(d.getHours() + 8);
		d.setMonth(d.getMonth() - 1);
	}

	//JST KST
	if (zoneselected == "JST"){
		d.setHours(d.getHours() - 1);
		d.setMonth(d.getMonth() - 1);
	}

	//EST
	if (zoneselected == "EST"){
		d.setHours(d.getHours() + 13);
		d.setMonth(d.getMonth() - 1);
	}
	
	passingDate = d;

	//test time format
	d = d.toLocaleString('en-GB',options);	

	//output converted time
	document.getElementById("output-time").innerHTML = d;

}

var toggle = 0;

function timeSwitch(){
	if (toggle%2 ==0){
		document.getElementById("switch-time").innerHTML="12 Hours Mode";

		var mode12 = passingDate;

		mode12 = mode12.toLocaleString('en-GB',options2);	
		document.getElementById("output-time").innerHTML = mode12;

		toggle++;
	}
	else{
		document.getElementById("switch-time").innerHTML="24 Hours Mode";

		var mode24 = passingDate;

		mode24 = mode24.toLocaleString('en-GB',options);	
		document.getElementById("output-time").innerHTML = mode24;

		toggle++;
	}	
}