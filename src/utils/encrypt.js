import * as bcrypt from "bcrypt";

export async function encrypt(text) {
	return new Promise((resolve, reject) => {
		const saltRounds = 10;

		bcrypt.hash(text, saltRounds, (err, hash) => {
			if (err) {
				reject(err);
				return;
			}

			console.log(hash);
			resolve(hash);
		});
	});
}

export async function compare(text1, text2) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(text2, text1, (err, result) => {
			if (result) return resolve(result);
			reject(err)
		});
	});
}
