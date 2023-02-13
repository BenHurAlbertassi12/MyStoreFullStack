const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/signup', (req, res) => {
    User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (user) res.status(409).json({ message: 'Email já existente' });
            bcrypt.hash(req.body.password, 10)
                .then((hash) => {
                    User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                    }).then((newUser) => {
                        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
                            expiresIn: 86400, // 24 hours
                        });
                        res.status(201).json({
                            user: newUser,
                            token,
                        });
                    }).catch((error) => {
                        res.status(500).json({ message: error.message });
                    });
                });
        });
});

router.post('/signin', (req, res) => {
    User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (!user) res.status(404).json({ message: 'Usuário não encontrado' });
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) res.status(401).json({ message: 'Senha inválida' });
                    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                        expiresIn: 86400, // 24 hours
                    });
                    res.status(200).json({
                        user,
                        token,
                    });
                });
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
});

module.exports = router;
