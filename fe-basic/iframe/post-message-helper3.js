class PostMessageHelper {
  CONNECT_TYPE = "connect";
  targetWindow;
  targetOrigin;
  targetTagName;
  // 当前窗口注册的监听器列表
  listenerInfoList = [];
  // 发送给父容器的消息列表
  requestHistoryList = [];
  // 发送给 iframe 或新窗口的消息列表
  requestHistoryList = [];
  // 日志名称
  tagName;
  // 消息组名
  groupName;

  constructor({ tagName, groupName }) {
    this.groupName = groupName;
    this.tagName = tagName;
  }

  info(...args) {
    this.log("gray", ...args);
  }

  success(...args) {
    this.log("green", ...args);
  }

  warn(...args) {
    this.log("#FFA500", ...args);
  }

  error(...args) {
    this.log("red", ...args);
  }

  log(color, ...args) {
    console.log(
      `%c${Date.now()} ${this.tagName}`,
      `background: ${color}; color: white; border-radius: 4px; padding: 4px;`,
      ...args
    );
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
   * @returns true 表示无效，false 表示有效
   */
  isMessageInvalid(event) {
    if (
      this.targetWindow !== event.source ||
      typeof event.data !== "object" ||
      !event.data ||
      !event.data.type ||
      !["req", "res"].includes(event.data.reqResType)
    ) {
      this.warn(
        `收到 ${event.data?.tagName || event.origin} 的非法消息`,
        event.data
      );
      return true;
    }

    const { error, reqResType, tagName, type } = event.data;
    const logMsg = `收到 ${
      tagName || event.origin
    } 的 ${reqResType} 消息 ${type}`;
    if (error) {
      this.error(logMsg, event.data);
    } else {
      if (reqResType === "res") {
        this.success(logMsg, event.data);
      } else {
        this.info(logMsg, event.data);
      }
    }

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
  request(type, data, timeout = 1000) {
    return new Promise((resolve, reject) => {
      const message = {
        reqResType: "req",
        type: this.generateType(type),
        uuid: this.generateUuid(),
        tagName: this.tagName,
        data,
      };

      this.info(
        `向 ${this.targetTagName || this.targetOrigin} 发送 req 消息 ${
          message.type
        }`,
        message
      );

      const messageHistory = {
        ...message,
        resolve,
        reject,
      };

      // 存储发送给 targetWindow 消息历史
      this.requestHistoryList.push(messageHistory);
      setTimeout(() => {
        const index = this.requestHistoryList.indexOf(messageHistory);
        if (index > -1) {
          // 移除请求历史
          this.requestHistoryList.splice(index, 1);
          // 抛出请求响应超时
          reject("请求响应超时");
        }
      }, timeout);

      // 2、发送消息
      this.targetWindow.postMessage(message, this.targetOrigin);
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
    this.info(`注册 ${this.generateType(type)}`);
  }

  /**
   * 处理请求：根据 type 触发自身注册的事件监听器，然后将事件监听器的返回值作为消息发送给 targetWindow
   * @param {*} event
   */
  async handleReq(event) {
    const { uuid, type, reqResType } = event.data;
    if (reqResType !== "req") {
      return;
    }

    let isHandled = false;

    for (const listenerInfo of this.listenerInfoList) {
      if (type === listenerInfo.type) {
        let resultData = null;
        let resultError = null;
        try {
          resultData = await listenerInfo.listener(event.data);
        } catch (e) {
          resultError = e;
        }

        const message = {
          reqResType: "res",
          type,
          uuid,
          tagName: this.tagName,
          data: resultData,
          error: resultError,
        };

        const logMsg = `向 ${
          this.targetTagName || this.targetOrigin
        } 发送 res 消息 ${message.type}`;
        if (resultError) {
          this.error(logMsg, message);
        } else {
          this.success(logMsg, message);
        }

        event.source.postMessage(message, event.origin);

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
  handleRes(event) {
    const { uuid, type, error, reqResType } = event.data;
    if (reqResType !== "res") {
      return;
    }

    let isHandled = false;

    this.requestHistoryList
      .filter((history) => history.type === type && history.uuid === uuid)
      .forEach((history) => {
        // 处理请求成功或失败
        if (error) {
          history.reject(event.data);
        } else {
          history.resolve(event.data);
        }

        // 移除请求历史
        this.requestHistoryList.splice(
          this.requestHistoryList.indexOf(history),
          1
        );

        isHandled = true;
      });

    if (!isHandled) {
      this.warn("处理响应结果时未找到匹配的请求历史", event.data);
    }
  }

  /**
   * 初始化 message 监听器
   */
  initMessageListener() {
    window.addEventListener(
      "message",
      (event) => {
        if (this.isMessageInvalid(event)) {
          return;
        }

        // 处理请求
        this.handleReq(event);

        // 处理响应结果
        this.handleRes(event);
      },
      false
    );
  }

  connect(resolve, reject, timer, connectTimeout) {
    this.initMessageListener();

    this.on(this.CONNECT_TYPE, (res) => {
      this.success(`收到 ${res.tagName} ${this.CONNECT_TYPE}`, res);
      this.targetOrigin = new URL(res.data).origin;
      this.targetTagName = res.tagName;
      clearTimeout(timer);

      /**
       * 延时一下，先让 targetWindow 收到链接请求的响应结果，然后再标记当前实例为已连接状态，
       * 不然当前实例链接成功后立即发送请求是 targetWindow 在链接后才注册的情况下会找不到对应的处理器
       */
      setTimeout(() => {
        resolve(this);
      }, 0);

      return window.location.href;
    });

    if (this.targetOrigin) {
      this.request(this.CONNECT_TYPE, window.location.href, connectTimeout)
        .then((res) => {
          this.success(`${this.CONNECT_TYPE} ${res.tagName} 成功`, res);
          this.targetOrigin = new URL(res.data).origin;
          this.targetTagName = res.tagName;
          clearTimeout(timer);
          resolve(this);
        })
        .catch((e) => {
          this.error(`${this.CONNECT_TYPE} ${e?.tagName || ""} 失败`, e);
          clearTimeout(timer);
          reject(e);
        });
    }
  }

  createWithParent(targetWindow, connectTimeout = 5000) {
    this.targetWindow = targetWindow;
    if (window.opener) {
      // 先设置为 *，避免 connect 失败，后续 connect 成功时会替换为真实的值
      this.targetOrigin = "*";
    }

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject("初始化超时");
      }, connectTimeout);
      this.connect(resolve, reject, timer, connectTimeout);
    });
  }

  createWithIframe(childIframe, connectTimeout = 5000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject("初始化超时");
      }, connectTimeout);

      // 监听子 iframe 加载成功
      childIframe.addEventListener("load", () => {
        this.targetWindow = childIframe.contentWindow;
        this.targetOrigin = new URL(childIframe.src).origin;

        this.connect(resolve, reject, timer, connectTimeout);
      });
    });
  }

  createWithOpenWindow(newWindow, connectTimeout = 5000) {
    newWindow.onload = () => {
      // 需要是同源才能监听到新窗口加载完毕，否则此监听无效
      this.info("新窗口加载完毕");
    };

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject("初始化超时");
      }, connectTimeout);

      this.targetWindow = newWindow;
      this.connect(resolve, reject, timer, connectTimeout);
    });
  }
}
