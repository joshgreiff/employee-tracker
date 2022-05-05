const express = require('express')
const router = express.Router()
const db = require('../db/connection')
const cTable = require('console.table')


const getAllDepartments = () => {
    const sql = `SELECT * FROM departments;`
    
    return db.promise().query(sql)
  }

  const createDepartment = (name) => {
    const sql = 'INSERT INTO departments (name) VALUES(?)'
    
    const params = [name]
    return db.promise().query(sql, params)
  
}

module.exports = { getAllDepartments, createDepartment }