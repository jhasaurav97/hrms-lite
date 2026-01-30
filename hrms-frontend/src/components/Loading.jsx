
const Loading = ({text = "Loading..."}) => {
  return (
    <div className="flex justify-center items-center py-8 text-gray-500">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600 mr-3"></div>
      <span>{text}</span>
    </div>
  )
}

export default Loading;
