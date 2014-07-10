package com.example.sns;

import android.app.TabActivity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.SubMenu;
import android.view.View;
import android.view.View.OnTouchListener;
import android.view.animation.Animation;
import android.widget.ImageView;
import android.widget.TabHost;
import android.widget.TabHost.OnTabChangeListener;
import android.widget.TabHost.TabSpec;
import android.widget.TextView;

public class MainActivity extends TabActivity implements OnTabChangeListener  {
	final static String NEWS="�����ǵ�";
	final static String FR="ģ�����";
	final static String SNS="��";
	final static String GPS="����";
	final static String MSG="����";
	
	private TabHost tabHost;
	Animation translateLeftAnim;
	Animation translaterightAnim;
	float pressedX;
	
	private void setupTabHost(){
		tabHost=(TabHost)findViewById(android.R.id.tabhost);
		tabHost.setup();
	}
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		setupTabHost();		
		setupTab(new TextView(this),NEWS);
		setupTab(new TextView(this),FR);
		setupTab(new TextView(this),SNS);
		setupTab(new TextView(this),GPS);
		setupTab(new TextView(this),MSG);
		tabHost.setCurrentTab(0);
		tabHost = getTabHost();
		tabHost.setClickable(true);
		tabHost.setOnTabChangedListener(this);
		tabHost.setOnTouchListener(
					new OnTouchListener() {
						@Override
						public boolean onTouch(View v, MotionEvent event) {
							float distance = 0;
							switch (event.getAction()) {
							case MotionEvent.ACTION_DOWN:
								// �հ����� touch ���� �� x ��ǥ�� ����
								pressedX = event.getX();
								break;
							case MotionEvent.ACTION_UP:
								// �հ����� ������ �� �����س��� x��ǥ���� �Ÿ� ��
								distance = pressedX - event.getX();
								break;
							}
							// �ش� �Ÿ��� 100�� ���� ������ �̺�Ʈ ó�� ���� �ʴ´�.
							if (Math.abs(distance) < 100) {
								return false;
							}
							if (distance > 0) {
								int i = tabHost.getCurrentTab() + 1;
								if(i < 6){
									tabHost.setCurrentTab(i);
								}
							} else {
								int i = tabHost.getCurrentTab() - 1;
								if(i >= 0){
									tabHost.setCurrentTab(i);
								}
							}
							return true;
						}
					}
				);
		for (int tab = 0; tab < tabHost.getTabWidget().getChildCount(); tab++) {
			tabHost.getTabWidget().getChildAt(tab).getLayoutParams().height=130;
		}
		tabHost.setOnTabChangedListener(this);
		
		setTitle("Some N Some");
		getActionBar().setIcon(R.drawable.actiontitle);
		
	

	}
	

	 private void setupTab(TextView view, String tag) {
		View tabview = createTabView(tabHost.getContext(),tag);
		
		TabSpec setContent = tabHost.newTabSpec(tag).setIndicator(tabview);
	
		
		if(tag.equals(NEWS)){
			setContent.setContent(new Intent(this, activity_news.class));
		
		}
		else if(tag.equals(FR)){
			setContent.setContent(new Intent(this, activity_friend.class));
		
		}
		else if(tag.equals(SNS)){
			setContent.setContent(new Intent(this, activity_sns.class));
		
		}
		else if(tag.equals(GPS)){
			setContent.setContent(new Intent(this, activity_gps.class));
			
		}
		else if(tag.equals(MSG)){
			setContent.setContent(new Intent(this, activity_msg.class));
			
		}
	
		tabHost.addTab(setContent);
		
	}
     
	
	//tab�� ��Ÿ�� view ����
	private View createTabView(Context context, String text) {
		//layoutinflater�� �̿��� xml���ҽ��� �о��
		View view =LayoutInflater.from(context).inflate(R.layout.activity_tabwidget, null);
		ImageView img;
		
		if(text.equals(NEWS)){
			img=(ImageView)view.findViewById(R.id.tabs_image);
			img.setImageResource(R.drawable.n);
		}
		else if(text.equals(FR)){
			img=(ImageView)view.findViewById(R.id.tabs_image);
			img.setImageResource(R.drawable.f);
		}
		
		else if(text.equals(SNS)){
			img=(ImageView)view.findViewById(R.id.tabs_image);
			img.setImageResource(R.drawable.s);
		}
		
		else if(text.equals(GPS)){
			img=(ImageView)view.findViewById(R.id.tabs_image);
			img.setImageResource(R.drawable.g);
		}
		
		else if(text.equals(MSG)){
			img=(ImageView)view.findViewById(R.id.tabs_image);
			img.setImageResource(R.drawable.m);
		}
		
		TextView tv=(TextView)view.findViewById(R.id.tabs_text);
		tv.setText(text);
		return view;
	}

	//��Ŭ���� ��� ����
	@Override
	public void onTabChanged(String tabId) {
		for (int i = 0; i < tabHost.getTabWidget().getChildCount(); i++) {
			tabHost.getTabWidget().getChildAt(i).setBackgroundColor(Color.parseColor("#FFFFFF"));
		}		 
		tabHost.getTabWidget().getChildAt(tabHost.getCurrentTab()).setBackgroundColor(Color.parseColor("#dedede"));
		
	}


	//�޴�
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
	
	    SubMenu subMenu=menu.addSubMenu(0,0,2,"����").setIcon(R.drawable.ic_action_settings);
	    subMenu.add(0,2,2,R.string.action_logout);
	    subMenu.add(0, 3, 3, R.string.action_settings);
	    subMenu.add(0, 4, 4, R.string.action_info);
	

	    MenuItem subMenuItem = subMenu.getItem();
	 
	    subMenuItem.setShowAsAction(MenuItem.SHOW_AS_ACTION_ALWAYS | MenuItem.SHOW_AS_ACTION_WITH_TEXT);

	    return super.onCreateOptionsMenu(menu);
	}
	
	
	
	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
	    // Handle presses on the action bar items
	    switch (item.getItemId()) {
	        case R.id.action_search:
	            //openSearch();
	            return true;
	        case R.id.action_menu:
	            	        	
	            return true;
	        default:
	            return super.onOptionsItemSelected(item);
	    }
	}
	
	private void openMenu() {
	 
        
	}
	
	
	
	
}
