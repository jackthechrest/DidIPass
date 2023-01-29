type CourseGrades = {
  assignmentWeights: Array<CourseGrade>;
  finalExamWeight: {
    weight: number;
  };
};

type CourseGrade = {
  name: string;
  weight: number;
  grade: number;
};

type Student = {
  name: string;
  weights: CourseGrades;
  currentAverage: number;
};

type NewStudentRequest = {
  name: string;
  weights: CourseGrades;
};

type StudentNameParams = {
  studentName: string;
};

type AssignmentGrade = {
  grade: number;
};

type FinalGrade = {
  overallScore: number;
  letterGrade: string;
};

type FinalExamScores = {
  neededForA: number;
  neededForB: number;
  neededForC: number;
  neededForD: number;
};
