const express = require("express");
const mathjs = require("mathjs");
const router = express.Router();

router.post("/RLC", function(req,res){
    try{
        const Zc = (req.body.capacitance === 0 || req.body.frequency ===0)? 
                    0:mathjs.complex(0,mathjs.divide(-1,(req.body.capacitance*req.body.frequency)));
        const Zl = mathjs.complex(0,req.body.inductance*req.body.frequency);
        const Zr = mathjs.complex(req.body.resistance,0);
        if(req.body.type === "parallel") {
            var Zparallel = 0;
            const arr = [Zc,Zl,Zr];
            arr.forEach(impedance => {
                if(!mathjs.isZero(impedance)){
                    Zparallel = mathjs.add(Zparallel,mathjs.divide(1,impedance));
                }
            });
            Zparallel = mathjs.pow(Zparallel,-1);
            var multiply = 0;
            if(Zparallel.re === 0 && Zparallel.im<0){
                multiply = -1;
            }else if(Zparallel.re ===0 && Zparallel.im>0){
                multiply = 1;
            }
            ret = {
                re : Zparallel.re,
                im : Zparallel.im,
                mag : mathjs.sqrt(mathjs.pow(Zparallel.re,2)+mathjs.pow(Zparallel.im,2)),
                phase : (Zparallel.re===0)?90*multiply:
                        mathjs.atan(mathjs.divide(Zparallel.im,Zparallel.re))*180/Math.PI
            };
            res.send(ret);
        } else {
            const Zseries = mathjs.add(Zc,Zl,Zr);
            var multiply = 0;
            if(Zseries.re === 0 && Zparallel.im<0){
                multiply = -1;
            }else if(Zseries.re ===0 && Zparallel.im>0){
                multiply = 1;
            }
            ret = {
                re : Zseries.re,
                im : Zseries.im,
                mag : mathjs.sqrt(mathjs.pow(Zseries.re,2)+mathjs.pow(Zseries.im,2)),
                phase : (Zseries.re===0)?90*multipy:
                        mathjs.atan(mathjs.divide(Zseries.im,Zseries.re))*180/Math.PI
            };
            res.send(ret);
        }
    } catch(e){
        res.status(400).json({msg:e.message});
    }
})

router.post("/R", function(req,res){
    try {
        if(req.body.type === "parallel"){
            var sum = 0;
            req.body.data.forEach(value=>{
                if(!mathjs.isZero(value)){
                    sum = mathjs.add(sum,mathjs.divide(1,value))
                }
            });
            res.send({re:mathjs.pow(sum,-1),im:0});
        } else {
            var sum = 0;
            req.body.data.forEach(value=>{
                sum+=value;
            });
            res.send({re:sum,im:0});
        }
    } catch(e) {
        res.status(400).json({msg:e.message})
    }
})

router.post("/L", function(req,res){
    try {
        if(req.body.type === "parallel"){
            var sum = 0;
            req.body.data.forEach(value=>{
                if(!mathjs.isZero(value)){
                    sum = mathjs.add(sum,mathjs.divide(1,value))
                }
            });
            res.send({re:mathjs.pow(sum,-1),im:0});
        } else {
            var sum = 0;
            req.body.data.forEach(value=>{
                sum+=value;
            });
            res.send({re:sum,im:0});
        }
    } catch(e) {
        res.status(400).json({msg:e.message})
    }
})

router.post("/C", function(req,res){
    try {
        if(req.body.type === "series"){
            var sum = 0;
            req.body.data.forEach(value=>{
                if(!mathjs.isZero(value)){
                    sum = mathjs.add(sum,mathjs.divide(1,value));
                }
            });
            res.send({re:mathjs.pow(sum,-1),im:0});
        } else {
            var sum = 0;
            req.body.data.forEach(value=>{
                sum+=value;
            });
            res.send({re:sum,im:0});
        }
    } catch(e) {
        res.status(400).json({msg:e.message})
    }
})

router.post("/complex", function(req,res){
    
    try {
        var complexNumbers = [];
        if(req.body.rep === "complex") {
            for(let i=0; i<req.body.inputCount; i++){
                const complex = mathjs.complex(req.body.reMag[i],req.body.imPhase[i]);
                complexNumbers.push(complex);
            }
            
        } else {
            for(let i=0; i<req.body.inputCount;i++){
                const real = ((req.body.imPhase[i]-90)===0||(req.body.imPhase[i]-90)%180===0)?0:
                    req.body.reMag[i]*mathjs.cos(mathjs.unit(req.body.imPhase[i],'deg'));
                const imaginary = (req.body.imPhase[i]===0||req.body.imPhase[i]%180===0)?0:
                    req.body.reMag[i]*mathjs.sin(mathjs.unit(req.body.imPhase[i],'deg'));
                const complex = mathjs.complex(real,imaginary);
                complexNumbers.push(complex);
            }
        }
        var sum = 0;
        if(req.body.type === "parallel"){
            complexNumbers.forEach(number => {
                if(!mathjs.isZero(number)) {
                    sum = mathjs.add(sum,mathjs.divide(1,number))
                }
            });
            sum = mathjs.pow(sum,-1);
        } else {
            complexNumbers.forEach(number => {
                sum = mathjs.add(sum,number);
            });
        }

        var multiply = 0
        if(sum.re === 0 && sum.im<0){
            multiply = -1;
        }else if(sum.re === 0 && sum.im>0){
            multiply = 1;
        }
        ret = {
            re : sum.re,
            im : sum.im,
            mag : mathjs.sqrt(mathjs.pow(sum.re,2)+mathjs.pow(sum.im,2)),
            phase : (sum.re===0)?90*multiply:mathjs.atan(mathjs.divide(sum.im,sum.re))*180/Math.PI
        }
        res.send(ret);
    } catch(e) {
        res.status(400).json({msg:e.message})
    }
})


module.exports = router;