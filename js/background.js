// GLOBAL VARS
var blocked;
var popAmount;


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


// LISTEN TO NEW TAB or WINDOW OPEN
chrome.webRequest.onBeforeRequest.addListener(

	function(details) {
			
		console.log(details.url);
		
		// get popup url
		var curl = details.url;
		
		// close popup
		if( blocked.contains(curl) ) {
			chrome.tabs.remove(details.tabId);
			curPopAmount = fixPopAmount();
			console.log('popAmount: '+ curPopAmount);
			chrome.browserAction.setBadgeText ( { text: String(curPopAmount) } );		// set badge number with every blocked popup
			
			return {cancel: true};
		}
		
		
		
	},
	{urls: ["<all_urls>"], types: ["main_frame"]},
	["blocking"]
	
);



	
	
function saveCloseData(){
	console.log('RAN');
}