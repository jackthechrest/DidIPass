/*
 *   index.ts
 *   Project: Did I Pass? Part 2
 *
 *   Author: Jack Chrestman
 *   Created on: Jan 28, 2023
 */

// Import express
import express, { Express } from 'express';

// Import functions from StudentController
import StudentController from './controllers/StudentController';

// Create your app object
const app: Express = express();
const PORT = 8191;

// Activate json parsing for the request body
app.use(express.json());

// Register your route handlers for the specified endpoints
app.get('/', StudentController.getAllStudents);
app.post('/api/students', StudentController.createNewStudent);
app.get('/api/students/:studentName', StudentController.getStudentByName);
app.get('api/students/:studentName/finalExam', StudentController.getFinalExamScores);
app.post('api/students/:studentName/finalExam', StudentController.calcFinalScore);
app.post('api/students/:studentName/grades/:assignmentName', StudentController.updateGrade);

// Start listening on the chosen port
app.listen(PORT, () => console.log(`Listening on port http://127.0.0.1:${PORT}`));
