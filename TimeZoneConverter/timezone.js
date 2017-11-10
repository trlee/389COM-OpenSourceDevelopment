
function timeConvert(){

	//test date
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
	var day = new Date().getDate();
	
	//get input
	var dateselected = document.getElementById("input-time").value;
	var zoneselected = document.getElementById("zone-time").value.toString();
	var selected = document.getElementById("input-date").value;

	var d = new Date(year, month, day, 0, 0, 0, 0);	

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
	
	//output converted time
	document.getElementById("output-time").innerHTML = d;

}

var toggle = 0;

function timeSwitch(){
	if (toggle%2 ==0){
		document.getElementById("switch-time").innerHTML="12 Hours Mode";
		toggle++;
	}
	else{
		document.getElementById("switch-time").innerHTML="24 Hours Mode";
		toggle++;
	}	
}