
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import android.net.wifi.WifiManager;
import android.net.wifi.WifiInfo;
import android.content.Context;
import android.net.TrafficStats;

public class AndroidWifiModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public AndroidWifiModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "AndroidWifiModule";
    }

    @ReactMethod
    public void getConnectedDevices(Promise promise) {
        WifiManager wifiManager = (WifiManager) reactContext.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        int deviceCount = wifiManager.getConnectionInfo().getNetworkId();
        promise.resolve(deviceCount);
    }

    @ReactMethod
    public void getDailyDataUsage(Promise promise) {
        long totalBytes = TrafficStats.getTotalRxBytes() + TrafficStats.getTotalTxBytes();
        double dataUsageInMB = totalBytes / (1024.0 * 1024.0);
        promise.resolve(dataUsageInMB);
    }

    @ReactMethod
    public void getWifiInfo(Promise promise) {
        WifiManager wifiManager = (WifiManager) reactContext.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        WifiInfo wifiInfo = wifiManager.getConnectionInfo();
        
        WritableMap map = Arguments.createMap();
        map.putString("ssid", wifiInfo.getSSID());
        map.putString("bssid", wifiInfo.getBSSID());
        map.putInt("rssi", wifiInfo.getRssi());
        map.putInt("linkSpeed", wifiInfo.getLinkSpeed());
        map.putInt("frequency", wifiInfo.getFrequency());
        map.putString("macAddress", wifiInfo.getMacAddress());
        map.putString("ipAddress", intToIp(wifiInfo.getIpAddress()));
        map.putString("capabilities", getCapabilities(wifiManager, wifiInfo));
        
        promise.resolve(map);
    }

    private String intToIp(int i) {
        return (i & 0xFF) + "." + ((i >> 8) & 0xFF) + "." + ((i >> 16) & 0xFF) + "." + ((i >> 24) & 0xFF);
    }

    private String getCapabilities(WifiManager wifiManager, WifiInfo wifiInfo) {
        List<ScanResult> scanResults = wifiManager.getScanResults();
        for (ScanResult scanResult : scanResults) {
            if (scanResult.BSSID.equals(wifiInfo.getBSSID())) {
                return scanResult.capabilities;
            }
        }
        return "";
    }
}