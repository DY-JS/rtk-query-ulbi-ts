import { FC, useState } from 'react';
import { postApi } from '../api-services/PostService';
import PostItem from './PostItem';
import { IPost } from '../types/IPost';

const PostContainer: FC = () => {
  const [limit, setLimit] = useState(15);
  // Получение постов с помощью хука postApi.useFetchAllPostsQuery из postApi
  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = postApi.useFetchAllPostsQuery(limit, {
    //pollingInterval: 1000, //запрос через каждые 1с - аналог websocket
    //refetchOnFocus, refetchOnMountOrArgChange, refetchOnReconnect, selectFromResult
  });

  // Создание поста с помощью хука postApi.useCreatePostMutation из postApi
  //createPost - ф-ция создания - первый эл-т кортежа
  const [
    createPost,
    { isLoading: createLoading, error: createError },
  ] = postApi.useCreatePostMutation();

  // Удаление поста с помощью хука postApi.useDeletePostMutation из postApi
  //deletePost - ф-ция создания - первый эл-т кортежа
  const [
    deletePost,
    { isLoading: deleteLoading, error: deleteError },
  ] = postApi.useDeletePostMutation();

  const [
    updatePost,
    { isLoading: updateLoading, error: updateError },
  ] = postApi.useUpdatePostMutation();

  const handleCreate = async () => {
    const title = prompt();
    await createPost({ title, body: title } as IPost); //id сервер сам сгенерирует
  };

  const handleRemove = async (post: IPost) => {
    await deletePost(post);
  };

  const handleUpdate = async (post: IPost) => {
    updatePost(post);
  };

  return (
    <div>
      <button onClick={() => refetch()}>REFETCH</button>
      <button onClick={handleCreate}>Add new post</button>
      <div className="post__list">
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>Error...</h1>}
        {posts &&
          posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              remove={handleRemove}
              update={handleUpdate}
            />
          ))}
      </div>
    </div>
  );
};

export default PostContainer;
