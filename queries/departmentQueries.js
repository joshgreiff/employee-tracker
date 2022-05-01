const express = require('express')
const router = express.Router()
const db = require('../db/connection')
const cTable = require('console.table')


const getAllDepartments = () => {
    const sql = `SELECT * FROM departments;`
    
    return db.promise().query(sql)
  }

module.exports = { getAllDepartments }