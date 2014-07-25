		function callTest() 
		{
			if(window.NativeBridge == null)
			{
				alert("모바일 기기와 연결할 수 없습니다.");
				return;
			}	
			window.NativeBridge.callTest('aaa');
		}
		function receiveTest(Jv_Value) 
		{
			document.forms[0].Fo_Test.value = Jv_Value;
		}
		function callPhone()
		{
			if(window.NativeBridge == null)
			{
				alert("모바일 기기와 연결할 수 없습니다.");
				return;
			}				
			window.NativeBridge.callPhone(document.forms[0].Fo_Phone.value);
		}
		function callSms()
		{		
			if(window.NativeBridge == null)
			{
				alert("모바일 기기와 연결할 수 없습니다.");
				return;
			}					
			window.NativeBridge.callSms(document.forms[0].Fo_Phone.value, document.forms[0].Fo_Sms.value);
			
		}
		function callCamera()
		{	
			if(window.NativeBridge == null)
			{
				alert("모바일 기기와 연결할 수 없습니다.");
				return;
			}		
			window.NativeBridge.callCamera();
		}
		function callNetworkState()
		{	
			if(window.NativeBridge == null)
			{
				alert("모바일 기기와 연결할 수 없습니다.");
				return;
			}						
			window.NativeBridge.callNetworkState();
		}
		function receiveNetworkState(inputValue)
		{			
			alert(inputValue);
		}		
		function callLocationPos()
		{	
			if(window.NativeBridge == null)
			{
				alert("모바일 기기와 연결할 수 없습니다.");
				return;
			}						
			window.NativeBridge.callLocationPos();
		}
		function receiveLocationPos(lng,lat)
		{			
			alert(lng + "," + lat);
		}		
		function callMoviePlayer(movieUrl)
		{		
			if(window.NativeBridge == null)
			{
				alert("모바일 기기와 연결할 수 없습니다.");
				return;
			}					
			window.NativeBridge.callMoviePlayer(movieUrl);
		}		