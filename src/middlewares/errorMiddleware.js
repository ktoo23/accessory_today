
const putwrongReview =(req,res,next) => {
    const {title,content,author}=req.body; 
    if(!title||!content||!author){
            res.status(400).json({ error: "형식이 잘못 되었습니다!" });
        }
        next();
    }


export {putwrongReview};

