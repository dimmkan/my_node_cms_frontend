import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default class LabelsService {
  async getPosts() {
    const response = await instance.get('/posts');
    return response.data;
  };

  async createPost(postEntity) {
    const response = await instance.post('/posts', postEntity);
    return response.data;
  }

  async updatePost(postEntity, postId) {
    const response = await instance.patch(`/posts/${postId}`, postEntity);
    return response.data;
  }

  deletePost(postId) {
    return instance.delete(`/posts/${postId}`);
  }
}