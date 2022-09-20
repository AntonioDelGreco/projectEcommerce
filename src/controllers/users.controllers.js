const register = (req, res) => {
  res.send({status:'success', payload: req.user._id})
}

const registerFail = (req, res) => {
  res.status(500).send({status:'error', error:'Error in register'})
}

const login = (req, res) => {
  req.session.user = {
    name: req.user.name,
    email: req.user.email,
  }
  res.send({status:'success', payload:req.session.user});
}

const loginFail = (req, res) => {
  res.status(500).send({status:'error', error:'Error in login'})
}

const logout = (req, res) => {
  req.session.destroy(err => {
    if(err) return res.send("Couldn't log out try again");
    else return res.send('Logged out');
  });
}

export { register, registerFail, login, loginFail, logout };