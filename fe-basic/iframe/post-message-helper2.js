class PostMessageHelper {
  listenerInfoList = [];
  // 父容器路径
  parentPath;
  // 发送给父容器的消息列表
  parentRequestHistoryList = [];
  // 发送给 iframe 或新窗口的消息列表
  iframeRequestHistoryList = [];
  // iframe.contentWindow 或 window.open 方法返回的 window 对象
  openWin;
  // iframe.src 或者 window.open 方法的 url
  openUrl;
  // 日志名称
  tagName;
  // 消息组名
  groupName;

  constructor({ tagName, groupName }) {
    this.groupName = groupName;
    this.tagName = tagName;
  }

  log(...args) {
    console.log(this.tagName, ...args);
  }

  warn(...args) {
    console.warn(this.tagName, ...args);
  }

  generateUuid() {
    return Date.now();
  }

  generateType(type) {
    return `@${this.groupName}/${type}`;
  }

  /**
   * 校验消息是否无效
   * @param {*} event 消息事件
   * @param {*} targetWindow 当前要通信的目标窗口
   * @returns true 表示无效，false 表示有效
   */
  isMessageInvalid(event, targetWindow) {
    const messagePrefix = `${window.location.origin} 收到 ${event.origin} 的`;
    if (
      targetWindow !== event.source ||
      typeof event.data !== "object" ||
      !event.data ||
      !event.data.type ||
      !["req", "res"].includes(event.data.reqResType)
    ) {
      this.warn(`${messagePrefix}非法消息`, event.data);
      return true;
    }

    this.log(`${messagePrefix}合法 ${event.data.reqResType} 消息`, event.data);

    return false;
  }

  /**
   * 当前 window 和 targetWindow 是否同源
   * @param {*} targetWindow 目标窗口
   * @returns true 表示同源，false 表示不同源
   */
  isSameOrigin(targetWindow) {
    try {
      return targetWindow.location.origin === window.location.origin;
    } catch {
      return false;
    }
  }

  /**
   * 发起请求
   */
  request({
    targetWindow,
    targetOrigin,
    requestHistoryList,
    type,
    data,
    timeout = 1000,
  }) {
    return new Promise((resolve, reject) => {
      const message = {
        reqResType: "req",
        type: this.generateType(type),
        uuid: this.generateUuid(),
        data,
      };

      this.log(
        `${window.location.origin} 向 ${targetOrigin} 发送 req 消息`,
        message
      );

      const messageHistory = {
        ...message,
        resolve,
        reject,
      };

      // 存储发送给 targetWindow 消息历史
      requestHistoryList.push(messageHistory);
      setTimeout(() => {
        const index = requestHistoryList.indexOf(messageHistory);
        if (index > -1) {
          // 移除请求历史
          requestHistoryList.splice(index, 1);
          // 抛出请求响应超时
          reject("请求响应超时");
        }
      }, timeout);

      // 2、发送消息
      targetWindow.postMessage(message, targetOrigin);
    });
  }

  /**
   * 向父容器发起请求
   */
  requestParent(type, data, timeout = 1000) {
    return this.request({
      targetWindow: this.parentWindow,
      targetOrigin: this.parentPath,
      requestHistoryList: this.parentRequestHistoryList,
      type,
      data,
      timeout,
    });
  }

  /**
   * 向 iframe 或者 window.open 方法打开的新窗口发起请求
   */
  requestIframeOrOpenWindow(type, data, timeout = 1000) {
    return this.request({
      targetWindow: this.openWin,
      targetOrigin: this.openUrl,
      requestHistoryList: this.iframeRequestHistoryList,
      type,
      data,
      timeout,
    });
  }

  /**
   * 注册事件监听器
   */
  on(type, listener) {
    this.listenerInfoList.push({
      type: this.generateType(type),
      listener,
    });
  }

  /**
   * 处理请求：根据 type 触发自身注册的事件监听器，然后将事件监听器的返回值作为消息发送给 targetWindow
   * @param {*} event
   * @param {*} targetWindow
   * @param {*} targetOrigin
   */
  async handleReq(
    event,
    targetWindow = event.source,
    targetOrigin = event.origin
  ) {
    const { uuid, type, data, reqResType } = event.data;
    if (reqResType !== "req") {
      return;
    }

    let isHandled = false;

    for (const listenerInfo of this.listenerInfoList) {
      if (type === listenerInfo.type) {
        let resultData = null;
        let resultError = null;
        try {
          resultData = await listenerInfo.listener(data);
        } catch (e) {
          resultError = e;
        }

        targetWindow.postMessage(
          {
            reqResType: "res",
            type,
            uuid,
            data: resultData,
            error: resultError,
          },
          targetOrigin
        );

        isHandled = true;
      }
    }

    if (!isHandled) {
      this.warn("处理请求时未找到注册的处理器", event.data);
    }
  }

  /**
   * 处理响应结果：遍历请求历史列表，找到匹配的请求 type 和 uuid，通过之前缓存的 resolve、reject 返回结果
   */
  handleRes({ event, requestHistoryList }) {
    const { uuid, type, data, error, reqResType } = event.data;
    if (reqResType !== "res") {
      return;
    }

    let isHandled = false;

    requestHistoryList
      .filter((history) => history.type === type && history.uuid === uuid)
      .forEach((history) => {
        // 处理请求成功或失败
        if (error) {
          history.reject(error);
        } else {
          history.resolve(data);
        }

        // 移除请求历史
        requestHistoryList.splice(requestHistoryList.indexOf(history), 1);

        isHandled = true;
      });

    if (!isHandled) {
      this.warn("处理响应结果时未找到匹配的请求历史", event.data);
    }
  }

  /**
   * 初始化 message 监听器
   */
  initMessageListener({ targetWindow, targetOrigin, requestHistoryList }) {
    window.addEventListener(
      "message",
      (event) => {
        if (this.isMessageInvalid(event, targetWindow)) {
          return;
        }

        // 处理请求
        this.handleReq(event, targetWindow, targetOrigin);

        // 处理响应结果
        this.handleRes({ event, requestHistoryList });
      },
      false
    );
  }

  createWithParent(parentWindow) {
    this.parentWindow = parentWindow;

    return new Promise((resolve, reject) => {
      this.initMessageListener({
        targetWindow: this.parentWindow,
        targetOrigin: this.parentPath,
        requestHistoryList: this.parentRequestHistoryList,
      });

      const timer = setTimeout(() => {
        reject("初始化超时");
      }, 10000);

      // 同源时：直接拿到父容器的路径
      if (this.isSameOrigin(parentWindow)) {
        this.parentPath = parentWindow.location.href;
        clearTimeout(timer);
        resolve(this);
      }

      // 非同源时：通过事件来接收父窗口发来的父窗口的地址
      this.on("parentUrl", (data) => {
        if (!this.isSameOrigin(parentWindow)) {
          this.parentPath = data;
          clearTimeout(timer);
          resolve(this);
        }

        return window.location.href;
      });
    });
  }

  createWithIframe(childIframe, initTimeout = 5000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject("初始化超时");
      }, initTimeout);

      // 监听子 iframe 加载成功
      childIframe.addEventListener("load", () => {
        this.openWin = childIframe.contentWindow;
        this.openUrl = childIframe.src;
        this.initIframeOrOpenWindow();

        clearTimeout(timer);
        resolve(this);
      });
    });
  }

  createWithOpenWindow(newWindow, initTimeout = 5000) {
    newWindow.onload = () => {
      // 需要是同源才能监听到新窗口加载完毕，否则此监听无效
      this.log("新窗口加载完毕");
    };

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject("初始化超时");
      }, initTimeout);

      setTimeout(() => {
        this.openWin = newWindow;
        // this.openUrl = newWindow.location.href;
        this.openUrl = "*";
        this.initIframeOrOpenWindow();

        clearTimeout(timer);
        resolve(this);
      }, 1000);
    });
  }

  initIframeOrOpenWindow() {
    this.initMessageListener({
      targetWindow: this.openWin,
      targetOrigin: this.openUrl,
      requestHistoryList: this.iframeRequestHistoryList,
    });

    this.requestIframeOrOpenWindow("parentUrl", window.location.href);
  }
}
