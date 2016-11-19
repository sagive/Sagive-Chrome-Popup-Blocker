// Saves options to chrome.storage
function save_options() {
	
	var onlineList	= document.getElementById('onlineList').checked;
	var userList	= document.getElementById('userList').value;
	
	chrome.storage.sync.set({
		onlineList: onlineList,
		userList: userList
	}, function() {
		// Update status to let user know options were saved.
		var status 			= document.getElementById('status');
		status.textContent	= 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	// Use default value color = 'red' and likesColor = true.
	chrome.storage.sync.get({
		onlineList: 'checked',
		userList: ''
	}, function(items) {
		document.getElementById('onlineList').checked = items.onlineList;
		document.getElementById('userList').value = items.userList;
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);


function getAddonVersion() { 
    var version = 'NaN'; 
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', chrome.extension.getURL('manifest.json'), false); 
    xhr.send(null); 
    var manifest = JSON.parse(xhr.responseText); 

	document.getElementById("addonVer").textContent = manifest.version;

} 
getAddonVersion();

	jQuery(document).ready(function($) {
		
		// SHOW STUFF ON CLICK
		$('.clicktoggle').click(function() {
			var showthis = '#' + $(this).data('show'); 
			console.log('showthis: '+ showthis);
			$(showthis).slideToggle('fast');
		});	
		
		

	});	
	
