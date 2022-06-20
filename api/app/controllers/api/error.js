module.exports = {
  error404(_, response) {
    return response.status(404).json({ error: 'Resource not found' });
  },
};
