import axios from 'axios';

export const viewCourse = async (token) => {
  return await axios
    .post('course/viewCourse', {usertoken:token})
    .then(response => {
      console.log(response.data);
    });
}
