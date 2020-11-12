const formulateMessage = message => {
  return message
    .replace(/['"]+/g, '') // remove quotes
    .replace(/([A-Z])/g, ' $1') // add spaces before capital letter such as firstName -> first name
    .trim()
    .toLowerCase()
    .replace(/ /g, '_'); // add underscores between spaces

  //return newMessage;
};

export default formulateMessage;
