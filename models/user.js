const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: 'Name is required'
        },
        email: {
            type: String,
            trim: true,
            unique: 'Email already exists',
            match: [/.+\@.+\..+/, 'Invalid email address'],
            required: 'Email is required'
        },
        created: {
            type: Date,
            default: Date.now
        },
        updated: Date,
        password: {
            type: String,
            required: "Password is required"
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        about: {
            type: String,
            trim: true
        },
        following: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
        followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
    }
);

UserSchema.pre('save', function(next){
    var user = this;
    // Generate a password hash when the password changes (or a new password)
    if (!user.isModified('password')) return next();
    // Generate a salt
    bcrypt.genSalt(10, function(err, salt){
        if (err) return next(err);
        // Combining Salt to Generate New Hash
        bcrypt.hash(user.password, salt, function(err, hash){
            if (err) return next(err);
            // Overwriting plaintext passwords with hash
            user.password = hash;
            next();
        });
    });
});

//compare password method
UserSchema.methods.comparePassword = async function(pass){
    const match = await bcrypt.compare(pass, this.password);
    return match;
}

module.exports = mongoose.model("User", UserSchema);