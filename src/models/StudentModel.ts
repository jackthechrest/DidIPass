const students: Array<Student> = [];

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

  // the the name is already in `students`
  for (const student of students) {
    // then return false
    if (name === student.name) return false;
  }

  // Calculate the student's current average (use the function previously defined)
  const currentAverage = calculateAverage(weights);

  // Create a `Student` object using the `name`, `weights` and `currentAverage`
  const newStudent: Student = { name, weights, currentAverage };

  // Add the new Student to the `students` object. The student's name is the key
  students.push(newStudent);

  // Finally, return true since the student was added
  return true;
}

function getStudent(studentName: string): Student | undefined {
  let inStudentArray = false;
  let studentIndex: number = 0;

  // Search for student name in students
  for (let i = 0; i < students.length && !inStudentArray; i += 1) {
    if (students[i].name === studentName) {
      inStudentArray = true;
      studentIndex = i;
    }
  }

  // If the student's name is not in `students`
  if (!inStudentArray)
    // exit
    return undefined;

  // Return the student's information (their name is the key for `students`)
  return students[studentIndex];
}

export { students, addStudent, getStudent };
