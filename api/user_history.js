/* eslint-disable prettier/prettier */
/* eslint-disable semi */

import ApiManagerHistory from './ApiManager';

export const user_history = async data => {
  try {
    const result = await ApiManagerHistory('/fetch_user_history.php', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error.response;
  }
};
