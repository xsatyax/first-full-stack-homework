const express = require('express')
const db = require('../models/index.js')
const router = express.Router()

// INDEX
router.get('/', (req, res) => {
    db.Cat.find({}, (err, allCats) => {
        if(err) return console.log(err)

        res.render('index.ejs', { allCats: allCats })
    })
})

// NEW
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

// SHOW 
router.get('/:catID', (req, res) => {
    db.Cat.findById(req.params.catID, (err, foundCat) => {
        if(err) return console.log(err)

        res.render('show.ejs', { oneCat: foundCat})
    })
})

// CREATE 
router.post('/', (req, res) => {
    db.Cat.create(req.body, (err, createdCat) => {
        if (err) return console.log(err)

        res.redirect('/cats')
    })
})

// DELETE
router.delete('/:catId', (req, res) => {
    db.Cat.findByIdAndDelete(req.params.catId, (err) => {
        if (err) return console.log(err)

        res.redirect('/cats')
    })
})

// EDIT
router.get('/:catId/edit', (req, res) => {
    db.Cat.findById(req.params.catId, (err, foundCat) => {
        if (err) return console.log(err)

        res.render('edit.ejs', { oneCat: foundCat })
    })
})

// UPDATE
router.put('/:catId', (req, res) => {
    console.log(req.body)

    db.Cat.findByIdAndUpdate(req.params.catId, req.body, (err, updatedCat) => {
        if(err) return console.log(err)

        res.redirect(`/cats/${req.params.catId}`)
    })
})

module.exports = router