import React, { useState, useEffect, useContext } from 'react';
import FormAddTodo from './../component/FormAddTodo'
import TosoList from './../component/Todolist'
import todoAPI from './../API/todos'
import TodosContext from './../component/context/todos'
const Home = () => {
    const todoContext = useContext(TodosContext)
    const [myloading, setmyLoading] = useState(false)

    let jsonHandler = (data) => {
        setmyLoading(false)
        let todos = Object.entries(data).map(([key, value]) => {
            return {
                ...value,
                key
            }
        })
        todoContext.dispatch({ type: "init_todo", payload: { todos } })
    }
    useEffect(() => {
        setmyLoading(true)
        todoAPI.get(`/todos.json`)
            .then(response => jsonHandler(response.data))
            .catch(err => { })
    }, [])
    return (

        <>
            <section className="jumbotron">
                <div className="container d-flex flex-column align-items-center">
                    <h1 className="jumbotron-heading">Welcome!</h1>
                    <p className="lead text-muted">To get started, add some items to your list:</p>
                    <FormAddTodo />
                </div>
            </section>
            <div className="todosList">
                <div className="container">
                    <div className="d-flex flex-column align-items-center ">
                        {
                            myloading ? <h2>Loading data ...</h2> : (<TosoList />)
                        }

                    </div>

                </div>
            </div>
        </>
    );
}

export default Home;