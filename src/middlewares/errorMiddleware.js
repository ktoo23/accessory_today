
const putwrongReview =(req,res,next) => {
    const {title,content,author}=req.body; 
    if(!title||!content||!author){
            res.status(400).send("형식이 잘못되었습니다!");
        }
        next();
    }


export {putwrongReview};

