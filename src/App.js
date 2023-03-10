import React,{useState,useEffect} from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  
  const [inputText,setInputText]=useState("");
  const [todos,setTodos]=useState([]);
  const [status,setStatus]=useState('all');
  const [filteredTodos,setFilteredTodos]=useState([]);

  useEffect(()=>{
    getLocalTodos();
  },[])
  //use effect
  useEffect(()=>{
    filterHandler();
    saveLocalTodos();
  },[todos,status])

  const filterHandler=()=>{
    switch(status){
      case "completed":
        setFilteredTodos(todos.filter(todo=>todo.completed===true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo=>todo.completed===false));
        break;
      default:
        setFilteredTodos(todos);
        break;

    }
  }

  //save to local
  const saveLocalTodos=()=>{
    
      localStorage.setItem("todos",JSON.stringify(todos));
    
  };

  const getLocalTodos=()=>{
    if(localStorage.getItem("todos")===null){
      localStorage.setItem("todos",JSON.stringify([]));
    }else{
      let todoLocal=JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h3>Welcome to Xiaohan's Todo List!</h3>
      </header>
      <Form setInputText={setInputText} todos={todos} setTodos={setTodos} inputText={inputText}
      setStatus={setStatus} filteredTodos={filteredTodos}/>
      <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
