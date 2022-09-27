import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import formatDate from '../../utils';
import ActionsButton from '../ActionButton/ActionButton';
import PostCard from '../PostCard/PostCard';

import './HomePage.css';

function HomePage() {
  const cn = bem('HomePage');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL, {
          signal,
        });
        const data = await response.json();
        if (response.status >= 200 && response.status < 300) {
          const posts = data.map((item) => {
            item.created = formatDate(item.created);
            return item;
          })
          setPosts(() => posts);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <div className={cn()}>
      <header className={cn('header')}>
        <Link to='posts/new'>
          <ActionsButton>Создать пост</ActionsButton>
        </Link>
      </header>
      <div className={cn('content')}>
        {!posts.length ? (
          <h3 className={cn('message')}>Постов нет</h3>
        ) : (
          <ul>
            {posts.map((post) => (
              <li className={cn('post')} key={post.id}>
                <Link to={`/posts/${post.id}`}>
                  <PostCard post={post} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HomePage;