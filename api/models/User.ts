import mongoose, {HydratedDocument, Model} from "mongoose";
import bcrypt from "bcrypt";
import {UserFields} from "../types";
import {randomUUID} from "crypto";

const SALT_WORK_FACTOR = 10;

interface userMethods {
    checkPassword: (password: string) => Promise<boolean>;
    generateAuthToken: () => void;
}

type UserModel = Model<UserFields, {}, userMethods>

const UserSchema = new mongoose.Schema<HydratedDocument<UserFields>,
    UserModel,
    userMethods,
    {}>({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async (value: string) => {
                const user = await User.findOne({username: value})
                if (user) return false;
                return true;
            },
            message: 'User name is already taken',
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    token: {
        type: String,
        required: true,
    }
});

UserSchema.methods.checkPassword = function (password: string) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAuthToken = function () {
    this.token = randomUUID();
};

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
});

UserSchema.set('toJSON', {
    transform: (_doc, ret, _options) => {
        const {password, ...rest} = ret
        return rest;
    }
})

const User = mongoose.model('User', UserSchema);
export default User;