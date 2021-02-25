package com.kueres;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class NotificationModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private final NotificationHelper helper;

    public NotificationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.helper = new NotificationHelper(reactContext);
        this.helper.createChannel();
    }

    @NonNull
    @Override
    public String getName() {
        return "NotificationModule";
    }

    @ReactMethod
    public void startService() {
        this.reactContext.startService(new Intent(this.reactContext, NotificationService.class));
    }

    @ReactMethod
    public void stopService() {
        this.reactContext.stopService(new Intent(this.reactContext, NotificationService.class));
    }

    @ReactMethod
    public void showNotification(int id, String title, String text) {
        this.helper.showNotification(id, title, text);
    }
}
