import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'youapp',
  webDir: 'out',
  server: {
    hostname: "techtest.youapp.ai",
    androidScheme: 'https',
    cleartext: true
    // url: 'http://192.168.157.106:3000',
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    }
  }
};

export default config;
