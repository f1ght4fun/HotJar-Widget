(function () {
  const widgetElement = document.createElement('app-widget')
  document.body.appendChild(widgetElement) 

  const linkElement = document.createElement('link');
  linkElement.href="https://fonts.googleapis.com/icon?family=Material+Icons"
  linkElement.rel="stylesheet"
  document.head.appendChild(linkElement)

  const runtimeCode = document.createElement('script')
  runtimeCode.src = 'http://localhost:4200/runtime.js'
  document.body.appendChild(runtimeCode)

  const polyfillsCode = document.createElement('script')
  polyfillsCode.src = 'http://localhost:4200/polyfills.js'
  document.body.appendChild(polyfillsCode)

  const stylesCode = document.createElement('script')
  stylesCode.src = 'http://localhost:4200/styles.js'
  document.body.appendChild(stylesCode)

  const vendorCode = document.createElement('script')
  vendorCode.src = 'http://localhost:4200/vendor.js'
  document.body.appendChild(vendorCode)

  const widgetCode = document.createElement('script')
  widgetCode.src = 'http://localhost:4200/main.js'
  document.body.appendChild(widgetCode)



  // let element;
  // document.body.addEventListener('mousemove', (event) => {
  //   console.log('X:', event.clientX);
  //   console.log('Y:', event.clientY);

  //   const newElement = document.elementFromPoint(event.clientX, event.clientY);
  //   if (newElement !== element) {
  //     if (!!element) {
  //       element.removeAttribute("style");
  //     }
  //     element = newElement;
  //     newElement.setAttribute("style", "border: 2px dashed yellow");
  //     console.log('Element', document.elementFromPoint(event.clientX, event.clientY));
  //   }
    // if (firstCall) {
    //   api.submit([
    //     {
    //       type: api.VISITED_URL,
    //       payload: 'http://www.hotjar.com',
    //     },
    //     {
    //       type: api.FOCUS,
    //       payload: 'body',
    //     },
    //     {
    //       type: api.CLICK,
    //       payload: '#save-funnel',
    //     },
    //   ]);
    //   firstCall = false;
    // } else {
    //   api.submit([
    //     {
    //       type: api.VISITED_URL,
    //       payload: 'http://www.hotjar.com/tour',
    //     },
    //   ]);
    // }
 // });
})();
