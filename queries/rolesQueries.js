const express = require('express')
const router = express.Router()
const db = require('../db/connection')
const cTable = require('console.table')


const getAllRoles = () => {
    const sql = `SELECT * FROM roles;`
    
    return db.promise().query(sql)
  }

  const createRole = (name, salary, department) => {
    const sql = 'INSERT INTO roles (title, salary, department_id) VALUES(?, ?, ?)'
    
    const params = [name, salary, department]
    return db.promise().query(sql, params)
  
}
  
module.exports = { getAllRoles, createRole }