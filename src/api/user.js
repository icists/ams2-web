const user = {
  name: 'Jae-in Moon',
  country: 'South Korea',
  major: 'Politics and Presidency',
  school: 'Blue House',
};

export default {
  getUser(cb) {
    setTimeout(() => cb(user), 100);
  },
};
