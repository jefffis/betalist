var blBody = document.getElementsByTagName('body')[0],
	bodyClassOriginal,

	// container
	blModalContainer = document.createElement('div'),
	blModalWrapper = document.createElement('div'),
	blModalFormContainer = document.createElement('div'),

	// intro
	blIntroContent = document.createElement('div'),
	blModalTitle = document.createElement('div'),
	blModalTitleLogo = document.createElement('img'),
	blModalTitleContent = document.createElement('div'),
	blModalTitleSmall = document.createElement('small'),
	blLearnMoreLink = document.createElement('a'),
	
	// form
	blForm = document.createElement('form'),
	blFormWrapper = document.createElement('fieldset'),
	blLabelTitle = document.createElement('label'),
	blLabel = document.createElement('label'),
	blEmail = document.createElement('input'),
	blSubmit = document.createElement('button'),
	blError = document.createElement('small'),
	blMicrocopy = document.createElement('small'),

	// learn more
	blLearnMoreContent = document.createElement('div'),
	blLearnMoreBackButton = document.createElement('a'),
	blLearnMoreVideo = document.createElement('div'),
	// blLearnMoreVideoIframe = document.createElement('iframe'),
	
	// success
	blSubittedContent = document.createElement('div'),
	blSubittedContentWrapper = document.createElement('div'),
	blModalSuccessImg = document.createElement('img'),
	blMobileModalSuccessImg = document.createElement('div'),
	blSubmittedTitle = document.createElement('div'),
	blSubmittedSmall = document.createElement('small'),
	blSubmittedDismiss = document.createElement('button'),

	// betalist branding
	// blBranding = document.createElement('div'),

	// close
	blModalCloseBtn = document.createElement('button'),

	// show the modal
	blShowModalEl = document.querySelectorAll('.js--bl-show-modal'),

	blStyleTag = document.createElement('style'),
	blStyles = '#bl-modal-wrapper-container *{margin:0;padding:0;border:0;box-sizing:border-box;box-shadow:none;text-align:left}.modal-is-shown{overflow:hidden}#bl-intro-content{opacity:1;transition:opacity .25s ease-in-out}#bl-intro-content.is-fading{opacity:0}#bl-intro-content.is-hidden{display:none}#bl-learn-more{display:none;position:relative;z-index:2;opacity:0;margin:-30px;transition:opacity .25s ease-in-out}#bl-learn-more.is-shown{display:block}#bl-learn-more.is-fading{opacity:1}#bl-learn-more-link,#bl-back-link{text-decoration:underline}#bl-back-link{display:block;border-bottom:1px solid #ddd;padding:20px 30px;font-size:16px;line-height:1.2}#bl-learn-more-link:active,#bl-back-link:active{opacity:.65}#bl-learn-more-holder{overflow:hidden;padding:0 30px;border-radius:0 0 3px 3px}#bl-learn-more-title{margin-top:30px;margin-bottom:20px;font-size:24px;font-weight:bold;line-height:1.2}#bl-learn-more-holder .bl-learn-more-content{margin-bottom:18px;font-size:16px;font-weight:normal;line-height:1.25}#bl-learn-more-holder .bl-learn-more-content:last-child{margin-bottom:30px}.is-mobile-device #bl-learn-more-holder{padding:0 30px}.is-mobile-device #bl-back-link{border-top:1px solid #ddd;border-bottom:0}#bl-form-wrapper{margin:0;padding:0;border:0;*zoom:1}#bl-form-wrapper:before,#bl-form-wrapper:after{content:"";display:table}#bl-form-microcopy,#bl-form-microcopy-error{display:block;margin-top:10px;color:#666;font-size:13px;line-height:1.3}#bl-form-microcopy-error{display:none;color:red;font-weight:bold}#bl-form-microcopy-error.is-shown{display:block}#bl-label-title{display:block;margin-bottom:10px;font-size:16px}#bl-label{display:block;position:relative;float:left;width:70%}#bl-label:after{display:block;position:absolute;top:50%;right:10px;z-index:2;opacity:0;height:20px;width:20px;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAEUUlEQVR4Ae3dA5AsVxiG4ax1Hdu2bdu2rVJuIbZt27Zt27ad9f55Y9zVzHT/fbrP91Y9ZY7nqzk9YymllFJKKaWUUkoppZRSSimllFIq7apQgwhT6+BLtOIo1CGS1Jxohf3Lg5gAquCNxDuwXnyChaAKWhVuhvWjAztBFbB9YIN0HhpRkNTy6IaV4GlMjpynpsDXsDJ8hWWQ01QDnoJVoAujkcPUmbCEXI2hyElqK1jCXsH0UIE3F1phKfgeayDQ1Ci8A0tRD3ZBYKlq3AJz8BUCS+0Lc/IFAkqtgG6Yk90QYhp7HFyBQFKNeArm5FUMQSCps2BOfsSMCCS1NczRuggxjT0OjkEgqVF4F+bkAdQigFQ1boU5+RQTIpDUfjAnnVgEgaRWRA/MyZ6INI09lyOQVCOehjl5JayxR50Nc/IDZoAKpG1gjtaBCqS50QZzchQiTWPP/fGOPRp7PsEEUIG0P8xJBxaGCqSVnMee3aECaUp8A3NyKVQgNeIZmJOX0YJI09gzPVQgbQtztDZUIM3jPPYcCRVIY+M9mJN7UQMVQNW4DebkY4yPSNPYsxBUIK2MHh3j0tjj4WJE1dgYX2PP716KbezZDZ3owQmoRkidA3PyPaZDNO0E+59zUR3p2LMmommzfj5UXYLayMaewxFNa6NrEJc4q0cWjY33YU7uiWnsWRHtsEG4CY3wrBq3w5x8hPEQRYvhF1gJ7kQzvDrAeexZEFE0H36o4KTr0AKOPbsgimZLYEh5HCOQVlM5jz0XIYqmx+ewBDyLcZB0TXgW5uQFNKPwTY4PU/hZ1IRIsnNhTr7DtCh8E+ItWArewKRIou1gTnqwRizb/suwFL2HqXI29hyKwjcUTzl+h54+J2PP3bGMPVfCHH2O2coYe+6AOfkQ4yKKWmHOvsY8GGwHwpy0Y35E04OwDHyHhTBQqziPPTshqibF67AM/IQlBxh7voU5uRBRNj5ehGXgF6wQwNjzPJoRbWPjKVgG2nv5vn2e89vRNIi+4XgYloFObIDf2t557FkN6s9acA8sA9041HnsOQTqfzXhVljB3Ylq9JKqx3WwgvoA40D1Uy0uhRVMO+bDIFLVOAdWIDtAlVAVToYVwPlQZXYULMeeQxMCSEeuvX2LqaESaDQsR3qwClSC7YYeWA4cBJVC26IbFrA7NPak28boggXofYwNlXJrowMWkDbMC6fUymiFBWJ7OKeWxk+wjJ0LlVEL43tYRp7V2JN98+LrjMaeqRBAajZ84Tz2rIyAUjPgY5iDAxBgamqHizXfprEn7CbDmykeOh0bgacmwEspjD3zICepcRI+7LEtcpYagccSuPPPRk5TQ/EArExPoxE5TjWXeeb/G0wJVYAacGOJY89KUAWqDlfABmF/qAJWgwtg/bhVY0+xq8LpsF68i1FQBa8Kx/fyF6xzIqLUXvgWr2MBKKWUUkoppZRSSimllFJKKaWUUkpF268pyLsck5DrAQAAAABJRU5ErkJggg==") no-repeat center;background-size:16px;margin-top:-9px;content:"";transition:opacity .25s ease-in-out}#bl-label.is-good:after{opacity:1}#bl-email{display:block;height:auto;width:100%;outline:none;margin:0;padding:10px 12px;border:1px solid #ccc;border-radius:3px;box-shadow:0 2px 0 #efefef inset;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:16px;line-height:1;-webkit-appearance:none}#bl-email:focus{border-color:currentColor}#bl-email.is-error{border-color:red}#bl-submit,#bl-submitted-dismiss{display:block;position:relative;float:left;background:#111;outline:none;height:auto;min-height:0;min-width:4rem;width:calc(30% - 1rem);margin-left:1rem;padding:12px 16px;border:0;border-radius:3px;color:white;cursor:pointer;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;line-height:1;text-align:center}#bl-submit:active,#bl-submitted-dismiss:active{background:#333;color:rgba(255,255,255,0.75)}#bl-submit:focus,#bl-submitted-dismiss:focus{box-shadow:0 0 0 2px rgba(0,0,0,0.05)}#bl-submit.is-submitted{background:#666;color:#666;cursor:default}#bl-submit:before,#bl-submit:after{opacity:0;transition:opacity .5s ease-in-out;content:""}#bl-submit.is-submitted:before,#bl-submit.is-submitted:after{display:block;position:absolute;z-index:2;opacity:1}#bl-submit.is-submitted:before{top:50%;left:50%;height:20px;width:2px;background:white;margin-top:-10px;margin-left:-1px;border-radius:2px;animation:blRotate 1s infinite}#bl-submit.is-submitted:after{top:50%;left:50%;opacity:.5;height:2px;width:20px;background:white;margin-top:-1px;margin-left:-10px;border-radius:2px;animation:blRotate 1s infinite;animation-delay:.25s}#bl-submitted-content{display:none;opacity:0;margin:-30px -30px 65px;transition:opacity .25s ease-in-out}#bl-submitted-content.is-shown{display:block}#bl-submitted-content.is-fading{opacity:1}#bl-submitted-image{display:block;width:100%;max-width:100%;border-radius:3px 3px 0 0}#bl-submitted-title{margin-top:25px;padding:0 30px;font-size:24px;font-weight:bold}#bl-submitted-microcopy{display:block;margin-top:12px;padding:0 30px;font-size:16px;font-weight:normal;line-height:1.25}#bl-submitted-dismiss{margin-top:25px;margin-left:30px}@media screen and (max-width: 600px){#bl-modal-wrapper{padding:0 24px}#bl-modal-close{top:-48px;right:0}}@media screen and (max-width: 500px){#bl-label,#bl-submit{float:none;width:100%}#bl-submit{margin-top:15px;margin-left:0;padding:13px 0}#bl-email{padding:13px}}#bl-modal-wrapper-container{display:none;position:fixed;top:100%;left:0;z-index:100000000;height:100%;width:100%;background:rgba(0, 0, 0, 0)}.modal-is-shown #bl-outer-wrapper ~ *{filter:blur(1px)}#bl-modal-wrapper-container.is-shown{display:table;top:0;background:rgba(0, 0, 0, 0.5);animation:blFadeInColor .3s ease-in-out}#bl-modal-wrapper{display:none;position:relative;top:100%;height:100%;vertical-align:middle;transform:scale(0.75);animation:blFadeIn .3s ease-in-out}.is-shown #bl-modal-wrapper{display:table-cell;top:0;transform:scale(1);animation:blFadeIn .5s ease-in-out}#bl-modal-form{position:relative;max-width:400px;background:white;margin:auto;padding:30px;border-radius:3px;box-shadow:0 0 0 1px rgba(0,0,0,0.1) inset, 0 1px 2px rgba(0,0,0,0.1), 0 2px 3px rgba(0,0,0,0.075)}#bl-modal-title{margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid rgba(0,0,0,0.1)}#bl-modal-title-content{margin-bottom:20px;font-size:24px;font-weight:bold;line-height:1.2}#bl-modal-title-micro{display:block;margin-top:12px;font-size:16px;font-weight:normal;line-height:1.3}#bl-modal-close{display:block;position:absolute;top:0;right:-48px;min-height:0;height:25px;min-width:0;width:25px;background:none;padding:0;border:0;cursor:pointer}#bl-modal-close:active{opacity:.65;outline:none}#bl-modal-close-fill{fill:white}.is-fixed > *{display:none}.is-fixed,.is-fixed #bl-outer-wrapper{display:block;position:relative}.is-fixed-mobile-device{position:fixed}.is-mobile-device #bl-modal-wrapper-container.is-shown,.is-mobile-device .is-shown #bl-modal-wrapper{display:block}.is-mobile-device .is-shown #bl-modal-wrapper{position:relative;height:100%;background:white;padding:0}.is-mobile-device #bl-modal-form{position:absolute;bottom:0;left:0;max-width:100%;width:100%;padding:0 30px;border-radius:0;border:0;box-shadow:none}.is-mobile-device #bl-form-microcopy{padding-bottom:30px}.is-mobile-device #bl-submit,.is-mobile-device #bl-submitted-dismiss{font-size:20px}.is-mobile-device #bl-modal-form.is-submitted{height:100%;padding-left:0;padding-right:0}.is-mobile-device #bl-modal-close{top:24px;right:24px}.is-mobile-device #bl-submitted-content{margin:0}.is-mobile-device #bl-submitted-content-wrapper{position:absolute;bottom:0;left:0;padding-bottom:30px}.is-mobile-device #bl-submitted-image{border-radius:0}.is-mobile-device #bl-submitted-title{margin-top:0}.is-mobile-device #bl-submitted-dismiss{width:calc(100% - 60px);padding-left:0;padding-right:0}.is-mobile-device #bl-learn-more-link{display:block}.is-mobile-device #bl-back-link{margin-bottom:30px}.is-mobile-device #bl-modal-close.is-hidden{display:none}.is-mobile-device #bl-mobile-img{background-repeat:no-repeat;background-position:center;background-size:cover}.is-mobile-device #bl-modal-close-fill{fill:#777}@media screen and (max-height: 540px){#bl-learn-more-holder .bl-learn-more-content{font-size:15px}}',
	blStyleAnimations = '@keyframes blFadeInColor{0%{display:none;top:100%;background:rgba(0, 0, 0, 0);}100%{display:table;top:0;background:rgba(0, 0, 0, 0.5);}}@keyframes blFadeIn{0%{display:none;top:100%;transform:scale(0.75);}100%{display:table-cell;top:0;transform:scale(1);}}@keyframes blRotate{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}';

	blEmailErrorMsg = 'Please enter a valid email.',
	hasContentClass = 'has-content',
	narrowWindow = window.innerWidth <= 500 ? true : false,
	scrollPos = 0,
	isModalShown = false;

