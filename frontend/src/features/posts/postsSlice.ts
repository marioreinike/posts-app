import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import api from '../../lib/api';
import { IPost } from '../../interfaces';

export interface PostsState {
  value: IPost[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  value: [],
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(setPosts(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const setPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await api.fetchPosts();
    return response;
  },
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId: number) => {
    const response = await api.deletePost(postId);
    return response;
  },
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: Partial<IPost>) => {
    const response = await api.createPost(postData);
    return response;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(setPosts.pending, (state) => {
        state.status = 'loading';
        state.value = [];
      })
      .addCase(setPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(setPosts.rejected, (state) => {
        state.status = 'failed';
      })
      // Delete Post
      .addCase(deletePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = state.value.filter((post) => post.id !== action.payload.id);
      })
      .addCase(deletePost.rejected, (state) => {
        state.status = 'failed';
      })
      // Create Post
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = [...state.value, action.payload];
      })
      .addCase(createPost.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.posts.value)`
export const selectPosts = (state: RootState) => state.posts.value;

export default postsSlice.reducer;
