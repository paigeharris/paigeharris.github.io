import Crypto from '../Crypto';
import * as constants from './constants';
import AuthUrlMgr from '../AuthUrlMgr';

export const genPostObj = (dataObj) => {
  const body = JSON.stringify(dataObj);

  return {
    method: constants.METHOD_POST,
    mode: constants.MODE_CORS,
    headers: constants.HEADERS,
    body: body
  };
};

export const fetchNonce = (email, nonce = AuthUrlMgr.nonce) => {
  const body = {
    email: email,
    cnonce: Crypto.genCnonce()
  };

  return new Promise((resolve, reject) => {
    fetch(nonce, genPostObj(body))
    .then(res => res.json())
    .then(data => {
      data.error ? reject(data.error) : resolve(data);
    })
    .catch(err => {
      reject(err);
    });
  });
};

export const fetchLogin = async (password, email) => {
  const { nonce, cnonce, user_auth_mode } = await fetchNonce(email);
  const body = {
    hash: Crypto.hashPassword(password, nonce, cnonce),
    email
  };

  return new Promise((resolve, reject) => {
    fetch(AuthUrlMgr.login, genPostObj(body))
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        reject(data.error);
      } else {
        resolve({
          ...data,
          nonce,
          cnonce,
          user_auth_mode
        });
      }
    })
    .catch(err => {
      reject(err);
    });
  });
};

export const fetchPin = (pin, email, authCodeApi = AuthUrlMgr.auth) => {
  const body = {
    auth_code: pin,
    email: email
  };

  return new Promise((resolve, reject) => {
    fetch(authCodeApi, genPostObj(body))
    .then(res => res.json())
    .then(data => {
      if (data.status === constants.ERROR_STATUS) {
        reject(data);
      } else {
        resolve(data);
      }
    })
    .catch(err => {
      reject(err);
    });
  });
};

export const hashPassword = (pw, email, nonce = AuthUrlMgr.nonce) => {
  return fetchNonce(email, nonce).then(({ nonce, cnonce }) =>
    Crypto.hashPassword(pw, nonce, cnonce)
  );
};
