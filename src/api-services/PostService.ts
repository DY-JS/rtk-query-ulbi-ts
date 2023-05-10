import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '../types/IPost';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4200',
  }),
  tagTypes: ['Posts'], //для ревалидации изменений
  endpoints: (build) => ({
    //автоматически создаётся хук useFetchAllPostsQuery
    //IPost[] - то что вернётся, number -аргумент
    fetchAllPosts: build.query<IPost[], number>({
      query: (limit: number = 5) => ({
        url: `/posts`,
        params: {
          _limit: limit,
        },
      }),
      providesTags: ['Posts'], //для ревалидации изменений
    }),
    //автоматически создаётся хук useCreatePostMutation()
    createPost: build.mutation<IPost, IPost>({
      //IPost[] - то что вернётся, number -аргумент
      query: (post) => ({
        url: `/posts`,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Posts'], //для ревалидации изменений - заново получит посты
    }),
    //автоматически создаётся хук useUpdatePostMutation()
    updatePost: build.mutation<IPost, IPost>({
      //IPost[] - то что вернётся, number -аргумент
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: ['Posts'], //для ревалидации изменений - заново получит посты
    }),
    //автоматически создаётся хук useDeletePostMutation()
    deletePost: build.mutation<IPost, IPost>({
      //IPost[] - то что вернётся, number -аргумент
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'], //для ревалидации изменений - заново получит посты
    }),
  }),
});