// adjust contnent
blModalContainer.id = 'bl-modal-wrapper-container';
blModalWrapper.id = 'bl-modal-wrapper';
blModalFormContainer.id = 'bl-modal-form';
blIntroContent.id = 'bl-intro-content';

blModalTitleLogo.id = 'bl-logo';
blModalTitleLogo.setAttribute('data-src', 'http://wtf.jefff.co/betalist/placeholder--logo.png');
blModalTitle.id = 'bl-modal-title';
blModalTitleContent.id = 'bl-modal-title-content';
blModalTitleContent.innerText = 'We want you to help us improve betalist.';
blModalTitleSmall.id = 'bl-modal-title-micro';
blModalTitleSmall.innerHTML = 'Take part in beta &amp; user tests so we can make betalist better for you. ';
blLearnMoreLink.id = 'bl-learn-more-link';
blLearnMoreLink.innerText = 'What is this?';
blLearnMoreLink.href = '###';
// add to parent els
blModalTitleSmall.appendChild(blLearnMoreLink);
// blModalTitle.appendChild(blModalTitleLogo);
blModalTitle.appendChild(blModalTitleContent);
blModalTitle.appendChild(blModalTitleSmall);
blIntroContent.appendChild(blModalTitle);

blForm.id = 'bl-form';
blFormWrapper.id = 'bl-form-wrapper';
blLabelTitle.id = 'bl-label-title';
blLabelTitle.for = 'bl-email'
blLabelTitle.innerText = 'Enter your email';
blLabel.id = 'bl-label';
blEmail.id = 'bl-email';
blEmail.type = 'email';
blEmail.name = 'bl-email';
blSubmit.id = 'bl-submit';
blSubmit.innerText = 'Join';
blError.id = 'bl-form-microcopy-error';
blMicrocopy.id = 'bl-form-microcopy';
blMicrocopy.innerHTML = 'After joining, you&rsquo;re in control with what you help out with. Unsubscribe anytime.';
// add to parent els
blFormWrapper.appendChild(blLabelTitle);
blLabel.appendChild(blEmail);
blFormWrapper.appendChild(blLabel);
blFormWrapper.appendChild(blSubmit);
blForm.appendChild(blFormWrapper);
blForm.appendChild(blError);
blForm.appendChild(blMicrocopy);

