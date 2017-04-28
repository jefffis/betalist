var html = document.getElementsByTagName('html')[0],
	body = document.getElementsByTagName('body')[0],
	blContainer = document.getElementById('bl-container'),
	blIntroContent = document.getElementById('bl-intro-content'),
	blTitleLink = document.getElementById('bl-intro-button'),
	blForm = document.getElementById('bl-form'),
	blModalContainer = document.getElementById('bl-modal-wrapper-container'),
	blModal = document.getElementById('bl-modal-wrapper'),
	blModalFormContainer = document.getElementById('bl-modal-form'),
	blModalSuccessImg = document.getElementById('bl-submitted-image'),
	blImgSrc = blModalSuccessImg.getAttribute('data-src'),
	blMobileModalSuccessImg = document.getElementById('bl-mobile-img'),
	blMobileModalSuccessContent = document.getElementById('bl-submitted-content-wrapper'),
	blModalCloseBtn = document.getElementById('bl-modal-close'),
	blSubmit = document.getElementById('bl-submit'),
	blEmail = document.getElementById('bl-email'),
	blLabel = document.getElementById('bl-label'),
	blError = document.getElementById('bl-form-microcopy-error'),
	blEmailErrorMsg = 'Please enter a valid email.',
	blSubittedContent = document.getElementById('bl-submitted-content'),
	blSubmittedDismiss = document.getElementById('bl-submitted-dismiss'),
	hasContentClass = 'has-content',
	narrowWindow = window.innerWidth <= 500 ? true : false;

// on smaller screens, adjust some of the UI
if(narrowWindow) {
	var movedBtn = blModalCloseBtn.parentNode.removeChild(blModalCloseBtn),
		movedError = blError;

	movedError.parentNode.removeChild(movedError);
	blEmail.parentNode.appendChild(movedError);
	blModal.appendChild(movedBtn);
	blMobileModalSuccessImg.style.backgroundImage = 'url('+ blImgSrc +')';
} else {
	blModalSuccessImg.setAttribute('src', blImgSrc);
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
		blIntroContent.className = 'is-fading';
	}, 1250);
	setTimeout(function() {
		blIntroContent.className = 'is-hidden';
		blSubittedContent.className = 'is-shown';
		blModalCloseBtn.className = 'is-hidden';
		if(narrowWindow) {
			var successMsgHeight = blMobileModalSuccessContent.clientHeight;
			blModalFormContainer.className = 'is-submitted';
			blMobileModalSuccessImg.style.height = (window.innerHeight - successMsgHeight - 50) + 'px';
		}
	}, 1500);
	setTimeout(function() {
		blSubittedContent.className += ' is-fading';
	}, 1750);
}
function showModal() {
	// html.className = 'modal-is-shown'; // blur underlying content
	blModalContainer.className = 'is-shown';
	if(narrowWindow) {
		body.className += ' is-mobile-device'; // rudimentary, just to start
		body.style.height = window.innerHeight + 'px';
	}
}
function closeAndResetModal() {
	// html.className = ''; // remove blur underlying content
	blModalContainer.className = '';
	blIntroContent.className = '';
	blSubittedContent.className = '';
	blModalCloseBtn.className = '';
	if(narrowWindow) {
		body.className = ''; // rudimentary, just to start
		body.style.height = '';
		blModalFormContainer.className = '';
	}
}

blTitleLink.onclick = function(e) {
	e.preventDefault();
	// var blTitle = this.parentNode;
	// blTitle.parentNode.removeChild(blTitle);
	showModal();
}
blModalCloseBtn.onclick = function() {
	closeAndResetModal();
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
		blEmail.blur();
		blSubmit.className = 'is-submitted';
		blSubmit.blur();
	}
}
blSubmittedDismiss.onclick = function() {
	// blContainer.parentNode.removeChild(blContainer);
	closeAndResetModal();
}