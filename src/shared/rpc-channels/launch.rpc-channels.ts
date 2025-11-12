export enum LaunchpcChannelsEnum {
  LAUNCH = 'launch',
  LOBBY = 'lobby',
}

const values = Object.values(LaunchpcChannelsEnum).filter(
  (v) => typeof v === 'string',
);

export const launchRpcChannels = [...values];
