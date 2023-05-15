import supertest from 'supertest';
import app from '../../app';
import orm from '../../sequelize';
import factory from '../factories';
import Post from '../../models/post';

const request = supertest(app.callback());

describe('Posts routes', () => {
  let posts: Post[];
  let post: Post;

  beforeAll(async () => {
    await orm.sync({ force: true });

    posts = await factory.createMany('Post', 9);
    post = posts[0];
  });

  afterAll(async () => {
    await orm.close();
  });

  describe('Create', () => {
    test('Missing param - throws error', async () => {
      const response = await request.post('/posts').send({ other: 'incorrect param' });

      expect(response.status).toBe(400);
    });

    test('executes correctly', async () => {
      const response = await request
        .post('/posts')
        .send({ name: 'Post 1', description: 'hello' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining({
        id: expect.any(Number),
        name: 'Post 1',
        description: 'hello',
      }));
    });
  });

  describe('List', () => {
    test('executes correctly', async () => {
      const response = await request.get('/posts');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(10);
    });
  });

  describe('Show', () => {
    test('throws 404 when not found', async () => {
      const response = await request.get(`/posts/${999}`);

      expect(response.status).toBe(404);
    });

    test('executes correctly', async () => {
      const response = await request.get(`/posts/${post.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({ name: post.name }));
    });
  });

  describe('Update', () => {
    test('executes correctly', async () => {
      const response = await request.put(`/posts/${post.id}`).send({ name: 'hello there' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({ name: 'hello there' }));
    });

    test('some error', async () => {
      jest.spyOn(Post.prototype, 'update').mockRejectedValueOnce(new Error('Mock error'));
      const response = await request.put(`/posts/${post.id}`).send({ name: 'hello there' });

      expect(response.status).toBe(400);
    });
  });

  describe('Destroy', () => {
    test('executes correctly', async () => {
      const response = await request.delete(`/posts/${post.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({ id: post.id }));
      const deletedPost = await Post.findByPk(post.id);
      expect(deletedPost).toBeNull();
    });
  });
});
