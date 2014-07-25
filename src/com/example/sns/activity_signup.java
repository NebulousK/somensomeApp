package com.example.sns;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.cookie.BasicClientCookie;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.ColorStateList;
import android.graphics.Bitmap;
import android.graphics.Bitmap.Config;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.PorterDuff.Mode;
import android.graphics.PorterDuffXfermode;
import android.graphics.Rect;
import android.graphics.RectF;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.os.StrictMode;
import android.provider.CalendarContract.Colors;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.webkit.CookieManager;
import android.webkit.CookieSyncManager;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

public class activity_signup extends Activity{

	EditText id, password, check_password, name, birthday, age, tel, tel2, tel3,  email1, email2, num1, num2,addr;
	ImageView photo;
	Button id_button;
	String sex="남성";
	TextView id_check;
	int mYear;
	int mMonth;
	int mDay;
	
	int dstWidth=150;//사진크기 조절
    int dstHeight=150;
    
  
    static Uri selPhotouri=null;
    Uri uri=null;
    String lineEnd = "\r\n";
    String twoHyphens = "--";
    String boundary = "*****"; 
    
    FileInputStream mFileInputStream = null;
    URL connectUrl = null;
    private static final int ZIP_REQUEST=1;
	private static final String TEMP_PHOTO_FILE = "temp.jpg";       // 임시 저장파일
	private static final int REQ_CODE_PICK_IMAGE = 0;
	final int REQ_CODE_GALLERY=100;
	static String filePath="";
	 String path="";
	
	ProgressDialog pd;


