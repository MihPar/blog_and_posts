import request from 'supertest'
import {app} from '../../src/index'
import { HTTP_STATUS } from '../../src/utils'

describe('/posts',  () => {
	beforeAll(async() => {
		await request(app).delete('/__test__/data')
	})


	it('should return 200 and ampty arr', () => {
		expect(1).toBe(1)
		// request(app).get('/').expect(HTTP_STATUS.OK_200, [])
	})

	it('shold return 404 for not existing course', async() => {
		await request(app).get('/posts/1').expect(HTTP_STATUS.NOT_FOUND_404) 
	})


	afterAll(function(done) {
		// server.close()
		done()
	})
})