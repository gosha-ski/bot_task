
async function startTrafficMenu(message, bot){
	await bot.sendMessage(message.chat.id, "Выберите трафик", {
		reply_markup: {
			keyboard:[
				["basics"],["custom"], ["pro"]
			]
		}
	})
	
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


