import { createContext, useState, useEffect } from "react"
import axios from "axios"

const Context = createContext()

const ContextProvider = ({children}) =>{
    const url = process.env.REACT_APP_API_URL
    const [todos, setTodos] = useState()
    const [update, setUpdate] = useState(false)
    const [token, setToken] = useState("")

    const handleUpdate = () => {
        setUpdate(!update)
    }
    const handleLogout = () => {
        setToken("")
        handleUpdate()
    }
    const getTodos = async () =>{
        await axios.get(`${url}/todo`)
        .then((res)=>{
            console.log(res.data)
            setTodos(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return(
        <Context.Provider
            value={{
                token,
                todos,
                handleUpdate,
                update,
                handleLogout,
                getTodos,

            }}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider }