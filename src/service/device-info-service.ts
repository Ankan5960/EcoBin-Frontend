import { UAParser } from "ua-parser-js";
import { IDeviceInfoModel } from "../models/device-info-model";

const getDeviceInfo = () => {
  const { browser, cpu, device } = UAParser();

  const deviceInfo = <IDeviceInfoModel>{
    browserName: browser.name ?? "",
    browserVersion: browser.version ?? "",
    cpuArchitecture: cpu.architecture ?? "",
    deviceModel: device.model ?? "",
    deviceVendor: device.vendor ?? "",
    deviceType: device.type ?? "",
  };
  return JSON.stringify(deviceInfo);
};

export default getDeviceInfo;
