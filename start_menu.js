async function startMenu(message, bot){
	await bot.sendMessage(message.chat.id, "Меню бота", {
			reply_markup:{
				keyboard:[
					[
						{text:"choose traffic", callback_data: "choose_traffic"}, 
						{text:"try for free", callback_data: "try_for_free"}]
					],
				resize_keyboard: true
			}
		})
}

export {startMenu}


// async function startMenu(message){
// 	await bot.sendMessage(message.chat.id, "Меню бота", {
// 			reply_markup:{
// 				keyboard:[
// 					[
// 						{text:"choose traffic", callback_data: "choose_traffic"}, 
// 						{text:"try for free", callback_data: "try_for_free"}]
// 					],
// 				resize_keyboard: true
// 			}
// 		})
// 	states.push({user_id: message.from.id, chat_id: message.chat.id, notifications: 0})
// }
