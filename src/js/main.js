import {Modal} from 'bootstrap';

/**
 * Main scripts file
 */
document.addEventListener('DOMContentLoaded', () => {
	/**
	 * Show mobile bar
	 */
	const $button = document.querySelector('.js-bar__toggle');
	const $container = document.querySelector('.js-bar');

	$button.addEventListener('click', () => {
		$container.classList.toggle('is-show');
		document.body.classList.toggle('is-fixed');
	});
});
