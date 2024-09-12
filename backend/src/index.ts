import { Hono } from 'hono'
import { sign,verify } from 'hono/jwt'  // for Jsonweb token authentication
import { PrismaClient } from '@prisma/client'
// library to connect to connection pool rather then directly connecting to the dB
import { withAccelerate } from '@prisma/extension-accelerate'


const app = new Hono<({
  // Bindings are used to define "type" of a particular environment variable in TS in Hono
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET_KEY : string
  }
})>()

// Middleware

app.use('/api/v1/blog/*',async (c,next)=>{
  const header =c.req.header("authorization") || "";
  const token=header.split(" ")[1];
  const response=await verify(token,c.env.JWT_SECRET_KEY);
  if(response.id) next();
  else {
    c.status(403);
    return c.json({
      error : "User unauthorized"
    })
  } 
})


// In Hono to access env variable we need to use c.env not just env
// And one impt thing env variable are accessed from wrangler.toml file not .env


app.post('/api/v1/signup', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate()) 

  const body=await c.req.json();
  const userId=await prisma.user.create({
    data:{
      email : body.email,
      password :body.password,
    },
  })

  const jwt_token = await sign({id:userId}, c.env.JWT_SECRET_KEY);
  
  return c.json({
    jwt: jwt_token
  });
})

app.post('/api/v1/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate()) 

  const body =await  c.req.json();
  const check=await prisma.user.findUnique({
    where :{
      email:body.email,
      password :body.password
    }
  })
if(!check){
  c.status(403);
  return c.json({
    msg :"User not found"
  })
}
const jwt_Token=await sign({id:check.id},c.env.JWT_SECRET_KEY);
return c.json({
  jwt: jwt_Token
})
})



app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})
app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

export default app
