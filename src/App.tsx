import { useEffect } from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUsers } from './features/ActionCreators';
import PostContainer from './components/PostContainer';

function App() {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers()); //это асинхронный экшн получения данных из ActionCreators
  }, []);

  return (
    <div className="App">
      {/* {isLoading && <h1>Loading...</h1>} 
       {error && <h1>{error}</h1>}
    <header className="App-header">{ <Counter /> }</header>
       { JSON.stringify(users, null, 2) }  */}
      {/* <div style={{ display: 'flex' }}> */}
      <PostContainer />
      {/* <PostContainer /> */}
      {/* </div> */}
    </div>
  );
}

export default App;
