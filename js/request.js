// import axios
const axios = require("axios").default;

// request function
const request = async function (string) {
  try {
    const response = await axios.get(" http://www.omdbapi.com/", {
      params: {
        apikey: "8cf53160",
        t: string,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

// {ES6 default export}
export default request;
