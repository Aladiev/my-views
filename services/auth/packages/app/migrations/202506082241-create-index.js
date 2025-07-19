module.exports = {
  async up(db) {
    await db.collection('users').createIndex({ email: 1 }, { unique: true, background: true });
  },

  async down(db) {
    await db.collection('users').dropIndex({ email: 1 }, { unique: true, background: true });
  },
};
