import nodemailer from 'nodemailer'

class MailService {
	constructor() {
		
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD
			}
		})

		this.transporter.verify((error, success) => {
			if (error) {
				console.log('SMTP ERROR:', error);
			} else {
				console.log('SMTP READY');
			}
		});
	}

	async sendMail(email, activationLink) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: email,
			subject: `Account activation`,
			html: `
			<div>
				<a href="${activationLink}" target="_blank">Activate Account</a>
			</div>
			`
		})
	}
}

export default new MailService()