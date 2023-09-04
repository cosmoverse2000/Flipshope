//status BUTTON CSS
const chooseColour = (status) => {
  switch (status) {
    case "Pending":
      return "bg-purple-200 text-purple-600";
    case "Dispatched":
      return "bg-yellow-200 text-yellow-600";
    case "Delivered":
      return "bg-green-200 text-green-600";
    case "Recieved":
      return "bg-green-200 text-green-600";
    case "Cancelled":
      return "bg-red-200 text-red-600";
    default:
      return "bg-purple-200 text-purple-600";
  }
};
export default chooseColour;
