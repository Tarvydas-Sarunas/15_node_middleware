// my own middleware
const logHello = (req, res, next) => {
  console.log('--- Welcom to our server!!! ---');
  // nextas leidzia kodui vykti toliau
  next();
};

const reqTime = (req, res, next) => {
  const now = new Date();
  const time = now.toTimeString();
  console.log('request:', time);
  // nextas leidzia kodui vykti toliau
  next();
};

const logBody = (req, res, next) => {
  // patikrinti ar methodas yra POST, PUT arba PATCH
  // if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
  // jei yra tai spausdinam body
  //   console.log('req.body ===', req.body);
  // }

  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    // jei yra tai spausdinam body
    console.log('req.body ===', req.body);
  }
  next();
};

const validatePost = (req, res, next) => {
  // Validacijos
  const {
    title, author, date, body,
  } = req.body;
  //  title validacija
  if (title?.trim() === '' || !title) {
    res.status(400).json({
      type: 'validation',
      error: 'require field',
      field: 'title',
    });
    return;
  }
  if (title?.trim().length < 3) {
    res.status(400).json({
      type: 'validation',
      error: 'must be 3 or more letters',
      field: 'title',
    });
    return;
  }
  // author validacija
  if (author?.trim() === '') {
    res.status(400).json({
      type: 'validation',
      error: 'require field',
      field: 'author',
    });
    return;
  }
  // nera klaidu
  next();
};

module.exports = {
  reqTime,
  logHello,
  logBody,
  validatePost,
};
