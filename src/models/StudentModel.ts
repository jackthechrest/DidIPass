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
  let requiredScore = (targetScore - (currentAverage * (100 - finalExamWeight))) / finalExamWeight;

  return requiredScore;
}

function getLetterGrade(score: number): string {
  // Return the appropriate letter grade
  if (score >= 90)
    return 'A';

  if (score >= 80)
    return 'B';

  if (score >= 70)
    return 'C';

  if (score >= 60)
    return 'D';

  return 'F';
}

function updateStudentGrade( studentName: string, assignmentName: string, newGrade: number): boolean {
  // TODO: Get the student name from the path params


  // TODO: Get the student's data from the dataset

  // TODO: If the student was not found
    // TODO: return false

  const assignment = // TODO: Search the student's `assignmentWeights` and find the assignment with the matching name using the .find() method

  // TODO: If the assignment was not found
    // TODO: return false

  // TODO: Set the assignment's grade to the newGrade

  student.currentAverage = // TODO: Then recalculate the student's currentAverage

  // TODO: return true since the update completed successfully
}


export { students, addStudent, getStudent, calculateFinalExamScore, getLetterGrade, updateStudentGrade };
