import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import avatar from '../../assets/avatar.jpg';
import './CardHeader.css';

function CardHeader({ post }) {
  const cn = bem('CardHeader');

  return (
    <header className={cn()}>
      <div className={cn('avatar')}>
        <img src={avatar} alt='avatar' />
      </div>
      <div className={cn('info')}>
        <h6 className={cn('name')}>Иванов Иван</h6>
        <p className={cn('created')}>
          <span className={cn('status')}>Администратор</span>
          <span className={cn('created-date')}>{post.created}</span>
        </p>
      </div>
    </header>
  );
}

export default CardHeader;

CardHeader.propTypes = {
  post: PropTypes.object.isRequired,
}