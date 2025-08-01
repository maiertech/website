import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
	return {
		defaultOgImageUrl:
			'https://create.viral.cards/api/v1/satori?meta=%7B%22template%22%3A%22maiertech%22%2C%22title%22%3A%22Notes+and+posts+about+web+development%22%2C%22avatarName%22%3A%22Thilo+Maier%22%2C%22avatarImageUrl%22%3A%22https%3A%2F%2Fwww.maier.tech%2Fassets%2Fportrait-thilo-maier.jpg%22%2C%22height%22%3A630%2C%22width%22%3A1200%2C%22colors%22%3A%7B%22ink%22%3A%22%23020617%22%2C%22surface%22%3A%22%23f8fafc%22%2C%22primary%22%3A%22%231e40af%22%2C%22accent%22%3A%22%23f97316%22%7D%2C%22fonts%22%3A%5B%7B%22name%22%3A%22Roboto%22%2C%22style%22%3A%22normal%22%2C%22weight%22%3A300%7D%2C%7B%22name%22%3A%22Roboto%22%2C%22style%22%3A%22normal%22%2C%22weight%22%3A400%7D%2C%7B%22name%22%3A%22Roboto%22%2C%22style%22%3A%22normal%22%2C%22weight%22%3A500%7D%2C%7B%22name%22%3A%22Roboto%22%2C%22style%22%3A%22normal%22%2C%22weight%22%3A600%7D%2C%7B%22name%22%3A%22Roboto%22%2C%22style%22%3A%22normal%22%2C%22weight%22%3A700%7D%2C%7B%22name%22%3A%22Roboto%22%2C%22style%22%3A%22normal%22%2C%22weight%22%3A800%7D%5D%7D&sig=da35c48eae40b4c66c48694f82384ed834f45ff76216c941ea42f7a5f8e8e865'
	};
};
