import React from 'react'
import TodoItem from '../components/TodoItem'
import Header from '../components/Header'

function Todo() {
  return (
    <div className="min-h-screen pb-10 bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300">
    <Header/>
    <TodoItem/>
    </div>
  )
}

export default Todo