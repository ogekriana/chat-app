const expect = require('expect')

const { isRealString } = require('./../utils/validation')


describe('isRealString', () => {
	it('should reject non string value', () => {
		let result = isRealString(100)
		expect(result).toBe(false)
	})

	it('should reject string with only spaces', () => {
		let result = isRealString('    ')
		expect(result).toBe(false)
	})

	it('should allow string with non-space character', () => {
		let result = isRealString('   riana')
		expect(result).toBe(true)
	})
})