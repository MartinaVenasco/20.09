import Form from "./components/Form";
import ToDo from "./components/ToDo";
import Button from "./components/Button";
import { useReducer } from "react";
import "./App.css";

const task = {};

function App() {
  const initialState = {
    list: [],
    counter: 1,
  };
  const reducer = (state, action) => {
   
    switch (action.type) {
      case "AddTask":
        
        let id = state.counter;
        state.list = [...state.list, {...task, id:id }]
        state.counter++
   
      case "DeleteTask": {
        state.list = state.list.filter((obj) => obj.id != action.payload);
      }

      default:
    }

    return {
      ...state,
      list: state.list,
      counter: state.counter
    };
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (e) => {
    task[e.target.name] = e.target.value;
    console.log(task);
  };
  const handleAddDispatch = (e) => {
    dispatch({ type: "AddTask"});
  };

  const handleDeleteDispatch = (e) => {
    dispatch({
      type: "DeleteTask",
      payload: e.target.id,
    });
  };

  return (
    <div className="App">
      <div className="main-container">
        <Form state={state} onChange={handleInputChange}>
          <Button onClick={handleAddDispatch}>Aggiungi</Button>
        </Form>

        {state.list.map((obj, index) => {
          return (
            <div className="task">
              <ToDo
                key={"task" + index}
                todoData={obj}
                onClick={handleDeleteDispatch}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
