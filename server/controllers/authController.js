import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto';
import User from '../models/User.js'
import { createError } from "../utils/error.js";
import { msgBody } from '../utils/mailGenerator/actionMsg.js';
import { sendEmail } from '../utils/mail.js';

export const register = async (req, res, next) => {
    try {
        if (!req.body.fullname || !req.body.username || !req.body.email || !req.body.password)
            return next(createError(401, "Please fill the all requried fields."));
        else if (req.body.password.length < 6 || req.body.password.length > 12)
            return next(createError(401, "Password must be 6 to 12 characters."));
        else {
            const user = await User.findOne({ email: req.body.email })
            if (user) return next(createError(400, "Email has already been registered."));
            else {
                const newUser = new User({
                    fullname: req.body.fullname,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                })
                // const newUser = new User(req.body)
                await newUser.save();
                const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT, {
                    expiresIn: "1d"
                })

                const { password, isAdmin, tokens, ...otherDetails } = newUser._doc;
                res.cookie("access_token", token, { httpOnly: true, expires: new Date(Date.now() + 1000 * 86400) }).status(200).send({ ...otherDetails })
            }
        }
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return next(createError(404, "User not found!"))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Wrong password or email!"))

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

        const { password, isAdmin, tokens, ...otherDetails } = user._doc;
        res.cookie("access_token", token, { httpOnly: true, expires: new Date(Date.now() + 1000 * 86400) }).status(200).send({ ...otherDetails })
    } catch (err) {
        next(err)
    }
}

export const logout = async (req, res, next) => {
    try {
        res.cookie("access_token", "", { httpOnly: true, expires: new Date(Date.now()) }).status(200).send("Logout successfully.")
    } catch (err) {
        next(err)
    }
}

export const changePassword = async (req, res, next) => {
    try {
        if (req.body.newPassword.length < 6 || req.body.newPassword.length > 12)
            return next(createError(401, "Password must be 6 to 12 characters."));
        else {
            const user = await User.findById(req.user.id);
            const isPasswordCorrect = await bcrypt.compare(req.body.oldPassword, user.password);
            if (!isPasswordCorrect) return next(createError(400, "Wrong password!"))
            else {
                user.password = req.body.newPassword;
                await user.save();
                res.status(200).send("Password change successful.");
            }
        }
    } catch (err) {
        next(err);
    }
}

export const forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return next(createError(404, "User does not exist."));
        else {
            let resetToken = crypto.randomBytes(32).toString("hex") + user._id;

            const hashedToken = crypto
                .createHash("sha256")
                .update(resetToken)
                .digest("hex");

            await User.updateOne(
                { email: req.body.email },
                {
                    "tokens": {
                        token: hashedToken,
                        createdAt: Date.now(),
                        expiresAt: Date.now() + 10 * (60 * 1000), // 10 minutes
                    }
                }, { new: true }
            );

            const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

            let mailBody = {
                name: user.username,
                intro: 'You have received this email because a password reset request for your account was received.',
                instructions: 'Click the button below to reset your password:',
                color: '#DC4D2F',
                text: 'Reset your password',
                link: resetUrl,
                outro: 'This reset button is valid for only 10 minutes.\n If you did not request a password reset, no further action is required on your part.'
            };

            const message = msgBody(mailBody);
            const subject = "Reset Password Request";
            const send_to = user.email;

            await sendEmail(subject, message, send_to);
            res.status(200).send("Reset Email Sent successfully.");
        }
    } catch (err) {
        next(err);
    }
}

export const resetPassword = async (req, res, next) => {
    try {
        if (req.body.password.length < 6 || req.body.password.length > 12)
            return next(createError(401, "Password must be 6 to 12 characters."));
        else {
            const hashedToken = crypto
                .createHash("sha256")
                .update(req.params.resetToken)
                .digest("hex");

            const userToken = await User.findOne({
                "tokens.token" : hashedToken,
                "tokens.expiresAt" : { $gt: Date.now() },
            });
            console.log(hashedToken)
            if (!userToken)
                return next(createError(404, "Invalid or Expired Token."));
            else {
                const user = await User.findOne({ _id: userToken._id });
                user.password = req.body.password;
                user.tokens = {};
                await user.save();
                res.status(200).send("Password reset successful.");
            }
        }
    } catch (err) {
        next(err);
    }
}