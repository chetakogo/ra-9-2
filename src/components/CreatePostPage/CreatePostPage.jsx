import { useNavigate } from 'react-router-dom';
import FormCard from '../FormCard/FormCard';
import './CreatePostPage.css';

function CreatePostPage() {
  const navigate = useNavigate();

  const publishPost = async (content) => {
    if (!content.length) return;
    try {
      const sendData = await fetch(process.env.REACT_APP_API_URL, {
        method: 'POST',
        body: JSON.stringify({
          id: 0,
          content,
        }),
      });
      if (sendData.status >= 200 && sendData.status < 300) {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormCard
      title={'Создать запись'}
      btnName={'Опубликовать'}
      onClick={publishPost}
      onClose={() => navigate('/')}
    />
  );
}
export default CreatePostPage;