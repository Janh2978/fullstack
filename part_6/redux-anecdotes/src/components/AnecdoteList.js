import React from 'react';
import { connect } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.voteAnecdote(anecdote.id)
    props.setNotification(`you voted '${anecdote.content}'`, 3)
  }
  return (
    <div>
      {props.anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  if(filter === '') {
    return anecdotes
  }
  return anecdotes.filter(a => a.content.includes(filter))
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)