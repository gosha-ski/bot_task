const TelegramBot = require('node-telegram-bot-api');	


const bot = new TelegramBot("6991126027:AAG1g5gzl5U5wDRhe95hZfeGJrhU-P0Z5ug", {

    polling: true
    
});

let states = []
//{user_id: , chat_id: , notifications: number}

let greetWaiters = []
//{user_id: , chat_id: , notifications: number}

let commands = [
	{command: "start", description: "запуск бота"},
]

bot.setMyCommands(commands)


bot.on("text", async(message)=>{
	if(message.text == "/start"){
		await start(message)

	}else if(message.text == "/menu"){
		await startMenu(message)
	}else if(message.text == "try for free"){
		//await handleTryForFree()
	}
	else if(message.text == "choose traffic"){
		deleteFromStates(message)
		await startTrafficMenu(message)

	}
	else if(message.text == "basics" || message.text == "custom" || message.text == "pro"){
		deleteFromStates(message)
		//await bot.sendMessage(message.chat.id, "Тариф выбран")
		await handleChosenTraffic(message)

	}
	else{
		console.log("else")
		if(isInGreeetWaiters(greetWaiters, message)){
			//await bot.sendMessage(message.chat.id, "давай начнем")
			await startMenu(message)
			deleteFromGreetWaiters(message)
		}else{
			await bot.sendMessage(message.chat.id, "Нет результатов")
			deleteFromStates(message)
		}
	}
})


//handle /start
async function start(message){
	await bot.sendMessage(message.chat.id, "hello")
	greetWaiters.push({user_id: message.from.id, chat_id: message.chat.id, notifications:0})

}

function handleGreetWaiters(greetWaiters){
	setInterval(()=>{
		for(let i=0; i<greetWaiters.length; i++){
			elem = greetWaiters[i]
			if(elem.notifications >=1){
				bot.sendMessage(elem.chat_id, "Хорошо увидимся позже")
				greetWaiters.splice(i,1)
			}else{
				bot.sendMessage(elem.chat_id, "Поприветсвуй меня")
				elem.notifications++
			}
		}
		// console.log(greetWaiters)
	}, 8000)
}

function isInGreeetWaiters(greetWaiters, msg){
	for(let i=0; i<greetWaiters.length; i++){
		let elem = greetWaiters[i]
		if(elem.user_id == msg.from.id && elem.chat_id == msg.chat.id){
			return true
		}
	}
	return false
}

function deleteFromGreetWaiters(msg){
	for(let i=0; i<greetWaiters.length; i++){
		let elem = greetWaiters[i]
		if(elem.user_id == msg.from.id && elem.chat_id == msg.chat.id){
			greetWaiters.splice(i,1)
		}
	}
}

handleGreetWaiters(greetWaiters)
handleStates(states)
//////////////////////////





async function startMenu(message){
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
	states.push({user_id: message.from.id, chat_id: message.chat.id, notifications: 0})
}


function handleStates(states){
	setInterval(()=>{
		for(let i=0; i<states.length; i++){
			elem = states[i]
			if(elem.notifications >=1){
				bot.sendMessage(elem.chat_id, "Хорошо увидимся позже", {
					reply_markup: {
						remove_keyboard: true
					}
				})
				states.splice(i,1)
			}else{
				bot.sendMessage(elem.chat_id, "Жду ответа")
				elem.notifications++
			}
		}
		// console.log(greetWaiters)
	}, 8000)
}


function deleteFromStates(msg){
	for(let i=0; i<states.length; i++){
		let elem = states[i]
		if(elem.user_id == msg.from.id && elem.chat_id == msg.chat.id){
			states.splice(i,1)
		}
	}
}


//////////////////////////
async function startTrafficMenu(message){
	await bot.sendMessage(message.chat.id, "Выберите трафик", {
		reply_markup: {
			keyboard:[
				["basics"],["custom"], ["pro"]
			]
		}
	})
	states.push({user_id: message.from.id, chat_id: message.chat.id, notifications: 0})
}
///////////////////////////////////////////




async function handleChosenTraffic(message){
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

setInterval(()=>{
	console.log(states)
},2000)