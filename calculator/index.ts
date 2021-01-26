import express,{Request} from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json());
interface exerciseCalReq {
  daily_exercises:Array<number>,
  target:number
}
interface CustomRequest<T> extends Request {
  body: T
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
  const args = req.query;
  try {
    if (Object.keys(args).length < 2)
      throw new Error('Not enough arguments');
    if (Object.keys(args).length > 2)
      throw new Error('Too many arguments');
    if (isNaN(Number(args.height)) || isNaN(Number(args.weight)))
      throw new Error('Arguments are not numbers');

    const height = Number(args.height);
    const weight = Number(args.weight);
    const result = calculateBmi({ height, weight });
    res.send({ weight: weight, height: height, bmi: result });
  } catch (e) {
    if (e instanceof Error) {
      res.send({ error: e.message });
    } else {
      throw e;
    }
    // res.send({ error: e.message });
  }
});

app.post('/exercises',(req:CustomRequest<exerciseCalReq>,res)=>{
const args=req.body;
try {
if (!args.daily_exercises || !args.target){
  throw new Error("parameters missing");
} else if (args.daily_exercises.some(isNaN)||isNaN(Number(args.target))){
  throw new Error("malformatted parameters");
} 
  const result = calculateExercises(args.target,args.daily_exercises);
  res.send(result);
} catch (e) {
  if (e instanceof Error) {
    res.send({ error: e.message });
  } else {
    throw e;
  }}

});
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
