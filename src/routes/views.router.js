import { Router } from "express";
const router = Router();

router.get('/', (req, res) => {
  res.render('start');
})

router.get('/api/users/register', (req, res) => {
  res.render('register');
})
router.get('/api/users/login', (req, res) => {
  res.render('login');
})
router.get('/api/users/data', (req, res) => {
  if(!req.session.user) return res.redirect('/api/users/login');
  res.render('dataUser', {user: req.session.user});
})

export default router;