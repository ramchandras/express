const Joi= require('joi')
const express =require('express')
const app = express()

app.use(express.json())

const courses=[
  {id:1, name:'course1'},
  {id:2, name:'course2'},
  {id:3, name:'course3'},
  {id:4, name:'course4'}
]

app.get('/', function (req, res){
    res.send('Hello World! ')
  }),

  app.get('/api/courses', function (req, res) {
    res.send(courses);
  }),
  app.get('/api/courses/:id', function (req, res) {
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) res.status(404).send("the course with given id not found ");
    res.send(course);
  }),

  app.post('/api/courses',function(req,res){
   
    const {error}=validateCourse(req.body)
    
    if(error){
      res.status(404).send(error.details[0].message)
      return;
    }

    
    const course={
      id:courses.length+1,
      name:req.body.name
    }
    courses.push(course)
    res.send(course)
  });

  app.put('/api/courses/:id', function(req,res){
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) res.status(404).send("the course with given id not found ");

    
    const {error}=validateCourse(req.body)
    
    if(error){
      res.status(404).send(error.details[0].message)
      return;
    }

    course.name=req.body.name;
    res.send(course)

  });

  function validateCourse(course){
    const schema={
      name:Joi.string().min(3).required()
    };

    return Joi.validate(course,schema);
  }

app.delete('/api/courses/:id', function(req,res){
  const course=courses.find(c=>c.id===parseInt(req.params.id));
  if(!course) res.status(404).send("the course with given id not found ");

  const index=courses.indexOf(course);
  courses.splice(index,1);
  res.send(course)
});
 
app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:${3000}`)
})
