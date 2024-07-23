const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { v4: uuidv4 } = require('uuid');
const { app } = require('../firebaseConfig.js');

const storage = getStorage(app);

const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${uuidv4()}-${file.originalname}`);
  await uploadBytes(storageRef, file.buffer);
  return await getDownloadURL(storageRef);
};

module.exports = { uploadImage };
