export function UseConvertDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const hoursText = hours > 0 ? hours + "h " : "";
  const minutesText = minutes > 0 ? minutes + "m" : "";

  return hoursText + minutesText;
}
