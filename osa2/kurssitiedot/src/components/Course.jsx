const Content = (props) =>{
    return(
      <div>
        <ul style={{ listStyleType: 'none'}}>
          {props.content.map(part => 
            <Part key={part.id} name={part.name} exercises={part.exercises}/>
            )}
            <br/>
            <Total exercises = {props.content.map(numbers => numbers.exercises)}></Total>
        </ul>
      </div>
    )
  }
  
  const Total = ({exercises}) =>{
    const total = exercises.reduce((total,current) => {return(total+current)},0)
    return(
      <div>
        <li><b>total of {total} exercises</b></li>
      </div>
    )
  }
  
  const Part = ({name, exercises}) =>{
    return(
      <div>
          <li>{name} {exercises}</li>
      </div>
    )
  }

const Header = (props) =>{
    return(
      <div>
        <h3>
          {props.header}
        </h3>
      </div>
    )
  }

const Course = (props) => {
    return(
      <div>
        <Header header = {props.name}></Header>
        <Content content = {props.parts}></Content>
      </div>
    )
  }

  export default Course