/* eslint-disable prettier/prettier */
const URI = 'https://hiousapp.com/api/admin/fetch_users.php';

export default {
  async fetchUsers() {
    try {
      let response = await fetch(URI);
      let responseJsonData = await response.json();
      return responseJsonData;
    } catch (e) {
      console.log(e);
    }
  },
};
