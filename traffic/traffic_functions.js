
async function startTrafficMenu(message, bot){
	await bot.sendMessage(message.chat.id, "Выберите трафик", {
		reply_markup: {
			keyboard:[
				["basics"],["custom"], ["pro"]
			]
		}
	})
	// states.push({user_id: message.from.id, chat_id: message.chat.id, notifications: 0})
}
///////////////////////////////////////////




async function handleChosenTraffic(message,bot){
	await bot.sendMessage(message.chat.id, "Спасибо за выбор тарифа, отправим сообщение по активации", {
		reply_markup: {
			remove_keyboard: true
		}
	})
	setTimeout(async ()=>{
		await  bot.sendMessage(message.chat.id, "тариф активирован")
		setTimeout(async ()=>{
			await  bot.sendMessage(message.chat.id, "Спасибо")
			await bot.sendPhoto(message.chat.id, "./public/livsi.jpg")
		}, 5000)
	}, 5000)

}

export {startTrafficMenu, handleChosenTraffic}


// async function startTrafficMenu(message){
// 	await bot.sendMessage(message.chat.id, "Выберите трафик", {
// 		reply_markup: {
// 			keyboard:[
// 				["basics"],["custom"], ["pro"]
// 			]
// 		}
// 	})
// 	states.push({user_id: message.from.id, chat_id: message.chat.id, notifications: 0})
// }
// ///////////////////////////////////////////




// async function handleChosenTraffic(message){
// 	await bot.sendMessage(message.chat.id, "Спасибо за выбор тарифа, отправим сообщение по активации", {
// 		reply_markup: {
// 			remove_keyboard: true
// 		}
// 	})
// 	setTimeout(async ()=>{
// 		await  bot.sendMessage(message.chat.id, "тариф активирован")
// 		setTimeout(async ()=>{
// 			await  bot.sendMessage(message.chat.id, "Спасибо")
// 			await bot.sendPhoto(message.chat.id, "./public/livsi.jpg")
// 		}, 5000)
// 	}, 5000)

// }