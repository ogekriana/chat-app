const expect = require('expect')

const { Users } = require('./../models/users')

describe('Users Class', () => {
	var users

	beforeEach(() => {
		users = new Users()
		users.users = [{
			id: '1',
			name: 'Mahlia',
			room: 'ROOM A'
		}, {
			id: '2',
			name: 'Dewi',
			room: 'ROOM B'
		}, {
			id: '3',
			name: 'Madee',
			room: 'ROOM A'
		}]
	})

	it('should add new user', () => {
		let users = new Users()
		let user = {
			id: '123',
			name: 'riana',
			room: 'ROOM C'
		}
		let newUsers = users.addUser(user.id, user.name, user.room)
		expect(users.users).toEqual([user])
	})

	it('should remove a user', () => {
		let userId = '2'
		let user = users.removeUser(userId)
		expect(user.id).toBe(userId)
		expect(users.users.length).toBe(2)
	})

	it('should not remove a user', () => {
		let userId = '222'
		let user = users.removeUser(userId)
		expect(user).toNotExist()
		expect(users.users.length).toBe(3)
	})

	it('should find user', () => {
		let userId = '2'
		let user = users.getUser(userId)
		expect(user.id).toBe(userId)
	})

	it('should not find user', () => {
		let user = users.getUser('222')
		expect(user).toNotExist()
	})

	it('should return names for ROOM A', () => {
		let userList = users.getUserList('ROOM A')
		expect(userList).toEqual(['Mahlia', 'Madee'])
	})

	it('should return names for ROOM B', () => {
		let userList = users.getUserList('ROOM B')
		expect(userList).toEqual(['Dewi'])
	})
})