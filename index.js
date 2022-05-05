const inquirer = require('inquirer')
const { getAllDepartments, createDepartment } = require('./queries/departmentQueries')
const { getAllEmployees, createEmployee, updateEmployeeRole} = require('./queries/employeeQueries')
const { getAllRoles, createRole } = require('./queries/rolesQueries')
// Connects to MySQL

const db = require('./db/connection')

const roleChoices = ['ManagerSales', 'ManagerIT', 'ManagerCustomerService', 'ManagerRetail', 'Salesman', 'Cashier', 'Front-End Developer', 'Back-End Developer', 'Representitive']
const departmentChoices = ['Sales', 'IT', 'Customer Service', 'Retail']
const managerChoices = ['None', 'Jim', 'Pam', 'Oreo', 'Vanilla']
let employeeArr = []
let rolesArr = []

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
            getAllDepartments().then((data) => {console.table(data[0])}).then(promptUser)
        }
        if(data.firstQ === 'View All Employees'){
            getAllEmployees().then((data) => {console.table(data[0])}).then(promptUser)
        }
        if(data.firstQ === 'View All Roles'){
            getAllRoles().then((data) => {console.table(data[0])}).then(promptUser)
        }
        if(data.firstQ === 'Add Employee'){
            inquirer.prompt([
                {
                    message: 'What is the employees first name?',
                    type: 'input',
                    name: 'firstname'
                },
                {
                    message: 'What is the employees last name?',
                    type: 'input',
                    name: 'lastname'
                },
                {
                    message: 'What is the employees role?',
                    type: 'list',
                    name: 'role',
                    choices: ['ManagerSales', 'ManagerIT', 'ManagerCustomerService', 'ManagerRetail', 'Salesman', 'Cashier', 'Front-End Developer', 'Back-End Developer', 'Representitive']
                },
                {
                    message: 'Who is the employees manager?',
                    type: 'list',
                    name: 'manager',
                    choices: ['None', 'Jim', 'Pam', 'Oreo', 'Vanilla']
                },
            ]).then((data) => {
                createEmployee(data.firstname, data.lastname, roleChoices.indexOf(data.role) + 1, managerChoices.indexOf(data.manager)).then(employeeArr.push(data.firstname + ' ' + data.lastname))
            }).then(promptUser)
        }
        if(data.firstQ === 'Add Role'){
            inquirer.prompt([
                {
                    message: 'What is the name of the role',
                    type: 'input',
                    name: 'rolename'
                },
                {
                    message: 'What is the salary of the role',
                    type: 'number',
                    name: 'salary'
                },
                {
                    message: 'Which department does the role belong to',
                    type: 'list',
                    name: 'department',
                    choices: ['Sales', 'IT', 'Customer Service', 'Retail']
                },
            ]).then((data) => {
                createRole(data.rolename, data.salary, departmentChoices.indexOf(data.department) + 1).then(rolesArr.push(data.rolename))
                console.log(rolesArr)
            }).then(promptUser)
        }if(data.firstQ === 'Add Department'){
            inquirer.prompt([
                {
                    message: 'What is the name of the department?',
                    type: 'input',
                    name: 'departmentname'
                }
            ]).then((data) => {
                createDepartment(data.departmentname)
            }).then(promptUser)
        }if(data.firstQ === 'Update Employee Role'){
            
           populateAndPrompt()
        }
    })
}


// Pre populate employee and role arrays with existing data for future reference



function populateAndPrompt() {
    getAllEmployees().then((data) => {
        for(let i = 0; i<data[0].length; i++){
            employeeArr.push(data[0][i].first_name + ' ' + data[0][i].last_name)
        }
        return getAllRoles()
    }).then((roles) => {
        for(let i = 0; i<roles[0].length; i++){
            rolesArr.push(roles[0][i].title)
        }
       
    
        inquirer.prompt([
        {
            message: "Which employee's role would you like to adjust?",
            name: 'whichEmployee',
            type: 'list',
            choices: employeeArr
        },
        {
            message: "Which role would you like to assign",
            name: 'whichRole',
            type: 'list',
            choices: rolesArr
        }
        ]).then((data) => {
            updateEmployeeRole(rolesArr.indexOf(data.whichRole) + 1, employeeArr.indexOf(data.whichEmployee) + 1)
        }).then(promptUser)
    })
}




promptUser()