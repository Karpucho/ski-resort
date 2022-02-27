const loginRouter = require('../routes/loginRouter');
const registrationRouter = require('../routes/registrationRouter');
const checkUserRouter = require('../routes/checkUserRouter');

const updateUserRouter = require('../routes/updateUserRouter');
const trainerScheduleRouter = require('../routes/trainerScheduleRouter');
const userScheduleRouter = require('../routes/userScheduleRouter');
const trainersRouter = require('../routes/trainersRouter');
const typesRouter = require('../routes/typesRouter');
const photosRouter = require('../routes/photosRouter');
const ordersRouter = require('../routes/ordersRouter');

const authUser = require('../middleware/authUser');

function routes(app) {
  app.use('/api/login', loginRouter);
  app.use('/api/registration', registrationRouter);
  app.use('/api/checkUser', authUser, checkUserRouter);
  app.use('/api/updateUser', authUser, updateUserRouter);
  app.use('/api/trainerSchedule', authUser, trainerScheduleRouter);
  app.use('/api/userSchedule', authUser, userScheduleRouter);
  app.use('/api/trainers', authUser, trainersRouter);
  app.use('/api/types', typesRouter);
  app.use('/api/photos', photosRouter);
  app.use('/api/orders', ordersRouter);
}

module.exports = routes;
