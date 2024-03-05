import TelegramBot from 'node-telegram-bot-api';	
import {start, isInGreetWaiters, deleteFromGreetWaiters, handleGreetWaiters} from "./greeting/greet_functions.js"
import {deleteFromStates, handleStates} from "./state/state_functions.js"
import {startTrafficMenu, handleChosenTraffic} from "./traffic/traffic_functions.js"
import {startMenu} from "./start_menu.js"


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
		await start(greetWaiters ,message, bot)

	}else if(message.text == "/menu"){
		await startMenu(message, bot)
		states.push({user_id: message.from.id, chat_id: message.chat.id, notifications: 0})
	}else if(message.text == "try for free"){
		deleteFromStates(message, states)
		await handleTryForFree(message, bot)
	}
	else if(message.text == "choose traffic"){
		deleteFromStates(message, states)
		await startTrafficMenu(message, bot)
		states.push({user_id: message.from.id, chat_id: message.chat.id, notifications: 0})

	}
	else if(message.text == "basics" || message.text == "custom" || message.text == "pro"){
		deleteFromStates(message, states)
		await handleChosenTraffic(message, bot)

	}
	else{
		console.log("else")
		if(isInGreetWaiters(greetWaiters, message, bot)){
			
			await startMenu(message, bot)
			states.push({user_id: message.from.id, chat_id: message.chat.id, notifications: 0})
			deleteFromGreetWaiters(greetWaiters,message)
		}else{
			await bot.sendMessage(message.chat.id, "Нет результатов")
			deleteFromStates(message, states)
		}
	}
})


handleGreetWaiters(greetWaiters, bot)
handleStates(states, bot)


async function handleTryForFree(message, bot){
	setTimeout(async()=>{
		await bot.sendMessage(message.chat.id, "Спасибо")
		await bot.sendPhoto(message.chat.id, "./public/hi.jpg")
	}, 10000)
}



setInterval(()=>{
	console.log(states)
},2000)