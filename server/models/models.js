const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tg_id: {type: DataTypes.BIGINT},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    updatedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
})

const User_info = sequelize.define('user_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING},
    secondName: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    extraInfo: {type: DataTypes.STRING},
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    updatedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
})

const Construction = sequelize.define('construction', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    address: {type: DataTypes.TEXT},
    foreman_id: {type: DataTypes.BIGINT},
    foreman_name: {type: DataTypes.TEXT},
    img: {type: DataTypes.STRING},
    last_item: {type: DataTypes.TEXT},
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    updatedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
})

const Application = sequelize.define('application',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    active: {type: DataTypes.BOOLEAN, defaultValue: true},
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    updatedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    last_item: {type: DataTypes.TEXT}
})

const Application_item = sequelize.define('application_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.TEXT},
    quantity: {type: DataTypes.TEXT},
    extra_info: {type: DataTypes.TEXT, defaultValue: ''},
    status: {type: DataTypes.TEXT, defaultValue: 'отправлена'},
    active: {type: DataTypes.BOOLEAN, defaultValue: true},
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    updatedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
})

const User_profile = sequelize.define('user_profile', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    avatar: {type: DataTypes.STRING, allowNull: false},
    background: {type: DataTypes.STRING, allowNull: false},
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    updatedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
})

const Chat = sequelize.define('chat',{
    chatId: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    lastMessage: {type: DataTypes.STRING},
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    updatedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
})

const Unwatched_reg = sequelize.define('unwatched_reg',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tg_id: {type: DataTypes.BIGINT},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    firstname: {type: DataTypes.STRING},
    secondname: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') },
    updatedAt: { type: DataTypes.DATE, allowNull: true, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
})

const UserInChat = sequelize.define('user_in_chat',{})




const Message = sequelize.define('message', {
    text: {type: DataTypes.STRING},
    senderId: {type: DataTypes.STRING},
    createdAt: {type: DataTypes.DATE},
    seen: {type: DataTypes.BOOLEAN, defaultValue: false},
} )

const Car = sequelize.define('car', {
    carId: {type: DataTypes.STRING, unique: true},
    arr: {type: DataTypes.JSON}
})

User.hasOne(User_info, { foreignKey: 'userId', targetKey: 'id'})
User_info.belongsTo(User, { foreignKey: 'userId', sourceKey: 'id'})

User.hasOne(User_profile, { foreignKey: "userId", targetKey: "id"})
User_profile.belongsTo(User, { foreignKey: 'userId', sourceKey: 'id'})

User.belongsToMany(Chat, {through: UserInChat})
Chat.belongsToMany(User, {through: UserInChat})

Construction.hasMany(Application, {foreignKey: 'construction_id', sourceKey: "id"})
Application.belongsTo(Construction, {foreignKey: "construction_id", targetKey: "id"})

Application.hasMany(Application_item, {foreignKey: 'app_id', sourceKey: "id"})
Application_item.belongsTo(Application, {foreignKey: 'app_id', targetKey: "id"})

Chat.hasMany(Message)
Message.belongsTo(Chat)

sequelize.sync({alter:true})

module.exports = {
    Car,
    User,
    User_info,
    User_profile,
    Chat,
    UserInChat,
    Message,
Application,
Application_item,
Construction,
Unwatched_reg}
