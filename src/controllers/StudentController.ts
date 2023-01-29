import { Request, Response } from 'express';
import { students, addStudent, getStudent } from '../models/StudentModel';

function getAllStudents(req: Request, res: Response): void {
  res.json(students);
}

function createNewStudent(req: Request, res: Response): void {
  // Assign `req.body` as a `NewStudentRequest`
  const studentData = req.body as NewStudentRequest;

  // Call the `addStudent` function using the student's data
  const didAddStudent = addStudent(studentData);

  // If the student's data was not added successfully
  if (!didAddStudent) {
    // Responds with status 409 (This means 409 Conflict)
    res.sendStatus(409);
    // return from the function
    return;
  }

  let weights = 0;

  for (const assignment of studentData.weights.assignmentWeights) {
    weights += assignment.weight;
  }

  weights += studentData.weights.finalExamWeight.weight;

  if (weights !== 100) {
    // weights don't sum to 100
    res.sendStatus(400);
  } else {
    // Send status 201 (This means 201 Created)
    res.sendStatus(201);
  }
}

function getStudentByName(req: Request, res: Response): void {
  // Assign `req.params` as a `StudentNameParams`
  const { studentName } = req.params as StudentNameParams;

  // get the student's data using function imported from StudentMode
  const student = getStudent(studentName);

  // If `student` is undefined
  if (!student) {
    // respond with status 404 (Which means 404 Not Found)
    res.sendStatus(404);
    // return immediately
    return;
  }

  // Respond with the student's information as json
  res.json(student);
}

export default { getAllStudents, createNewStudent, getStudentByName };
