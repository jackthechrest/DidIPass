const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  let average = 0;
  let total = 0;
  const count = weights.assignmentWeights.length;

  for (const assignment of weights.assignmentWeights) {
    total += assignment.grade;
  }

  if (count !== 0) average = total / count;

  return average;
}

function addStudent(newStudentData: NewStudentRequest): boolean {
  // Destructure the name and weights
  const { name, weights } = newStudentData;

  // the the name is already in `students` return false
  if (name in students) {
    return false;
  }

  // Calculate the student's current average (use the function previously defined)
  const currentAverage = calculateAverage(weights);

  // Create a `Student` object using the `name`, `weights` and `currentAverage`
  const newStudent: Student = { name, weights, currentAverage };

  // Add the new Student to the `students` object. The student's name is the key
  students[name] = newStudent;

  // Finally, return true since the student was added
  return true;
}

function getStudent(studentName: string): Student | undefined {
  // Search for student name in students
  // If the student's name is not in `students`, exit
  if (!(studentName in students)) return undefined;

  // Return the student's information (their name is the key for `students`)
  return students[studentName];
}

function calculateFinalExamScore(
  currentAverage: number,
  finalExamWeight: number,
  targetScore: number
): number {
  // Calculate the final exam score needed to get the targetScore in the class
  const requiredScore = (targetScore - currentAverage * (100 - finalExamWeight)) / finalExamWeight;

  return requiredScore;
}

function getLetterGrade(score: number): string {
  // Return the appropriate letter grade
  if (score >= 90) return 'A';

  if (score >= 80) return 'B';

  if (score >= 70) return 'C';

  if (score >= 60) return 'D';

  return 'F';
}

function updateStudentGrade(
  studentName: string,
  assignmentName: string,
  newGrade: number
): boolean {
  // Get the student's data from the dataset
  const student = students[studentName];

  // If the student was not found, return false
  if (!student) return false;

  // Search the student's `assignmentWeights` and find the assignment with the matching name using the .find() method
  const assignment = student.weights.assignmentWeights.find(
    (entry: CourseGrade) => entry.name === assignmentName
  );

  // If the assignment was not found, return false
  if (!assignment) return false;

  // Set the assignment's grade to the newGrade
  assignment.grade = newGrade;

  // Then recalculate the student's currentAverage
  student.currentAverage = calculateAverage(student.weights);

  // return true since the update completed successfully
  return true;
}

export {
  students,
  addStudent,
  getStudent,
  calculateFinalExamScore,
  getLetterGrade,
  updateStudentGrade,
};
