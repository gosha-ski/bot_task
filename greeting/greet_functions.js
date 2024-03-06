async function start( greetWaiters,message, bot){
	await bot.sendMessage(message.chat.id, "hello")
	await bot.sendPhoto(message.chat.id, "./public/hi.jpg")
	greetWaiters.push({user_id: message.from.id, chat_id: message.chat.id, notifications:0, dateStart: message.date})

}

function handleGreetWaiters(greetWaiters, bot){
	setInterval(()=>{
		for(let i=0; i<greetWaiters.length; i++){
			let elem = greetWaiters[i]
			let now = Math.ceil((new Date()).getTime()/1000)+7203
			let difference = now - elem.dateStart
			if(difference>=20){
				bot.sendMessage(elem.chat_id, "Хорошо увидимся позже")
				greetWaiters.splice(i,1)
			}else if(difference>=8 && elem.notifications==0){
				bot.sendMessage(elem.chat_id, "Поприветсвуй меня")
				elem.notifications++
			}
		}
		// console.log(greetWaiters)
	}, 8000)
}

function isInGreetWaiters(greetWaiters, msg, bot){
	for(let i=0; i<greetWaiters.length; i++){
		let elem = greetWaiters[i]
		if(elem.user_id == msg.from.id && elem.chat_id == msg.chat.id){
			return true
		}
	}
	return false
}

function deleteFromGreetWaiters(greetWaiters, msg){
	for(let i=0; i<greetWaiters.length; i++){
		let elem = greetWaiters[i]
		if(elem.user_id == msg.from.id && elem.chat_id == msg.chat.id){
			greetWaiters.splice(i,1)
		}
	}
}


export {start, handleGreetWaiters, isInGreetWaiters, deleteFromGreetWaiters}


//handle /start
// async function start(message){
// 	await bot.sendMessage(message.chat.id, "hello")
// 	greetWaiters.push({user_id: message.from.id, chat_id: message.chat.id, notifications:0})

// }

// function handleGreetWaiters(greetWaiters){
// 	setInterval(()=>{
// 		for(let i=0; i<greetWaiters.length; i++){
// 			elem = greetWaiters[i]
// 			if(elem.notifications >=1){
// 				bot.sendMessage(elem.chat_id, "Хорошо увидимся позже")
// 				greetWaiters.splice(i,1)
// 			}else{
// 				bot.sendMessage(elem.chat_id, "Поприветсвуй меня")
// 				elem.notifications++
// 			}
// 		}
// 		// console.log(greetWaiters)
// 	}, 8000)
// }

// function isInGreetWaiters(greetWaiters, msg){
// 	for(let i=0; i<greetWaiters.length; i++){
// 		let elem = greetWaiters[i]
// 		if(elem.user_id == msg.from.id && elem.chat_id == msg.chat.id){
// 			return true
// 		}
// 	}
// 	return false
// }

// function deleteFromGreetWaiters(msg){
// 	for(let i=0; i<greetWaiters.length; i++){
// 		let elem = greetWaiters[i]
// 		if(elem.user_id == msg.from.id && elem.chat_id == msg.chat.id){
// 			greetWaiters.splice(i,1)
// 		}
// 	}
// }
