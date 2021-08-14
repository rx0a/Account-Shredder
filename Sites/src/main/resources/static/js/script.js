window.addEventListener('load', function(e) {
	console.log('script.js loaded');
	init();
});
// Event listeners
function init() {
	let input = document.getElementById('input1');
	// Start with a full list at page load
	if (input.value == '') {
		getSites();
	}
	input.addEventListener('keyup', logKey);

	let btn2 = document.getElementById("btn2");
	btn2.addEventListener('click', showModal);

	let btn3 = document.getElementById("btn3");
	btn3.addEventListener('click', create);
}

function logKey(e) {
	let siteSection = document.getElementById('siteSection');
	// Remove all existing elements before requesting new ones
	while (siteSection.hasChildNodes()) {
		siteSection.removeChild(siteSection.firstChild);
	}
	// Get key inputs and turn them into a real time search query
	let input = document.getElementById('input1');
	input.textContent += `${e.key}`
	// Account for backspace // substring is 11% faster than slice
	if (e.key === 'Backspace') {
		input.textContent = input.textContent.substring(0, input.textContent.length - 10);
	}
	// If the search query is cleared, return complete list
	if (input.textContent) {
		loadSites(input.textContent);
	} else {
		getSites();
	}
}
// Request sites with keyword
function loadSites(keyword) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/sites/search/' + keyword);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let sites = JSON.parse(xhr.responseText);
				// Clear the warning that was created below
				document.getElementById('badSearch').style.display = 'none';
				displaySites(sites);
			} else {
				// When search is empty, return a warning, hide the result count when there is an error
				document.getElementById('badSearch').style.display = 'block';
				document.getElementById('badSearch').textContent = 'No sites found for the keyword "' + keyword + '"';
				document.getElementById('count').style.display = 'none';
			}
		}
	}
	xhr.send();
}
// Get all sites
function getSites() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/sites');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				document.getElementById('badSearch').style.display = 'none';
				let sites = JSON.parse(xhr.responseText);
				displaySites(sites);
			}
		}
	}
	xhr.send();
}

