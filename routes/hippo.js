const router = require("express").Router();
const hippo = require("../models/hippo");
const { verifyToken } = require("../validation");
const jwt = require("jsonwebtoken");


//  /api/hippos

// Post
router.post("/", verifyToken, (req, res) => {
    const userId = req.user.id;

    const data = req.body;
    data.createdBy = userId;

    hippo.insertMany(data).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send({ message: error.message });
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
router.put("/:id", verifyToken, (req, res) => {

    // insert the id of the user that last edited the hippo
    const id = req.params.id;
    const updatedHippo = req.body;
    updatedHippo.lastUpdatedBy = req.user.id;

    hippo.findByIdAndUpdate(id, updatedHippo).then(data => {
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
router.delete("/:id", verifyToken, (req, res) => {
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