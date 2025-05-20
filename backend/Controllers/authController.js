export const checkController = (req , res ) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).send({message : "Internal Server Error "});
        console.log("Error in checkController : " , error.message);
    }
}
