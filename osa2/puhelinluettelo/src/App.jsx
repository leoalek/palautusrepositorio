import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

//Filter section
const Filter = (props) =>{
  return(
    <div>
      <form>
        <div>
          Filter shown with <input value={props.filter} onChange={props.handleFilter}/>
        </div>
      </form>
    </div>
  )
}

//form for new persons info.
const PersonForm = (props) =>{
  return(
    <div>
      <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>
          number: <input value={props.newNum} onChange={props.handleNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

// List of numbers and persons part
const Persons = ({persons, filter, removePerson}) => {
  return(
    <div>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person =>
            <li key={person.id}>
            {person.name}: {person.number}
            <button onClick={() => removePerson(person.id)}>delete</button>
            </li>
          )}
    </div>
  )
}

// action notifications.(Delete, Add, update number)
const Notification = ({message,msgType}) =>{
  if(message === null){
    return null
  }
  return(
    <div className={msgType}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [msgType, setMsgType] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initPersons => {
        setPersons(initPersons)
      })
  },[])

  const addPerson = (event) =>{
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNum
    }

    const existingPerson = persons.find(person => person.name === personObject.name)
    if(existingPerson){
      if(window.confirm(`${newName} is already added to phonebook. Replace the number?`)){
        personService
          .updateNumber(existingPerson.id,personObject)
          .then(returnedPerson =>{
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setMsgType("updated")
            setMessage(`${returnedPerson.name} number updated`)
            setTimeout(() => {
            setMessage(null)
            setMsgType(null)
          },1000)
          })
      }

    }else{
      personService
        .create(personObject)
        .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNum('')
            setMsgType('added')
            setMessage(`${newName} added`)
            setTimeout(() => {
              setMessage(null)
              setMsgType(null)
            },1000)
        })
      }
  }

  const removePerson = (id) =>{
    const personObject = persons.find(person => person.id === id)
    if(window.confirm(`You are deleting ${personObject.name}. Are you sure?`)){
      personService
        .del(id)
        .then(() => {
          setPersons(persons.filter(person => person !== personObject))
          setMsgType("removed")
          setMessage(`Name ${personObject.name} DELETED`)
          setTimeout(() => {
            setMessage(null)
            setMsgType(null)
          },1000)
        }).catch(error => {
          console.error("Error while deleting object",error)
          setMsgType('error')
          setMessage(`${personObject} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
            setMsgType(null)
          },1500)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={message} msgType={msgType}></Notification>
        <Filter filter={filter} handleFilter={handleFilter}></Filter>
      <h2>Add a new</h2>
        <PersonForm 
          addPerson={addPerson} 
          newName={newName} 
          newNum={newNum}
          handleNameChange={handleNameChange}
          handleNumChange={handleNumChange}
          >
        </PersonForm>
      <h2>Numbers</h2>
        <ul>
          <Persons persons={persons} filter={filter} removePerson={removePerson}></Persons>
        </ul>
    </div>
  )
}

export default App
