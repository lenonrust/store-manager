const errorMiddlewareHandler = ({ message }, _req, res, _next) => {
  const required = message.includes('required');
  const length = message.includes('length');
  const greater = message.includes('greater');
  const notFound = message.includes('found');

  switch (true) {
    case required:
      return res.status(400).json({ message });
    case length:
      return res.status(422).json({ message });
    case greater:
      return res.status(422).json({ message });
    case notFound:
      return res.status(404).json({ message });
    default: res.sendStatus(500);
  }
};
  module.exports = errorMiddlewareHandler;