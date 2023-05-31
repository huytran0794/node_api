const responseHandler = {
  success: (response, data, message) => {
    response.status(200).json({
      statusCode: 200,
      message,
      content: data,
    });
  },
  created: (response, data, message = "Created successfully") => {
    response.status(201).json({
      statusCode: 201,
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
  duplicate: (response, message) => {
    response.status(409).json({
      statusCode: 409,
      message,
    });
  },
  notFound: (response, message) => {
    response.status(404).json({
      statusCode: 404,
      message,
    });
  },
  error: (response, message = "Lỗi BE") => {
    response.status(500).json({
      statusCode: 500,
      message,
    });
  },
};

export default responseHandler;
