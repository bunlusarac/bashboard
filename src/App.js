import './App.css';
import {useAppLayerValue} from './context/TodoContext'
import Header from './components/Header';
import TodoGrid from './components/TodoGrid';
import Modal from './components/Modal';
import ActionConstants from './context/ActionConstants';
import EditModal from './components/EditModal';
import clsx from 'clsx';
import { MdLightMode } from 'react-icons/md';

const App = () => {
  const [{ todos, clearModal, editModal, darkMode}, dispatch] = useAppLayerValue();

  const clearAllTodos = () => {
    const clearAllTodosAction = {
      type: ActionConstants.CLEAR_ALL_TODOS
    }

    dispatch(clearAllTodosAction);   
  };

  const contentStyle = clsx({
    ["content-container"]: true,
    ["content-dark"]: darkMode,
    ["content-light"]: !darkMode,
  })

  return (
  <div className="app-container">
    <Header />
    <Modal
    enabled={clearModal}
    headerLabel="Clear all items"
    bodyLabel="Are you sure? This action is irreversible."
    leftButtonLabel="Yes"
    leftButtonVariant="red"
    rightButtonLabel="No"
    rightButtonVariant="primary"
    leftButtonClickHandler={clearAllTodos}
    rightButtonClickHandler={()=>{}}/>
    <EditModal enabled={editModal.enabled}/>

    <div className={contentStyle}>
      <TodoGrid todos={todos} />
    </div>
  </div>
  )
}

export default App
