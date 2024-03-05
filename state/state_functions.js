function handleStates(states, bot){
	setInterval(()=>{
		for(let i=0; i<states.length; i++){
			let elem = states[i]
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
	}, 18000)
}


function deleteFromStates(msg, states){
	for(let i=0; i<states.length; i++){
		let elem = states[i]
		if(elem.user_id == msg.from.id && elem.chat_id == msg.chat.id){
			states.splice(i,1)
		}
	}
}

export {handleStates, deleteFromStates}


// function handleStates(states){
// 	setInterval(()=>{
// 		for(let i=0; i<states.length; i++){
// 			let elem = states[i]
// 			if(elem.notifications >=1){
// 				bot.sendMessage(elem.chat_id, "Хорошо увидимся позже", {
// 					reply_markup: {
// 						remove_keyboard: true
// 					}
// 				})
// 				states.splice(i,1)
// 			}else{
// 				bot.sendMessage(elem.chat_id, "Жду ответа")
// 				elem.notifications++
// 			}
// 		}
// 		// console.log(greetWaiters)
// 	}, 8000)
// }


// function deleteFromStates(msg){
// 	for(let i=0; i<states.length; i++){
// 		let elem = states[i]
// 		if(elem.user_id == msg.from.id && elem.chat_id == msg.chat.id){
// 			states.splice(i,1)
// 		}
// 	}
// }

