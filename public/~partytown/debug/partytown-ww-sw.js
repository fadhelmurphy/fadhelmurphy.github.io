/* Partytown 0.7.6 - MIT builder.io */
(self => {
  const WinIdKey = Symbol()
  const InstanceIdKey = Symbol()
  const InstanceDataKey = Symbol()
  const NamespaceKey = Symbol()
  const ApplyPathKey = Symbol()
  const InstanceStateKey = Symbol()
  const HookContinue = Symbol()
  const HookPrevent = Symbol()
  const webWorkerInstances = new Map()
  const webWorkerRefsByRefId = {}
  const webWorkerRefIdsByRef = new WeakMap()
  const postMessages = []
  const webWorkerCtx = {}
  const webWorkerlocalStorage = new Map()
  const webWorkerSessionStorage = new Map()
  const environments = {}
  const cachedDimensions = new Map()
  const cachedStructure = new Map()
  const commaSplit = str => str.split(',')
  const partytownLibUrl = url => {
    url = webWorkerCtx.$libPath$ + url
    if (new URL(url).origin != location.origin) {
      throw 'Invalid ' + url
    }
    return url
  }
  const getterDimensionPropNames = commaSplit('clientWidth,clientHeight,clientTop,clientLeft,innerWidth,innerHeight,offsetWidth,offsetHeight,offsetTop,offsetLeft,outerWidth,outerHeight,pageXOffset,pageYOffset,scrollWidth,scrollHeight,scrollTop,scrollLeft')
  const elementStructurePropNames = commaSplit('childElementCount,children,firstElementChild,lastElementChild,nextElementSibling,previousElementSibling')
  const structureChangingMethodNames = commaSplit('insertBefore,remove,removeChild,replaceChild')
  const dimensionChangingSetterNames = commaSplit('className,width,height,hidden,innerHTML,innerText,textContent')
  const dimensionChangingMethodNames = commaSplit('setAttribute,setAttributeNS,setProperty')
  const eventTargetMethods = commaSplit('addEventListener,dispatchEvent,removeEventListener')
  const nonBlockingMethods = eventTargetMethods.concat(dimensionChangingMethodNames, commaSplit('add,observe,remove,unobserve'))
  const IS_TAG_REG = /^[A-Z_]([A-Z0-9-]*[A-Z0-9])?$/
  const noop = () => {}
  const len = obj => obj.length
  const getConstructorName = obj => {
    let _a, _b, _c
    try {
      const constructorName = (_a = obj == null ? void 0 : obj.constructor) === null || void 0 === _a ? void 0 : _a.name
      if (constructorName) {
        return constructorName
      }
    } catch (e) {}
    try {
      const zoneJsConstructorName = (_c = (_b = obj == null ? void 0 : obj.__zone_symbol__originalInstance) === null || void 0 === _b ? void 0 : _b.constructor) === null || void 0 === _c ? void 0 : _c.name
      if (zoneJsConstructorName) {
        return zoneJsConstructorName
      }
    } catch (e) {}
    return ''
  }
  const EMPTY_ARRAY = []
  const randomId = () => Math.round(Math.random() * Number.MAX_SAFE_INTEGER).toString(36)
  const SCRIPT_TYPE = 'text/partytown'
  const defineProperty = (obj, memberName, descriptor) => Object.defineProperty(obj, memberName, {
    ...descriptor,
    configurable: true
  })
  const defineConstructorName = (Cstr, value) => defineProperty(Cstr, 'name', {
    value
  })
  const definePrototypeProperty = (Cstr, memberName, descriptor) => defineProperty(Cstr.prototype, memberName, descriptor)
  const definePrototypePropertyDescriptor = (Cstr, propertyDescriptorMap) => Object.defineProperties(Cstr.prototype, propertyDescriptorMap)
  const definePrototypeValue = (Cstr, memberName, value) => definePrototypeProperty(Cstr, memberName, {
    value,
    writable: true
  })
  const hasInstanceStateValue = (instance, stateKey) => stateKey in instance[InstanceStateKey]
  const getInstanceStateValue = (instance, stateKey) => instance[InstanceStateKey][stateKey]
  const setInstanceStateValue = (instance, stateKey, stateValue) => instance[InstanceStateKey][stateKey] = stateValue
  const setWorkerRef = (ref, refId) => {
    if (!(refId = webWorkerRefIdsByRef.get(ref))) {
      webWorkerRefIdsByRef.set(ref, refId = randomId())
      webWorkerRefsByRefId[refId] = ref
    }
    return refId
  }
  const getOrCreateNodeInstance = (winId, instanceId, nodeName, namespace, instance) => {
    instance = webWorkerInstances.get(instanceId)
    if (!instance && nodeName && environments[winId]) {
      instance = environments[winId].$createNode$(nodeName, instanceId, namespace)
      webWorkerInstances.set(instanceId, instance)
    }
    return instance
  }
  const definePrototypeNodeType = (Cstr, nodeType) => definePrototypeValue(Cstr, 'nodeType', nodeType)
  const cachedTreeProps = (Cstr, treeProps) => treeProps.map((propName => definePrototypeProperty(Cstr, propName, {
    get () {
      const cacheKey = getInstanceCacheKey(this, propName)
      let result = cachedStructure.get(cacheKey)
      if (!result) {
        result = getter(this, [propName])
        cachedStructure.set(cacheKey, result)
      }
      return result
    }
  })))
  const getInstanceCacheKey = (instance, memberName, args) => [instance[WinIdKey], instance[InstanceIdKey], memberName, ...(args || EMPTY_ARRAY).map((arg => String(arg?.[WinIdKey] ? arg[InstanceIdKey] : arg)))].join('.')
  const cachedProps = (Cstr, propNames) => commaSplit(propNames).map((propName => definePrototypeProperty(Cstr, propName, {
    get () {
      hasInstanceStateValue(this, propName) || setInstanceStateValue(this, propName, getter(this, [propName]))
      return getInstanceStateValue(this, propName)
    },
    set (val) {
      getInstanceStateValue(this, propName) !== val && setter(this, [propName], val)
      setInstanceStateValue(this, propName, val)
    }
  })))
  const cachedDimensionProps = Cstr => getterDimensionPropNames.map((propName => definePrototypeProperty(Cstr, propName, {
    get () {
      const dimension = cachedDimensions.get(getInstanceCacheKey(this, propName))
      if (typeof dimension === 'number') {
        return dimension
      }
      const groupedDimensions = getter(this, [propName], getterDimensionPropNames)
      if (groupedDimensions && typeof groupedDimensions === 'object') {
        Object.entries(groupedDimensions).map((([dimensionPropName, value]) => cachedDimensions.set(getInstanceCacheKey(this, dimensionPropName), value)))
        return groupedDimensions[propName]
      }
      return groupedDimensions
    }
  })))
  const cachedDimensionMethods = (Cstr, dimensionMethodNames) => dimensionMethodNames.map((methodName => {
    Cstr.prototype[methodName] = function (...args) {
      const cacheKey = getInstanceCacheKey(this, methodName, args)
      let dimensions = cachedDimensions.get(cacheKey)
      if (!dimensions) {
        dimensions = callMethod(this, [methodName], args)
        cachedDimensions.set(cacheKey, dimensions)
      }
      return dimensions
    }
  }))
  const serializeForMain = ($winId$, $instanceId$, value, added, type) => void 0 !== value && (type = typeof value)
    ? type === 'string' || type === 'boolean' || type === 'number' || value == null
      ? [0, value]
      : type === 'function'
        ? [4, {
            $winId$,
            $instanceId$,
            $refId$: setWorkerRef(value)
          }]
        : (added = added || new Set()) && Array.isArray(value) ? added.has(value) ? [1, []] : added.add(value) && [1, value.map((v => serializeForMain($winId$, $instanceId$, v, added)))] : type === 'object' ? value[InstanceIdKey] ? [3, [value[WinIdKey], value[InstanceIdKey]]] : value instanceof Event ? [5, serializeObjectForMain($winId$, $instanceId$, value, false, added)] : supportsTrustedHTML && value instanceof TrustedHTML ? [0, value.toString()] : value instanceof ArrayBuffer ? [8, value] : ArrayBuffer.isView(value) ? [9, value.buffer, getConstructorName(value)] : [2, serializeObjectForMain($winId$, $instanceId$, value, true, added)] : void 0
    : value
  const supportsTrustedHTML = typeof TrustedHTML !== 'undefined'
  const serializeObjectForMain = (winId, instanceId, obj, includeFunctions, added, serializedObj, propName, propValue) => {
    serializedObj = {}
    if (!added.has(obj)) {
      added.add(obj)
      for (propName in obj) {
        propValue = obj[propName];
        (includeFunctions || typeof propValue !== 'function') && (serializedObj[propName] = serializeForMain(winId, instanceId, propValue, added))
      }
    }
    return serializedObj
  }
  const serializeInstanceForMain = (instance, value) => instance ? serializeForMain(instance[WinIdKey], instance[InstanceIdKey], value) : [0, value]
  const deserializeFromMain = (winId, instanceId, applyPath, serializedValueTransfer, serializedType, serializedValue, obj, key) => {
    if (serializedValueTransfer) {
      serializedType = serializedValueTransfer[0]
      serializedValue = serializedValueTransfer[1]
      if (serializedType === 0 || serializedType === 11 || serializedType === 12) {
        return serializedValue
      }
      if (serializedType === 4) {
        return deserializeRefFromMain(applyPath, serializedValue)
      }
      if (serializedType === 6) {
        return winId && applyPath.length > 0 ? (...args) => callMethod(environments[winId].$window$, applyPath, args, 1) : noop
      }
      if (serializedType === 3) {
        return getOrCreateSerializedInstance(serializedValue)
      }
      if (serializedType === 7) {
        return new NodeList(serializedValue.map(getOrCreateSerializedInstance))
      }
      if (serializedType === 10) {
        return new Attr(serializedValue)
      }
      if (serializedType === 1) {
        return serializedValue.map((v => deserializeFromMain(winId, instanceId, applyPath, v)))
      }
      if (serializedType === 14) {
        return new CustomError(serializedValue)
      }
      obj = {}
      for (key in serializedValue) {
        obj[key] = deserializeFromMain(winId, instanceId, [...applyPath, key], serializedValue[key])
      }
      if (serializedType === 13) {
        return new environments[winId].$window$.CSSStyleDeclaration(winId, instanceId, applyPath, obj)
      }
      if (serializedType === 5) {
        if (obj.type === 'message' && obj.origin) {
          const postMessageKey = JSON.stringify(obj.data)
          const postMessageData = postMessages.find((pm => pm.$data$ === postMessageKey))
          let env
          if (postMessageData) {
            env = environments[postMessageData.$winId$]
            if (env) {
              obj.source = env.$window$
              obj.origin = env.$location$.origin
            }
          }
        }
        return new Proxy(new Event(obj.type, obj), {
          get: (target, propName) => propName in obj ? obj[propName] : typeof target[String(propName)] === 'function' ? noop : target[String(propName)]
        })
      }
      if (serializedType === 2) {
        return obj
      }
    }
  }
  const getOrCreateSerializedInstance = ([winId, instanceId, nodeName]) => instanceId === winId && environments[winId] ? environments[winId].$window$ : getOrCreateNodeInstance(winId, instanceId, nodeName)
  const deserializeRefFromMain = (applyPath, { $winId$, $instanceId$, $nodeName$, $refId$ }) => {
    webWorkerRefsByRefId[$refId$] || webWorkerRefIdsByRef.set(webWorkerRefsByRefId[$refId$] = function (...args) {
      const instance = getOrCreateNodeInstance($winId$, $instanceId$, $nodeName$)
      return callMethod(instance, applyPath, args)
    }, $refId$)
    return webWorkerRefsByRefId[$refId$]
  }
  class CustomError extends Error {
    constructor (errorObject) {
      super(errorObject.message)
      this.name = errorObject.name
      this.message = errorObject.message
      this.stack = errorObject.stack
    }
  }
  class NodeList {
    constructor (nodes) {
      (this._ = nodes).map(((node, index) => this[index] = node))
    }

    entries () {
      return this._.entries()
    }

    forEach (cb, thisArg) {
      this._.map(cb, thisArg)
    }

    item (index) {
      return this[index]
    }

    keys () {
      return this._.keys()
    }

    get length () {
      return len(this._)
    }

    values () {
      return this._.values()
    }

    [Symbol.iterator] () {
      return this._[Symbol.iterator]()
    }
  }
  const Attr = class {
    constructor (serializedAttr) {
      this.name = serializedAttr[0]
      this.value = serializedAttr[1]
    }

    get nodeName () {
      return this.name
    }

    get nodeType () {
      return 2
    }
  }
  const warnCrossOrgin = (apiType, apiName, env) => { console.warn(`Partytown unable to ${apiType} cross-origin ${apiName}: ` + env.$location$) }
  const logWorker = (msg, winId) => {
    try {
      const config = webWorkerCtx.$config$
      if (config.logStackTraces) {
        const frames = (new Error()).stack.split('\n')
        const i = frames.findIndex((f => f.includes('logWorker')))
        msg += '\n' + frames.slice(i + 1).join('\n')
      }
      let prefix
      let color
      if (winId) {
        prefix = `Worker (${normalizedWinId(winId)}) 🎉`
        color = winColor(winId)
      } else {
        prefix = self.name
        color = '#9844bf'
      }
      if (webWorkerCtx.lastLog !== msg) {
        webWorkerCtx.lastLog = msg
        console.debug.apply(console, [`%c${prefix}`, `background: ${color}; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;`, msg])
      }
    } catch (e) {}
  }
  const winIds = []
  const normalizedWinId = winId => {
    winIds.includes(winId) || winIds.push(winId)
    return winIds.indexOf(winId) + 1
  }
  const winColor = winId => {
    const colors = ['#00309e', '#ea3655', '#eea727']
    const index = normalizedWinId(winId) - 1
    return colors[index] || colors[colors.length - 1]
  }
  const getTargetProp = (target, applyPath) => {
    let n = ''
    if (target) {
      const cstrName = getConstructorName(target)
      if (cstrName === 'Window') {
        n = ''
      } else if (typeof target[InstanceDataKey] === 'string') {
        const nodeName = target[InstanceDataKey]
        n = nodeName === '#text' ? 'textNode.' : nodeName === '#comment' ? 'commentNode.' : nodeName === '#document' ? 'document.' : nodeName === 'html' ? 'doctype.' : nodeName.toLowerCase() + '.'
      } else {
        n = 'nodeType' in target && target.nodeType === 2 ? 'attributes.' : cstrName === 'CanvasRenderingContext2D' ? 'context2D.' : cstrName === 'CanvasRenderingContextWebGL' ? 'contextWebGL.' : cstrName === 'CSSStyleDeclaration' ? 'style.' : cstrName === 'MutationObserver' ? 'mutationObserver.' : cstrName === 'NamedNodeMap' ? 'namedNodeMap.' : cstrName === 'ResizeObserver' ? 'resizeObserver.' : cstrName.substring(0, 1).toLowerCase() + cstrName.substring(1) + '.'
      }
      target[ApplyPathKey]?.length && (n += [...target[ApplyPathKey]].join('.') + '.')
    }
    if (applyPath.length > 1) {
      const first = applyPath.slice(0, applyPath.length - 1)
      const last = applyPath[applyPath.length - 1]
      if (!isNaN(last)) {
        return n + `${first.join('.')}[${last}]`
      }
    }
    return n + applyPath.join('.')
  }
  const getLogValue = (applyPath, v) => {
    const type = typeof v
    if (void 0 === v) {
      return 'undefined'
    }
    if (type === 'boolean' || type === 'number' || v == null) {
      return JSON.stringify(v)
    }
    if (type === 'string') {
      return applyPath.includes('cookie') ? JSON.stringify(v.slice(0, 10) + '...') : JSON.stringify(v.length > 50 ? v.slice(0, 40) + '...' : v)
    }
    if (Array.isArray(v)) {
      return `[${v.map(getLogValue).join(', ')}]`
    }
    if (type === 'object') {
      const instanceId = v[InstanceIdKey]
      const cstrName = getConstructorName(v)
      if (typeof instanceId === 'string') {
        if (cstrName === 'Window') {
          return 'window'
        }
        if (typeof v[InstanceDataKey] === 'string') {
          if (v.nodeType === 1) {
            return `<${v[InstanceDataKey].toLowerCase()}>`
          }
          if (v.nodeType === 10) {
            return `<!DOCTYPE ${v[InstanceDataKey]}>`
          }
          if (v.nodeType <= 11) {
            return v[InstanceDataKey]
          }
        }
        return '¯\\_(ツ)_/¯ instance obj'
      }
      return v[Symbol.iterator] ? `[${Array.from(v).map((i => getLogValue(applyPath, i))).join(', ')}]` : 'value' in v ? typeof v.value === 'string' ? `"${v.value}"` : objToString(v.value) : objToString(v)
    }
    return (v => typeof v === 'object' && v?.then)(v) ? 'Promise' : type === 'function' ? `ƒ() ${v.name || ''}`.trim() : `¯\\_(ツ)_/¯ ${String(v)}`.trim()
  }
  const objToString = obj => {
    const s = []
    for (const key in obj) {
      const value = obj[key]
      const type = typeof value
      type === 'string' ? s.push(`${key}: "${value}"`) : type === 'function' ? s.push(`${key}: ƒ`) : Array.isArray(type) ? s.push(`${key}: [..]`) : type === 'object' && value ? s.push(`${key}: {..}`) : s.push(`${key}: ${String(value)}`)
    }
    let str = s.join(', ')
    str.length > 200 && (str = str.substring(0, 200) + '..')
    return `{ ${str} }`
  }
  const logDimensionCacheClearStyle = (target, propName) => {
    (webWorkerCtx.$config$.logGetters || webWorkerCtx.$config$.logSetters) && logWorker(`Dimension cache cleared from style.${propName} setter`, target[WinIdKey])
  }
  const logDimensionCacheClearMethod = (target, methodName) => {
    (webWorkerCtx.$config$.logGetters || webWorkerCtx.$config$.logCalls) && logWorker(`Dimension cache cleared from method call ${methodName}()`, target[WinIdKey])
  }
  const taskQueue = []
  const queue = (instance, $applyPath$, callType, $assignInstanceId$, $groupedGetters$, buffer) => {
    if (instance[ApplyPathKey]) {
      taskQueue.push({
        $winId$: instance[WinIdKey],
        $instanceId$: instance[InstanceIdKey],
        $applyPath$: [...instance[ApplyPathKey], ...$applyPath$],
        $assignInstanceId$,
        $groupedGetters$
      })
      taskQueue[len(taskQueue) - 1].$debug$ = ((target, applyPath, callType) => {
        let m = getTargetProp(target, applyPath)
        callType === 1 ? m += ' (blocking)' : callType === 2 ? m += ' (non-blocking)' : callType === 3 && (m += ' (non-blocking, no-side-effect)')
        return m.trim()
      })(instance, $applyPath$, callType)
      buffer && callType !== 3 && console.error('buffer must be sent NonBlockingNoSideEffect')
      if (callType === 3) {
        webWorkerCtx.$postMessage$([12, {
          $msgId$: randomId(),
          $tasks$: [...taskQueue]
        }], buffer ? [buffer instanceof ArrayBuffer ? buffer : buffer.buffer] : void 0)
        taskQueue.length = 0
      } else if (callType === 1) {
        return sendToMain(true)
      }
      webWorkerCtx.$asyncMsgTimer$ = setTimeout(sendToMain, 20)
    }
  }
  const sendToMain = isBlocking => {
    clearTimeout(webWorkerCtx.$asyncMsgTimer$)
    if (len(taskQueue)) {
      webWorkerCtx.$config$.logMainAccess && logWorker(`Main access, tasks sent: ${taskQueue.length}`)
      const endTask = taskQueue[len(taskQueue) - 1]
      const accessReq = {
        $msgId$: randomId(),
        $tasks$: [...taskQueue]
      }
      taskQueue.length = 0
      if (isBlocking) {
        const accessRsp = ((webWorkerCtx, accessReq) => {
          const xhr = new XMLHttpRequest()
          xhr.open('POST', partytownLibUrl('proxytown'), false)
          xhr.send(JSON.stringify(accessReq))
          return JSON.parse(xhr.responseText)
        })(0, accessReq)
        const isPromise = accessRsp.$isPromise$
        const rtnValue = deserializeFromMain(endTask.$winId$, endTask.$instanceId$, endTask.$applyPath$, accessRsp.$rtnValue$)
        if (accessRsp.$error$) {
          if (isPromise) {
            return Promise.reject(accessRsp.$error$)
          }
          throw new Error(accessRsp.$error$)
        }
        return isPromise ? Promise.resolve(rtnValue) : rtnValue
      }
      webWorkerCtx.$postMessage$([12, accessReq])
    }
  }
  const getter = (instance, applyPath, groupedGetters, rtnValue) => {
    if (webWorkerCtx.$config$.get) {
      rtnValue = webWorkerCtx.$config$.get(createHookOptions(instance, applyPath))
      if (rtnValue !== HookContinue) {
        return rtnValue
      }
    }
    rtnValue = queue(instance, applyPath, 1, void 0, groupedGetters);
    ((target, applyPath, rtnValue, restrictedToWorker = false, groupedGetters = false) => {
      if (webWorkerCtx.$config$.logGetters) {
        try {
          const msg = `Get ${getTargetProp(target, applyPath)}, returned: ${getLogValue(applyPath, rtnValue)}${restrictedToWorker ? ' (restricted to worker)' : ''}${groupedGetters ? ' (grouped getter)' : ''}`
          msg.includes('Symbol(') || logWorker(msg, target[WinIdKey])
        } catch (e) {}
      }
    })(instance, applyPath, rtnValue, false, !!groupedGetters)
    return rtnValue
  }
  const setter = (instance, applyPath, value, hookSetterValue) => {
    if (webWorkerCtx.$config$.set) {
      hookSetterValue = webWorkerCtx.$config$.set({
        value,
        prevent: HookPrevent,
        ...createHookOptions(instance, applyPath)
      })
      if (hookSetterValue === HookPrevent) {
        return
      }
      hookSetterValue !== HookContinue && (value = hookSetterValue)
    }
    if (dimensionChangingSetterNames.some((s => applyPath.includes(s)))) {
      cachedDimensions.clear();
      ((target, propName) => {
        (webWorkerCtx.$config$.logGetters || webWorkerCtx.$config$.logSetters) && logWorker(`Dimension cache cleared from setter "${propName}"`, target[WinIdKey])
      })(instance, applyPath[applyPath.length - 1])
    }
    applyPath = [...applyPath, serializeInstanceForMain(instance, value), 0];
    ((target, applyPath, value, restrictedToWorker = false) => {
      if (webWorkerCtx.$config$.logSetters) {
        try {
          applyPath = applyPath.slice(0, applyPath.length - 2)
          logWorker(`Set ${getTargetProp(target, applyPath)}, value: ${getLogValue(applyPath, value)}${restrictedToWorker ? ' (restricted to worker)' : ''}`, target[WinIdKey])
        } catch (e) {}
      }
    })(instance, applyPath, value)
    queue(instance, applyPath, 2)
  }
  const callMethod = (instance, applyPath, args, callType, assignInstanceId, buffer, rtnValue, methodName) => {
    if (webWorkerCtx.$config$.apply) {
      rtnValue = webWorkerCtx.$config$.apply({
        args,
        ...createHookOptions(instance, applyPath)
      })
      if (rtnValue !== HookContinue) {
        return rtnValue
      }
    }
    methodName = applyPath[len(applyPath) - 1]
    applyPath = [...applyPath, serializeInstanceForMain(instance, args)]
    callType = callType || (nonBlockingMethods.includes(methodName) ? 2 : 1)
    if (methodName === 'setAttribute' && hasInstanceStateValue(instance, args[0])) {
      setInstanceStateValue(instance, args[0], args[1])
    } else if (structureChangingMethodNames.includes(methodName)) {
      cachedDimensions.clear()
      cachedStructure.clear();
      ((target, methodName) => {
        (webWorkerCtx.$config$.logGetters || webWorkerCtx.$config$.logCalls) && logWorker(`Dimension and DOM structure cache cleared from method call ${methodName}()`, target[WinIdKey])
      })(instance, methodName)
    } else if (dimensionChangingMethodNames.includes(methodName)) {
      callType = 2
      cachedDimensions.clear()
      logDimensionCacheClearMethod(instance, methodName)
    }
    rtnValue = queue(instance, applyPath, callType, assignInstanceId, void 0, buffer);
    ((target, applyPath, args, rtnValue) => {
      if (webWorkerCtx.$config$.logCalls) {
        try {
          applyPath = applyPath.slice(0, applyPath.length - 1)
          logWorker(`Call ${getTargetProp(target, applyPath)}(${args.map((v => getLogValue(applyPath, v))).join(', ')}), returned: ${getLogValue(applyPath, rtnValue)}`, target[WinIdKey])
        } catch (e) {}
      }
    })(instance, applyPath, args, rtnValue)
    return rtnValue
  }
  const constructGlobal = (instance, cstrName, args) => {
    ((target, cstrName, args) => {
      if (webWorkerCtx.$config$.logCalls) {
        try {
          logWorker(`Construct new ${cstrName}(${args.map((v => getLogValue([], v))).join(', ')})`, target[WinIdKey])
        } catch (e) {}
      }
    })(instance, cstrName, args)
    queue(instance, [1, cstrName, serializeInstanceForMain(instance, args)], 1)
  }
  const createHookOptions = (instance, applyPath) => ({
    name: applyPath.join('.'),
    continue: HookContinue,
    nodeName: instance[InstanceDataKey],
    constructor: getConstructorName(instance),
    instance,
    window: environments[instance[WinIdKey]].$window$
  })
  const addStorageApi = (win, storageName, storages, isSameOrigin, env) => {
    const getItems = items => {
      items = storages.get(win.origin)
      items || storages.set(win.origin, items = [])
      return items
    }
    const getIndexByKey = key => getItems().findIndex((i => i[STORAGE_KEY] === key))
    let index
    let item
    const storage = {
      getItem (key) {
        index = getIndexByKey(key)
        return index > -1 ? getItems()[index][STORAGE_VALUE] : null
      },
      setItem (key, value) {
        index = getIndexByKey(key)
        index > -1 ? getItems()[index][STORAGE_VALUE] = value : getItems().push([key, value])
        isSameOrigin ? callMethod(win, [storageName, 'setItem'], [key, value], 2) : warnCrossOrgin('set', storageName, env)
      },
      removeItem (key) {
        index = getIndexByKey(key)
        index > -1 && getItems().splice(index, 1)
        isSameOrigin ? callMethod(win, [storageName, 'removeItem'], [key], 2) : warnCrossOrgin('remove', storageName, env)
      },
      key (index) {
        item = getItems()[index]
        return item ? item[STORAGE_KEY] : null
      },
      clear () {
        getItems().length = 0
        isSameOrigin ? callMethod(win, [storageName, 'clear'], EMPTY_ARRAY, 2) : warnCrossOrgin('clear', storageName, env)
      },
      get length () {
        return getItems().length
      }
    }
    win[storageName] = new Proxy(storage, {
      get: (target, key) => Reflect.has(target, key) ? Reflect.get(target, key) : target.getItem(key),
      set (target, key, value) {
        target.setItem(key, value)
        return true
      },
      has: (target, key) => !!Reflect.has(target, key) || typeof key === 'string' && target.getItem(key) !== null,
      deleteProperty (target, key) {
        target.removeItem(key)
        return true
      }
    })
  }
  const STORAGE_KEY = 0
  const STORAGE_VALUE = 1
  const createCSSStyleDeclarationCstr = (win, WorkerBase, cstrName) => {
    win[cstrName] = defineConstructorName(class extends WorkerBase {
      constructor (winId, instanceId, applyPath, styles) {
        super(winId, instanceId, applyPath, styles || {})
        return new Proxy(this, {
          get (target, propName) {
            if (target[propName]) {
              return target[propName]
            }
            target[propName] || typeof propName !== 'string' || target[InstanceDataKey][propName] || (target[InstanceDataKey][propName] = getter(target, [propName]))
            return target[InstanceDataKey][propName]
          },
          set (target, propName, propValue) {
            target[InstanceDataKey][propName] = propValue
            setter(target, [propName], propValue)
            logDimensionCacheClearStyle(target, propName)
            cachedDimensions.clear()
            return true
          }
        })
      }

      setProperty (...args) {
        this[InstanceDataKey][args[0]] = args[1]
        callMethod(this, ['setProperty'], args, 2)
        logDimensionCacheClearStyle(this, args[0])
        cachedDimensions.clear()
      }

      getPropertyValue (propName) {
        return this[propName]
      }

      removeProperty (propName) {
        const value = this[InstanceDataKey][propName]
        callMethod(this, ['removeProperty'], [propName], 2)
        logDimensionCacheClearStyle(this, propName)
        cachedDimensions.clear()
        this[InstanceDataKey][propName] = void 0
        return value
      }
    }, cstrName)
  }
  const createCSSStyleSheetConstructor = (win, cssStyleSheetCstrName) => {
    win[cssStyleSheetCstrName] = defineConstructorName(class {
      constructor (ownerNode) {
        this.ownerNode = ownerNode
      }

      get cssRules () {
        const ownerNode = this.ownerNode
        return new Proxy({}, {
          get (target, propKey) {
            const propName = String(propKey)
            return propName === 'item' ? index => getCssRule(ownerNode, index) : propName === 'length' ? getCssRules(ownerNode).length : isNaN(propName) ? target[propKey] : getCssRule(ownerNode, propName)
          }
        })
      }

      insertRule (ruleText, index) {
        const cssRules = getCssRules(this.ownerNode)
        index = void 0 === index ? 0 : index
        if (index >= 0 && index <= cssRules.length) {
          callMethod(this.ownerNode, ['sheet', 'insertRule'], [ruleText, index], 2)
          cssRules.splice(index, 0, 0)
        }
        logDimensionCacheClearMethod(this.ownerNode, 'insertRule')
        cachedDimensions.clear()
        return index
      }

      deleteRule (index) {
        callMethod(this.ownerNode, ['sheet', 'deleteRule'], [index], 2)
        getCssRules(this.ownerNode).splice(index, 1)
        logDimensionCacheClearMethod(this.ownerNode, 'deleteRule')
        cachedDimensions.clear()
      }

      get type () {
        return 'text/css'
      }
    }, cssStyleSheetCstrName)
    const HTMLStyleDescriptorMap = {
      sheet: {
        get () {
          return new win[cssStyleSheetCstrName](this)
        }
      }
    }
    definePrototypePropertyDescriptor(win.HTMLStyleElement, HTMLStyleDescriptorMap)
  }
  const getCssRules = (ownerNode, cssRules) => {
    cssRules = getInstanceStateValue(ownerNode, 2)
    if (!cssRules) {
      cssRules = getter(ownerNode, ['sheet', 'cssRules'])
      setInstanceStateValue(ownerNode, 2, cssRules)
    }
    return cssRules
  }
  const getCssRule = (ownerNode, index, cssRules) => {
    cssRules = getCssRules(ownerNode)
    cssRules[index] === 0 && (cssRules[index] = getter(ownerNode, ['sheet', 'cssRules', parseInt(index, 10)]))
    return cssRules[index]
  }
  const runScriptContent = (env, instanceId, scriptContent, winId, errorMsg) => {
    try {
      webWorkerCtx.$config$.logScriptExecution && logWorker(`Execute script: ${scriptContent.substring(0, 100).split('\n').map((l => l.trim())).join(' ').trim().substring(0, 60)}...`, winId)
      env.$currentScriptId$ = instanceId
      run(env, scriptContent)
    } catch (contentError) {
      console.error(scriptContent, contentError)
      errorMsg = String(contentError.stack || contentError)
    }
    env.$currentScriptId$ = ''
    return errorMsg
  }
  const run = (env, scriptContent, scriptUrl) => {
    env.$runWindowLoadEvent$ = 1
    scriptContent = `with(this){${scriptContent.replace(/\bthis\b/g, (match, offset, originalStr) => offset > 0 && originalStr[offset - 1] !== '$' ? '(thi$(this)?window:this)' : match).replace(/\/\/# so/g, '//Xso')}\n;function thi$(t){return t===this}};${(webWorkerCtx.$config$.globalFns || []).filter((globalFnName => /[a-zA-Z_$][0-9a-zA-Z_$]*/.test(globalFnName))).map((g => `(typeof ${g}=='function'&&(this.${g}=${g}))`)).join(';')};` + (scriptUrl ? '\n//# sourceURL=' + scriptUrl : '')
    env.$isSameOrigin$ || (scriptContent = scriptContent.replace(/.postMessage\(/g, `.postMessage('${env.$winId$}',`))
    new Function(scriptContent).call(env.$window$)
    env.$runWindowLoadEvent$ = 0
  }
  const runStateLoadHandlers = (instance, type, handlers) => {
    handlers = getInstanceStateValue(instance, type)
    handlers && setTimeout((() => handlers.map((cb => cb({
      type
    })))))
  }
  const resolveToUrl = (env, url, type, baseLocation, resolvedUrl, configResolvedUrl) => {
    baseLocation = env.$location$
    while (!baseLocation.host) {
      env = environments[env.$parentWinId$]
      baseLocation = env.$location$
      if (env.$winId$ === env.$parentWinId$) {
        break
      }
    }
    resolvedUrl = new URL(url || '', baseLocation)
    if (type && webWorkerCtx.$config$.resolveUrl) {
      configResolvedUrl = webWorkerCtx.$config$.resolveUrl(resolvedUrl, baseLocation, type)
      if (configResolvedUrl) {
        return configResolvedUrl
      }
    }
    return resolvedUrl
  }
  const resolveUrl = (env, url, type) => resolveToUrl(env, url, type) + ''
  const getPartytownScript = () => `<script src="${partytownLibUrl('partytown.js?v=0.7.6')}"><\/script>`
  const createImageConstructor = env => class HTMLImageElement {
    constructor () {
      this.s = ''
      this.l = []
      this.e = []
      this.style = {}
    }

    get src () {
      return this.s
    }

    set src (src) {
      webWorkerCtx.$config$.logImageRequests && logWorker(`Image() request: ${resolveUrl(env, src, 'image')}`, env.$winId$)
      this.s = src
      fetch(resolveUrl(env, src, 'image'), {
        mode: 'no-cors',
        credentials: 'include',
        keepalive: true
      }).then(rsp => {
        rsp.ok || rsp.status === 0
          ? this.l.map((cb => cb({
            type: 'load'
          })))
          : this.e.map((cb => cb({
            type: 'error'
          })))
      }, () => {
        this.e.forEach((cb => cb({
          type: 'error'
        })))
      })
    }

    addEventListener (eventName, cb) {
      eventName === 'load' && this.l.push(cb)
      eventName === 'error' && this.e.push(cb)
    }

    get onload () {
      return this.l[0]
    }

    set onload (cb) {
      this.l = [cb]
    }

    get onerror () {
      return this.e[0]
    }

    set onerror (cb) {
      this.e = [cb]
    }
  }
  const HTMLSrcElementDescriptorMap = {
    addEventListener: {
      value (...args) {
        const eventName = args[0]
        const callbacks = getInstanceStateValue(this, eventName) || []
        callbacks.push(args[1])
        setInstanceStateValue(this, eventName, callbacks)
      }
    },
    async: {
      get: noop,
      set: noop
    },
    defer: {
      get: noop,
      set: noop
    },
    onload: {
      get () {
        const callbacks = getInstanceStateValue(this, 'load')
        return callbacks?.[0] || null
      },
      set (cb) {
        setInstanceStateValue(this, 'load', cb ? [cb] : null)
      }
    },
    onerror: {
      get () {
        const callbacks = getInstanceStateValue(this, 'error')
        return callbacks?.[0] || null
      },
      set (cb) {
        setInstanceStateValue(this, 'error', cb ? [cb] : null)
      }
    },
    getAttribute: {
      value (attrName) {
        return attrName === 'src' ? this.src : callMethod(this, ['getAttribute'], [attrName])
      }
    },
    setAttribute: {
      value (attrName, attrValue) {
        scriptAttrPropNames.includes(attrName) ? this[attrName] = attrValue : callMethod(this, ['setAttribute'], [attrName, attrValue])
      }
    }
  }
  const scriptAttrPropNames = commaSplit('src,type')
  const patchHTMLScriptElement = (WorkerHTMLScriptElement, env) => {
    const HTMLScriptDescriptorMap = {
      innerHTML: innerHTMLDescriptor,
      innerText: innerHTMLDescriptor,
      src: {
        get () {
          return getInstanceStateValue(this, 4) || ''
        },
        set (url) {
          const orgUrl = resolveUrl(env, url, null)
          const config = webWorkerCtx.$config$
          url = resolveUrl(env, url, 'script')
          setInstanceStateValue(this, 4, url)
          setter(this, ['src'], url)
          orgUrl !== url && setter(this, ['dataset', 'ptsrc'], orgUrl)
          if (this.type && config.loadScriptsOnMainThread) {
            const shouldExecuteScriptViaMainThread = config.loadScriptsOnMainThread.some((scriptUrl => scriptUrl === url))
            shouldExecuteScriptViaMainThread && setter(this, ['type'], 'text/javascript')
          }
        }
      },
      textContent: innerHTMLDescriptor,
      type: {
        get () {
          return getter(this, ['type'])
        },
        set (type) {
          if (!isScriptJsType(type)) {
            setInstanceStateValue(this, 5, type)
            setter(this, ['type'], type)
          }
        }
      },
      ...HTMLSrcElementDescriptorMap
    }
    definePrototypePropertyDescriptor(WorkerHTMLScriptElement, HTMLScriptDescriptorMap)
  }
  const innerHTMLDescriptor = {
    get () {
      const type = getter(this, ['type'])
      return isScriptJsType(type) ? getInstanceStateValue(this, 3) || '' : getter(this, ['innerHTML'])
    },
    set (scriptContent) {
      setInstanceStateValue(this, 3, scriptContent)
    }
  }
  const isScriptJsType = scriptType => !scriptType || scriptType === 'text/javascript'
  const createNodeCstr = (win, env, WorkerBase) => {
    const config = webWorkerCtx.$config$
    const WorkerNode = defineConstructorName(class extends WorkerBase {
      appendChild (node) {
        return this.insertBefore(node, null)
      }

      get href () {}
      set href (_) {}
      insertBefore (newNode, referenceNode) {
        let _a, _b
        const winId = newNode[WinIdKey] = this[WinIdKey]
        const instanceId = newNode[InstanceIdKey]
        const nodeName = newNode[InstanceDataKey]
        const isScript = nodeName === 'SCRIPT'
        const isIFrame = nodeName === 'IFRAME'
        if (isScript) {
          const scriptContent = getInstanceStateValue(newNode, 3)
          const scriptType = getInstanceStateValue(newNode, 5)
          if (scriptContent) {
            if (isScriptJsType(scriptType)) {
              const scriptId = newNode.id
              const loadOnMainThread = scriptId && ((_b = (_a = config.loadScriptsOnMainThread) === null || void 0 === _a ? void 0 : _a.includes) === null || void 0 === _b ? void 0 : _b.call(_a, scriptId))
              if (loadOnMainThread) {
                setter(newNode, ['type'], 'text/javascript')
              } else {
                const errorMsg = runScriptContent(env, instanceId, scriptContent, winId, '')
                const datasetType = errorMsg ? 'pterror' : 'ptid'
                const datasetValue = errorMsg || instanceId
                setter(newNode, ['type'], 'text/partytown-x')
                setter(newNode, ['dataset', datasetType], datasetValue)
              }
            }
            setter(newNode, ['innerHTML'], scriptContent)
          }
        }
        callMethod(this, ['insertBefore'], [newNode, referenceNode], 2)
        if (isIFrame) {
          const src = getInstanceStateValue(newNode, 0)
          if (src?.startsWith('javascript:')) {
            const scriptContent = src.split('javascript:')[1]
            runScriptContent(env, instanceId, scriptContent, winId, '')
          }
          ((winId, iframe) => {
            let i = 0
            let type
            let handlers
            const callback = () => {
              if (environments[winId]?.$isInitialized$ && !environments[winId].$isLoading$) {
                type = getInstanceStateValue(iframe, 1) ? 'error' : 'load'
                handlers = getInstanceStateValue(iframe, type)
                handlers?.map((handler => handler({
                  type
                })))
              } else if (i++ > 2e3) {
                handlers = getInstanceStateValue(iframe, 'error')
                handlers?.map((handler => handler({
                  type: 'error'
                })))
              } else {
                setTimeout(callback, 9)
              }
            }
            callback()
          })(instanceId, newNode)
        }
        if (isScript) {
          sendToMain(true)
          webWorkerCtx.$postMessage$([7, winId])
        }
        return newNode
      }

      get nodeName () {
        return this[InstanceDataKey] === '#s' ? '#document-fragment' : this[InstanceDataKey]
      }

      get nodeType () {
        return 3
      }

      get ownerDocument () {
        return env.$document$
      }
    }, 'Node')
    cachedTreeProps(WorkerNode, commaSplit('childNodes,firstChild,isConnected,lastChild,nextSibling,parentElement,parentNode,previousSibling'))
    win.Node = WorkerNode
  }
  const htmlMedia = commaSplit('AUDIO,CANVAS,VIDEO')
  const windowMediaConstructors = commaSplit('Audio,MediaSource')
  const patchDocument = (WorkerDocument, env, isDocumentImplementation) => {
    const DocumentDescriptorMap = {
      body: {
        get: () => env.$body$
      },
      cookie: {
        get () {
          if (env.$isSameOrigin$) {
            return getter(this, ['cookie'])
          }
          warnCrossOrgin('get', 'cookie', env)
          return ''
        },
        set (value) {
          if (env.$isSameOrigin$) {
            setter(this, ['cookie'], value)
          } else {
            warnCrossOrgin('set', 'cookie', env)
          }
        }
      },
      createElement: {
        value (tagName) {
          tagName = tagName.toUpperCase()
          if (!IS_TAG_REG.test(tagName)) {
            throw tagName + ' not valid'
          }
          const isIframe = tagName === 'IFRAME'
          const winId = this[WinIdKey]
          const instanceId = (isIframe ? 'f_' : '') + randomId()
          callMethod(this, ['createElement'], [tagName], 2, instanceId)
          const elm = getOrCreateNodeInstance(winId, instanceId, tagName)
          if (isIframe) {
            const env = createEnvironment({
              $winId$: instanceId,
              $parentWinId$: winId,
              $url$: 'about:blank'
            }, true)
            env.$window$.fetch = fetch
            setter(elm, ['srcdoc'], getPartytownScript())
          } else if (tagName === 'SCRIPT') {
            const scriptType = getInstanceStateValue(elm, 5)
            isScriptJsType(scriptType) && setter(elm, ['type'], 'text/partytown')
          }
          return elm
        }
      },
      createElementNS: {
        value (namespace, tagName) {
          const instanceId = randomId()
          const nsElm = getOrCreateNodeInstance(this[WinIdKey], instanceId, tagName, namespace)
          callMethod(this, ['createElementNS'], [namespace, tagName], 2, instanceId)
          return nsElm
        }
      },
      createTextNode: {
        value (text) {
          const winId = this[WinIdKey]
          const instanceId = randomId()
          const textNode = getOrCreateNodeInstance(winId, instanceId, '#text')
          callMethod(this, ['createTextNode'], [text], 2, instanceId)
          return textNode
        }
      },
      createEvent: {
        value: type => new Event(type)
      },
      currentScript: {
        get () {
          return env.$currentScriptId$ ? getOrCreateNodeInstance(this[WinIdKey], env.$currentScriptId$, 'SCRIPT') : null
        }
      },
      defaultView: {
        get: () => isDocumentImplementation ? null : env.$window$
      },
      documentElement: {
        get: () => env.$documentElement$
      },
      getElementsByTagName: {
        value (tagName) {
          tagName = tagName.toUpperCase()
          return tagName === 'BODY' ? [env.$body$] : tagName === 'HEAD' ? [env.$head$] : callMethod(this, ['getElementsByTagName'], [tagName])
        }
      },
      head: {
        get: () => env.$head$
      },
      images: {
        get () {
          return getter(this, ['images'])
        }
      },
      implementation: {
        get () {
          return {
            hasFeature: () => true,
            createHTMLDocument: title => {
              const $winId$ = randomId()
              callMethod(this, ['implementation', 'createHTMLDocument'], [title], 1, {
                $winId$
              })
              const docEnv = createEnvironment({
                $winId$,
                $parentWinId$: $winId$,
                $url$: env.$location$ + '',
                $visibilityState$: 'hidden'
              }, true, true)
              return docEnv.$document$
            }
          }
        }
      },
      location: {
        get: () => env.$location$,
        set (url) {
          env.$location$.href = url + ''
        }
      },
      nodeType: {
        value: 9
      },
      parentNode: {
        value: null
      },
      parentElement: {
        value: null
      },
      readyState: {
        value: 'complete'
      },
      visibilityState: {
        get: () => env.$visibilityState$ || 'visible'
      }
    }
    definePrototypePropertyDescriptor(WorkerDocument, DocumentDescriptorMap)
    cachedProps(WorkerDocument, 'compatMode,referrer,forms')
  }
  const patchDocumentElementChild = (WokerDocumentElementChild, env) => {
    const DocumentElementChildDescriptorMap = {
      parentElement: {
        get () {
          return this.parentNode
        }
      },
      parentNode: {
        get: () => env.$documentElement$
      }
    }
    definePrototypePropertyDescriptor(WokerDocumentElementChild, DocumentElementChildDescriptorMap)
  }
  const patchElement = (WorkerElement, WorkerHTMLElement) => {
    const ElementDescriptorMap = {
      localName: {
        get () {
          return this[InstanceDataKey].toLowerCase()
        }
      },
      namespaceURI: {
        get () {
          return this[NamespaceKey] || 'http://www.w3.org/1999/xhtml'
        }
      },
      nodeType: {
        value: 1
      },
      tagName: {
        get () {
          return this[InstanceDataKey]
        }
      }
    }
    definePrototypePropertyDescriptor(WorkerElement, ElementDescriptorMap)
    cachedTreeProps(WorkerElement, elementStructurePropNames)
    cachedProps(WorkerElement, 'id')
    cachedDimensionProps(WorkerHTMLElement)
    cachedDimensionMethods(WorkerHTMLElement, commaSplit('getClientRects,getBoundingClientRect'))
  }
  const patchHTMLAnchorElement = (WorkerHTMLAnchorElement, env) => {
    const HTMLAnchorDescriptorMap = {}
    commaSplit('hash,host,hostname,href,origin,pathname,port,protocol,search').map((anchorProp => {
      HTMLAnchorDescriptorMap[anchorProp] = {
        get () {
          let value = getInstanceStateValue(this, 4)
          let href
          if (typeof value !== 'string') {
            href = getter(this, ['href'])
            setInstanceStateValue(this, 4, href)
            value = new URL(href)[anchorProp]
          }
          return resolveToUrl(env, value, null)[anchorProp]
        },
        set (value) {
          let url
          if (anchorProp === 'href') {
            if ((url => {
              try {
                new URL(url)
                return true
              } catch (_) {
                return false
              }
            })(value)) {
              url = new URL(value)
            } else {
              const baseHref = env.$location$.href
              url = resolveToUrl(env, baseHref, null)
              url.href = new URL(value + '', url.href)
            }
          } else {
            url = resolveToUrl(env, this.href, null)
            url[anchorProp] = value
          }
          setInstanceStateValue(this, 4, url.href)
          setter(this, ['href'], url.href)
        }
      }
    }))
    definePrototypePropertyDescriptor(WorkerHTMLAnchorElement, HTMLAnchorDescriptorMap)
  }
  const patchHTMLIFrameElement = (WorkerHTMLIFrameElement, env) => {
    const HTMLIFrameDescriptorMap = {
      contentDocument: {
        get () {
          return getIframeEnv(this).$document$
        }
      },
      contentWindow: {
        get () {
          return getIframeEnv(this).$window$
        }
      },
      src: {
        get () {
          let src = getInstanceStateValue(this, 0)
          if (src?.startsWith('javascript:')) {
            return src
          }
          src = getIframeEnv(this).$location$.href
          return src.startsWith('about:') ? '' : src
        },
        set (src) {
          if (src) {
            if (src.startsWith('javascript:')) {
              setInstanceStateValue(this, 0, src)
            } else if (!src.startsWith('about:')) {
              const xhr = new XMLHttpRequest()
              let xhrStatus
              const env = getIframeEnv(this)
              env.$location$.href = src = resolveUrl(env, src, 'iframe')
              env.$isLoading$ = 1
              setInstanceStateValue(this, 1, void 0)
              xhr.open('GET', src, false)
              xhr.send()
              xhrStatus = xhr.status
              if (xhrStatus > 199 && xhrStatus < 300) {
                setter(this, ['srcdoc'], `<base href="${src}">` + (function (text) {
                  return text.replace(SCRIPT_TAG_REGEXP, (_, attrs) => {
                    const parts = []
                    let hasType = false
                    let match
                    while (match = ATTR_REGEXP.exec(attrs)) {
                      let [keyValue] = match
                      if (keyValue.startsWith('type=')) {
                        hasType = true
                        keyValue = keyValue.replace(/(application|text)\/javascript/, SCRIPT_TYPE)
                      }
                      parts.push(keyValue)
                    }
                    hasType || parts.push('type="text/partytown"')
                    return `<script ${parts.join(' ')}>`
                  })
                }(xhr.responseText)) + getPartytownScript())
                sendToMain(true)
                webWorkerCtx.$postMessage$([7, env.$winId$])
              } else {
                setInstanceStateValue(this, 1, xhrStatus)
                env.$isLoading$ = 0
              }
            }
          }
        }
      },
      ...HTMLSrcElementDescriptorMap
    }
    definePrototypePropertyDescriptor(WorkerHTMLIFrameElement, HTMLIFrameDescriptorMap)
  }
  const ATTR_REGEXP_STR = "((?:\\w|-)+(?:=(?:(?:\\w|-)+|'[^']*'|\"[^\"]*\")?)?)"
  const SCRIPT_TAG_REGEXP = new RegExp(`<script\\s*((${ATTR_REGEXP_STR}\\s*)*)>`, 'mg')
  const ATTR_REGEXP = new RegExp(ATTR_REGEXP_STR, 'mg')
  const getIframeEnv = iframe => {
    const $winId$ = iframe[InstanceIdKey]
    environments[$winId$] || createEnvironment({
      $winId$,
      $parentWinId$: iframe[WinIdKey],
      $url$: getter(iframe, ['src']) || 'about:blank'
    }, true)
    return environments[$winId$]
  }
  const patchSvgElement = WorkerSVGGraphicsElement => {
    const getMatrix = (elm, methodName) => {
      const { a, b, c, d, e, f } = callMethod(elm, [methodName], EMPTY_ARRAY)
      return new DOMMatrixReadOnly([a, b, c, d, e, f])
    }
    const SVGGraphicsElementDescriptorMap = {
      ...WorkerSVGGraphicsElement,
      getCTM: {
        value: function () {
          return getMatrix(this, 'getCTM')
        }
      },
      getScreenCTM: {
        value: function () {
          return getMatrix(this, 'getScreenCTM')
        }
      }
    }
    definePrototypePropertyDescriptor(WorkerSVGGraphicsElement, SVGGraphicsElementDescriptorMap)
  }
  const createNamedNodeMapCstr = (win, WorkerBase) => {
    win.NamedNodeMap = defineConstructorName(class NamedNodeMap extends WorkerBase {
      constructor (winId, instanceId, applyPath) {
        super(winId, instanceId, applyPath)
        return new Proxy(this, {
          get (target, propName) {
            const handler = NAMED_NODE_MAP_HANDLERS[propName]
            return handler ? handler.bind(target, [propName]) : getter(target, [propName])
          },
          set (target, propName, propValue) {
            const handler = NAMED_NODE_MAP_HANDLERS[propName]
            if (handler) {
              throw new Error("Can't set read-only property: " + String(propName))
            }
            setter(target, [propName], propValue)
            return true
          }
        })
      }
    }, 'NamedNodeMap')
  }
  function method (applyPath, ...args) {
    return callMethod(this, applyPath, args, 1)
  }
  const NAMED_NODE_MAP_HANDLERS = {
    getNamedItem: method,
    getNamedItemNS: method,
    item: method,
    removeNamedItem: method,
    removeNamedItemNS: method,
    setNamedItem: method,
    setNamedItemNS: method
  }
  const createWindow = ($winId$, $parentWinId$, url, $visibilityState$, isIframeWindow, isDocumentImplementation) => {
    let cstrInstanceId
    let cstrNodeName
    let cstrNamespace
    const WorkerBase = class {
      constructor (winId, instanceId, applyPath, instanceData, namespace) {
        this[WinIdKey] = winId || $winId$
        this[InstanceIdKey] = instanceId || cstrInstanceId || randomId()
        this[ApplyPathKey] = applyPath || []
        this[InstanceDataKey] = instanceData || cstrNodeName
        this[NamespaceKey] = namespace || cstrNamespace
        this[InstanceStateKey] = {}
        cstrInstanceId = cstrNodeName = cstrNamespace = void 0
      }
    }
    const WorkerLocation = defineConstructorName(class extends URL {
      assign () {
        logWorker('location.assign(), noop')
      }

      reload () {
        logWorker('location.reload(), noop')
      }

      replace () {
        logWorker('location.replace(), noop')
      }
    }, 'Location')
    const $location$ = new WorkerLocation(url)
    const $isSameOrigin$ = $location$.origin === webWorkerCtx.$origin$ || $location$.origin === 'about:blank'
    const $isTopWindow$ = $parentWinId$ === $winId$
    const env = {}
    const getChildEnvs = () => {
      const childEnv = []
      let envWinId
      let otherEnv
      for (envWinId in environments) {
        otherEnv = environments[envWinId]
        otherEnv.$parentWinId$ !== $winId$ || otherEnv.$isTopWindow$ || childEnv.push(otherEnv)
      }
      return childEnv
    }
    const WorkerWindow = defineConstructorName(class extends WorkerBase {
      constructor () {
        super($winId$, $winId$)
        const win = this
        let value
        let historyState
        let hasInitializedMedia = 0
        const initWindowMedia = () => {
          if (!hasInitializedMedia) {
            (() => {
              if (!webWorkerCtx.$initWindowMedia$) {
                self.$bridgeToMedia$ = [getter, setter, callMethod, constructGlobal, definePrototypePropertyDescriptor, randomId, WinIdKey, InstanceIdKey, ApplyPathKey]
                webWorkerCtx.$importScripts$(partytownLibUrl('partytown-media.js?v=0.7.6'))
                webWorkerCtx.$initWindowMedia$ = self.$bridgeFromMedia$
                delete self.$bridgeFromMedia$
              }
              return webWorkerCtx.$initWindowMedia$
            })()(WorkerBase, WorkerEventTargetProxy, env, win, windowMediaConstructors)
            hasInitializedMedia = 1
          }
        }
        const nodeCstrs = {}
        const $createNode$ = (nodeName, instanceId, namespace) => {
          htmlMedia.includes(nodeName) && initWindowMedia()
          const NodeCstr = nodeCstrs[nodeName] ? nodeCstrs[nodeName] : nodeName.includes('-') ? nodeCstrs.UNKNOWN : nodeCstrs.I
          cstrInstanceId = instanceId
          cstrNodeName = nodeName
          cstrNamespace = namespace
          return new NodeCstr()
        }
        win.Window = WorkerWindow
        win.name = name + `${normalizedWinId($winId$)} (${$winId$})`
        createNodeCstr(win, env, WorkerBase);
        (win => {
          win.NodeList = defineConstructorName(NodeList, 'NodeList')
        })(win)
        createNamedNodeMapCstr(win, WorkerBase)
        createCSSStyleDeclarationCstr(win, WorkerBase, 'CSSStyleDeclaration');
        ((win, WorkerBase, cstrName) => {
          win[cstrName] = defineConstructorName(class extends WorkerBase {
            now () {
              return performance.now()
            }
          }, cstrName)
        })(win, WorkerBase, 'Performance');
        ((win, nodeCstrs) => {
          const registry = new Map()
          win.customElements = {
            define (tagName, Cstr, opts) {
              registry.set(tagName, Cstr)
              nodeCstrs[tagName.toUpperCase()] = Cstr
              const ceData = [Cstr.name, Cstr.observedAttributes]
              callMethod(win, ['customElements', 'define'], [tagName, ceData, opts])
            },
            get: tagName => registry.get(tagName) || callMethod(win, ['customElements', 'get'], [tagName]),
            whenDefined: tagName => registry.has(tagName) ? Promise.resolve() : callMethod(win, ['customElements', 'whenDefined'], [tagName]),
            upgrade: elm => callMethod(win, ['customElements', 'upgrade'], [elm])
          }
        })(win, nodeCstrs)
        webWorkerCtx.$interfaces$.map((([cstrName, superCstrName, members, interfaceType, nodeName]) => {
          const SuperCstr = TrapConstructors[cstrName] ? WorkerTrapProxy : superCstrName === 'EventTarget' ? WorkerEventTargetProxy : superCstrName === 'Object' ? WorkerBase : win[superCstrName]
          const Cstr = win[cstrName] = defineConstructorName(interfaceType === 12
            ? class extends WorkerBase {
              constructor (...args) {
                super()
                constructGlobal(this, cstrName, args)
              }
            }
            : win[cstrName] || class extends SuperCstr {}, cstrName)
          nodeName && (nodeCstrs[nodeName] = Cstr)
          members.map((([memberName, memberType, staticValue]) => {
            memberName in Cstr.prototype || memberName in SuperCstr.prototype || (typeof memberType === 'string'
              ? definePrototypeProperty(Cstr, memberName, {
                get () {
                  if (!hasInstanceStateValue(this, memberName)) {
                    const instanceId = this[InstanceIdKey]
                    const applyPath = [...this[ApplyPathKey], memberName]
                    const PropCstr = win[memberType]
                    PropCstr && setInstanceStateValue(this, memberName, new PropCstr($winId$, instanceId, applyPath))
                  }
                  return getInstanceStateValue(this, memberName)
                },
                set (value) {
                  setInstanceStateValue(this, memberName, value)
                }
              })
              : memberType === 5
                ? definePrototypeValue(Cstr, memberName, function (...args) {
                  return callMethod(this, [memberName], args)
                })
                : memberType > 0 && (void 0 !== staticValue
                  ? definePrototypeValue(Cstr, memberName, staticValue)
                  : definePrototypeProperty(Cstr, memberName, {
                    get () {
                      return getter(this, [memberName])
                    },
                    set (value) {
                      setter(this, [memberName], value)
                    }
                  })))
          }))
        }))
        commaSplit('atob,btoa,crypto,indexedDB,setTimeout,setInterval,clearTimeout,clearInterval').map((globalName => {
          delete WorkerWindow.prototype[globalName]
          if (!(globalName in win)) {
            value = self[globalName]
            value != null && (win[globalName] = typeof value !== 'function' || value.toString().startsWith('class') ? value : value.bind(self))
          }
        }))
        Object.getOwnPropertyNames(self).map((globalName => {
          globalName in win || (win[globalName] = self[globalName])
        }))
        windowMediaConstructors.map((cstrName => defineProperty(win, cstrName, {
          get () {
            initWindowMedia()
            return win[cstrName]
          }
        })))
        'trustedTypes' in self && (win.trustedTypes = self.trustedTypes)
        patchElement(win.Element, win.HTMLElement)
        patchDocument(win.Document, env, isDocumentImplementation);
        (WorkerDocumentFragment => {
          definePrototypeNodeType(WorkerDocumentFragment, 11)
          cachedTreeProps(WorkerDocumentFragment, elementStructurePropNames)
        })(win.DocumentFragment)
        patchHTMLAnchorElement(win.HTMLAnchorElement, env);
        (WorkerHTMLFormElement => {
          definePrototypePropertyDescriptor(WorkerHTMLFormElement, {})
          cachedProps(WorkerHTMLFormElement, 'elements')
        })(win.HTMLFormElement)
        patchHTMLIFrameElement(win.HTMLIFrameElement)
        patchHTMLScriptElement(win.HTMLScriptElement, env)
        patchSvgElement(win.SVGGraphicsElement)
        patchDocumentElementChild(win.HTMLHeadElement, env)
        patchDocumentElementChild(win.HTMLBodyElement, env);
        ((WorkerHTMLHtmlElement, env) => {
          const DocumentElementDescriptorMap = {
            parentElement: {
              value: null
            },
            parentNode: {
              get: () => env.$document$
            }
          }
          definePrototypePropertyDescriptor(WorkerHTMLHtmlElement, DocumentElementDescriptorMap)
        })(win.HTMLHtmlElement, env)
        createCSSStyleSheetConstructor(win, 'CSSStyleSheet')
        definePrototypeNodeType(win.Comment, 8)
        definePrototypeNodeType(win.DocumentType, 10)
        Object.assign(env, {
          $winId$,
          $parentWinId$,
          $window$: new Proxy(win, {
            get: (win, propName) => {
              let _a
              if (typeof propName !== 'string' || isNaN(propName)) {
                return ((_a = webWorkerCtx.$config$.mainWindowAccessors) === null || void 0 === _a ? void 0 : _a.includes(propName)) ? getter(this, [propName]) : win[propName]
              }
              {
                const frame = getChildEnvs()[propName]
                return frame ? frame.$window$ : void 0
              }
            },
            has: () => true
          }),
          $document$: $createNode$('#document', $winId$ + '.d'),
          $documentElement$: $createNode$('HTML', $winId$ + '.e'),
          $head$: $createNode$('HEAD', $winId$ + '.h'),
          $body$: $createNode$('BODY', $winId$ + '.b'),
          $location$,
          $visibilityState$,
          $isSameOrigin$,
          $isTopWindow$,
          $createNode$
        })
        win.requestAnimationFrame = cb => setTimeout(() => cb(performance.now()), 9)
        win.cancelAnimationFrame = id => { clearTimeout(id) }
        win.requestIdleCallback = (cb, start) => {
          start = Date.now()
          return setTimeout(() => cb({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
          }), 1)
        }
        win.cancelIdleCallback = id => { clearTimeout(id) }
        addStorageApi(win, 'localStorage', webWorkerlocalStorage, $isSameOrigin$, env)
        addStorageApi(win, 'sessionStorage', webWorkerSessionStorage, $isSameOrigin$, env)
        $isSameOrigin$ || (win.indexeddb = void 0)
        if (isIframeWindow) {
          historyState = {}
          win.history = {
            pushState (stateObj) {
              historyState = stateObj
            },
            replaceState (stateObj) {
              historyState = stateObj
            },
            get state () {
              return historyState
            },
            length: 0
          }
          win.indexeddb = void 0
        } else {
          const originalPushState = win.history.pushState.bind(win.history)
          const originalReplaceState = win.history.replaceState.bind(win.history)
          win.history.pushState = (stateObj, _, newUrl) => {
            env.$propagateHistoryChange$ !== false && originalPushState(stateObj, _, newUrl)
          }
          win.history.replaceState = (stateObj, _, newUrl) => {
            env.$propagateHistoryChange$ !== false && originalReplaceState(stateObj, _, newUrl)
          }
        }
        win.Worker = void 0
      }

      addEventListener (...args) {
        args[0] === 'load'
          ? env.$runWindowLoadEvent$ && setTimeout((() => args[1]({
            type: 'load'
          })))
          : callMethod(this, ['addEventListener'], args, 2)
      }

      get body () {
        return env.$body$
      }

      get document () {
        return env.$document$
      }

      get documentElement () {
        return env.$documentElement$
      }

      async fetch (input, init) {
        input = typeof input === 'string' || input instanceof URL ? String(input) : input.url
        return await fetch(resolveUrl(env, input, 'fetch'), init)
      }

      get frames () {
        return env.$window$
      }

      get frameElement () {
        return $isTopWindow$ ? null : getOrCreateNodeInstance($parentWinId$, $winId$, 'IFRAME')
      }

      get globalThis () {
        return env.$window$
      }

      get head () {
        return env.$head$
      }

      get length () {
        return getChildEnvs().length
      }

      get location () {
        return $location$
      }

      set location (loc) {
        $location$.href = loc + ''
      }

      get Image () {
        return createImageConstructor(env)
      }

      get navigator () {
        return (env => {
          let key
          const nav = {
            sendBeacon: (url, body) => {
              if (webWorkerCtx.$config$.logSendBeaconRequests) {
                try {
                  logWorker(`sendBeacon: ${resolveUrl(env, url, null)}${body ? ', data: ' + JSON.stringify(body) : ''}`)
                } catch (e) {
                  console.error(e)
                }
              }
              try {
                fetch(resolveUrl(env, url, null), {
                  method: 'POST',
                  body,
                  mode: 'no-cors',
                  keepalive: true
                })
                return true
              } catch (e) {
                console.error(e)
                return false
              }
            }
          }
          for (key in navigator) {
            nav[key] = navigator[key]
          }
          return new Proxy(nav, {
            set (_, propName, propValue) {
              navigator[propName] = propValue
              return true
            }
          })
        })(env)
      }

      get origin () {
        return $location$.origin
      }

      set origin (_) {}
      get parent () {
        for (const envWinId in environments) {
          if (environments[envWinId].$winId$ === $parentWinId$) {
            return environments[envWinId].$window$
          }
        }
        return env.$window$
      }

      postMessage (...args) {
        if (environments[args[0]]) {
          len(postMessages) > 50 && postMessages.splice(0, 5)
          postMessages.push({
            $winId$: args[0],
            $data$: JSON.stringify(args[1])
          })
          args = args.slice(1)
        }
        callMethod(this, ['postMessage'], args, 3)
      }

      get self () {
        return env.$window$
      }

      get top () {
        for (const envWinId in environments) {
          if (environments[envWinId].$isTopWindow$) {
            return environments[envWinId].$window$
          }
        }
        return env.$window$
      }

      get window () {
        return env.$window$
      }

      get XMLHttpRequest () {
        const Xhr = XMLHttpRequest
        const str = String(Xhr)
        const ExtendedXhr = defineConstructorName(class extends Xhr {
          open (...args) {
            args[1] = resolveUrl(env, args[1], 'xhr')
            super.open(...args)
          }

          set withCredentials (_) {}
          toString () {
            return str
          }
        }, getConstructorName(Xhr))
        ExtendedXhr.prototype.constructor.toString = () => str
        return ExtendedXhr
      }
    }, 'Window')
    const WorkerTrapProxy = class extends WorkerBase {
      constructor (winId, instanceId, applyPath, nodeName) {
        super(winId, instanceId, applyPath, nodeName)
        return new Proxy(this, {
          get: (instance, propName) => getter(instance, [propName]),
          set (instance, propName, propValue) {
            setter(instance, [propName], propValue)
            return true
          }
        })
      }
    }
    const WorkerEventTargetProxy = class extends WorkerBase {}
    eventTargetMethods.map((methodName => WorkerEventTargetProxy.prototype[methodName] = function (...args) {
      return callMethod(this, [methodName], args, 2)
    }))
    cachedProps(WorkerWindow, 'devicePixelRatio')
    cachedDimensionProps(WorkerWindow)
    cachedDimensionMethods(WorkerWindow, ['getComputedStyle'])
    new WorkerWindow()
    return env
  }
  const TrapConstructors = {
    DOMStringMap: 1,
    NamedNodeMap: 1
  }
  const createEnvironment = ({ $winId$, $parentWinId$, $url$, $visibilityState$ }, isIframeWindow, isDocumentImplementation) => {
    if (!environments[$winId$]) {
      environments[$winId$] = createWindow($winId$, $parentWinId$, $url$, $visibilityState$, isIframeWindow, isDocumentImplementation)
      {
        const winType = $winId$ === $parentWinId$ ? 'top' : 'iframe'
        logWorker(`Created ${winType} window ${normalizedWinId($winId$)} environment`, $winId$)
      }
    }
    webWorkerCtx.$postMessage$([7, $winId$])
    return environments[$winId$]
  }
  const queuedEvents = []
  const receiveMessageFromSandboxToWorker = ev => {
    const msg = ev.data
    const msgType = msg[0]
    const msgValue = msg[1]
    if (webWorkerCtx.$isInitialized$) {
      if (msgType === 7) {
        (async initScript => {
          const winId = initScript.$winId$
          const instanceId = initScript.$instanceId$
          const instance = getOrCreateNodeInstance(winId, instanceId, 'SCRIPT')
          let scriptContent = initScript.$content$
          let scriptSrc = initScript.$url$
          const scriptOrgSrc = initScript.$orgUrl$
          let errorMsg = ''
          const env = environments[winId]
          let rsp
          const javascriptContentTypes = ['text/jscript', 'text/javascript', 'text/x-javascript', 'application/javascript', 'application/x-javascript', 'text/ecmascript', 'text/x-ecmascript', 'application/ecmascript']
          if (scriptSrc) {
            try {
              scriptSrc = resolveToUrl(env, scriptSrc, 'script') + ''
              setInstanceStateValue(instance, 4, scriptSrc)
              webWorkerCtx.$config$.logScriptExecution && logWorker(`Execute script src: ${scriptOrgSrc}`, winId)
              rsp = await fetch(scriptSrc)
              if (rsp.ok) {
                const responseContentType = rsp.headers.get('content-type')
                const shouldExecute = javascriptContentTypes.some((ct => {
                  let _a, _b, _c
                  return (_c = (_a = responseContentType == null ? void 0 : responseContentType.toLowerCase) === null || void 0 === _a ? void 0 : (_b = _a.call(responseContentType)).includes) === null || void 0 === _c ? void 0 : _c.call(_b, ct)
                }))
                if (shouldExecute) {
                  scriptContent = await rsp.text()
                  env.$currentScriptId$ = instanceId
                  run(env, scriptContent, scriptOrgSrc || scriptSrc)
                }
                runStateLoadHandlers(instance, 'load')
              } else {
                errorMsg = rsp.statusText
                runStateLoadHandlers(instance, 'error')
              }
            } catch (urlError) {
              console.error(urlError)
              errorMsg = String(urlError.stack || urlError)
              runStateLoadHandlers(instance, 'error')
            }
          } else {
            scriptContent && (errorMsg = runScriptContent(env, instanceId, scriptContent, winId, errorMsg))
          }
          env.$currentScriptId$ = ''
          webWorkerCtx.$postMessage$([6, winId, instanceId, errorMsg])
        })(msgValue)
      } else if (msgType === 9) {
        (({ $winId$, $instanceId$, $refId$, $thisArg$, $args$ }) => {
          if (webWorkerRefsByRefId[$refId$]) {
            try {
              webWorkerRefsByRefId[$refId$].apply(deserializeFromMain($winId$, $instanceId$, [], $thisArg$), deserializeFromMain($winId$, $instanceId$, [], $args$))
            } catch (e) {
              console.error(e)
            }
          }
        })(msgValue)
      } else if (msgType === 10) {
        (({ $winId$, $forward$, $args$ }) => {
          try {
            let target = environments[$winId$].$window$
            let i = 0
            const l = len($forward$)
            for (;i < l; i++) {
              i + 1 < l ? target = target[$forward$[i]] : target[$forward$[i]].apply(target, deserializeFromMain(null, $winId$, [], $args$))
            }
          } catch (e) {
            console.error(e)
          }
        })(msgValue)
      } else if (msgType === 5) {
        createEnvironment(msgValue)
      } else if (msgType === 8) {
        if (environments[msgValue].$isInitialized$ !== 1) {
          const winId = msgValue
          const env = environments[winId]
          const winType = env.$winId$ === env.$parentWinId$ ? 'top' : 'iframe'
          logWorker(`Initialized ${winType} window ${normalizedWinId(winId)} environment 🎉`, winId)
        }
        environments[msgValue].$isInitialized$ = 1
        environments[msgValue].$isLoading$ = 0
      } else if (msgType === 14) {
        environments[msgValue].$visibilityState$ = msg[2]
      } else if (msgType === 13) {
        const $winId$ = msgValue.$winId$
        const env = environments[$winId$]
        env.$location$.href = msgValue.url
        !(function ($winId$, env, data) {
          const history = env.$window$.history
          switch (data.type) {
            case 0:
              env.$propagateHistoryChange$ = false
              try {
                history.pushState(data.state, '', data.newUrl)
              } catch (e) {}
              env.$propagateHistoryChange$ = true
              break

            case 1:
              env.$propagateHistoryChange$ = false
              try {
                history.replaceState(data.state, '', data.newUrl)
              } catch (e) {}
              env.$propagateHistoryChange$ = true
          }
        }(msgValue.$winId$, env, msgValue))
      } else {
        msgType === 15 && ((_type, winId, instanceId, callbackName, args) => {
          const elm = getOrCreateNodeInstance(winId, instanceId)
          elm && typeof elm[callbackName] === 'function' && elm[callbackName].apply(elm, args)
        })(...msg)
      }
    } else if (msgType === 1) {
      (initWebWorkerData => {
        const config = webWorkerCtx.$config$ = JSON.parse(initWebWorkerData.$config$)
        const locOrigin = initWebWorkerData.$origin$
        webWorkerCtx.$importScripts$ = importScripts.bind(self)
        webWorkerCtx.$interfaces$ = initWebWorkerData.$interfaces$
        webWorkerCtx.$libPath$ = initWebWorkerData.$libPath$
        webWorkerCtx.$origin$ = locOrigin
        webWorkerCtx.$postMessage$ = postMessage.bind(self)
        webWorkerCtx.$sharedDataBuffer$ = initWebWorkerData.$sharedDataBuffer$
        webWorkerlocalStorage.set(locOrigin, initWebWorkerData.$localStorage$)
        webWorkerSessionStorage.set(locOrigin, initWebWorkerData.$sessionStorage$)
        self.importScripts = void 0
        delete self.postMessage
        delete self.WorkerGlobalScope
        commaSplit('resolveUrl,get,set,apply').map((configName => {
          config[configName] && (config[configName] = new Function('return ' + config[configName])())
        }))
      })(msgValue)
      webWorkerCtx.$postMessage$([2])
    } else if (msgType === 3) {
      webWorkerCtx.$interfaces$ = [...webWorkerCtx.$interfaces$, ...msgValue]
      webWorkerCtx.$isInitialized$ = 1
      logWorker('Initialized web worker')
      webWorkerCtx.$postMessage$([4])
      queuedEvents.length && logWorker(`Queued ready messages: ${queuedEvents.length}`);
      [...queuedEvents].map(receiveMessageFromSandboxToWorker)
      queuedEvents.length = 0
    } else {
      queuedEvents.push(ev)
    }
  }
  self.onmessage = receiveMessageFromSandboxToWorker
  postMessage([0])
})(self)
