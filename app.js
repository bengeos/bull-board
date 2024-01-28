const Bull = require("bull");
const express = require("express");
const { createBullBoard } = require("bull-board");
const { BullAdapter } = require("bull-board/bullAdapter");
require("dotenv").config();

var queues = process.env.BULL_QUEUES.split(",");
const app = express();
const bullQueues = [];
for (const queue in queues) {
  const myQueue = new Bull(
    `${queues[queue].trim()}`,
    `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
  );
  bullQueues.push(myQueue);
}

const { router: bullBoardRouter } = createBullBoard(
  bullQueues.map((queue) => new BullAdapter(queue))
);
app.use("/", bullBoardRouter);

app.listen(3000, () => {
  console.log(`gluon bull-board running on port 3000`);
});