blLearnMoreContent.id = 'bl-learn-more';
blLearnMoreBackButton.id = 'bl-back-link';
blLearnMoreBackButton.innerText = 'Go back';
blLearnMoreBackButton.href = '###';
blLearnMoreVideo.id = 'bl-learn-more-holder';
blLearnMoreVideo.innerHTML = '<div id="bl-learn-more-title"><!--We want help making betalist better for you.-->Join our beta-testing list and make betalist better for you.</div><div class="bl-learn-more-content">By joining our this list, you&rsquo;ll have the opportunity to take part by:</div><div class="bl-learn-more-content">&bull; accessing early features &amp; prototypes</div><div class="bl-learn-more-content">&bull; giving detailed feedback on existing features</div><div class="bl-learn-more-content">&bull; helping define the product roadmap</div><div class="bl-learn-more-content">Choose what you want to help us out with. Unsubscribe anytime.</div>';
// blLearnMoreVideoIframe.src = 'https://www.youtube.com/embed/eNsKlhGJ3p0?showinfo=0&wmode=transparent&rel=0';
// blLearnMoreVideoIframe.frameBorder = '0';
// add to parent els
blLearnMoreContent.appendChild(blLearnMoreBackButton);
blLearnMoreContent.appendChild(blLearnMoreVideo);
// blLearnMoreVideo.appendChild(blLearnMoreVideoIframe);

