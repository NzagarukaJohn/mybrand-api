

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cors = require("cors")
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express")

const api = require("./routes/api")
const articleRoutes = require("./routes/article")
const queryRouter = require("./routes/query")
const likeRouter = require("./routes/like")
const commentRouter = require("./routes/comment")

const loginRouter = require("./routes/login")
const signupRouter = require("./routes/sign-up")


const PORT = process.env.PORT || 5000;
const config = require("config");
const req = require("express/lib/request");

const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
          title: 'Express API for My Blog',
          version: '1.0.0',
        },
        description:
        'This is a REST API application made with Express. It retrieves data from Mongodb using mongoose.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name:"Rukundo Kevin",
        url: 'https://www.rukundokevin.codes',
      },
      servers: [
        {
          url: 'https://rukundo-kevin-blog.herokuapp.com/'
        }]
        ,
        security: [
          {
            bearerAuth: [],
          },
        ],
        components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'bearerAuth',
                in: 'header'
              }
            }
        },
      };
      
      const options = {
        swaggerDefinition,
        // Paths to files containing OpenAPI definitions
        apis: ['src/routes/*.js'],
      };
      
      const swaggerSpec = swaggerJSDoc(options);

const app = express();

const connectDB = async () => {
        await mongoose.connect(config.DBHost, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
                //middlewares
                app.use(cors({
                  origin: '*'
                }))
                
                app.use(express.json())
                 
                //middlewares for routes
                app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

                app.use("/",api)
                app.use("/article",articleRoutes)
                app.use("/query",queryRouter)
                app.use("/like",likeRouter)
                app.use("/comment",commentRouter)

                app.use("/login", loginRouter)
                app.use("/signup", signupRouter)


                app.set("port",PORT)

                app.listen(PORT, () =>{
                  if(config.util.getEnv('NODE_ENV') != 'test'){
                    console.log("server started")
                    } 
                  })

        })
            .catch(function (error) {
                console.log(`Unable to connect to the Mongo db  ${error} `);
            });
    };
    
    // use as a function        
    connectDB();
    module.exports = app;
