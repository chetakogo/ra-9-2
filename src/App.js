import {cn as bem} from '@bem-react/classname';
import {Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import CreatePostPage from './components/CreatePostPage/CreatePostPage';
import ViewPostPage from './components/ViewPostPage/ViewPostPage';
import './App.css';

function App() {
  const cn = bem('App');

  return (
    <div className={cn()}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='posts/new' element={<CreatePostPage />} />
        <Route path='posts/:id' element={<ViewPostPage />} />
      </Routes>
    </div>
  );
}

export default App;