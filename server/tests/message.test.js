const expect = require('expect')

const { generateMessage } = require('./../utils/message')

describe('generateMessage', () => {
	it('should generate the massage correct object', () => {
		let from = "ogekriana"
		let text = "hello from the other side"
		let message = generateMessage(from, text)

		expect(message.createdAt).toBeA('number')
		expect(message).toInclude({ from, text })
	})
})