	@Override
	public void onCreate(Bundle savedInstanceState) {
		StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
        
	    super.onCreate(savedInstanceState);
	    setContentView(R.layout.activity_singup);
	    
	    id=(EditText)findViewById(R.id.id);
	    password=(EditText)findViewById(R.id.password);
	    check_password=(EditText)findViewById(R.id.check_password);
	    name=(EditText)findViewById(R.id.name);
	    birthday=(EditText)findViewById(R.id.birthday);
	    birthday.setFocusable(false);
	    
	    age=(EditText)findViewById(R.id.age);
	    tel=(EditText)findViewById(R.id.tel);
	    tel2=(EditText)findViewById(R.id.tel2);
	    tel3=(EditText)findViewById(R.id.tel3);
	    email1=(EditText)findViewById(R.id.email1);
	    email2=(EditText)findViewById(R.id.email2);
	    email2.setFocusable(false);
	    
	    num1=(EditText)findViewById(R.id.num1);
	    num2=(EditText)findViewById(R.id.num2);
	    addr=(EditText)findViewById(R.id.addr);
	    photo=(ImageView)findViewById(R.id.photo);
	    
	    id_button=(Button)findViewById(R.id.id_button);
	    
	    id_check=(TextView)findViewById(R.id.id_check);
	 
	   // updateBarHandler=new Handler();
		
	  findViewById(R.id.man).setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				sexChecked(v);
				
			}
		});
	   findViewById(R.id.woman).setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				sexChecked(v);
			
				
			}
		});
	   
	 
	  
	  }
	
	//성별 선택
	public void sexChecked(View v){
		RadioButton radio=(RadioButton)v;
		
		if(radio.isChecked()){
			sex=radio.getText().toString();
		}
	}
	
	//생년월일 선택
	public void OneDate(View v){
		final Calendar cal= Calendar.getInstance();
	
		mYear = cal.get(Calendar.YEAR);
	    mMonth = cal.get(Calendar.MONTH);
	    mDay = cal.get(Calendar.DAY_OF_MONTH);
	    
	    DatePickerDialog.OnDateSetListener mDateSetListener=
	    		new DatePickerDialog.OnDateSetListener() {
					
					@Override
					public void onDateSet(DatePicker view, int year, int monthOfYear,
							int dayOfMonth) {
						
						String date_selected=String.valueOf(year)+
								"-"+String.valueOf(monthOfYear+1)+"-"+String.valueOf(dayOfMonth);
						
						birthday.setText(date_selected);					
					}
				};
				DatePickerDialog alert=new DatePickerDialog(this, mDateSetListener, mYear, mMonth, mDay);
				alert.show();
		   
	}

	//우편번호 받아오기
	public void search_num(View v){
		Intent intent = new Intent(getBaseContext(), activity_web.class);
		startActivityForResult(intent, ZIP_REQUEST);
		
	}
	
	

	//이메일 선택
	public void Onemail(View v){
	final String items[] = {"chol.com", "dreamwiz.com", "empal.com", "hanmir.com", 
								"hanafos.com", "hotmail.com", "lycos.co.kr", "nate.com", 
								"naver.com", "daum.net","hanmail.net","gmail.com",  
								"paran.com","yahoo.co.kr", "직접입력"};
		
		
		AlertDialog.Builder ab=new AlertDialog.Builder(activity_signup.this);
		ab.setTitle(":: 선택 ::");
		ab.setSingleChoiceItems(items, 
				0, new DialogInterface.OnClickListener() {
					
					@Override
					public void onClick(DialogInterface dialog, int which) {
						if(which!=14){
							email2.setText(items[which]);			
						}
						else{
							email2.setText("");
							
						}
						dialog.cancel();					
					}
					});		
		ab.show();
		
		
	}

	//이미지 선택
	public void SelectImg(View v){
		//String url="tmp_"+String.valueOf(System.currentTimeMillis())+".jpg";
		//selPhotouri=Uri.fromFile(new File(Environment.getExternalStorageDirectory(),url));
		
	
		Intent intent = new Intent(
                 Intent.ACTION_GET_CONTENT,      // 또는 ACTION_PICK
                 android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
       
		intent.setType("image/*");              // 모든 이미지
         intent.putExtra("crop", "true");        // Crop기능 활성화
        
         intent.putExtra(MediaStore.EXTRA_OUTPUT, getTempUri());     // 임시파일 생성
         intent.putExtra("outputFormat",         // 포맷방식
                 Bitmap.CompressFormat.JPEG.toString());
       //요기  intent.putExtra(android.provider.MediaStore.EXTRA_OUTPUT, selPhotouri);
      
         
         startActivityForResult(intent, REQ_CODE_PICK_IMAGE);

	

		
	}
	
	//아이디 중복 검사 버튼 클릭
	public void id_check_button(View v){
		Log.i("id_check_button", "되되");
		loadJsp task1=new loadJsp();		
		task1.execute();		

	}
	//회원가입버튼 클릭
	public void Onsignup(View v){			
		
		if (id.getText().toString().equals("")|| password.getText().toString().equals("") || check_password.getText().toString().equals("")
				|| name.getText().toString().equals("") || birthday.getText().toString().equals("") || age.getText().toString().equals("")
				|| tel.getText().toString().equals("") || tel2.getText().toString().equals("") || tel3.getText().toString().equals("") 
				|| email1.getText().toString().equals("") || email2.getText().toString().equals("") ||email2.getText().toString().equals("::선택::") 
				|| num1.getText().toString().equals("") || num2.getText().toString().equals("") || addr.getText().toString().equals("") 
				|| filePath.equals("")){
			
			StartMError();
		}
		
		else{
			
			pd=ProgressDialog.show(activity_signup.this, "회원가입", "잠시만 기다려 주세요.");
			pd.setCancelable(true);
	
			new Thread(new Runnable() {
				
				@Override
				public void run() {
					Looper.prepare();
					try {
						Thread.sleep(10000);
						
					} catch (InterruptedException e) {
						// TODO 자동 생성된 catch 블록
						e.printStackTrace();
					}
					pd.dismiss();
					StartM();
					
					Looper.loop();
				}
			}).start();
			
			try {
				  AndroidUploade2 uploader = new AndroidUploade2(id.getText().toString(), password.getText().toString(),
						  name.getText().toString(), check_password.getText().toString(), email1.getText().toString(),
						  email2.getText().toString(), tel.getText().toString(),tel2.getText().toString(),tel3.getText().toString(), birthday.getText().toString(),
						  age.getText().toString(), sex, num1.getText().toString(), num2.getText().toString(), addr.getText().toString());
	
		         //  String path = Environment.getExternalStorageDirectory()+"/DCIM/Camera/temp.jpg";
		           path = Environment.getExternalStorageDirectory()+"/temp.jpg";
		            Log.i("Onsignup path", path);
		            uploader.uploadPicture(path);
	
			} catch (Exception e) {
				Log.e(e.getClass().getName(),e.getMessage());
			}
		}
			
		
		
		
	}
	public void StartM(){
		new AlertDialog.Builder(this)
		.setMessage("가입이 완료되었습니다.")
		.setPositiveButton("확인", new DialogInterface.OnClickListener() {
			
			@Override
			public void onClick(DialogInterface dialog, int which) {
				// TODO 자동 생성된 메소드 스텁
				dialog.dismiss();
				StartMain();
			}
		}).show();
	}
	
	public void StartMError(){
		new AlertDialog.Builder(this)
		.setTitle("회원가입 오류")
		.setMessage("빈칸이 있습니다. 다시 확인해 주세요.")
		.setPositiveButton("확인", new DialogInterface.OnClickListener() {
			
			@Override
			public void onClick(DialogInterface dialog, int which) {
				// TODO 자동 생성된 메소드 스텁
				dialog.dismiss();
				
			}
		}).show();
	}
	
	public void StartMain(){
	
		
		Intent intent=new Intent(getBaseContext(),activity_login.class);
		startActivity(intent);
		finish();
	}
	 /** 임시 저장 파일의 경로를 반환 */
    private Uri getTempUri() {
        return Uri.fromFile(getTempFile());
    }
    
    /** 외장메모리에 임시 이미지 파일을 생성하여 그 파일의 경로를 반환  */
    private File getTempFile() {
        if (isSDCARDMOUNTED()) {
            File f = new File(Environment.getExternalStorageDirectory(), // 외장메모리 경로
                    TEMP_PHOTO_FILE);
            try {
                f.createNewFile();      // 외장메모리에 temp.jpg 파일 생성
            } catch (IOException e) {
            }
 
            return f;
        } else
            return null;
    }

    /** SD카드가 마운트 되어 있는지 확인 */
    private boolean isSDCARDMOUNTED() {
        String status = Environment.getExternalStorageState();
        if (status.equals(Environment.MEDIA_MOUNTED))
            return true;
 
        return false;
    }
    
    /** 다시 액티비티로 복귀하였을때 이미지를 셋팅 */
    protected void onActivityResult(int requestCode, int resultCode,
            Intent imageData) {
        super.onActivityResult(requestCode, resultCode, imageData);
 
        switch (requestCode) {
        case REQ_CODE_PICK_IMAGE:
            if (resultCode == RESULT_OK) {
                if (imageData != null) {
                	 filePath = Environment.getExternalStorageDirectory()
                            + "/temp.jpg";
              

                	System.out.println("path" + filePath); // logCat으로 경로확인.
                	
                    BitmapFactory.Options options = new BitmapFactory.Options();
                    options.inSampleSize=4;                    
                   
                    
                    Bitmap selectedImage = BitmapFactory.decodeFile(filePath,options);
                    Bitmap resized = Bitmap.createScaledBitmap(selectedImage, dstWidth, dstHeight, true);
                    		
                                       
                    photo.setImageBitmap(resized); 
                    // temp.jpg파일을 이미지뷰에 씌운다.
                    
               
                }
           
                else{
                
                	return;
                }
            }
        case ZIP_REQUEST:
        	if (resultCode == RESULT_OK) {            
            	num1.setText(imageData.getStringExtra("pc1"));
            	num2.setText(imageData.getStringExtra("pc2"));
            	addr.setText(imageData.getStringExtra("addr"));
        	}
            break;
        }
    }



	//이미지 가장자리 둥글게 만들기
	public Bitmap getRoundedCornerBitmap(Context context, Bitmap bitmap , int roundLevel) { 
	    Bitmap output = Bitmap.createBitmap(bitmap.getWidth(), bitmap.getHeight(), Config.ARGB_8888); 
	    Canvas canvas = new Canvas(output); 
	  
	    final int color = 0xff424242; 
	    final Paint paint = new Paint(); 
	    final Rect rect = new Rect(0, 0, bitmap.getWidth(), bitmap.getHeight()); 
	    final RectF rectF = new RectF(rect); 
	    final float roundPx = convertDipsToPixels(context, roundLevel); 
	  
	    paint.setAntiAlias(true); 
	    canvas.drawARGB(0, 0, 0, 0); 
	    paint.setColor(color); 
	    canvas.drawRoundRect(rectF, roundPx, roundPx, paint); 
	  
	    paint.setXfermode(new PorterDuffXfermode(Mode.SRC_IN)); 
	    canvas.drawBitmap(bitmap, rect, rect, paint); 
	  
	    return output; 
	} 
	 
	public static int convertDipsToPixels(Context context, int dips) { 
	    final float scale = context.getResources().getDisplayMetrics().density; 
	    return (int) (dips * scale + 0.5f); 
	}




class loadJsp extends AsyncTask<Void, String, Void>{
	

	public HttpClient client =new DefaultHttpClient();
	CookieManager cookieManager=CookieManager.getInstance();
	String postURL = "http://192.168.10.43:8080/homepage/android/android_member_idCheck.jsp";

	@Override
	protected Void doInBackground(Void... params) {
		try {
			
			
			
			HttpPost post=new HttpPost(postURL);
			ArrayList<NameValuePair> params1 = new ArrayList<NameValuePair>(); 
			//파라미터를 list에 담아 보내기 
			
			params1.add(new BasicNameValuePair("id",id.getText().toString()) );
		
			
			
			UrlEncodedFormEntity ent= new UrlEncodedFormEntity(params1,HTTP.UTF_8);
			post.setEntity(ent);
	          
		        
		
            HttpResponse responsePOST = client.execute(post); //jsp 결과값 받아오기
			HttpEntity resEntity=responsePOST.getEntity();
						
         
			String responseData= EntityUtils.toString(resEntity).toString().trim();		

			if(resEntity !=null){
				
				System.out.println("jsp에서 받아온 결과:"+responseData);
				if(responseData.equals("1") || responseData=="1"){
					System.out.println("11111111111");
					//id_check.setTextColor(Color.parseColor("#FF0000"));
					id_check.setText("이미 등록된 ID 입니다.");
					
				}
				else if(responseData.equals("2") || responseData=="2"){
					System.out.println("222222222");
					//id_check.setTextColor(Color.parseColor("#22741C"));
					id_check.setText("사용할 수 있는 ID 입니다.");				
					
				}
				
			}
			
		} catch (Exception e) {
			// TODO 자동 생성된 catch 블록
			e.printStackTrace();
		}
		return null;
	}
	
	

  
	
    }
      

class loadJsp2 extends AsyncTask<Void, String, Void>{
	

	public HttpClient client =new DefaultHttpClient();
	CookieManager cookieManager=CookieManager.getInstance();
	String postURL = "http://192.168.10.43:8080/homepage/android/android_member_emailCheck.jsp";

	@Override
	protected Void doInBackground(Void... params) {
		try {
			
			
			
			HttpPost post=new HttpPost(postURL);
			ArrayList<NameValuePair> params1 = new ArrayList<NameValuePair>(); 
			//파라미터를 list에 담아 보내기 
			
			params1.add(new BasicNameValuePair("email1",email1.getText().toString()) );
			params1.add(new BasicNameValuePair("email2",email2.getText().toString()) );
		
			
			
			UrlEncodedFormEntity ent= new UrlEncodedFormEntity(params1,HTTP.UTF_8);
			post.setEntity(ent);
	          
		        
		
            HttpResponse responsePOST = client.execute(post); //jsp 결과값 받아오기
			HttpEntity resEntity=responsePOST.getEntity();
						
         
			String responseData= EntityUtils.toString(resEntity).toString().trim();		

			if(resEntity !=null){
				
				System.out.println("jsp에서 받아온 결과:"+responseData);
				if(responseData.equals("1") || responseData=="1"){
					System.out.println("1");
					//id_check.setTextColor(Color.parseColor("#FF0000"));
					id_check.setText("이미 등록된 email 입니다.");
					
				}
				else if(responseData.equals("2") || responseData=="2"){
					System.out.println("2");
					//id_check.setTextColor(Color.parseColor("#22741C"));
					id_check.setText("사용할 수 있는 email 입니다.");				
					
				}
				
			}
			
		} catch (Exception e) {
			// TODO 자동 생성된 catch 블록
			e.printStackTrace();
		}
		return null;
	}
	
	

  
	
    }
    
}



	
