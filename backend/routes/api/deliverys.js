const router = require('express').Router();
let Delivery = require('../../models/Delivery');

//adding delivery
router.route('/add').post((req, res) => {

    const destination = req.body.destination;
    const pstate = req.body.pstate;
    const dtype = req.body.dtype;
    const ddate = req.body.ddate;
    const dname = req.body.dname;
    const dstate = req.body.dstate;

    const newDelivery = new Delivery({
        destination,
        pstate,
        dtype,
        ddate,
        dname,
        dstate
        
    })

    newDelivery.save().then(() => {
        res.json("Delivery Added")
    }).catch((err) => {
        console.log(err);
    })
})


router.route('/').get((req, res) => {

    Delivery.find().then((deliverys) => {
        res.json(deliverys)
    }).catch((err) => {
        console.log(err)
    })
})

//delivery update
router.route('/update/:id').put(async(req, res) => {
    let userId = req.params.id;
    const {destination,pstate,dtype,ddate,dname,dstate} = req.body;

    const updateDelivery = {
        destination,
        pstate,
        dtype,
        ddate,
        dname,
        dstate
    }
    const update = await Delivery.findByIdAndUpdate(userId, updateDelivery).then(() => {
        res.status(200).send({ status: "Delivery updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    })
})

//delivery delete
router.route('/delete/:id').delete(async(req, res) => {
    let userId = req.params.id;

    await Delivery.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "Delivery deleted" })
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete user", error: err.message });
    })
})

//delivery display
router.route('/get/:id').get(async(req, res) => {
    let userId = req.params.id;
    const user = await Delivery.findById(userId).then((delivery) => {
        res.status(200).send({ status: "User fetched", delivery })
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message });
    })
})

module.exports = router;