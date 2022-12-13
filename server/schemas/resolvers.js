const { AuthenticationError } = require('apollo-server-express');
const { User, Collection } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    /// GETS ONE USER ///
    // user: async (parent, { userId }, context) => {
    //   if (context.user) {
    //     const userData = await (await User.findOne({ _id: userId }).select('-__v -password'));

    //     return userData;
    //   }

    //   //throw new AuthenticationError('Not logged in');
    // },
    
    user: async (parent, { userId }) => {
      const userData = await User.findOne({ _id: userId });
      return userData;
    },

    // Get logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
      }
      //throw new AuthenticationError('You need to be logged in!');
    },

    collections: async (parent, { userId }) => {
      const params = userId ? { userId } : {};
      return Collection.find(params).sort({ createdAt: -1 });
    },
    collection: async (parent, { userId }) => {
      return Collection.findOne({ _id: collectionId });
    },

  },

  Mutation: {
    /// ADD USER ///
    signup: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    /// LOGIN ///
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect Credentials');
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError('Incorrect Credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    // Add a collection to a user 
    addCollection: async (parent, { name, address }, context) => {
      const collection = await Collection.create({ name, address });
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { collections: collection._id } }
      );
      return collection;
    },

      // Set up mutation so a logged in user can only remove their profile and no one else's
      removeUser: async (parent, args, context) => {
        if (context.user) {
          return Profile.findOneAndDelete({ _id: context.user._id });
        }
        throw new AuthenticationError('You need to be logged in!');
      },
  }
};

module.exports = resolvers;
