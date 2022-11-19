import logo from './logo.svg';
import { Button } from 'antd';
import 'antd/dist/reset.css';
import './App.css';
import TaskList from './components/Tasks/TaskList';

function App() {
  return (
    <div className="App">
      <TaskList />
    </div>
  );
}

export default App;
