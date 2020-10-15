import os from 'os';
import _compact from 'lodash/compact';

export const ipv4Valid = (ip) =>
  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(ip.trim());

export function ipv4RangeValid(ipRange) {
  if (!ipRange) return false;

  let [start, end] = ipRange.replace(/\s/g, '').split('-');

  if (!ipv4Valid(start) || !end) return false;

  const pre = start.lastIndexOf('.') + 1;

  if (end.length < pre) {
    // end is not an IP
    end = parseInt(end);

    if (isNaN(end)) return false;
  } else {
    // end is an IP
    if (!ipv4Valid(end) || (start.slice(0, pre) !== end.slice(0, pre))) return false;

    end = parseInt(end.slice(pre));
  }

  start = parseInt(start.slice(pre));

  return (start <= end) && (end < 256);
}

export function ipv6Valid(ip) {
  const addr = ip && ip.trim();

  if (!addr) return false;
  if (addr === '::') return true;

  if (addr.startsWith('::')) {
    return /^::([A-F0-9]{1,4}:){0,6}[A-F0-9]{1,4}$/i.test(addr);
  } else if (addr.endsWith('::')) {
    return /^([A-F0-9]{1,4}:){0,7}:$/i.test(addr);
  }

  const groups = addr.split('::');
  const numGroups = groups.length;

  // only one empty group (::) allowed
  if (!numGroups || (numGroups > 2)) return false;

  return /^[A-F0-9]{1,4}:([A-F0-9]{1,4}:){0,6}[A-F0-9]{1,4}$/i.test(addr.replace(/::/g, ':'));
}

function getFullIpv6(ip) {
  let [left = '', right = ''] = ip.split('::');

  const leftCount = left ? left.split(':').length : 0;
  const rightCount = right ? right.split(':').length : 0;
  const numCompacted = 8 - leftCount - rightCount;
  const expanded = Array(numCompacted).fill('0').join(':');

  return _compact([left, expanded, right]).join(':');
}

export function ipv6RangeValid(ipRange) {
  if (!ipRange) return false;

  let [start, end] = ipRange.replace(/\s/g, '').split('-');

  if (!ipv6Valid(start) || !end) return false;

  start = getFullIpv6(start);

  const pre = start.lastIndexOf(':') + 1;

  if (ipv6Valid(end)) {
    // end is IP
    end = getFullIpv6(end);

    if (start.slice(0, pre) !== end.slice(0, pre)) return false;

    end = parseInt(end.slice(pre), 16);
  } else {
    // end is not IP
    const endHexStr = end;
    end = parseInt(end, 16);

    if (isNaN(end) || (end.toString(16) !== endHexStr)) return false;
  }

  start = parseInt(start.slice(pre), 16);

  return (start <= end) && (end < 65536);
}

function deconstructIp(ip, version = 4) {
  let numGroups, delimiter, pattern, radix;

  switch (version) {
    case 6:
      numGroups = 8;
      delimiter = ':';
      pattern = /^[0-9A-Fa-f]{1,4}$/;
      radix = 16;
      break;

    default:
      numGroups = 4;
      delimiter = '.';
      pattern = /^[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]$/;
  }

  let groups = ip.split(delimiter);

  if (groups.length > numGroups) return;

  const result = [];

  for (let i = 0; i < numGroups; i++) {
    let group = groups[i];

    if (!group) {
      result.push(0);
      continue;
    }

    if (pattern.test(group)) {
      const int = parseInt(group, radix);

      if (isNaN(int)) return;

      result.push(int);
    } else {
      return;
    }
  }

  return result;
}

export const ipCidrValid = (cidr, version = 4) => {
  if (!cidr) return false;

  let [ip, rem] = cidr.trim().split('/');

  if (!ip || !rem) return false;

  rem = parseInt(rem);

  let addrSize, groupSize;

  switch (version) {
    case 6:
      addrSize = 128;
      groupSize = 16;
      break;

    default:
      addrSize = 32;
      groupSize = 8;
  }

  if (isNaN(rem) || (rem > addrSize)) return false;

  const groups = deconstructIp(ip, version);

  if (!groups) return false;

  const end = groups.concat();
  const groupMax = Math.pow(2, groupSize) - 1;
  let spill = 0;
  let bits = addrSize - rem;

  for (let i = groups.length - 1; (i >= 0) && (bits || spill); i--) {
    const shiftAmt = Math.min(groupSize, bits);
    end[i] += spill + (1 << shiftAmt) - 1;
    bits -= shiftAmt;

    if (end[i] > groupMax) {
      spill = end[i] - groupMax;
      end[i] = groupMax;
    } else {
      spill = 0;
    }
  }

  return !spill;
};

export const ipRangeValid = (ip, version) => {
  switch (version) {
    case 4 :
      return (ipv4Valid(ip) ||
        ipv4RangeValid(ip) ||
        ipCidrValid(ip));

    case 6 :
      return (ipv6Valid(ip) ||
        ipv6RangeValid(ip) ||
        ipCidrValid(ip, 6));

    default:
      return (
        ipv4Valid(ip) ||
        ipv4RangeValid(ip) ||
        ipv6Valid(ip) ||
        ipv6RangeValid(ip) ||
        ipCidrValid(ip) ||
        ipCidrValid(ip, 6)
      );
  }
};

export const getLocalIP = () => {
  const ifaces = os.networkInterfaces();

  for (let ifname in ifaces) {
    for (let iface of ifaces[ifname]) {
      if (!iface.internal && (iface.family === 'IPv4')) {
        return iface.address;
      }
    }
  }
};