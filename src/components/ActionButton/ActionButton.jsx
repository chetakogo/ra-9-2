import './ActionButton.css';

function ActionsButton({type, ...props}) {
  return (
    <button className={`actions-button ${type}-button`} {...props}>
      {props.children}
    </button>
  )
}

export default ActionsButton;

ActionsButton.defaultProps = {
  type: 'primary',
}