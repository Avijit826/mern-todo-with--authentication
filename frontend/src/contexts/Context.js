import { createContext, useState, useEffect } from "react"
import axios from "axios"

const Context = createContext()

const ContextProvider = ({children}) =>{
    const [todos, setTodos] = useState()
    const [update, setUpdate] = useState(false)
    const [token, setToken] = useState("higo")

    const handleUpdate = () => {
        setUpdate(!update)
    }
    const handleLogout = () => {
        setToken("")
        handleUpdate()
    }
    return(
        <Context.Provider
            value={{
                token,
                todos,
                handleLogout,

            }}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider }