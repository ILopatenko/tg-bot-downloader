const { Bot, GrammyError, HttpError } = require('grammy');
const { spawn } = require('child_process');
const TaskManager = require('./TaskManager');

const taskManager = new TaskManager();

const bot = new Bot(taskManager.data.bot.token);

//
//BOT COMMANDS DESCRIPTION FOR USERS
bot.api.setMyCommands([
   {
      command: 'start',
      description: 'Main bot command start description',
   },
]);

bot.command('start', async ctx => {});

//
//ERROR HANDLING
bot.catch(err => {
   console.log(err);
   const ctx = err.ctx;
   console.error(`Error while handling update ${ctx.error.update_id}:`);
   const e = err.error;

   if (e instanceof GrammyError) {
      console.error('Error in the request: ', e.description);
   } else if (e instanceof HttpError) {
      console.error('HTTP error: ', e);
   } else {
      console.error('Unknown error');
   }
});

//
//BOT RUN
bot.start({
   onStart: info =>
      console.log(
         `Bot started as @${info.username}. Date/time: ${taskManager.getCurrentDateAndTimePst()}`
      ),
});
