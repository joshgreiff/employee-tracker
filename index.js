const inquirer = require('inquirer')
const { getAllDepartments } = require('./queries/departmentQueries')
// Connects to MySQL
const db = require('./db/connection')


function promptUser(){
    inquirer.prompt(
        {
            message: 'What would you like to do?',
            type: 'list',
            name: 'firstQ',
            choices:[
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit',
            ],
        }
        
    )
    .then((data) => {
        if(data.firstQ === 'Quit'){
            return
        }
        if(data.firstQ === 'View All Departments'){
            getAllDepartments().then((data) => {console.table(data[0])})

            
        }
    })
    
}

promptUser()

