const express = require('express');

const router = express.Router();
// const jwt = require('jsonwebtoken');
const Product = require('../models/product');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/', jwtMiddleware, (req, res) => {
    Product.findAll()
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
});

router.get('/:id', jwtMiddleware, (req, res) => {
    Product.findByPk(req.params.id)
        .then((product) => {
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Produto não encontrado' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
});

router.post('/', jwtMiddleware, (req, res) => {
    Product.create(req.body)
        .then((product) => {
            res.status(201).json(product);
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
});

router.put('/:id', jwtMiddleware, (req, res) => {
    Product.update(req.body, { where: { id: req.params.id } })
        .then(() => {
            Product.findByPk(req.params.id)
                .then((product) => {
                    if (product) {
                        res.status(200).json(product);
                    } else {
                        res.status(404).json({ message: 'Produto não encontrado' });
                    }
                });
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
});

router.delete('/:id', jwtMiddleware, (req, res) => {
    Product.destroy({ where: { id: req.params.id } })
        .then((result) => {
            if (result) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: 'Produto não encontrado' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
});

module.exports = router;