blSubittedContent.id = 'bl-submitted-content';
blSubittedContentWrapper.id = 'bl-submitted-content-wrapper';
blModalSuccessImg.id = 'bl-submitted-image';
blModalSuccessImg.setAttribute('data-src', 'http://wtf.jefff.co/betalist/congrats.gif');
blMobileModalSuccessImg.id = 'bl-mobile-img';
blSubmittedTitle.id = 'bl-submitted-title';
blSubmittedTitle.innerHTML = 'Awesome, you&rsquo;re all set!';
blSubmittedSmall.id = 'bl-submitted-microcopy';
blSubmittedSmall.innerHTML = 'We can&rsquo;t wait to make betalist better with your help. Thank you!';
blSubmittedDismiss.id = 'bl-submitted-dismiss';
blSubmittedDismiss.type = 'button';
blSubmittedDismiss.innerText = 'Dismiss';
// add to parent els
blSubittedContentWrapper.appendChild(blSubmittedTitle);
blSubittedContentWrapper.appendChild(blSubmittedSmall);
blSubittedContentWrapper.appendChild(blSubmittedDismiss);
blSubittedContent.appendChild(blModalSuccessImg);
blSubittedContent.appendChild(blMobileModalSuccessImg);
blSubittedContent.appendChild(blSubittedContentWrapper);

