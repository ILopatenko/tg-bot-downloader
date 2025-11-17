const { Bot, GrammyError, HttpError } = require('grammy');
const { spawn } = require('child_process');

const db = {
   channels: {
      loma: { nameRu: 'Ломик', nameEn: 'Lomik', youtubeId: 'UCwpJLdJaGbrFJu7LBYIHhRA' },
      araty: { nameRu: 'Барматурий', nameEn: 'Barmaturii', youtubeId: 'UCOuOmYREzeQgHBTaSp1J33g' },
      erica: { nameRu: 'Эрика', nameEn: 'Erika', youtubeId: 'UCiTI5rKVkJt8_3RWiOnctQg' },
      igor: { nameRu: 'Игорь', nameEn: 'Igor', youtubeId: 'UCvSj-bLz_zo9aYE7F8figHA' },
   },
   users: {
      kolian: { nameRu: 'Колян', nameEn: 'Kolian', tgId: 8471699953 },
      iurii: { nameRu: 'Юрий', nameEn: 'Iurii', tgId: 7478193207 },
      olga: { nameRu: 'Ольга', nameEn: 'Olga', tgId: 943078131 },
      myBot: { nameRu: 'Бот', nameEn: 'PatParBot', tgId: 8291994452 },
      chatGroup: { nameRu: 'Чат Группа', nameEn: 'Chat Group', tgId: -1002906469238 },
      group: { nameRu: 'Группа', nameEn: 'Group', tgId: -1003047486686 },
   },
   bot: {
      token: '8291994452:AAFo9VsRNM9GHoH8NzBRA022f6H3U9nxZoM',
      youtubeKey: 'AIzaSyBp-9UGvHvxHFHU1DR8cSRXWHES-bG5ztI',
   },
   other: {
      emoji: [
         '👍',
         '👎',
         '❤️',
         '🔥',
         '👏',
         '😁',
         '🎉',
         '💯',
         '😢',
         '😡',
         '😂',
         '🤣',
         '😍',
         '😎',
         '🤔',
         '😐',
         '😅',
         '🙃',
         '🤩',
         '🙏',
         '🤝',
         '🤘',
         '✌️',
         '👌',
         '👊',
         '🥰',
         '😞',
         '😭',
         '🤮',
         '💔',
         '🤡',
         '😏',
         '😴',
         '🤷',
         '🤦',
         '🙌',
         '😕',
         '💪',
         '✨',
         '🎊',
         '😄',
         '🥳',
         '🤪',
         '🫡',
         '😤',
         '😓',
         '😔',
         '😩',
         '🫶',
         '😑',
      ],
   },

   formatTimestamp: ts => {
      const date = new Date(ts);

      const dateStr = date.toLocaleDateString('en-US', {
         timeZone: 'America/Los_Angeles',
         year: 'numeric',
         month: 'long',
         day: 'numeric',
      });

      const timeStr = date
         .toLocaleTimeString('en-US', {
            timeZone: 'America/Los_Angeles',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
         })
         .toLowerCase();

      return `${dateStr} at ${timeStr}`;
   },

   getCurrentTimestamp: () => Date.now(),

   getCurrentDateAndTimePst: () => db.formatTimestamp(Date.now()),

   addEmojiToMessage: async (ctx, emoji) => {
      await ctx.react(emoji);
   },

   replyToMessage: async (ctx, message) =>
      await ctx.reply(message, {
         reply_parameters: {
            message_id: ctx.msg.message_id,
         },
      }),

   replyWithEmoji: async (ctx, message, emoji) => {
      await db.addEmojiToMessage(ctx, emoji);
      await db.replyToMessage(ctx, message);
   },
};

const bot = new Bot(db.bot.token);

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
      console.log(`Bot started as @${info.username}. Date/time: ${db.getCurrentDateAndTimePst()}`),
});
