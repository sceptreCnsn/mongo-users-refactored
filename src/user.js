const mongoose = require("mongoose");
const BlogPostSchema = require('./blogPost');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        validate:{
            validator:name=>name.length>2,
            message:'Name must be longer than 2 chars.'
        },
        required:[true,'Name is required']
    },
    posts:[BlogPostSchema]
});

const User = mongoose.model('user',UserSchema);

UserSchema.virtual('postsCount').get(function(){
    return this.posts.count;
})

module.exports = User;