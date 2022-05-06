import { app, BrowserWindow, dialog } from "electron";
import { stat, remove } from "fs-extra";
import { join } from "path";
//* 下载文件 用于下载更新功能 如果有两处需要用到该文件 需要把提示逻辑等给抽出来

class DownloadFile {
  public downloadUrl: string; //* 下载的路径
  public historyFilePath: string; //* 历史路径 用于判断该文件是否存在，是否需要删除
  public mainWindow: BrowserWindow|null; //* 使用mainWindow自带方法进行下载

  constructor(
    mainWindow: BrowserWindow,
    downloadUrl: string,
    historyFilePath: string
  ) {
    this.mainWindow = mainWindow;
    this.downloadUrl = downloadUrl;
    this.historyFilePath = historyFilePath;
  }

  start() {
    //* 开始下载
    this.startDownload();

    //* 监听事件 设置下载路径
    this.onEvent()
  }
  startDownload() {
    //* 开始下载
    //* 判断是否存在同名文件 存在则删除 如果没有就开始下载
    stat(this.historyFilePath, async (err, stats) => {
      try {
        if (stats) {
          await remove(this.historyFilePath);
        }
        console.log('开始下载')
        this.mainWindow.webContents.downloadURL(this.downloadUrl);
      } catch (error) {
        console.log(error);
      }
    });
  }
  onEvent() {
    //* 监听下载过程中的事件
    this.mainWindow.webContents.session.on(
      "will-download",
      (event: any, item: any, webContents: any) => {
        const filePath = join(app.getPath("downloads"), item.getFilename());
        item.setSavePath(filePath);
        item.on("updated", (event: any, state: string) => {
          console.log(state, '文件下载中途')
          switch (state) {
            case "progressing":
              this.mainWindow.webContents.send(
                "download-progress",
                (
                  (item.getReceivedBytes() / item.getTotalBytes()) *
                  100
                ).toFixed(0)
              );
              break;
            default:
              this.mainWindow.webContents.send("download-error", true);
              dialog.showErrorBox(
                "下载出错",
                "由于网络或其他未知原因导致下载出错"
              );
              break;
          }
        });
        item.once("done", (event: any, state: string) => {
          console.log('文件下载完成', state)
          switch (state) {
            case "completed":
              const data = {
                filePath,
              };
              this.mainWindow.webContents.send("download-done", data);
              break;
            case "interrupted":
              this.mainWindow.webContents.send("download-error", true);
              dialog.showErrorBox(
                "下载出错",
                "由于网络或其他未知原因导致下载出错."
              );
              break;
            default:
              break;
          }
        });
      }
    );
  }
}

export default DownloadFile