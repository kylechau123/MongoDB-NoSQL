const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function(date) {
        return dayjs(date).format("MM/DD/YYYY")
      }
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
    },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
