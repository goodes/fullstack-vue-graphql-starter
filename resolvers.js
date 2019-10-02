const bcrypt = require('bcrypt');

module.exports = {
  Query: {
    getPosts: async (_, args, { Post }) => {
      const posts = await Post.find({})
        .sort({ createdDate: 'desc' })
        .populate({
          path: 'createdBy',
          model: 'User'
        });
      return posts;
    }
  },
  Mutation: {
    addPost: async (
      _,
      { title, imageUrl, categories, description, creatorID },
      { Post }
    ) => {
      const newPost = new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorID
      }).save();
      return newPost;
    },

    signinUser: async (_, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found or invalid password');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('User not found or invalid password');
      }
      return user;
    },

    signupUser: async (_, { username, email, password }, { User }) => {
      const user = await User.findOne({ username: username });
      if (user) {
        throw new Error('User already exists');
      }

      const newUser = await new User({
        username,
        email,
        password
      }).save();

      return newUser;
    }
  }
};
