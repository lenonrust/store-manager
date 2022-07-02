const errorMiddlewareHandler = ({ message }, _req, res, _next) => {
  switch (message) {
    case '"name" is required':
      return res.status(400).json({ message });
    case '"name" length must be at least 5 characters long':
      return res.status(422).json({ message });
    default: res.sendStatus(500);
  }
};
  module.exports = errorMiddlewareHandler;