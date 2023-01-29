// Import express
import express, { Express } from 'express';

// Import functions from StudentController
import StudentController from './controllers/StudentController';

// Create your app object
const app: Express = express();

// Activate json parsing for the request body
app.use(express.json());

const PORT = 8191;

// Register your route handlers for the specified endpoints
app.post('/student', StudentController.createNewStudent);
app.get('/student', StudentController.getStudentByName);

// Start listening on the chosen port
app.listen(PORT, () => console.log(`Listening on port http://127.0.0.1:${PORT}`));
