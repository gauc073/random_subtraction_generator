# random_subtraction_generator

## Build
To build the docker image, use these below steps
  * Clone the repository
  * Run from shell `docker build -t <user_id>/random_subtraction_generator`
  
  Node installation on Ubuntu
  You can install nodejs and npm easily with apt install, just run the following commands.

  `sudo apt install nodejs`
  
  `sudo apt install npm`
  
  then install node dependencies
  `npm install`
  
  To start server, use command
  `node server.js`
  
  ## Api details
    * POST /generate_subtraction_mcq
  Sample Input 
  {
    "num_question": 1,
    "minuend_digits": 3,
    "subtrahend_digits": 2
}

Output [
    {
        "minuend": 1326,
        "subtrahend": 252,
        "correct_answer": 1074,
        "options": [
            1182,
            301,
            966,
            1074
        ]
    }
    ]
