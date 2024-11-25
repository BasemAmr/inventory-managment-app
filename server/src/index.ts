import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
// ROUTE IMPORTS
import dashboardRoute from './routes/dashboardRoute';
import productRoutes from './routes/productRoutes';
import userRoute from './routes/userRoutes';
import expenseRoutes from './routes/expenseRoutes';

// CONFIGURATIONS
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy( { policy: 'cross-origin' } ));
app.use(morgan('common'));

// ROUTES
app.use('/dashboard', dashboardRoute);
app.use('/products', productRoutes);
app.use('/users', userRoute);
app.use('/expenses', expenseRoutes);

// SERVER
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});