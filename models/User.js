const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   // type: Types.ObjectId - нужен для связки модели пользователя с данными этого пользователя в базе данных
   // ref: 'Link' - привязывает данную модель (User) к модели с именем Link
   links: [{ type: Types.ObjectId, ref: 'Link' }]
});

module.exports = model('User', schema);