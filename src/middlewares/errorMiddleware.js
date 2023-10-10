class Validator{
    wrongReview =(req,res,next) => {
        if(!req.body.title||!req.body.content||!req.body.author){
            const error =  new Error("형식이 잘못되었다!");
            error.statusCode = 400;
            throw error;
        }
        next();
    }
}

const validator = new Validator();
export {validator};

