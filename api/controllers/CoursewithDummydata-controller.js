const { v4: uuidv4 } = require("uuid"); 

const HttpError= require('../models/http-error');
const Product = require('../models/courses');

// let DUMMY_CPP=[
//     {
//         id:'u1',
//         effective_from: '2020-2021',
//         course: 'Bachelor of Technology',
//         min_credit_point:398 ,
//         max_credit_point: 410,
//         remarks: '',
//         status: 'Active'

//     }
// ];

const addCreditPointPolicy=(req,res,next)=>
{
    console.log(" POST Request in CreditPointPolicy");
    const id=req.body.id;
    const name=req.body.name;
    const effective_from= req.body.effective_from;
    const min_credit_point=req.body.min_credit_point;
    const max_credit_point= req.body.max_credit_point;
    const remarks= req.body.remarks;
    const status= req.body.status;

    Product.create({
        id : id,
        name: name,
        effective_from : effective_from,
        min_credit_point : min_credit_point,
        max_credit_point: max_credit_point,
        remarks: remarks,
        status : status


    }).then((result)=>
    {
        console.log('Course Created');
    }).catch((err)=>
    {
        console.log(err);
    });
    // const addPolicy=
    // {
    //     id: uuidv4(),
    //     effective_from,
    //     course,
    //     min_credit_point,
    //     max_credit_point,
    //     remarks,
    //     status

    // };

    // DUMMY_CPP.push(addPolicy);

    // res.status(201).json({Policy: addPolicy});

};

const getAllCreditPointPolicies=(req,res,next)=>
{
    console.log(" GET Request in CreditPointPolicy");
    res.json({place: DUMMY_CPP});


};

const updateCreditPointPolicyById=(req,res,next)=>
{
    console.log(" PATCH Request in CreditPointPolicy");
    const policyId= req.params.pid;

    const { effective_from , course, min_credit_point,max_credit_point,remarks,status}= req.body; 
    const updatePolicy = {...DUMMY_CPP.find((p)=>
        {
            return p.id===policyId;

        })};

    if (!updatePolicy) {
         return next(new HttpError("Could no find the provided policy id", 404));
         }
    const policyIndex= DUMMY_CPP.findIndex((p)=>
    {
        return p.id===policyId;

    });

    if(effective_from)
    {
        updatePolicy.effective_from=effective_from;
    }
    if(course)
    {
        updatePolicy.course=course;
    }
    if(min_credit_point)
    {
        updatePolicy.min_credit_point=min_credit_point;
    }
    if(max_credit_point)
    {
        updatePolicy.max_credit_point=max_credit_point;
    }
    if(remarks)
    {
        updatePolicy.remarks=remarks;
    }
    if(status)
    {
        updatePolicy.status=status;
    }

    DUMMY_CPP[policyIndex]=updatePolicy;
    res.json({policy: updatePolicy});

};
const deleteCreditPointPolicy=(req,res,next)=>
{
    console.log(" DELETE Request in CreditPointPolicy");
    const policyId= req.params.pid;

    DUMMY_CPP= DUMMY_CPP.filter((p)=>
        {
            return policyId!=p.id;
        });
        res.json({ message : 'Deleted Policy' });


};

exports.addCreditPointPolicy=addCreditPointPolicy;
exports.updateCreditPointPolicyById=updateCreditPointPolicyById;
exports.deleteCreditPointPolicy=deleteCreditPointPolicy;
exports.getAllCreditPointPolicies=getAllCreditPointPolicies;