import { createSlice } from "@reduxjs/toolkit"

import { login, logout, register, getUser, changeProfileDrawer, onExitUser, changeProfileData, saveProfileData } from "./action"

const user = localStorage.getItem("user");

const initialState = {
	role: user && user !== "undefined" ? JSON.parse(user)?.role ?? null : null,
	user: user && user !== "undefined" ? JSON.parse(user) : null,
	token: JSON.parse(user)?.token && JSON.parse(user)?.token !== "undefined" ? JSON.parse(user)?.token : null,
	isLoading: false,
	profile: {
		isOpen: false
	}
}

export const authSlice = createSlice({
	name: "authSlice",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getUser.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(onExitUser.fulfilled, (state) => {
			state.role=undefined
			state.user=undefined
			state.token=undefined
			state.isLoading=undefined
			state.profile.isOpen=undefined
		})
		
		builder.addCase(changeProfileData.fulfilled, (state, { payload }) => {
			const {value, name} = payload
			state.user[name] = value
			
		})
		
		builder.addCase(saveProfileData.fulfilled, (state, { payload }) => {
			console.log(payload);
			
			state.profile = {
				...state.profile,
				isOpen: !state.profile.isOpen
			}
			// if(state.profile.isOpen){
			state.user= {
				...state.user,
				...payload
			}
			// }
		})
		builder.addCase(changeProfileDrawer.fulfilled, (state) => {
			state.profile = {
				...state.profile,
				isOpen: !state.profile.isOpen
			}
			if(!state.profile.isOpen){
				state.role= user && user !== "undefined" ? JSON.parse(user)?.role ?? null : null
				state.user= user && user !== "undefined" ? JSON.parse(user) : null
				state.token= JSON.parse(user)?.token && JSON.parse(user)?.token !== "undefined" ? JSON.parse(user)?.token : null
			}
		})
		
		builder.addCase(getUser.fulfilled, (state, { payload }) => {
			const newUser = {
				...JSON.parse(user),
				...payload
			}
			state.user = newUser
			localStorage.setItem("user", JSON.stringify(newUser))
			state.isLoading = false
		})
		builder.addCase(getUser.rejected, (state) => {
			state.isLoading = false
		})
		builder.addCase(login.fulfilled, (state, { payload }) => {
			state.token = payload.user.token
			state.user = payload.user
			state.role = payload.user.role
		})
		builder.addCase(register.fulfilled, (state, { payload }) => {
			state.token = payload.user.token
			state.user = payload.user
			state.role = payload.user.role
		})
		builder.addCase(logout.fulfilled, (state) => {
			state.role = null
			state.token = null
			state.user = null
		})
	}
})

export default authSlice.reducer
