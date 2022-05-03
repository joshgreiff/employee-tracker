const express = require('express')
const router = express.Router()
const db = require('../db/connection')
const cTable = require('console.table')


const getAllEmployees = () => {
    const sql = `SELECT * FROM employees;`
    
    return db.promise().query(sql)
  }

const createEmployee = (first, last, role, manager) => {
    const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)'
    if(manager === 0){
        manager = null
    }
    const params = [first, last, role, manager]
    return db.promise().query(sql, params)
  
}

const updateEmployeeRole = (roleId, employeeId) => {
    const sql = 
    `
    UPDATE employees
    SET 
        role_id = ?
    WHERE
        id = ?
    `
    const params = [roleId, employeeId];
    return db.promise().query(sql, params)
}

module.exports = { getAllEmployees, createEmployee, updateEmployeeRole }