import TodoList from './Components/TodoList'

function App() {

  return (
    <>
      <div className='box-border h-screen p-5 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'>
        <h1 className='text-center text-3xl font-bold'>React To Do List</h1>
        <div className='flex justify-center m-5'>
          <TodoList />
        </div>
      </div>
    </>
  )
}

export default App;
