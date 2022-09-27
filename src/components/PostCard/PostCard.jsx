import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import CardHeader from '../CardHeader/CardHeader';
import './PostCard.css';

function PostCard(props) {
  const { post } = props;
  const cn = bem('PostCard');
  return (
    <div className={cn()}>
      <CardHeader post={post} />
      <p className={cn('content')}>{post.content}</p>
    </div>
  );
}

export default PostCard;

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
}