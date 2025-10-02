exports.parseBody = (req, res, next) => {
  for (const key in req.body) {
    try {
      if (typeof req.body[key] === "string" && req.body[key].startsWith("{")) {
        req.body[key] = JSON.parse(req.body[key]);
      }
    } catch (err) {
      // لو مش JSON صالح، سيبه زي ما هو
    }
  }
  next();
};
