package com.kueres;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.res.Resources;
import android.os.Build;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.ReactApplicationContext;

public class NotificationHelper {
    private static final String CHANNEL_ID = "KUERES_ALARMS";
    private static final String CHANNEL_NAME = "Alarme";
    private static final String CHANNEL_DESC = "Alarme";

    private final ReactApplicationContext reactContext;

    public NotificationHelper(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    public void createChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, CHANNEL_NAME, importance);
            channel.setDescription(CHANNEL_DESC);
            NotificationManager notificationManager = this.reactContext.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    public void showNotification(int id, String title, String text) {
        Notification notification = new NotificationCompat.Builder(this.reactContext, CHANNEL_ID)
                .setSmallIcon(getSmallIcon())
                .setContentTitle(title)
                .setContentText(text)
                .build();
        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this.reactContext);
        notificationManager.notify(id, notification);
    }

    private int getSmallIcon() {
        Resources res = this.reactContext.getResources();
        String packageName = this.reactContext.getPackageName();
        int smallIconResId = res.getIdentifier("ic_launcher", "mipmap", packageName);
        if (smallIconResId == 0) {
            smallIconResId = android.R.drawable.ic_dialog_info;
        }
        return smallIconResId;
    }
}
