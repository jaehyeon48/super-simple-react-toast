import { Toast } from '../lib/index';

jest.useFakeTimers();

const toastRootElem = document.createElement('div');
const toast = new Toast(toastRootElem);

describe('Default duration (3000ms) messages', () => {
	test('Should render success message and automatically delete the message after message duration', () => {
		toast.success({
			message: 'This is a success message'
		});

		expect(toastRootElem.querySelector('[aria-label="Toast success message"]')).not.toBe(null);
		jest.advanceTimersByTime(3000);
		expect(toastRootElem.querySelector('[aria-label="Toast success message"]')).toBe(null);
	});

	test('Should render info message and automatically delete the message after message duration', () => {
		toast.info({
			message: 'This is a info message'
		});

		expect(toastRootElem.querySelector('[aria-label="Toast info message"]')).not.toBe(null);
		jest.advanceTimersByTime(3000);
		expect(toastRootElem.querySelector('[aria-label="Toast info message"]')).toBe(null);
	});

	test('Should render warning message and automatically delete the message after message duration', () => {
		toast.warning({
			message: 'This is a warning message'
		});

		expect(toastRootElem.querySelector('[aria-label="Toast warning message"]')).not.toBe(null);
		jest.advanceTimersByTime(3000);
		expect(toastRootElem.querySelector('[aria-label="Toast warning message"]')).toBe(null);
	});

	test('Should render error message and automatically error the message after message duration', () => {
		toast.error({
			message: 'This is a error message'
		});

		expect(toastRootElem.querySelector('[aria-label="Toast error message"]')).not.toBe(null);
		jest.advanceTimersByTime(3000);
		expect(toastRootElem.querySelector('[aria-label="Toast error message"]')).toBe(null);
	});
});

describe('custom duration (5000ms) messages', () => {
	test('Should render success message and automatically delete the message after message duration', () => {
		toast.success({
			message: 'This is a success message',
			duration: 5000
		});

		expect(toastRootElem.querySelector('[aria-label="Toast success message"]')).not.toBe(null);
		jest.advanceTimersByTime(3000);
		expect(toastRootElem.querySelector('[aria-label="Toast success message"]')).not.toBe(null);
		jest.advanceTimersByTime(2000);
		expect(toastRootElem.querySelector('[aria-label="Toast success message"]')).toBe(null);
	});
});

test('If instantiated with an non-existence element, create a new <div id="toast-root"></div> element', () => {
	const toast = new Toast(null);
	toast.success({
		message: 'This is a success message',
		duration: 5000
	});

	expect(document.querySelector('[aria-label="Toast success message"]')).not.toBe(null);
});
