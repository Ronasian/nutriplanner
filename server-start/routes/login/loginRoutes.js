const router = require('express').Router();
const bcrypt = require('bycraft');
const Login = require('../../models/Login');

router.post('/login', async (req, res) => {
    try {
        const memberData = await Login.findOne({ where: { email: req.body.email } });
        if (!memberData) {
            res.status(404).json({ message: 'Login failed! Please try again!!' });
            return;
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            memberData.password
        );
        if (!validPassword) {
            res.status(400).json({ message: 'Login failed! Please try again!!' });
            return;
        }

        req.session.save(() => {
            req.session.login_id = memberData.id;
            req.session.logged_in = true;
            
            res.json({ user: memberData, message: 'You are now logged in!' });
          });

        } catch (err) {
            res.status(400).json(err);
          }
        });

        router.post('/logout', (req, res) => {
            if (req.session.logged_in) {
              req.session.destroy(() => {
                res.status(204).end();
              });
            } else {
              res.status(404).end();
            }

});

module.exports = router; 