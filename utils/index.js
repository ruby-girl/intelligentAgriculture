export const throttle = (func, wait) => {
	let previous = 0;
	return function() {
	    let now = Date.now();
	    let context = this;
	    let args = arguments;
	    if (now - previous > wait) {
	        func.apply(context, args);
	        previous = now;
	    }
	}
}
export const formatDate = (time) => {
	var year=time.getFullYear(); 
	var month=time.getMonth()+1; 
	var date=time.getDate(); 
	return year+"-"+month+"-"+date;
}