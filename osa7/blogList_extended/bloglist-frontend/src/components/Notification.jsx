import { useSelector } from 'react-redux'

const Notification = () => {
  const content = useSelector((state) => state.notification)

  if (!content) {
    return null
  }
  const message = content.message
  const type = content.type
  console.log(type)

  const style = {
    backgroundColor: 'lightgrey',
    margin: '10px',
    padding: '10px',
    border: '2px solid',
    borderColor: type === 'success' ? 'green' : 'red',
    borderRadius: '5px'
  }

  return <div style={style}>{message}</div>
}

export default Notification
