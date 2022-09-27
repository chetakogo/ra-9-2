import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ActionsButton from '../ActionButton/ActionButton';
import './FormCard.css';

function FormCard(props) {
  const cn = bem('FormCard');
  const [content, setContent] = useState(props.content || '');

  const handleClick = (content) => {
    props.onClick(content);
  };

  const closeActions = () => {
    props.onClose();
  };

  return (
    <div className={cn()}>
      <header className={cn('header')}>
        <h3>{props.title}</h3>
        <span className={cn('close-btn')} onClick={() => closeActions()}></span>
      </header>
      <form className={cn('form')}>
        <label>
          <textarea
            className={cn('input-field')}
            value={content}
            name='content'
            rows='5'
            maxLength='400'
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
      </form>
      <div className={cn('actions')}>
        <ActionsButton onClick={() => handleClick(content)}>
          {props.btnName}
        </ActionsButton>
      </div>
    </div>
  );
}

export default FormCard;

FormCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  btnName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

FormCard.defaultProps = {
  title: '',
  content: '',
}