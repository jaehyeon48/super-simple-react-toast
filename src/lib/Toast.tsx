import { nanoid } from 'nanoid';
import { render } from 'react-dom';
import Toasts from './Toasts';
import { Message, ToastPosition, ToastArgs } from './types';

const positions = [
	'topLeft',
	'topRight',
	'topCenter',
	'bottomLeft',
	'bottomRight',
	'bottomCenter'
] as const;

export default class Toast {
	#rootElem: HTMLElement;

	#messages: Map<ToastPosition, Message[]>;

	#defaultDuration: number;

	#defaultMaxNumOfMessages: number;

	constructor(rootElement: HTMLElement | null) {
		if (!rootElement) throw new Error('Toast root element does not exist');
		this.#rootElem = rootElement;
		this.#defaultDuration = 3000;
		this.#messages = new Map(positions.map(position => [position, []]));
		this.#defaultMaxNumOfMessages = 0;
	}

	#closeMessage(idToDelete: string, position: ToastPosition) {
		const indexToDelete = (this.#messages.get(position) as Message[]).findIndex(
			({ id }) => id === idToDelete
		);
		if (indexToDelete === -1) return;

		(this.#messages.get(position) as Message[]).splice(indexToDelete, 1);
		render(
			<>
				{positions.map(pos => (
					<Toasts
						key={pos}
						position={pos}
						messages={this.#messages.get(pos) as Message[]}
						closeMessage={this.#closeMessage.bind(this)}
					/>
				))}
			</>,
			this.#rootElem
		);
	}

	#autoCloseMessage(duration: number, position: ToastPosition, id: string) {
		setTimeout(
			() => {
				this.#closeMessage(id, position);
			},
			duration,
			this
		);
	}

	#hasReachedMaximum(position: ToastPosition, maxNumOfMessages: number) {
		if (maxNumOfMessages <= 0) return false;
		return (this.#messages.get(position) as Message[]).length >= maxNumOfMessages;
	}

	#dequeueOldestMessage(position: ToastPosition) {
		(this.#messages.get(position) as Message[]).shift();
	}

	success({
		message,
		position = 'topLeft',
		duration = this.#defaultDuration,
		maxNumOfMessages = this.#defaultMaxNumOfMessages
	}: ToastArgs) {
		if (this.#hasReachedMaximum(position, maxNumOfMessages)) this.#dequeueOldestMessage(position);
		const id = nanoid();
		(this.#messages.get(position) as Message[]).push({
			id,
			message,
			type: 'success',
			duration
		});

		render(
			<>
				{positions.map(pos => (
					<Toasts
						key={pos}
						position={pos}
						messages={this.#messages.get(pos) as Message[]}
						closeMessage={this.#closeMessage.bind(this)}
					/>
				))}
			</>,
			this.#rootElem
		);
		this.#autoCloseMessage(duration, position, id);
	}

	warning({
		message,
		position = 'topLeft',
		duration = this.#defaultDuration,
		maxNumOfMessages = this.#defaultMaxNumOfMessages
	}: ToastArgs) {
		if (this.#hasReachedMaximum(position, maxNumOfMessages)) this.#dequeueOldestMessage(position);
		const id = nanoid();
		(this.#messages.get(position) as Message[]).push({
			id,
			message,
			type: 'warning',
			duration
		});

		render(
			<>
				{positions.map(pos => (
					<Toasts
						key={pos}
						position={pos}
						messages={this.#messages.get(pos) as Message[]}
						closeMessage={this.#closeMessage.bind(this)}
					/>
				))}
			</>,
			this.#rootElem
		);
		this.#autoCloseMessage(duration, position, id);
	}

	error({
		message,
		position = 'topLeft',
		duration = this.#defaultDuration,
		maxNumOfMessages = this.#defaultMaxNumOfMessages
	}: ToastArgs) {
		if (this.#hasReachedMaximum(position, maxNumOfMessages)) this.#dequeueOldestMessage(position);
		const id = nanoid();
		(this.#messages.get(position) as Message[]).push({
			id,
			message,
			type: 'error',
			duration
		});

		render(
			<>
				{positions.map(pos => (
					<Toasts
						key={pos}
						position={pos}
						messages={this.#messages.get(pos) as Message[]}
						closeMessage={this.#closeMessage.bind(this)}
					/>
				))}
			</>,
			this.#rootElem
		);
		this.#autoCloseMessage(duration, position, id);
	}

	info({
		message,
		position = 'topLeft',
		duration = this.#defaultDuration,
		maxNumOfMessages = this.#defaultMaxNumOfMessages
	}: ToastArgs) {
		if (this.#hasReachedMaximum(position, maxNumOfMessages)) this.#dequeueOldestMessage(position);
		const id = nanoid();
		(this.#messages.get(position) as Message[]).push({
			id,
			message,
			type: 'info',
			duration
		});

		render(
			<>
				{positions.map(pos => (
					<Toasts
						key={pos}
						position={pos}
						messages={this.#messages.get(pos) as Message[]}
						closeMessage={this.#closeMessage.bind(this)}
					/>
				))}
			</>,
			this.#rootElem
		);
		this.#autoCloseMessage(duration, position, id);
	}
}
