// GLOBAL VARS
var blocked;
var popAmount;


// SET URLIST CLEAN OBJ IN CHROME STORAGE
localStorage.setItem('sagiveUrlist', 'example.com');


// SET BADGE TEXT ON LOAD
chrome.browserAction.setBadgeBackgroundColor({color: "black"});
chrome.browserAction.setBadgeText({text: "0"})
localStorage.setItem('popAmount', parseInt(0));


function fixPopAmount() {
	amount	= parseInt( localStorage.getItem('popAmount') );
	amount	= amount + 1;
	localStorage.setItem('popAmount', amount);
	
	return amount;
}


// SPLIT USER URLS LIST INTO OBJ
chrome.storage.sync.get("userList", function (obj) {
	userList = obj['userList'];
	blocked	= userList.split("\n");
});



// CHECK IF JAVASCRIPT ARRAY CONTAINS STRING
// example:  if (x.contains('foo')) {}
Array.prototype.contains = function ( needle ) {
	for (i in this) {
		if ( needle.indexOf(this[i]) != -1) return true;
	}
	return false;
}



// SAVE RECENT URL IN LOCALSTORAGE IN OBJ
var catchNewUrl = function(curl){
	
	var current_time 	= '';
	var current_url 	= curl;
	var current_urlist	= localStorage.getItem('sagiveUrlist')
	
	
	return{
		createMember:function(){
		  // [...]
		},
		getMemberDetails:function(){
		  // [...]
		}
	}
}();
// catchNewUrl.createMember() and 
// catchNewUrl.getMemberDetails() now works.




// LISTEN TO NEW TAB or WINDOW OPEN
chrome.webRequest.onBeforeRequest.addListener(

	function(details) {
			
		console.log(details.url);
		
		// get popup url
		var curl = details.url;
		
		// close popup
		if( blocked.contains(curl) ) {
			
			// close popup tab
			chrome.tabs.remove(details.tabId);
			
			// increased blocked count in textBadge
			curPopAmount = fixPopAmount();
			chrome.browserAction.setBadgeText ( { text: String(curPopAmount) } );
			
			// cancel load and halt (last action)
			return {cancel: true};
		}
		
		
		
	},
	{urls: ["<all_urls>"], types: ["main_frame"]},
	["blocking"]
	
);



	
	
function saveCloseData(){
	console.log('RAN');
}