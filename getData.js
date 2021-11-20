document.getElementById('button').addEventListener('click', getData);
function getData() {
	const url = 'http://18.219.202.94:5000/test';
	const http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById('data').innerHTML = "";
			document.getElementById('data').append(this.responseText);

		}
	}
	http.open("GET", url, true);
	http.send();
}
