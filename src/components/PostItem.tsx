import { FC } from 'react';
import { IPost } from '../types/IPost';

interface PostItemProps {
  post: IPost;
  remove: (post: IPost) => void;
  update: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({ post, remove, update }) => {
  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation(); //чтобы клик на кнопку не всплывал, т как есть ещё и клик на весь блок
    remove(post);
  };

  const handleUpdate = (event: React.MouseEvent) => {
    const title = prompt() || '';
    update({ ...post, title });
  };

  return (
    <div>
      <div className="post" onClick={handleUpdate}>
        {post.id}.{post.title}
        <button onClick={handleRemove}>Delete</button>
      </div>
    </div>
  );
};

export default PostItem;
