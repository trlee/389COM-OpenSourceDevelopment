
function timeConvert(){

	//test date
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
	var day = new Date().getDate();
	
	//get input
	var dateselected = document.getElementById("input-time").value;
	var zoneselected = document.getElementById("zone-time").value.toString();

	//test print value
	document.getElementById("output-time").value=document.getElementById("input-time").value;


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