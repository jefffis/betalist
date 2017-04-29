var html = document.getElementsByTagName('html')[0],
	body = document.getElementsByTagName('body')[0],
	// modal intro stuff
	blContainer = document.getElementById('bl-container'),
	blIntroContent = document.getElementById('bl-intro-content'),
	blTitleLink = document.getElementById('bl-intro-button'),
	// form stuff
	blForm = document.getElementById('bl-form'),
	blModalContainer = document.getElementById('bl-modal-wrapper-container'),
	blModal = document.getElementById('bl-modal-wrapper'),
	blModalFormContainer = document.getElementById('bl-modal-form'),
	blSubmit = document.getElementById('bl-submit'),
	blEmail = document.getElementById('bl-email'),
	blLabel = document.getElementById('bl-label'),
	blError = document.getElementById('bl-form-microcopy-error'),
	blEmailErrorMsg = 'Please enter a valid email.',
	// success stuff
	blModalSuccessImg = document.getElementById('bl-submitted-image'),
	blImgSrc = blModalSuccessImg.getAttribute('data-src'),
	blMobileModalSuccessImg = document.getElementById('bl-mobile-img'),
	blMobileModalSuccessContent = document.getElementById('bl-submitted-content-wrapper'),
	blSubittedContent = document.getElementById('bl-submitted-content'),
	// learn more stuff
	blLearnMoreContent = document.getElementById('bl-learn-more'),
	blLearnMoreLink = document.getElementById('bl-learn-more-link'),
	blLearnMoreBackButton = document.getElementById('bl-back-link'),
	blLearnMoreVideo = document.getElementById('bl-video-holder'),
	// close modal stuff
	blModalCloseBtn = document.getElementById('bl-modal-close'),
	blSubmittedDismiss = document.getElementById('bl-submitted-dismiss'),
	// misc
	hasContentClass = 'has-content',
	narrowWindow = window.innerWidth <= 500 ? true : false,
	scrollPos,
	modalContent = '<div id="bl-modal-wrapper-container"><div id="bl-modal-wrapper"><div id="bl-modal-form"><div id="bl-intro-content"><div id="bl-modal-title"><div id="bl-logo"></div>Help us improve{productName}.<small id="bl-modal-title-micro">Take part in beta tests &amp; user tests to make{productName}better.</small></div><form action="POST" id="bl-form" class="is-shown"><fieldset id="bl-form-wrapper"><label for="bl-email" id="bl-label-title">Enter your email</label><label id="bl-label" for="bl-email"><input type="email" id="bl-email" name="bl-email" value=""/></label><button id="bl-submit">Join</button></fieldset><small id="bl-form-microcopy-error"></small><small id="bl-form-microcopy">After joining, you&rsquo;re in control with what you help out with. Unsubscribe anytime you want.</small></form></div><div id="bl-submitted-content"> <img data-src="congrats.gif" id="bl-submitted-image"/><div id="bl-mobile-img"></div><div id="bl-submitted-content-wrapper"><div id="bl-submitted-title">Awesome, you&rsquo;re all set!</div><small id="bl-submitted-microcopy">We can&rsquo;t wait to make{productName}better with your help. Thank you!</small><button type="button" id="bl-submitted-dismiss">Dismiss</button></div></div><button type="button" id="bl-modal-close"><svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <polygon id="bl-modal-close-fill" fill="#777777" points="24 22.0631579 22.0631579 24 11.9915789 13.9284211 1.92 24 0 22.0631579 10.0715789 11.9915789 0 1.92 1.92 0 11.9915789 10.0715789 22.0631579 0 24 1.92 13.9284211 11.9915789"></polygon> </g></svg></button></div></div></div>';

// TODO make all content insertable via JS
// body.insertBefore(modalContent, body.firstChild);

// on smaller screens, adjust some of the UI
if(narrowWindow) {
	var movedBtn = blModalCloseBtn.parentNode.removeChild(blModalCloseBtn),
		movedError = blError,
		movedBackLink = blLearnMoreBackButton.parentNode.removeChild(blLearnMoreBackButton);

	movedError.parentNode.removeChild(movedError);
	blEmail.parentNode.appendChild(movedError);
	blModal.appendChild(movedBtn);
	blLearnMoreContent.appendChild(movedBackLink);
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
		removeUIAfterSubmit();
		loadImages();
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
function loadImages() {
	if(narrowWindow) {
		blMobileModalSuccessImg.style.backgroundImage = 'url('+ blImgSrc +')';
	} else {
		blModalSuccessImg.setAttribute('src', blImgSrc);
	}
}
function showModal() {
	blModalContainer.className = 'is-shown';
	body.className += ' modal-is-shown'; // rudimentary, just to start
	body.style.height = window.innerHeight + 'px';
	if(narrowWindow) {
		body.className += ' is-mobile-device'; // rudimentary, just to start
		setTimeout(function() {
			body.className += ' is-fixed'; // rudimentary, just to start
		}, 500);
	}
}
function closeAndResetModal() {
	blModalContainer.className = '';
	blIntroContent.className = '';
	blSubittedContent.className = '';
	blModalCloseBtn.className = '';
	blLearnMoreContent.className = '';
	body.className = ''; // rudimentary, just to start
	body.style.height = '';
	if(narrowWindow) {
		blModalFormContainer.className = '';
		window.scroll(0, scrollPos);
	}
}
function removeUIAfterSubmit() {
	var blTitle = blTitleLink.parentNode;
	blTitle.parentNode.removeChild(blTitle);
}
function showLearnMore() {
	blIntroContent.className = 'is-fading';
	setTimeout(function() {
		blIntroContent.className = 'is-hidden';
		blLearnMoreContent.className = 'is-shown';
	}, 250);
	setTimeout(function() {
		blLearnMoreContent.className += ' is-fading';
		if(narrowWindow) blLearnMoreVideo.style.height = (window.innerHeight - blLearnMoreBackButton.clientHeight) + 'px';
	}, 500);
}
function hideLearnMore() {
	blLearnMoreContent.className = 'is-shown';
	setTimeout(function() {
		blLearnMoreContent.className = '';
		blIntroContent.className = '';
	}, 250);
}

// show modal
blTitleLink.onclick = function(e) {
	e.preventDefault();
	if(narrowWindow) scrollPos = window.scrollY;
	showModal();
	// TODO: app will need to have native URL on site to support users with JS disabled
}

// show learn more
blLearnMoreLink.onclick = function() {
	showLearnMore();
}
// hide learn more
blLearnMoreBackButton.onclick = function() {
	hideLearnMore();
}

// close modal
blModalCloseBtn.onclick = function() {
	closeAndResetModal();
}

// email input
blEmail.onfocus = function() {
	if(this.value !== '') {
		this.className += ' ' + hasContentClass;
	}
}
blEmail.onblur = function() {
	var isValidatable = this.className.indexOf(hasContentClass) !== -1 || this.value !== '' ? true : false;
	if(!isValidatable) return;
	
	if(!validateEmail(this.value)) {
		showEmailError(false);
	} else {
		showEmailSuccess();
	}
}

// form submit
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
	closeAndResetModal();
}