// betalist branding
// blBranding.id = 'bl-branding';
// blBranding.innerHTML = '<img id="bl-branding-logo" src="logo.png" />';

blModalCloseBtn.id = 'bl-modal-close';
blModalCloseBtn.type = 'button';
blModalCloseBtn.innerHTML = '<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon id="bl-modal-close-fill" fill="#777777" points="24 22.0631579 22.0631579 24 11.9915789 13.9284211 1.92 24 0 22.0631579 10.0715789 11.9915789 0 1.92 1.92 0 11.9915789 10.0715789 22.0631579 0 24 1.92 13.9284211 11.9915789"></polygon></g></svg>';

// add to parent els & then add to body
blIntroContent.appendChild(blForm);
blModalFormContainer.appendChild(blIntroContent);
blModalFormContainer.appendChild(blLearnMoreContent);
blModalFormContainer.appendChild(blSubittedContent);
blModalFormContainer.appendChild(blModalCloseBtn);
// blModalFormContainer.appendChild(blBranding);
blModalWrapper.appendChild(blModalFormContainer);
blModalContainer.appendChild(blModalWrapper);

if(narrowWindow) {
	var movedBtn = blModalCloseBtn.parentNode.removeChild(blModalCloseBtn),
		movedError = blError,
		movedBackLink = blLearnMoreBackButton.parentNode.removeChild(blLearnMoreBackButton);

	movedError.parentNode.removeChild(movedError);
	blEmail.parentNode.appendChild(movedError);
	blModalWrapper.appendChild(movedBtn);
	blLearnMoreContent.appendChild(movedBackLink);
}

