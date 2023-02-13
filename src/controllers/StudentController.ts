import { Request, Response } from 'express';
import {
  students,
  addStudent,
  getStudent,
  calculateFinalExamScore,
  getLetterGrade,
  updateStudentGrade,
} from '../models/StudentModel';

function getAllStudents(req: Request, res: Response): void {
  res.json(students);
}

function createNewStudent(req: Request, res: Response): void {
  // Assign `req.body` as a `NewStudentRequest`
  const studentData = req.body as NewStudentRequest;

  // make sure weights sum to 100
  let weights = 0;

  for (const assignment of studentData.weights.assignmentWeights) {
    weights += assignment.weight;
  }

  weights += studentData.weights.finalExamWeight;

  if (weights !== 100) {
    // weights don't sum to 100, send 400 Bad Request
    res.sendStatus(400);
    return;
  }

  // Call the `addStudent` function using the student's data
  const didAddStudent = addStudent(studentData);

  // If the student's data was not added successfully
  if (!didAddStudent) {
    // Responds with status 409 (This means 409 Conflict)
    res.sendStatus(409);
    return;
  }

  // Send status 201 (This means 201 Created)
  res.sendStatus(201);
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
    return;
  }

  // Respond with the student's information as json
  res.json(student);
}

function getFinalExamScores(req: Request, res: Response): void {
  // Get the student name from the path params
  const { studentName } = req.params as StudentNameParams;

  // Get the student's data from the dataset
  const student = getStudent(studentName);

  // If the student was not found
  if (!student) {
    // responds with status 404 Not Found, terminate function
    res.sendStatus(404);
    return;
  }

  // Get the current average and weights from the student's data
  const average = student.currentAverage;
  const finalWeight = student.weights.finalExamWeight;

  const examScores: FinalExamScores = {
    neededForA: calculateFinalExamScore(average, finalWeight, 90),
    neededForB: calculateFinalExamScore(average, finalWeight, 80),
    neededForC: calculateFinalExamScore(average, finalWeight, 70),
    neededForD: calculateFinalExamScore(average, finalWeight, 60),
  };

  // Send a JSON response with an object containing the grades needed for an A through D
  res.json(examScores);
}

function calcFinalScore(req: Request, res: Response): void {
  // Get the student name from the path params
  const { studentName } = req.params as StudentNameParams;

  // Get the student's data from the dataset
  const student = getStudent(studentName);

  // If the student was not found
  if (!student) {
    //  responds with status 404 Not Found, terminate the function
    res.sendStatus(404);
    return;
  }

  // Get the grade data from the request body as the `AssignmentGrade` type
  const examGrade = req.body as AssignmentGrade;

  // Get the current average and weights from the student's data
  const average = student.currentAverage;
  const finalWeight = student.weights.finalExamWeight;

  // Calculate the final score that would receive using their current average and the hypothetical final exam grade.
  const overallScore = average * (100 - finalWeight) + examGrade.grade * finalWeight;
  // Get the letter grade they would receive given this score
  const letterGrade = getLetterGrade(overallScore);

  const finalGrade: FinalGrade = { overallScore, letterGrade };

  // Send back a JSON response containing their `overallScore` and `letterGrade.
  res.json(finalGrade);
}

function updateGrade(req: Request, res: Response): void {
  // TODO: Get the student's name and assignment name from the path parameters as a `GradeUpdateParams`
  // TODO: Get the grade from the request body as an `AssignmentGrade`
  // TODO: Update the student's grade
  // TODO: If the update did not complete (this means the student or the assignment wasn't found)
  // TODO: respond with status 404 Not Found
  // TODO: terminate the function immediately
  // TODO: Respond with status 200 OK
}

export default {
  getAllStudents,
  createNewStudent,
  getStudentByName,
  getFinalExamScores,
  calcFinalScore,
  updateGrade,
};
