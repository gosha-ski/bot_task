import TelegramBot from 'node-telegram-bot-api';	
import {start, isInGreetWaiters, deleteFromGreetWaiters, handleGreetWaiters} from "./greeting/greet_functions.js"
import {deleteFromStates, handleStates} from "./state/state_functions.js"
import {startTrafficMenu, handleChosenTraffic, handleTryForFree} from "./traffic/traffic_functions.js"
import {startMenu} from "./start_menu.js"
import {isInQueue, deleteFromQueue} from "./queue/queue_functions.js"


const bot = new TelegramBot("7101711750:AAGMJlsN8g7jhU2teBwyhCROORqwpnMQUP8", {
    polling: true
});

let queue = []
//{user_id: , chat_id: , notifications: number, dateStart: number}

let states = []
//{user_id: , chat_id: , notifications: number, dateStart: number}

let greetWaiters = []
//{user_id: , chat_id: , notifications: number, dateStart: number}

let commands = [
	{command: "start", description: "запуск бота"},
]

bot.setMyCommands(commands)


bot.on("text", async(message)=>{
	//console.log(message)
	if(message.text == "/start"){
		await start(greetWaiters ,message, bot)

	}else if(message.text == "/menu"){
		await startMenu(message, bot)
		states.push({user_id: message.from.id, chat_id: message.chat.id, notifications: 0, dateStart: message.date})
	}else if(message.text == "try for free"){
		deleteFromStates(message, states)
		if(isInQueue(queue, message)){
			await bot.sendMessage(message.chat.id, "Подождите, ваш запрос обрабатывается")
		}else{
			queue.push({user_id: message.from.id, chat_id: message.chat.id, notifications: 0,  dateStart: message.date})
			await handleTryForFree(message, bot)
			deleteFromQueue(queue, message)
		}
		//await handleTryForFree(message, bot)
	}
	else if(message.text == "choose traffic"){
		deleteFromStates(message, states)
		await startTrafficMenu(message, bot)
		states.push({user_id: message.from.id, chat_id: message.chat.id, notifications: 0,  dateStart: message.date})

	}
	else if(message.text == "basics" || message.text == "custom" || message.text == "pro"){
		deleteFromStates(message, states)
		//console.log(queue)
		//console.log(isInQueue(queue, message))
		if(isInQueue(queue, message)){
			await bot.sendMessage(message.chat.id, "Подождите, ваш запрос обрабатывается")
		}else{
			queue.push({user_id: message.from.id, chat_id: message.chat.id, notifications: 0,  dateStart: message.date})
			console.log("user not in queue", queue)
			await handleChosenTraffic(message, bot)
			deleteFromQueue(queue, message)
			//console.log(res)
		}

	}
	else{
		console.log("else")
		if(isInGreetWaiters(greetWaiters, message, bot)){
			if(message.text=="Привет" || message.text=="привет"){
				await bot.sendMessage(message.chat.id, "Приступим")
			}else{
				await bot.sendMessage(message.chat.id, "Странное приветствие) но продолжим")
			}
			
			await startMenu(message, bot)
			states.push({user_id: message.from.id, chat_id: message.chat.id, notifications: 0, dateStart: message.date})
			deleteFromGreetWaiters(greetWaiters,message)
		}else{
			await bot.sendMessage(message.chat.id, "Нет результатов")
			deleteFromStates(message, states)
		}
	}
})


handleGreetWaiters(greetWaiters, bot)
handleStates(states, bot)