// create & insert style
blStyleTag.type = 'text/css';
blStyleTag.innerHTML = blStyles + blStyleAnimations;
blBody.appendChild(blStyleTag);

// setup DOM
blBody.insertAdjacentHTML('afterbegin', '<div id="bl-outer-wrapper"></div>');
document.getElementById('bl-outer-wrapper').appendChild(blModalContainer);

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
		// removeUIAfterSubmit(); TODO, if users successfully signs up, this UI should be removed
		loadImages();
	}, 1250);
	setTimeout(function() {
		blIntroContent.className = 'is-hidden';
		blSubittedContent.className = 'is-shown';
		blModalCloseBtn.className = 'is-hidden';
		if(narrowWindow) {
			blModalFormContainer.className = 'is-submitted';
			blMobileModalSuccessImg.style.height = (window.innerHeight - blSubittedContentWrapper.clientHeight - 30) + 'px';
		}
	}, 1500);
	setTimeout(function() {
		blSubittedContent.className += ' is-fading';
	}, 1750);
}
function loadImages() {
	var blImgSrc = blModalSuccessImg.getAttribute('data-src');
	if(narrowWindow) {
		blMobileModalSuccessImg.style.backgroundImage = 'url('+ blImgSrc +')';
	} else {
		blModalSuccessImg.setAttribute('src', blImgSrc);
	}
}
function showModal() {
	var blModalTitleLogoSrc = blModalTitleLogo.getAttribute('data-src');
	blModalTitleLogo.setAttribute('src', blModalTitleLogoSrc);

	if(narrowWindow) scrollPos = window.scrollY;
	blModalContainer.className = 'is-shown';
	bodyClassOriginal = blBody.className; // get original body class names
	blBody.className += ' modal-is-shown';
	blBody.style.height = window.innerHeight + 'px';
	if(narrowWindow) {
		blBody.className += ' is-mobile-device';
		setTimeout(function() {
			blBody.className += ' is-fixed';
		}, 500);
		setTimeout(function() {
			blBody.className += ' is-fixed-mobile-device';
		}, 501);
	}
	setTimeout(function() {
		isModalShown = true;
	}, 1000);
}
function closeAndResetModal() {
	blModalContainer.className = '';
	blIntroContent.className = '';
	blSubittedContent.className = '';
	blModalCloseBtn.className = '';
	blLearnMoreContent.className = '';
	blBody.className = bodyClassOriginal; // reset original body class names
	blBody.style.height = '';
	if(narrowWindow) {
		blModalFormContainer.className = '';
		window.scroll(0, scrollPos);
	}
	isModalShown = false;
}
function removeUIAfterSubmit() {
	var blTitle = blTitleLink.parentNode;
	blTitle.parentNode.removeChild(blTitle);
}
function showLearnMore() {
	blIntroContent.className = 'is-fading';
	if(narrowWindow) blModalCloseBtn.className = 'is-hidden';
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
		if(narrowWindow) blModalCloseBtn.className = '';
	}, 250);
}

// TODO: support below IE8?
Array.prototype.forEach.call(blShowModalEl, function(el, i){
	el.onclick = function(e) {
		e.preventDefault();
		showModal();
		// TODO: app will need to have native URL on site to support users with JS disabled
	}
});

// show learn more
blLearnMoreLink.onclick = function(e) {
	e.preventDefault();
	showLearnMore();
}
// hide learn more
blLearnMoreBackButton.onclick = function(e) {
	e.preventDefault();
	hideLearnMore();
}

// close modal
blModalCloseBtn.onclick = function() {
	closeAndResetModal();
}
// close with escape key
document.onkeydown = function(e) {
	var isEscape = (e.key == 'Escape' || e.key == 'Esc' || e.keyCode == 27) ? true : false;
	if(isEscape && isModalShown) closeAndResetModal();
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

// support firing this on other actions as well
if(window.location.hash === '#showModal') showModal();