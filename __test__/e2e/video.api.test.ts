import request from "supertest"
import {app} from "../../src";

describe('/videos', () => {
    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })


    it('should return 200 and empty array', async () => {
       await request(app)
           .get('/videos')
           .expect(200, [])
    })

    it('should return 404 for not existing videos', async () => {
        await request(app)
            .get('/videos/1')
            .expect(404)
    })

    it('should`nt create video with incorrect input data', async () => {
        await request(app)
            .post('/videos')
            .send({title : '', author: ''})
            .expect(400)

    });
})