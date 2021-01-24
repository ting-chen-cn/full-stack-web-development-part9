interface ResultObject {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}
interface InputValues1 {
  target: number
  exercises: Array<number>
}
const parseArguments1 = (args: Array<string>): InputValues1 => {
  const len = args.length;
  if (len < 4) throw new Error('Not enough arguments');
  const eArray = args.slice(3).map((a) => Number(a));
  if (!isNaN(Number(args[2])) && !eArray.some(isNaN)) {
    return {
      target: Number(args[2]),
      exercises: eArray,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};
const calculateExercises = (
  target: number,
  exercises: Array<number>
): ResultObject => {
  const totalDays = exercises.length;
  const exerciseDays = exercises.filter((e) => e > 0).length;
  const meanExerciseLength = exercises.reduce(
    (a, v, i) => (a * i + v) / (i + 1)
  );
  const reached = meanExerciseLength >= target;
  let rating = 1;
  let describe = 'You should work hardly!';
  switch (true) {
    case meanExerciseLength / target < 0.5:
      rating = 1;
      describe = 'You should work hardly!';
      break;
    case meanExerciseLength / target >= 0.5 &&
      meanExerciseLength / target < 0.9:
      rating = 2;
      describe = 'Not too bad but could be better!';
      break;
    case meanExerciseLength / target >= 0.9:
      rating = 3;
      describe = 'Well done!';
      break;
  }

  return {
    periodLength: totalDays,
    trainingDays: exerciseDays,
    success: reached,
    rating: rating,
    ratingDescription: describe,
    target: target,
    average: meanExerciseLength,
  };
};

try {
  const { target, exercises } = parseArguments1(process.argv);
  console.log(calculateExercises(target, exercises));
} catch (e) {
  if (e instanceof Error) {
    console.log('Error, something bad happened, message: ', e.message);
  } else {
    throw e;
  }
  // const error = e as Error;
  // console.log('Error, something bad happened, message: ', error.message);
}

export default calculateExercises;