import createValidator from './createValidator';
import { ipRangeValid } from "../ip/ip.utils";

let ipRegexStr = '(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';
ipRegexStr = `(?:${ipRegexStr}\\.){3}${ipRegexStr}`;

let ipAndPortRegexStr = `^(${ipRegexStr})(?:\\:([0-9]{1,5}))?$`;
const regexIpAndPort = new RegExp(ipAndPortRegexStr);

const regexIP = new RegExp(`^${ipRegexStr}$`);

export const ipValidator = createValidator((ip) => (ip && regexIP.exec(ip)), 'Invalid IP address');

export const portValidator = createValidator((port) => (port >= 0) && (port <= 65535), 'Invalid Port');

export const ipRangeValidator = createValidator((ip) => (ipRangeValid(ip)), 'Invalid IP address');

export const ipAndPortValidator = (ipStr) => {
  const [full, ip, port] = regexIpAndPort.exec(ipStr) || [];
  let result = ipValidator(ip);

  if (!result.error) {
    result = portValidator(port);
  }

  return result;
};

