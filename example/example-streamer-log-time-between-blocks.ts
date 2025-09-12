import { PollingSubscribeProvider, MavrykToolkit } from '@mavrykdynamics/taquito';

// To run this script, run the following command in the example folder: `npm run example:streamer-block-time`
// This script polls on the head block at an interval of `pollingIntervalMilliseconds`.
// When a new block is seen, the time between the new block and the precedent is logged with the block level
// If a block is missed when polling, 'Missed block: `level`' is logged.

const provider = 'https://basenet.rpc.mavryk.network';
const pollingIntervalMilliseconds = 5000;
let date: Date;
let level: number;

function logLevelAndTime(data: number) {
  const newDate = new Date();
  const timeBetweenBlocks = date ? (newDate.getTime() - date.getTime()) : 0;
  if (level && data - level > 1) {
    level++
    while(level < data) {
      console.log('Missed block: ', level++)
    }
  }
  console.log('Time: ', timeBetweenBlocks, 'Level: ', data)
  date = newDate
  level = data;
}

async function example() {
  const mavryk = new MavrykToolkit(provider)

  console.log(provider)
  mavryk.setStreamProvider(mavryk.getFactory(PollingSubscribeProvider)({ pollingIntervalMilliseconds }));
  try {
    const sub = mavryk.stream.subscribeBlock('head')
    sub.on('data', (data) => logLevelAndTime(data.header.level))
  }
  catch (ex) {
    console.error(ex)
  }
}

example();
