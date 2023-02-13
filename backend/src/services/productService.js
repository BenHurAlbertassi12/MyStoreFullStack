const Product = require('../models/product');

class ProductService {
    async createProduct(productData) {
        try {
            const product = await Product.create(productData);
            return product;
        } catch (error) {
            throw new Error(`Error creating product: ${error}`);
        }
    }

    async getProducts() {
        try {
            const products = await Product.findAll();
            return products;
        } catch (error) {
            throw new Error(`Error fetching products: ${error}`);
        }
    }

    async getProductById(id) {
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error(`Product with id ${id} not found`);
            }
            return product;
        } catch (error) {
            throw new Error(`Error fetching product: ${error}`);
        }
    }

    async updateProduct(id, updatedData) {
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error(`Product with id ${id} not found`);
            }
            await product.update(updatedData);
            return product;
        } catch (error) {
            throw new Error(`Error updating product: ${error}`);
        }
    }

    async deleteProduct(id) {
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error(`Product with id ${id} not found`);
            }
            await product.destroy();
            return { message: `Product with id ${id} deleted successfully` };
        } catch (error) {
            throw new Error(`Error deleting product: ${error}`);
        }
    }
}

module.exports = new ProductService();
