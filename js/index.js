var header = $("#header");
var newItem = $("#input");
var typeSelection = $("#type");
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

renderHeader();
renderPercentClock();

//give completed items a "completed" class when clicked on
$("ul.itemContainer").on("click", "li", function(){
	$(this).toggleClass("completed");
});

// Deleting items from the journal when pressing delete button
$("ul").on("click", ".removeBtn", function(event){
	$(this).parent().remove();
	event.stopPropagation();
});

newItem.on("keypress", function(evnt){
		if(newItem.val() !== "" && newItem.val() !== " "){
			if(event.which === 13){
			var type = typeSelection.val();	
			if(type === "task"){
				appendNew($("#tasks"), newItem.val());
			}else
			 if(type === "note"){
				appendNew($("#notes"), newItem.val());
			}else{
				appendNew($("#events"), newItem.val());
			}
			newItem.val("");	
		}
	}
});

// Adding new  items for the journal by clicking "Add" button
$("#addButton").on("click", function(){
	if(newItem.val() !== "" && newItem.val() !== " "){
		var type = typeSelection.val();	
		if(type === "task"){
			appendNew($("#tasks"), newItem.val());
		}else
		 if(type === "note"){
			appendNew($("#notes"), newItem.val());
		}else{
			appendNew($("#events"), newItem.val());
		}
		newItem.val("");
	}
	
});

// A function creating new items in index.html
function appendNew(group, item){
	group.append("<li class='item'>" + item + "<span class='removeBtn'>X</span></li>");
}

function renderClock(){
	var diem = "am";
	var date = new Date();
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();

	if(h > 12){
		h = h -12;
		diem = "pm";
	}
	if(m < 10){
		m = "0" + m;
	}
	if(s < 10){
		s = "0" + s;
	}
	$("#time")[0].textContent = h+":"+m+":"+s+" "; 
	$("#diem")[0].textContent = diem;
	setTimeout(renderClock, 1000);	
}
function renderMilliseconds(){
	var milli = new Date().getMilliseconds();
	$("#milliseconds")[0].textContent = milli;
	setTimeout(renderMilliseconds, 1);
}
function renderHeader(){
	var dateString = new Date();
	var month = dateString.getMonth();
	var date = dateString.getDate();
	var year = dateString.getFullYear();
	var day = dateString.getDay();

	$("#month")[0].textContent = months[month] + " -";
	$("#year")[0].textContent = year;
	$("#day")[0].textContent = days[day];
	$("#date")[0].textContent = date;
	switch(date){
		case 1:
		$("#date")[0].textContent = date+"st";
		break;
		case 2:
		$("#date")[0].textContent = date+"nd";
		break;
		case 3:
		$("#date")[0].textContent = date+"rd";
		break;
		case 21:
		$("#date")[0].textContent = date+"st";
		break;
		case 22:
		$("#date")[0].textContent = date+"nd";
		break;
		case 23:
		$("#date")[0].textContent = date+"rd";
		break;
		case 31:
		$("#date")[0].textContent = date+"st";
		break;
		default:
		$("#date")[0].textContent = date+"th";
	}
	renderClock();
	renderMilliseconds();
}

var minutesGone;
var percent;
function renderPercentClock(){
	var date = new Date();
	minutesGone = date.getHours()*60 + date.getMinutes();
	// percent = 100*(minutesGone/1440).toPrecision(5);
	percent = (100*minutesGone/1440).toFixed(2);
	// console.log(percent);
	$("#percentClock #fixedPercent")[0].textContent = (100-percent).toFixed() + ".";
	$("#percentClock #floatPercent")[0].textContent = (Math.abs(((100-percent) - (100-percent).toFixed()))*100).toFixed() + "%";
	setTimeout(renderPercentClock, 8640);
}