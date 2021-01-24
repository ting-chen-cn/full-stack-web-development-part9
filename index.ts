import express from 'express'
import calculateBmi from './bmiCalculator'
const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})
app.get('/bmi', (req, res) => {
  const args = req.query
  try {
    if (Object.keys(args).length < 2)
      throw new Error('Not enough arguments')
    if (Object.keys(args).length > 2)
      throw new Error('Too many arguments')
    if (isNaN(Number(args.height)) || isNaN(Number(args.weight)))
      throw new Error('Arguments are not numbers')

    const height = Number(args.height)
    const weight = Number(args.weight)
    const result = calculateBmi({ height, weight })
    res.send({ weight: weight, height: height, bmi: result })
  } catch (e) {
    res.send({ error: e.message })
  }
})
const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
