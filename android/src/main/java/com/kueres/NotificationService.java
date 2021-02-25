package com.kueres;

import android.app.NotificationManager;
import android.app.NotificationChannel;
import android.app.Notification;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;
import android.os.Build;

import androidx.core.app.NotificationCompat;

import com.facebook.react.HeadlessJsTaskService;

public class NotificationService extends Service {
    private static final int SERVICE_NOTIFICATION_ID = 12345;
    private static final String CHANNEL_ID = "KUERES";
    private static final String CHANNEL_NAME = "Service";
    private static final String CHANNEL_DESC = "Channel for service notifications";
    private static final int POLLING_INTERVAL = 5000;

    private final Handler handler = new Handler();
    private final Runnable runnableCode = new Runnable() {
        @Override
        public void run() {
            Context context = getApplicationContext();
            Intent intent = new Intent(context, NotificationEventService.class);
            context.startService(intent);
            HeadlessJsTaskService.acquireWakeLockNow(context);
            handler.postDelayed(this, POLLING_INTERVAL);
        }
    };

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        this.handler.removeCallbacks(this.runnableCode);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        this.handler.post(this.runnableCode);
        createNotificationChannel();
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("RESKUE Service")
                .setContentText("Background connection active...")
                .setOngoing(true)
                .build();
        startForeground(SERVICE_NOTIFICATION_ID, notification);
        return START_STICKY;
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, CHANNEL_NAME, importance);
            channel.setDescription(CHANNEL_DESC);
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }
}
