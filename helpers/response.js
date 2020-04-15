module.exports = {
  generic: (res, response) => res.status(response.status).json({
    status: response.status || 500,
    messages: response.message || null,
    data: response.data || null,
    err: response.err || null,
  }),
};
