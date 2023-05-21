const express = require('express');
const router = express.Router();

//Load Book model
const Index = require('../../Models/IndexPage');

//@route GET api/books/test
router.get('/test',(req,res)=>res.send('book route testing!'));

//@route GET api/indices
//@discription: get all notes
//@access Public
router.get('/', (req,res)=>{
    Index.find()
        .then(indices => res.json(indices))
        .catch(err=>res.status(404).json({noIndicesFound:"No Notes Found"}));
});

//@route GET api/indices/:id
//@discription: get note index by id
//@access Public
router.get('/:id',(req,res)=>{
    Index.findById(req.params.id)
        .then(note => res.json(note))
        .catch(err => res.status(404).json({noNotefound: 'No Note Found'}));
});

//@discription: add/save Notes
//@access Public

router.post('/',(req,res)=>{
    Index.create(req.body)
        .then(note => res.json({msg: 'Note addes successfully'}))
        .catch(err=>res.status(400).json({error:'Unable to add this Note'}));

});

//@discription: Update Notes
//@access public
router.put('/:id',(req,res)=>{
    Index.findByIdAndUpdate(req.params.id,req.body)
        .then(note=>res.json({msg:'Updated Successfully'}))
        .catch(err=> res.status(400).json({error:'Unable to update the Database'}));
});

//@discription: Delete book by Id
//@access public
router.delete('/:id',(req,res)=>{
    Index.findByIdAndRemove(req.params.id,req.body)
        .then(notes => res.json({msg:'Note entry deleted successfully'}))
        .catch(err => res.status(404).json({error:'No such a Notes'}));
});



module.exports = router;