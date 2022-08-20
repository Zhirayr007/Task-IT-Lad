var formElement = document.forms['formElement'];

formElement.onclick = function (evt) {
	var activeElement = formElement.querySelector('.focused');
	if (activeElement) {
		activeElement.classList.remove('focused');
	}
	evt.target.classList.add('focused');
};

formElement.onblur = function (evt) {
	var activeElement = formElement.querySelector('.focused');
	if (activeElement) {
		activeElement.classList.remove('focused');
	}
};