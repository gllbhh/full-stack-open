import { useState } from 'react'
import Button from './Button'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState(anecdotes.map(() => 0));
  console.log("votes:",votes);

  const [selected, setSelected] = useState(0)

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  const getRandomAnecdote = () =>{
    setSelected(getRandomInt(anecdotes.length));
  }

  const vote = (selected) => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    console.log("New Votes", newVotes);
    setVotes(newVotes);
  }
  
  return (
    <div  className='d-flex flex-column justify-content-center align-items-center vh-100'>
      <div style={{maxWidth: '600px'}}>
      {anecdotes[selected]}
      </div>
      <div>

      <Button props={{onClick: () => vote(selected), text: 'Vote +1'}}/>     
      <Button props={{onClick: getRandomAnecdote, text: 'Get Anecdote'}}/>     
      </div>
    </div>
  )
}

export default App