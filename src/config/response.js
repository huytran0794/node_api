const responseHandler = {
  success: (response, data, message) => {
    response.status(200).json({
      statusCode: 200,
      message,
      content: data,
    });
  },
  fail: (response, data, message) => {
    response.status(400).json({
      statusCode: 400,
      message,
      content: data,
    });
  },
  error: (response, message) => {
    response.status(500).json({
      statusCode: 500,
      message,
    });
  },
};

export default responseHandler;
