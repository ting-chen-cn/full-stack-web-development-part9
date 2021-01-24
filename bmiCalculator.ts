// interface InputValues {
//   height: number
//   weight: number
// }
// export const parseArguments = (args: Array<string>): InputValues => {
//   if (args.length < 4) throw new Error('Not enough arguments')
//   if (args.length > 4) throw new Error('Too many arguments')
//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       height: Number(args[2]),
//       weight: Number(args[3]),
//     }
//   } else {
//     throw new Error('Provided values were not numbers!')
//   }
// }

export default function calculateBmi({
  height,
  weight,
}: {
  height: number
  weight: number
}): string {
  if (height <= 0) throw new Error('Height must be lager than 0.');
  const Bmi = weight / (height / 100) / (height / 100);
  let result = '';
  switch (true) {
    case Bmi <= 15:
      result = 'Very severely underweight';
      break;
    case Bmi > 15 && Bmi <= 16:
      result = 'Severely underweight';
      break;
    case Bmi > 16 && Bmi <= 18.5:
      result = 'Underweight';
      break;
    case Bmi > 18.5 && Bmi <= 25:
      result = 'Normal (healthy weight)';
      break;
    case Bmi > 25 && Bmi <= 30:
      result = 'Overweight';
      break;
    case Bmi > 30 && Bmi <= 35:
      result = 'Obese Class I (Moderately obese)';
      break;
    case Bmi > 35 && Bmi <= 40:
      result = 'Obese Class II (Severely obese)';
      break;
    case Bmi > 40:
      result = 'Obese Class III (Very severely obese)	';
      break;
    default:
      result = 'The input must be wrong!';
      break;
  }
  return result;
}

// try {
//   const { height, weight } = parseArguments(process.argv)
//   console.log(calculateBmi({ height, weight }))
// } catch (e) {
//   console.log('Error, something bad happened, message: ', e.message)
// }
