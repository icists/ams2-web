module.exports = {
  request(req, token) {
    this.options.http._setHeaders.call(this, req, {
      Authorization: `Bearer ${token}`,
    });
  },

  response(res) {
    return (res.data || {}).token;
  },
};
