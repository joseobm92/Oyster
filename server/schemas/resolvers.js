const { AuthenticationError } = require("apollo-server-express");
const { User, Collection, Project } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate("collections").populate("projects");
    },

    user: async (parent, { userId }) => {
      const userData = await User.findOne({ _id: userId })
        .populate("collections")
        .populate("projects");
      return userData;
    },

    // Get logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).populate(
          "collections"
        );
        return userData;
      }
      //throw new AuthenticationError('You need to be logged in!');
    },

    collections: async (parent, { userId }) => {
      const params = userId ? { userId } : {};
      return Collection.find(params).sort({ createdAt: -1 });
    },
    collection: async (parent, { collectionId }) => {
      return Collection.findOne({ _id: collectionId });
    },

    project: async (parent, { projectId }) => {
      return Project.findOne({ _id: projectId });
    },

    projects: async () => {
      return await Project.find();
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
        throw new AuthenticationError("Incorrect Credentials");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    // Add a collection to a users favorites
    addCollection: async (
      parent,
      { name, symbol, address, supply, logo, sales, volume, floor, avg_price },
      context
    ) => {
      const collection = await Collection.create({
        name,
        symbol,
        address,
        supply,
        logo,
        sales,
        volume,
        floor,
        avg_price,
      });

      console.log(collection);

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { collections: collection._id } }
      );
      return collection;
    },

    // Remove collection from a users favorites
    removeCollection: async (parent, { collectionId }, context) => {
      if (context.user) {
        console.log(collectionId);
        const collection = await Collection.findOneAndDelete({
          _id: collectionId,
        });

        console.log(collection);

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { collections: collection._id } }
        );

        return collection;
      }
      //throw new AuthenticationError('You need to be logged in!');
    },

    addProject: async (
      parent,
      { name, symbol, address, supply, logo, website },
      context
    ) => {
      if (context.user) {
        const project = await Project.create({
          name,
          symbol,
          address,
          supply,
          logo,
          website,
          projectAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { projects: project._id } }
        );

        return project;
      }
      //throw new AuthenticationError('You need to be logged in!');
    },

    addComment: async (parent, { projectId, commentText }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      //      throw new AuthenticationError("You need to be logged in!");
    },
    removeProject: async (parent, { projectId }, context) => {
      if (context.user) {
        const project = await Project.findOneAndDelete({
          _id: projectId,
          projectAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { projects: project._id } }
        );

        return project;
      }
      //throw new AuthenticationError("You need to be logged in!");
    },
    removeComment: async (parent, { projectId, commentId }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      //throw new AuthenticationError("You need to be logged in!");
    },

    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
