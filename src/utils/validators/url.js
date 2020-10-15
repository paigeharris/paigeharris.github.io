import createValidator from './createValidator';

const pattern = '^((ft|htt)ps?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?' + // port
  '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
  '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$';

const regex = new RegExp(pattern, 'i'); // fragment locator

export const urlValidator = createValidator((url) => (url && regex.test(url)), 'Invalid URL');