randomString = (count) => {
  let key = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < count) {
    key += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return key;
};

module.exports = randomString;
