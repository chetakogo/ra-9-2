import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import formatDate from '../../utils';
import ViewPostCard from '../ViewPostCard/ViewPostCard';
import FormCard from '../FormCard/FormCard';

function ViewPostPage() {
  const [post, setPost] = useState(undefined);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  /**
   * Получаем данные конкретного поста
   */
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller.signal;

    const fetchPost = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/${id}`, {
          signal,
        });
        const data = await response.json();
        setPost({
          ...data,
          created: formatDate(data.created),
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
    return () => controller.abort();
  }, [id]);

  /**
   * Редактирование поста
   */
  const editPost = () => {
    setIsEdit(() => true);
  };

  /**
   * Закрытие окна редактирования
   */
  const closeEdit = () => {
    setIsEdit(() => false);
  };

  /**
   * Сохранить пост
   */
  const savePost = (content) => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL, {
          method: 'POST',
          body: JSON.stringify({
            id: +id,
            content,
          }),
        });
        if (response.status >= 200 && response.status < 300) {
          setIsEdit(false);
          setPost((prevPost) => ({
            ...prevPost,
            content,
          }));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  };

  /**
   * Удаление поста
   */
  const removePost = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + `/${id}`, {
      method: 'DELETE',
    });
    if (response.status >= 200 && response.status < 300) {
      navigate('/');
    }
  };

  return (
    <>
      {!post && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {post && (
        <>
          {isEdit ? (
            <FormCard
              title={'Редактировать пост'}
              btnName={'Сохранить'}
              content={post.content}
              onClick={savePost}
              onClose={closeEdit}
            />
          ) : (
            <ViewPostCard
              post={post}
              editPost={editPost}
              removePost={removePost}
            />
          )}
        </>
      )}
    </>
  );
}

export default ViewPostPage;