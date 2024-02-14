exports.ValidateRequestBody = schema = async (req, res, next) => {
  try {
    schema.parse({
      params: req.params,
      query: req.query,
      body: req.body,
    });
    next();
  } catch (e) {
    let res = {
      status: false,
      code: "D01",
      message: e.errors,
      data: null,
    };

    res.status(400).json(res);
  }
};
