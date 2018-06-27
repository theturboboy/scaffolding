export default {
  method: 'GET',
  url: '/test',
  handler: (req, res) => {
    let result = {
      body: '[]',
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    result.body = JSON.stringify({});

    return result;
  }
};
