export const fileTicker = (fileName : string) : string => {
  const fname = fileName.replace('.L', '')
  return fname.substring(0, fname.indexOf('_'))
}