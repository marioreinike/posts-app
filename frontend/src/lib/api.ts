import axios, { AxiosInstance } from 'axios';
import { IPost } from '../interfaces';

const baseURL = 'http://localhost:3000';

class Api {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({ baseURL });
  }

  async fetchPosts() {
    const response = await this.axios.get<IPost[]>('/posts');
    return response.data;
  }

  async deletePost(postId: number) {
    const response = await this.axios.delete<IPost>(`/posts/${postId}`);
    return response.data;
  }

  async createPost(postData: Partial<IPost>) {
    const response = await this.axios.post<IPost>('/posts', postData);
    return response.data;
  }
}

export default new Api();
