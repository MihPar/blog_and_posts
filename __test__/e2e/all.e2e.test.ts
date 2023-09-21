import request from "supertest";
import { app } from "../../src/index";
import { HTTP_STATUS } from "../../src/utils";

describe("/posts and blogs", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });

  it("should return 200 and ampty arr", async () => {
    await request(app)
      .get("/posts")
      .expect(HTTP_STATUS.OK_200, [
        {
          id: "1",
          title: "Front-end_developer",
          shortDescription: "Freelancer",
          content: "I make web-site very well",
          blogId: "01",
          blogName: "Peet",
        },
        {
          id: "2",
          title: "Back-end_developer",
          shortDescription: "Freelance",
          content: "In short time make your site",
          blogId: "02",
          blogName: "John",
        },
        {
          id: "3",
          title: "DevOps",
          shortDescription: "Freelancer",
          content: "I like my job",
          blogId: "03",
          blogName: "Mickle",
        },
      ]);
  });

  it("should return 200 and ampty arr", async () => {
    await request(app)
      .get("/blogs")
      .expect(HTTP_STATUS.OK_200, [
        {
          id: "1",
          name: "Pet",
          description: "Freelancer",
          websiteUrl: "http://localhost: 4000/Pet",
        },
        {
          id: "2",
          name: "John",
          description: "Freelancer",
          websiteUrl: "http://localhost: 4000/John",
        },
        {
          id: "3",
          name: "Bread",
          description: "Freelancer",
          websiteUrl: "http://localhost: 4000/Bread",
        },
      ]);
  });

  it("shold return 401 for not authorization posts", async () => {
    await request(app)
      .get("/posts/" + 1)
      .expect(HTTP_STATUS.NOT_AUTHORIZATION_401);
  });

  it("shold return 401 for not authorization posts", async () => {
    await request(app)
      .get("/posts/" + 1)
      .expect(HTTP_STATUS.NOT_AUTHORIZATION_401);
  });

  let createResponse: any = null
  it("should create post with correct input data", async () => {
     createResponse = await request(app)
      .post("/posts")
      .send({
        title: "newMan",
        shortDescription: "new decsription",
        content: "Hello Mickle",
        blogId: "999",
        blogName: "One",
      })
      .expect(HTTP_STATUS.CREATED_201);

	  const createPost = createResponse.body
	  expect(createPost).toEqual({
		id: expect.any(Number),
		title: "newMan",
        shortDescription: "new decsription",
        content: "Hello Mickle",
        blogId: "999",
        blogName: "One",
	  })
	  await request(app).get('/posts').expect(HTTP_STATUS.OK_200, [createResponse])
	});

  it("shouldn't update post with incorrect input data", async () => {
    createResponse = await request(app)
      .put("/posts/" + createResponse.id)
      .send({ title: "" })
      .expect(HTTP_STATUS.BAD_REQUEST_400);

    await request(app)
      .get("/posts/" + createResponse.id)
      .expect(HTTP_STATUS.OK_200, [createResponse]);
  });

  it("shouldn't update post_1 with incorrect input data", async () => {
    createResponse = await request(app)
      .put("/posts/" + '1')
      .send({ title: "" })
      .expect(HTTP_STATUS.BAD_REQUEST_400);

    await request(app)
      .get("/posts/" + '1')
      .expect(HTTP_STATUS.OK_200, [createResponse]);
  });

  it('should update posts with correct iput data', async function() {
	await request(app)
	.put('/posts/' + '2')
	.send({
		title: "New_Front-end_developer",
		shortDescription: "Freelancer at life",
		content: "I make web-site very well",
		blogId: "999999",
		blogName: "Mark Tven"
	})
	.expect(HTTP_STATUS.CREATED_201)

	await request(app)
	.get('/posts/' + '2')
	.expect(HTTP_STATUS.OK_200)
  })

  it('should deleted posts', async () => {
	await request(app).delete('/posts').expect(HTTP_STATUS.NOT_FOUND_404)
  })
	
  afterAll(function (done) {
    // server.close()
    done();
  });
});
