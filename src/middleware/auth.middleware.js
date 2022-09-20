const adminUser = (req, res, next) => {
    let validation = req.headers.admin;
    if(validation === "admin") {
        next();
    } 
    else {
        res.status(401).send('Your authorization is not valid, only for administrators.');
    }
}
export default adminUser;