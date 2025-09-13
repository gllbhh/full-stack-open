import { useState } from 'react'
import Button from './Button'

const App = () => {
  // array of anecdotes
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
  //useState variable to store votes for anecdotes
  const [votes, setVotes] = useState(anecdotes.map(() => 0));
  // useState variable to store the index of selected anecdote
  const [selected, setSelected] = useState(0);
  // useState variable to store index of an anecdote with max votes
  const [maxVotes, setMaxVotes] = useState(0);
  console.log("votes:",votes);

  // randoom integer from [0..max]
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  // set 'selected' variable to a random int [0..anecdotes.length]
  const getRandomAnecdote = () =>{
    setSelected(getRandomInt(anecdotes.length));
  }

  // function to handle voting
  const vote = (selected) => {
    // copy of votes
    const newVotes = [...votes];
    // increment votes on index corresponding to 'selected'
    newVotes[selected] += 1;
    console.log("New Votes", newVotes);
    // set maxVotes to index of member with max votes
    setMaxVotes(newVotes.indexOf(Math.max(...newVotes)));
    console.log('index of most popular anecdote: ', maxVotes);
    // update votes with newVotes
    setVotes(newVotes);
  }

  // variable for conditional rendering
  let mostVotedAnecdote;
  // displays 'No Votes Casted Yet' if (maxVotes === 0)
  if (votes[maxVotes] === 0){
      mostVotedAnecdote = (
       <p>No Votes Casted Yet</p>
      );
    // in other case, displays an anecdote with maximum votes (first one in the arry in case of a tie)  
    } else{
      mostVotedAnecdote =  (
      <p>
      {anecdotes[maxVotes]}
      </p>
      );

    }


  return (
    <div  className='d-flex flex-column justify-content-center align-items-center vh-100'>
      <div style={{maxWidth: '600px'}}>
        <h2>Random Anecdote</h2>
        <p>{anecdotes[selected]}</p>
      </div>
      <div>
        <Button props={{onClick: () => vote(selected), text: 'Vote +1'}}/>     
        <Button props={{onClick: getRandomAnecdote, text: 'Get Anecdote'}}/>     
      </div>
      <div style={{maxWidth: '600px'}}>
        <h2>Most Voted Anectode</h2>
        {mostVotedAnecdote}
      </div>
    </div>
  )
}

export default App