import { Posts } from './features/posts/Posts';
import './styles/App.scss';

function App() {
  return (
    <div className="AppContainer">
      <div className="App">
        <h1>Posts App</h1>
        <Posts />
      </div>
    </div>
  );
}

export default App;
