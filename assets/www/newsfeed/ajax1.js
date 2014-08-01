/**
 * ajax��� ����
 */

function getXMLHttpRequest(){
	if(window.ActiveXObject){
		try{
			return new ActiveXObject("MSXML2.XMLHTTP");
		}
		catch(e){
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	else if(window.XMLHttpRequest){
		return new XMLHttpRequest();
	}
	else{
		return null;
	}
}

function sendRequest(url, params, callback, method){
	XMLreq = getXMLHttpRequest();
	
	var httpMethod = method ? method : "GET"; // method�� ���� �ִٸ� method������ ���� , ���� ��ٸ� GET���� ����
	if(httpMethod != "GET" && httpMethod != "POST"){
		httpMethod = "GET";
	}
	
	var httpParams = (params == null || params == "") ? null : params;
	
	var httpUrl = url;
	if(httpMethod == "GET" && httpParams != null){
		httpUrl = httpUrl + "?"+ httpParams;
	}
	
	XMLreq.onreadystatechange = callback;
	XMLreq.open(httpMethod, httpUrl, true);
	XMLreq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charaset=UTF-8");//POST��� �Ͻ� ����.
	XMLreq.send(httpMethod == "POST" ? httpParams : null);// A ? B : C  --> A�� B, A�ƴϸ� C
}

/*
function callback(){
	if(XMLreq.readyState == 4){
		if(XMLreq.status == 200){
			alert(XMLreq.responseText);
		}
		else{
			alert(XMLreq.status);
		}
	}
}
*/
