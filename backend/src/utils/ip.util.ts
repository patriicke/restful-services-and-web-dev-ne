/**
 * @module utils/ip
 * @description IP utility functions
 */
import { Request } from 'express';
import { lookup } from 'geoip-lite';
import iso3166 from 'iso-3166-1';

export function getIp(request: Request) {
  const req = request as any;

  let ip: string =
    request.headers['x-forwarded-for'] ||
    request.headers['X-Forwarded-For'] ||
    request.headers['X-Real-IP'] ||
    request.headers['x-real-ip'] ||
    req?.ip ||
    req?.raw?.connection?.remoteAddress ||
    req?.raw?.socket?.remoteAddress ||
    undefined;

  if (ip && ip.split(',').length > 0) ip = ip.split(',')[0];

  return ip;
}

export const getLocation = (ip: string) => {
  const geo = lookup(ip);
  if (geo) {
    const countryName = iso3166.whereAlpha2(geo.country);
    return {
      country: countryName ? countryName.country : 'Unknown',
      region: geo.region,
      city: geo.city,
    };
  } else {
    return {
      country: 'Unknown',
      region: 'Unknown',
      city: 'Unknown',
    };
  }
};
