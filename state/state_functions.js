function handleStates(states, bot){
	setInterval(()=>{
		for(let i=0; i<states.length; i++){	
			let elem = states[i]
			let now = Math.ceil((new Date()).getTime()/1000)+7203
			if((now-elem.dateStart)>20){
				bot.sendMessage(elem.chat_id, "Хорошо увидимся позже", {
					reply_markup: {
						remove_keyboard: true
					}
				})
				states.splice(i,1)
			}else if((now-elem.dateStart)>8 && elem.notifications==0){
				
				bot.sendMessage(elem.chat_id, "Жду ответа")
				elem.notifications++
			}
		}
		
	},500)
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

/////////////////////////////////////////////////////////////////////////
// function handleStates(states, bot){
// 	setInterval(()=>{
// 		for(let i=0; i<states.length; i++){
// 			let now = (new Date()).valueOf()
// 			let elem = states[i]
// 			if(selem.notifications>=1){
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
// 	}, 15000)
// }
