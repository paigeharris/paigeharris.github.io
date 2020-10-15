import { ipRangeValid, ipv4Valid, ipv4RangeValid, ipCidrValid, ipv6Valid, ipv6RangeValid } from "./ip.utils";

describe('ip utils functions', () => {
  it('valid ipv4', () => {
    expect(ipv4Valid('127.0.0.0')).toEqual(true);
  });

  it('invalid ipv4', () => {
    expect(ipv4Valid('')).toEqual(false);
    expect(ipv4Valid('asdf')).toEqual(false);
    expect(ipv4Valid('127')).toEqual(false);
    expect(ipv4Valid('127.')).toEqual(false);
    expect(ipv4Valid('127.0')).toEqual(false);
    expect(ipv4Valid('127.0.0')).toEqual(false);
    expect(ipv4Valid('127.0.0.0.')).toEqual(false);
    expect(ipv4Valid('.127.0.0.0')).toEqual(false);
    expect(ipv4Valid('127.0.0.01')).toEqual(false); // leading zero
    expect(ipv4Valid('127.0.0.256')).toEqual(false); // out of range
  });

  it('valid ipv4 range', () => {
    expect(ipv4RangeValid('127.0.0.0-1')).toEqual(true);
    expect(ipv4RangeValid(' 127.0.0.0-1 ')).toEqual(true);
    expect(ipv4RangeValid('127.0.0.0 -1')).toEqual(true);
    expect(ipv4RangeValid('127.0.0.0- 1')).toEqual(true);
    expect(ipv4RangeValid('127.0.0.0 - 1')).toEqual(true);
    expect(ipv4RangeValid('127.0.0.0-127.0.0.1')).toEqual(true);
    expect(ipv4RangeValid(' 127.0.0.0-127.0.0.1 ')).toEqual(true);
    expect(ipv4RangeValid('127.0.0.0 -127.0.0.1')).toEqual(true);
    expect(ipv4RangeValid('127.0.0.0- 127.0.0.1')).toEqual(true);
    expect(ipv4RangeValid('127.0.0.0 - 127.0.0.1')).toEqual(true);
  });

  it('invalid ipv4 range', () => {
    expect(ipv4RangeValid('')).toEqual(false);
    expect(ipv4RangeValid('127.0.0.0')).toEqual(false);
    expect(ipv4RangeValid('127.0.0.1-0')).toEqual(false);
    expect(ipv4RangeValid('127.0.0.1-127.0.0.0')).toEqual(false);
    expect(ipv4RangeValid('127.0.0.0 - 127.0.0.01')).toEqual(false);
    expect(ipv4RangeValid('127.0.0.0 - 256')).toEqual(false);
    expect(ipv4RangeValid('127.0.0.0 - 127.0.0.256')).toEqual(false);
    expect(ipv4RangeValid('127.0.0.0 - 127.0.0.256')).toEqual(false);
    expect(ipv4RangeValid('127.0.0.invalid-127.0.0.256')).toEqual(false);
    expect(ipv4RangeValid('127.0.0.0-127.0.0.invalid')).toEqual(false);
  });

  it('valid ipv4 CIDR', () => {
    expect(ipCidrValid('127.0.0.0/24')).toEqual(true);
    expect(ipCidrValid('127.0.0/24')).toEqual(true);
    expect(ipCidrValid('127.0/24')).toEqual(true);
    expect(ipCidrValid('127/24')).toEqual(true);
    expect(ipCidrValid('255.255.255.255/32')).toEqual(true);
    expect(ipCidrValid('255.255.254.255/31')).toEqual(true);
    expect(ipRangeValid('255.255.254.255/31')).toEqual(true);
  });

  it('invalid ipv4 CIDR', () => {
    expect(ipCidrValid('')).toEqual(false);
    expect(ipCidrValid('127')).toEqual(false);
    expect(ipCidrValid('127.0/')).toEqual(false);
    expect(ipCidrValid('127/33')).toEqual(false);
    expect(ipCidrValid('/32')).toEqual(false);
    expect(ipCidrValid('127.0.0.0.0/24')).toEqual(false);
    expect(ipCidrValid('255.255.255.255/31')).toEqual(false);
  });

  it('valid ipv6', () => {
    expect(ipv6Valid('::')).toEqual(true);
    expect(ipv6Valid(' :: ')).toEqual(true);
    expect(ipv6Valid(' ::7334')).toEqual(true);
    expect(ipv6Valid('2001:: ')).toEqual(true);
    expect(ipv6Valid('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toEqual(true);
    expect(ipv6Valid('2001:db8:85a3:0:0:8a2e:370:7334')).toEqual(true);
    expect(ipv6Valid('2001:db8:85a3::8a2e:370:7334')).toEqual(true);
  });

  it('invalid ipv6', () => {
    expect(ipv6Valid('')).toEqual(false);
    expect(ipv6Valid('2001:0db8:85a3:00000:0000:8a2e:0370:7334')).toEqual(false);
    expect(ipv6Valid(':2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toEqual(false);
    expect(ipv6Valid('2001:0db8:85a3:0000:0000:8a2e:0370:7334:')).toEqual(false);
    expect(ipv6Valid('::2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toEqual(false);
    expect(ipv6Valid('2001:0db8:85a3:0000:0000:8a2e:0370:7334::')).toEqual(false);
    expect(ipv6Valid('2001:0db8:85a3:0000:0:0000:8a2e:0370:7334')).toEqual(false);
    expect(ipv6Valid('2001:db8:85a3::8a2e::7334')).toEqual(false);
    expect(ipv6Valid('2001')).toEqual(false);
    expect(ipv6Valid(':2001')).toEqual(false);
    expect(ipv6Valid('2001:')).toEqual(false);
  });

  it('valid ipv6 range', () => {
    expect(ipv6RangeValid('2001:0db8:85a3:0000:0000:8a2e:0370:7334 -2001:0db8:85a3:0000:0000:8a2e:0370:7335')).toEqual(true);
    expect(ipv6RangeValid('2001:0db8:85a3:0000:0000:8a2e:0370:7334- 2001:0db8:85a3:0000:0000:8a2e:0370:7335')).toEqual(true);
    expect(ipv6RangeValid('2001:0db8:85a3:0000:0000:8a2e:0370:7334 - 2001:0db8:85a3:0000:0000:8a2e:0370:7335')).toEqual(true);
    expect(ipv6RangeValid('2001:0db8:85a3:0000:0000:8a2e:0370:7334-7335')).toEqual(true);
    expect(ipv6RangeValid('2001:0db8:85a3:0000:0000:8a2e:0370:7334- 7335')).toEqual(true);
    expect(ipv6RangeValid('2001:0db8:85a3:0000:0000:8a2e:0370:7334 -7335')).toEqual(true);
    expect(ipv6RangeValid('2001:0db8:85a3:0000:0000:8a2e:0370:7334 - 7335')).toEqual(true);
    expect(ipv6RangeValid(':: - ::')).toEqual(true);
    expect(ipv6RangeValid('0:: - ::')).toEqual(true);
    expect(ipv6RangeValid(':: - ::0')).toEqual(true);
    expect(ipv6RangeValid('0::0 - ::')).toEqual(true);
    expect(ipv6RangeValid('0:: - ::0')).toEqual(true);
    expect(ipv6RangeValid('::0 - 0::')).toEqual(true);
    expect(ipv6RangeValid('0::0 - 0::')).toEqual(true);
    expect(ipv6RangeValid('0::0 - ::0')).toEqual(true);
  });

  it('invalid ipv6 range', () => {
    expect(ipv6RangeValid('2001:0db8:85a3:0000:0000:8a2e:0370:ffff-2001:0db8:85a3:0000:0000:8a2e:0370:fffe')).toEqual(false);
    expect(ipv6RangeValid('2001:0db8:85a3:0000:0000:8a2e:0370:ffff-10000')).toEqual(false);
    expect(ipv6RangeValid('2001:0db8:85a3:0000:0000:8a2e:0370:ffff-fffe')).toEqual(false);
    expect(ipv6RangeValid('2001:0db8:85a3:0000:0000:8a2e:0370:invalid-fffe')).toEqual(false);
    expect(ipv6RangeValid('2001:0db8:85a3:0000:0000:8a2e:0370:ffff-invalid')).toEqual(false);
    expect(ipv6RangeValid('2001:0db8:85a3:0000:0000:8a2e:0370:1-::')).toEqual(false);
    expect(ipv6RangeValid('2001:0db8:85a3:0000:0000:8a2e:0370:1-:::')).toEqual(false);
  });

  it('valid ipv6 CIDR', () => {
    expect(ipCidrValid('::/128', 6)).toEqual(true);
    expect(ipCidrValid('0::/128', 6)).toEqual(true);
    expect(ipCidrValid('::0/128', 6)).toEqual(true);
    expect(ipCidrValid('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/128', 6)).toEqual(true);
    expect(ipCidrValid('ffff:ffff:ffff:ffff:ffff:ffff:fffe:ffff/127', 6)).toEqual(true);

  });

  it('invalid ipv6 CIDR', () => {
    expect(ipCidrValid('', 6)).toEqual(false);
    expect(ipCidrValid('::', 6)).toEqual(false);
    expect(ipCidrValid('::/', 6)).toEqual(false);
    expect(ipCidrValid('::/129', 6)).toEqual(false);
    expect(ipCidrValid('/128', 6)).toEqual(false);
    expect(ipCidrValid('2001:0db8:85a3:0:0:0:8a2e:0370:7334/128', 6)).toEqual(false);
    expect(ipCidrValid('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/127', 6)).toEqual(false);
    expect(ipRangeValid('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff/127')).toEqual(false);
  });

  it('valid ipRange', () => {
    expect(ipRangeValid('127.0.0.0-1')).toEqual(true);
    expect(ipRangeValid('::-1')).toEqual(true);
  });

  it('invalid ipRange', () => {
    expect(ipRangeValid('127.0.0.1-0')).toEqual(false);
    expect(ipRangeValid('2001:0db8:85a3:0000:0000:8a2e:0370:ffff-fffe')).toEqual(false);
  });
});