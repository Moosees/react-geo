const user = {
  _id: '1',
  name: 'Test',
  email: 'test@test.com',
  picture: 'https://cloudinary.com/fsdfsg'
};

module.exports = {
  Query: {
    me: () => user
  }
};
