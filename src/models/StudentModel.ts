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
  // If the student's name is not in `students`
  if (!(studentName in students))
    // exit
    return undefined;

  // Return the student's information (their name is the key for `students`)
  return students[studentName];
}

export { students, addStudent, getStudent };
