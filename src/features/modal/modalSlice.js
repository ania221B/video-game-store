import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modalState: 'CLOSED',
  content: null
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modalState = 'OPEN'
      state.content = action.payload
    },
    hideModal: state => {
      state.modalState = 'IS-CLOSING'
    },
    closeModal: state => {
      state.modalState = 'CLOSED'
      state.content = null
    }
  }
})

export const { openModal, hideModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
