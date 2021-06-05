import appConfigs from '../config/appConfig';

export const pluralize = (text, count, suffix = 's') => (count > 1 ? text + suffix : text);

/**
 * @param {{ id: string, path: string, ext:string }}imageObj
 */
export const buildPathToImage = ({ id, path, ext } = {}) => new URL(
  `${path}/${id}${ext}`, appConfigs.bkUrl,
);

/**
 * @param {{ id: string, path: string, ext:string }}imageObj
 */
export const buildPathToImageThumb = ({ id, path, ext } = {}) => new URL(
  `${path}/thumb-${id}${ext}`, appConfigs.bkUrl,
).href;
