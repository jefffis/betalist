var blContainer = document.getElementById('bl-container'),
	blIntroContent = document.getElementById('bl-intro-content'),
	blTitleLink = document.getElementById('bl-intro-button'),
	blForm = document.getElementById('bl-form'),
	blSubmit = document.getElementById('bl-submit'),
	blEmail = document.getElementById('bl-email'),
	blLabel = document.getElementById('bl-label'),
	blError = document.getElementById('bl-form-microcopy-error'),
	blEmailErrorMsg = 'Please enter a valid email.',
	blSubittedContent = document.getElementById('bl-submitted-content'),
	blSubmittedDismiss = document.getElementById('bl-submitted-dismiss'),
	hasContentClass = 'has-content',
	narrowWindow = window.innerWidth <= 600 ? true : false,
	movedError;

// on smaller screens, move the error to below the input
if(narrowWindow) {
	movedError = blError;
	movedError.parentNode.removeChild(movedError);
	blEmail.parentNode.appendChild(movedError);
}

function validateEmail(email) { 
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
function showEmailError(needsFocus) {
	blLabel.className = '';
	setTimeout(function() {
		blEmail.className = 'is-error';
		blError.className = 'is-shown';
		blError.textContent = blEmailErrorMsg;
		if(needsFocus) blEmail.focus();
	}, 250);
}
function showEmailSuccess() {
	setTimeout(function() {
		blError.className = '';
		blEmail.className = '';
		blError.textContent = '';
		blLabel.className = 'is-good';
	}, 250);
}
function showSuccessMsg() {
	setTimeout(function() {
		blIntroContent.parentNode.removeChild(blIntroContent);
		blSubittedContent.className = 'is-shown';
	}, 1500);
}

blTitleLink.onclick = function(e) {
	e.preventDefault();
	var blTitle = this.parentNode;
	blTitle.parentNode.removeChild(blTitle);
	blForm.className = 'is-shown';
}
blEmail.onfocus = function() {
	if(this.value !== '') {
		this.className += ' ' + hasContentClass;
	}
}
// blEmail.onkeyup = function() {
// 	var isValidatable = this.className.indexOf(hasContentClass) !== -1 || this.value !== '' ? true : false;
// 	if(!isValidatable) return;
	
// 	if(!validateEmail(this.value)) {
// 		showEmailError(false);
// 	} else {
// 		showEmailSuccess();
// 	}
// }
blEmail.onblur = function() {
	var isValidatable = this.className.indexOf(hasContentClass) !== -1 || this.value !== '' ? true : false;
	if(!isValidatable) return;
	
	if(!validateEmail(this.value)) {
		showEmailError(false);
	} else {
		showEmailSuccess();
	}
}
blForm.onsubmit = function(e) {
	e.preventDefault();
	if(!validateEmail(blEmail.value)) {
		showEmailError(true);
	} else {
		showEmailSuccess();
		showSuccessMsg();
		blSubmit.className = 'is-submitted';
		blSubmit.blur();
	}
}
blSubmittedDismiss.onclick = function() {
	blContainer.parentNode.removeChild(blContainer);
}