const router = require("express").Router();
const hippo = require("../models/hippo");


//  /api/hippos

// Post
router.post("/", (req, res) => {
    data = req.body;

    hippo.insertMany(data).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send({message: error.message});
    });
});

// get all
router.get("/", (req, res) => {
    hippo.find().then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send({message: error.message});
    });
});

// get freshwater
router.get("/freshwater", (req, res) => {
    hippo.find({habitat: "Freshwater"}).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send({message: error.message});
    });
});

// get by id
router.get("/:id", (req, res) => {
    hippo.findById(req.params.id).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send({message: error.message});
    });
});

// put
router.put("/:id", (req, res) => {

    const id = req.params.id;

    hippo.findByIdAndUpdate(id, req.body).then(data => {
        if (!data) {
            res.status(404).send({ message: "Cannot update hippo by id= " + id + ". Maybe hippo was not found"})
        } else {
            res.send({ message: "Hippo was updated!"})
        }
    }).catch(error => {
        res.status(500).send({message: "Error updating hippo with id= " + id + "... " + error.message});
    });
});

// delete
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    hippo.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({ message: "Cannot delete hippo by id= " + id + ". Maybe hippo was not found"})
        } else {
            res.send({ message: "Hippo was deleted!"})
        }
    }).catch(error => {
        res.status(500).send({message: "Error deleting hippo with id= " + id + "... " + error.message});
    });
});



module.exports = router;