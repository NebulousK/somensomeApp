package com.example.sns;

import android.app.Activity;
import android.os.Bundle;
import android.text.Html;
import android.text.method.LinkMovementMethod;
import android.widget.TextView;

public class activity_login extends Activity {

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
	    super.onCreate(savedInstanceState);
	    setContentView(R.layout.activity_login);
	    
	    TextView tx = (TextView)findViewById(R.id.pass);
	    TextView tx2 = (TextView)findViewById(R.id.join);
	    
	    tx.setText(Html.fromHtml("<a href = \"http://\"> 비밀번호를 잊으셧나요?"));
	    tx.setMovementMethod(LinkMovementMethod.getInstance());
	    tx2.setText(Html.fromHtml("<a href = \"http://\"> SomeNsomE 가입"));
	    tx2.setMovementMethod(LinkMovementMethod.getInstance());
	}
}
