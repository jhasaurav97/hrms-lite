
const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 text-red-700 border border-red-200 p-3 rounded mb-4">
      {message}
    </div>
  )
}

export default ErrorMessage;