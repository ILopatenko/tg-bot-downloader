class TaskManager {
   constructor() {
      this.activeTasks = [];
      this.data = {
         ytChannels: {
            loma: { nameRu: 'Ломик', nameEn: 'Lomik', id: 'UCwpJLdJaGbrFJu7LBYIHhRA' },
            araty: { nameRu: 'Барматурий', nameEn: 'Barmaturii', Id: 'UCOuOmYREzeQgHBTaSp1J33g' },
            erica: { nameRu: 'Эрика', nameEn: 'Erika', id: 'UCiTI5rKVkJt8_3RWiOnctQg' },
            igor: { nameRu: 'Игорь', nameEn: 'Igor', id: 'UCvSj-bLz_zo9aYE7F8figHA' },
         },
         tgUsers: {
            kolian: { nameRu: 'Колян', nameEn: 'Kolian', tgId: 8471699953 },
            iurii: { nameRu: 'Юрий', nameEn: 'Iurii', tgId: 7478193207 },
            olga: { nameRu: 'Ольга', nameEn: 'Olga', tgId: 943078131 },
            myBot: { nameRu: 'Бот', nameEn: 'PatParBot', tgId: 8291994452 },
            chatGroup: { nameRu: 'Чат Группа', nameEn: 'Chat Group', tgId: -1002906469238 },
            group: { nameRu: 'Группа', nameEn: 'Group', tgId: -1003047486686 },
         },
         emoji: {},
         bot: {
            token: '8291994452:AAFo9VsRNM9GHoH8NzBRA022f6H3U9nxZoM',
            youtubeKey: 'AIzaSyBp-9UGvHvxHFHU1DR8cSRXWHES-bG5ztI',
         },
      };

      this.formatTimestamp = ts => {
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
      };
      this.getCurrentTimestamp = () => Date.now();

      this.getCurrentDateAndTimePst = () => this.formatTimestamp(Date.now());

      this.addEmojiToMessage = async (ctx, emoji) => {
         await ctx.react(emoji);
      };

      this.replyToMessage = async (ctx, message) =>
         await ctx.reply(message, {
            reply_parameters: {
               message_id: ctx.msg.message_id,
            },
         });

      this.replyWithEmoji = async (ctx, message, emoji) => {
         await this.addEmojiToMessage(ctx, emoji);
         await this.replyToMessage(ctx, message);
      };
   }
}

module.exports = TaskManager;
