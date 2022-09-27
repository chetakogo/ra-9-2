import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import CardHeader from '../CardHeader/CardHeader';
import ActionsButton from '../ActionButton/ActionButton';
import './ViewPostCard.css';

function ViewPostCard(props) {
  const cn = bem('ViewPostCard');
  const { post } = props;
  const navigate = useNavigate();

  const callbacks = {
    onEditPost: () => {
      props.editPost();
    },
    onRemovePost: () => {
      props.removePost();
    },
    onClose: () => {
      navigate('/');
    },
  };

  return (
    <div className={cn()}>
      <CardHeader post={post} />
      <div className={cn('content')}>{post.content}</div>
      <div className={cn('actions')}>
        <ActionsButton onClick={() => callbacks.onEditPost()}>
          Изменить
        </ActionsButton>
        <ActionsButton type={'remove'} onClick={() => callbacks.onRemovePost()}>
          Удалить
        </ActionsButton>
      </div>
      <span
        className={cn('close-btn')}
        onClick={() => callbacks.onClose()}
      ></span>
    </div>
  );
}

export default ViewPostCard;

ViewPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  editPost: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
}