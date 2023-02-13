const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

class UserService {
    async createUser(userData) {
        try {
            const password = await bcrypt.hash(userData.password, 10);
            const user = await User.create({ ...userData, password });
            return user;
        } catch (error) {
            throw new Error(`Error creating user: ${error}`);
        }
    }

    async getUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            throw new Error(`Error fetching users: ${error}`);
        }
    }

    async getUserById(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            return user;
        } catch (error) {
            throw new Error(`Error fetching user: ${error}`);
        }
    }

    async updateUser(id, updatedData) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            if (updatedData.password) {
                updatedData.password = await bcrypt.hash(updatedData.password, 10);
            }
            await user.update(updatedData);
            return user;
        } catch (error) {
            throw new Error(`Error updating user: ${error}`);
        }
    }

    async deleteUser(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            await user.destroy();
            return { message: `User with id ${id} deleted successfully` };
        } catch (error) {
            throw new Error(`Error deleting user: ${error}`);
        }
    }

    async login(email, password) {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new Error(`User with email ${email} not found`);
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: '1d',
            });
            return { user, token };
        } catch (error) {
            throw new Error(Error logging in user: ${ error });
        }
    }
}

module.exports = new UserService();
