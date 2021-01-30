interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: 'Fundamentals';
  // description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: 'Deeper type usage';
  // description: string;
  exerciseSubmissionLink: string;
}
interface CoursePartFour extends CoursePartWithDescription {
  name: 'Computer Vision';
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

export interface courseParts {
  name: string;
  exerciseCount: number;
}
