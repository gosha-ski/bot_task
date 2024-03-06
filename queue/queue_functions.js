function deleteFromQueue(queue, message){
	for(let i=0; i<queue.length; i++){
		let elem = queue[i]
		if(elem.user_id == message.from.id && elem.chat_id == message.chat.id){
			queue.splice(i,1)
		}
	}
}

function isInQueue(queue, message){
	for(let i=0; i<queue.length; i++){
		let elem = queue[i]
		if(elem.user_id == message.from.id && elem.chat_id == message.chat.id){
			return true
		}
	}
	return false
}

export {deleteFromQueue, isInQueue}