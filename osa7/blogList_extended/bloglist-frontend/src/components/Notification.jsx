import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const content = useSelector((state) => state.notification)

  if (!content) {
    return null
  }
  const { message, type } = content
  console.log(type)

  const variant = type === 'success' ? 'success' : 'danger'
  return (
    <div className="Container">
      <Alert variant={variant}>{message}</Alert>
    </div>
  )
}

export default Notification