function displaySites(sites) {
	let siteSection = document.getElementById('siteSection');
	// Why not display the number of results
	document.getElementById('count').style.display = 'block';
	let count = document.getElementById('count');
	count.textContent = 'Results: ' + sites.length
	// Start by creating the elements
	for (const site of sites) {
		let siteCard = document.createElement('div');
		siteCard.className = 'card';
		let siteHead = document.createElement('div');
		// Add the difficulty property to div's class for color coding'
		siteHead.className = 'card-header ' + site.difficulty;
		let name = document.createElement('a');
		name.className = 'card-title';
		// Create the title link
		let link = document.createTextNode(site.name);
		name.appendChild(link);
		name.title = "Go to deletion page";
		name.href = site.url;
		let siteBody = document.createElement('div');
		siteBody.className = 'card-body';
		let notes = document.createElement('p');
		let updated = document.createElement('p');
		// Account for null update dates
		if (site.updated === null) {
			updated.textContent = 'Updated: 2021-08-07'
		} else {
			//Slice the updated date from java LDT
			updated.textContent = 'Updated: ' + site.updated.slice(0, 10);
		}
		// Account for empty notes section
		if (site.notes === '') {
			notes.textContent = 'No information'
		}
		else {
			notes.textContent = site.notes;
		}
		siteBody.style.display = 'none';
		let siteFoot = document.createElement('div');
		siteFoot.className = 'card-footer';
		// On - off logic for the show/hide button
		let btn = document.createElement('button');
		let hr = document.createElement('hr');
		btn.value = 'on';
		btn.innerHTML = '<i class="fa fa-eye"></i>';
		btn.className = 'btn btn-outline pull-right';
		btn.onclick = function() {
			if (btn.value === 'on') {
				siteBody.style.display = 'block';
				btn.innerHTML = '<i class="fa fa-eye-slash"></i>';
				btn.value = 'off';
				btn.className = 'btn btn-outline pull-right';
			}
			else {
				siteBody.style.display = 'none';
				btn.innerHTML = '<i class="fa fa-eye"></i>';
				btn.value = 'on';
				btn.className = 'btn btn-outline pull-right';
			}
		};
		//Edit and delete button functions
		let edit = document.createElement('button');
		let del = document.createElement('button');
		edit.className = 'btn btn-outline-warning fa fa-pencil-square-o pull-right';
		//Edit creates its inputs
		edit.onclick = function() {
			siteBody.removeChild(notes);
			siteBody.removeChild(hr);
			let editName = document.createElement('input');
			let nameLabel = document.createElement('p');
			nameLabel.textContent = 'Name';
			siteBody.appendChild(nameLabel);
			editName.value = site.name;
			siteBody.appendChild(editName);
			editName.className = 'form-control me-2 f1';
			let urlLabel = document.createElement('p');
			let editUrl = document.createElement('input');
			urlLabel.textContent = 'Url';
			editUrl.className = 'form-control me-2  f1';
			editUrl.value = site.url;
			siteBody.appendChild(urlLabel);
			siteBody.appendChild(editUrl);
			let editNotes = document.createElement('textarea');
			let notesLabel = document.createElement('p');
			notesLabel.textContent = 'Notes';
			editNotes.value = site.notes;
			editNotes.className = 'form-control me-2  f1';
			editNotes.rows = '3';
			siteBody.appendChild(notesLabel);
			siteBody.appendChild(editNotes);
			//Creating the dropdown for the difficulty
			let diffLabel = document.createElement('p');
			diffLabel.textContent = 'Difficulty';
			let editDiff = document.createElement('select');
			let easy = document.createElement("option");
			easy.value = 'easy';
			easy.text = 'easy';
			let medium = document.createElement("option");
			medium.value = 'medium';
			medium.text = 'medium';
			let hard = document.createElement("option");
			hard.value = 'hard';
			hard.text = 'hard';
			let impossible = document.createElement("option");
			let select = document.createElement("option");
			impossible.value = 'impossible';
			impossible.text = 'impossible';
			select.text = 'Select...';
			editDiff.className = 'form-control me-2  f1';
			siteBody.appendChild(diffLabel);
			siteBody.appendChild(editDiff);
			editDiff.appendChild(select);
			editDiff.appendChild(easy);
			editDiff.appendChild(medium);
			editDiff.appendChild(hard);
			editDiff.appendChild(impossible);
			let updateBtn = document.createElement('button');
			updateBtn.className = 'btn btn-outline-warning fa fa-floppy-o pull-right';
			let cancelBtn = document.createElement('button');
			cancelBtn.className = 'btn btn-outline-danger fa fa-times pull-left';
			siteBody.appendChild(document.createElement('hr'));
			siteBody.removeChild(edit);
			siteBody.appendChild(updateBtn);
			updateBtn.onclick = function() {
				//Update and save the info
				let dbSite = {
					id: site.id,
					name: editName.value,
					url: editUrl.value,
					notes: editNotes.value,
					difficulty: editDiff.value
				}
				updateSite(dbSite);
			}
			siteBody.removeChild(del);
			siteBody.appendChild(cancelBtn);
			cancelBtn.onclick = function() {
				//Reset view on cancel 
				while (siteSection.hasChildNodes()) {
					siteSection.removeChild(siteSection.firstChild);
				}
				displaySites(sites);
			}
		}
		// Delete
		del.className = 'btn btn-outline-danger fa fa-trash pull-left';
		del.onclick = function() {
			delSite(site.id);
		}
		// Create family tree
		siteSection.appendChild(siteCard);
		siteCard.appendChild(siteHead);
		siteHead.appendChild(name);
		siteCard.appendChild(siteBody);
		siteBody.appendChild(notes);
		siteBody.appendChild(updated);
		siteCard.appendChild(siteFoot);
		siteHead.appendChild(btn);
		siteBody.appendChild(hr);
		siteBody.appendChild(del);
		siteBody.appendChild(edit);
		siteFoot.appendChild(updated);
	}
}

function showModal() {
	event.preventDefault();
	let modal = document.getElementById("myModal");
	let btn = document.getElementById("btn2");
	// Get the <span> element that closes the modal
	let span = document.getElementsByClassName("close")[0];
	modal.style.display = "block";
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
}

function create() {
	event.preventDefault();
	let form = document.inputForm;
	// Create the site and send it
	let site = {
		name: form.name.value,
		url: form.url.value,
		notes: form.notes.value,
		difficulty: form.difficulty.value,
	}
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/sites', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) {
				var data = JSON.parse(xhr.responseText);
			}
			else {
				console.log("POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};
	var siteJson = JSON.stringify(site);
	xhr.send(siteJson);
	// close the modal once its sent
	let modal = document.getElementById("myModal");
	modal.style.display = "none";
	let siteSection = document.getElementById('siteSection');
	// Clear the existing sites
	while (siteSection.hasChildNodes()) {
		siteSection.removeChild(siteSection.firstChild);
	}
	// Return only the newly created site
	loadSites(site.name);
}

function delSite(id) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/sites/' + id);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				// Clear the existing sites
				while (siteSection.hasChildNodes()) {
					siteSection.removeChild(siteSection.firstChild);
				}
				// Refresh the view
				getSites();
			}
		}
	}
	xhr.send();
}

function updateSite(site) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/sites');
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) {
				var data = JSON.parse(xhr.responseText);
				let siteSection = document.getElementById('siteSection');
				// Clear the existing sites
				while (siteSection.hasChildNodes()) {
					siteSection.removeChild(siteSection.firstChild);
				}
				// Return only the newly created site
				loadSites(site.name);
			}
			else {
				console.log("PUT request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	var siteJson = JSON.stringify(site);
	xhr.send(siteJson);
}
