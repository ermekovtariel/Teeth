import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const login = createAsyncThunk("/login", async (props) => props)

export const changeProfileDrawer = createAsyncThunk("/changeProfileDrawer", async (props) => props)
export const changeProfileData = createAsyncThunk("/changeProfileData", async (props) => props)
export const saveProfileData = createAsyncThunk("/saveProfileData", async (props) => {
    const storageUser = localStorage.getItem("user")
    const parseUser = JSON.parse(storageUser)
    try {
         const user  = await axios.put("http://localhost:5000/api/user", 
             {
                 name: props.name,
                 surname: props.surname,
                 city: props.city,
                 sex: props.sex
            },
            {
                headers: {
                    Authorization:`Bearer ${parseUser.token}`
                }
            }
         )
         return user.data.user
     } catch (error) {
         console.log(error);
     }
})
export const onExitUser = createAsyncThunk("/onExitUser", async () => {
    localStorage.removeItem('user');
    window.location.href = '/';
})


export const register = createAsyncThunk("/register", async (props) => props)

export const getUser = createAsyncThunk("/getUser", async (props) => {
    try {
        const user  = await axios.get("http://localhost:5000/api/user", 
            {
                headers: {
                    Authorization:`Bearer ${props}`
                }
            }
        )
        return user.data.user
    } catch (error) {
        console.log(error);
    }
})

export const logout = createAsyncThunk("/logout", async () => {
    try {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        return true
    } catch (error) {
        console.log(error);
    }
})

